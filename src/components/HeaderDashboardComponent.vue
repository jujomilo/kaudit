<template>
    <header class="is-flex is-justify-content-space-between is-align-items-center">
      <h1 class="title">Bienvenido, {{ userName }}</h1>
      <button class="button is-danger" @click="logout">Cerrar sesión</button>
    </header>
  </template>
  
  <script>
  import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useToast } from "vue-toastification"; // Importamos el notificador
  
  export default {
    name: 'HeaderDashboardComponent',
    setup() {
      const auth = getAuth();
      const router = useRouter();
      const userName = ref('');
      const toast = useToast();
  
      // Verificar estado del usuario al montar el componente
      onMounted(() => {
        onAuthStateChanged(auth, user => {
          if (user) {
            userName.value = user.email || 'Usuario'; // Muestra el email del usuario
          } else {
            router.push('/login'); // Redirigir al login si no hay usuario
          }
        });
      });
  
      // Función para cerrar sesión
      const logout = async () => {
        try {
          await signOut(auth); // Cerrar sesión en Firebase
          // Mostrar notificación de éxito
          toast.success(" Has cerrado Sesión");
          router.push('/login'); // Redirigir al login
        } catch (error) {
          console.error('Error al cerrar sesión:', error.message);
        }
      };
  
      return {
        userName,
        logout,
      };
    },
  };
  </script>
  
  <style scoped lang="scss">
@import '@/styles/main.scss'; /* Asegúrate de importar las variables */

/* Estilo del header */
header {
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  border-radius: 15px;
  background: $gray-800; /* Fondo oscuro */
  box-shadow: $box-shadow-light, $box-shadow-dark; /* Efecto neomorfista */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Estilo del título */
.title {
  font-size: 1.25rem; /* Reducimos el tamaño del texto */
  font-family: 'Orbitron', sans-serif; /* Tipografía más radical */
  color: $gray-400; /* Color gris claro */
  text-shadow: 1px 1px 2px $gray-900, -1px -1px 2px $gray-500; /* Efecto de bajo relieve */
  margin-bottom: 1rem;
  letter-spacing: 0.1em; /* Espaciado entre letras */
}

/* Estilo del botón */
button {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 10px;
  background: $orange-highlight; /* Color destacado */
  box-shadow: 5px 5px 10px rgba(233, 84, 32, 0.5), -5px -5px 10px rgba(255, 133, 85, 0.3);
  color: #fff;
  font-family: 'Arial', sans-serif; /* Botón más neutro */
  font-weight: bold;
  transition: all 0.3s ease;
}

button:hover {
  box-shadow: inset 5px 5px 10px rgba(233, 84, 32, 0.6), inset -5px -5px 10px rgba(255, 133, 85, 0.4);
  cursor: pointer;
}
</style>

  
  
  