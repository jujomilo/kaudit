<template>
  <header class="header-dashboard is-flex is-justify-content-space-between is-align-items-center">
    <!-- Título del usuario -->
    <h1 class="title">Bienvenido, {{ userName }}</h1>

    <!-- Botón de cerrar sesión -->
    <button class="button is-danger logout-button" @click="logout">Cerrar sesión</button>
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
.header-dashboard {
  margin: 0;
  padding: 0.8rem 1.5rem;
  border-radius: 15px;
  background: $gray-800;
  box-shadow: $box-shadow-light, $box-shadow-dark;
  display: flex;
  justify-content: space-between; /* Separar texto y botón */
  align-items: center; /* Centrar verticalmente todos los elementos */
  width: 100%;
}

/* Estilo del título */
.title {
  font-size: 0.9rem;
  font-family: 'Orbitron', sans-serif;
  color: $orange-highlight;
  text-shadow: 1px 1px 2px $gray-900, -1px -1px 2px $gray-500;
  margin: 0; /* Elimina márgenes externos */
  padding: 0 0.5rem; /* Espaciado interno a los lados */
  line-height: 1.5; /* Asegura un buen alineado vertical */
}

/* Estilo del botón de cerrar sesión */
.logout-button {
  padding: 0.3rem 1rem;
  font-size: 0.8rem;
  border: none;
  border-radius: 10px;
  background: $orange-highlight;
  box-shadow: 2px 2px 5px rgba(233, 84, 32, 0.4), -2px -2px 5px rgba(255, 133, 85, 0.2);
  color: #fff;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  transition: all 0.3s ease;
  line-height: 1.5; /* Asegura alineación vertical similar al texto */
}

.logout-button:hover {
  box-shadow: inset 3px 3px 5px rgba(233, 84, 32, 0.4), inset -3px -3px 5px rgba(255, 133, 85, 0.3);
  cursor: pointer;
}
  </style>
  
  
  
  
  
  