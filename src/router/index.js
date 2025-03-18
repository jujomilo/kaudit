import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import { getAuth } from "firebase/auth"; // Firebase Auth
import { getDoc, doc } from "firebase/firestore"; // Firestore
import { db } from "@/firebase"; // Instancia de Firestore
import { useToast } from "vue-toastification"; // Toast para mensajes

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },

  // 🔥 Ruta protegida para usuarios autenticados
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },

  // 🔥 Ruta para editar perfil (solo autenticados)
  {
    path: "/edit-profile",
    name: "EditProfile",
    component: () => import("@/views/EditProfileView.vue"),
    meta: { requiresAuth: true }
  },

  // 🔥 Ruta para superusuarios (protegida)
  {
    path: "/superuser",
    name: "SuperUser",
    component: () => import("@/views/SuperUserView.vue"),
    meta: { requiresSuperUser: true }, // ✅ Corregimos la meta
  },
  // 🔥 Ruta para crear auditorías sólo si eres superuser
  {
    path: "/create-audit",
    name: "CreateAudit",
    component: () => import("@/views/CreateAuditView.vue"),
    meta: { requiresSuperUser: true }, // 🔥 Solo superusuarios pueden acceder
  },
  
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 🔥 Protegemos rutas con beforeEach
router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const toast = useToast();

  // 🔥 Verifica si la ruta requiere autenticación
  if (to.meta.requiresAuth && !user) {
    toast.error("Debes iniciar sesión primero.");
    next("/login");
    return;
  }

  // 🔥 Verifica si la ruta requiere permisos de superusuario
  if (to.meta.requiresSuperUser) {
    if (!user) {
      toast.error("Acceso denegado. Inicia sesión primero.");
      next("/login");
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists() && userDoc.data().role === "superuser") {
        next(); // ✅ Es superusuario, lo dejamos entrar
      } else {
        toast.error("Acceso denegado. No tienes permisos de superusuario.");
        next("/dashboard"); // ❌ Si no es superusuario, lo enviamos al dashboard
      }
    } catch (error) {
      console.error("Error verificando permisos:", error);
      toast.error("Error verificando permisos.");
      next("/dashboard");
    }

    return;
  }

  next(); // ✅ Si no hay restricciones, permite la navegación
});

export default router;




