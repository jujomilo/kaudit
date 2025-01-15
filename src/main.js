// Importaciones principales
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import 'bulma/css/bulma.css';
import './firebase';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// Opciones para las notificaciones tipo toast
const options = {
  position: "bottom-center", // Cambiar la posición
  timeout: 3000,        // Tiempo antes de que desaparezca (en ms)
  closeOnClick: false,      // Evitar que se cierren al hacer clic
  pauseOnHover: true,       // Pausar el tiempo al pasar el mouse
  draggable: true,          // Habilitar arrastre
  draggablePercent: 0.8,    // Cerrar tras arrastrar el 80%
  hideProgressBar: false,   // Mostrar barra de progreso
  showCloseButtonOnHover: true, // Mostrar botón de cierre al pasar el mouse
  newestOnTop: true,        // Notificaciones nuevas en la parte superior
};

// Creamos una instancia de autenticación
const auth = getAuth();

// Variable para almacenar la instancia de la aplicación
let app;

// Verificar el estado del usuario
onAuthStateChanged(auth, user => {
  if (!app) {
    app = createApp(App);
    const pinia = createPinia();

    app.use(pinia);
    app.use(router);
    app.use(Toast, options);
    app.mount('#app');
  }

  // Redirigir solo si el usuario intenta acceder a una ruta protegida
  const publicRoutes = ['/', '/login', '/register']; // Definir rutas públicas
  if (!user && !publicRoutes.includes(router.currentRoute.value.path)) {
    router.push('/login'); // Enviar al login si no está autenticado y la ruta no es pública
  }
});

