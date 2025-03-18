<template>
  <section class="section">
    <div class="container is-fluid">
      <h1 class="title has-text-light">Gestión de Usuarios</h1>

      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Email</th>
            <th>Rol</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.uid">
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button @click="toggleRole(user)" class="button is-small is-info">
                Cambiar Rol
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
     <!-- 🔥 Enlace de vuelta al dashboard -->
     <router-link to="/dashboard" class="dashboard-link">
        ⬅️ Volver al Dashboard
      </router-link>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"; // 🔥 Firestore
import { getAuth } from "firebase/auth"; // 🔥 Auth
import { useToast } from "vue-toastification"; // 🔥 Toast
import { db } from "@/firebase"; // 🔥 Firestore

export default {
  name: "SuperUserView",
  setup() {
    const users = ref([]);
    const auth = getAuth(); // 🔥 Instancia de Firebase Auth
    const toast = useToast(); // 🔥 Instancia de Toast

    // 🔥 Cargar la lista de usuarios desde Firestore
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        users.value = querySnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
    };

    onMounted(fetchUsers);

    // 🔥 Función placeholder (luego la programamos)
    const toggleRole = async (user) => {
      if(user.uid === auth.currentUser.uid)
       {
         toast.error("No puedes cambiar tu propio rol.");
         return;
       }

       try {
         const newRole = user.role === "user" ? "superuser" : "user";
         await updateDoc(doc(db, "users", user.uid), {role: newRole});

         toast.success(`Rol cambiado a ${newRole} correctamente.`);
         // 🔥 Recargar la lista de usuarios para reflejar el cambio
        fetchUsers();
        
       }catch (error) {
        console.error("Error al cambiar el rol:", error);
        toast.error("Error al cambiar el rol.");
       }
    };

    return { users, toggleRole };
  },
};
</script>

<style scoped>
/* Estilos básicos */
.table {
  margin-top: 20px;
}

.button {
  margin-left: 5px;
}
.dashboard-link {
  display: inline-block;
  margin: 15px;
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background: #ff5722;
  border-radius: 5px;
  text-decoration: none;
  transition: background 0.3s;
}
</style>


