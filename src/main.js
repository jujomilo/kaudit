// Importaciones principales
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import 'bulma/css/bulma.css';
import './firebase';

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
    app.mount('#app');
  }

  // Redirigir solo si el usuario intenta acceder a una ruta protegida
  const publicRoutes = ['/', '/login', '/register']; // Definir rutas públicas
  if (!user && !publicRoutes.includes(router.currentRoute.value.path)) {
    router.push('/login'); // Enviar al login si no está autenticado y la ruta no es pública
  }
});

