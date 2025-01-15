<template>
    <div>
      <h2>Auth Store Test</h2>
  
      <!-- Mostrar el estado de autenticación -->
      <p>Usuario autenticado: {{ isAuthenticated }}</p>
      <p>Información del usuario: {{ user ? user.email : 'Ninguno' }}</p>
  
      <!-- Formularios para Login -->
      <form @submit.prevent="handleLogin">
        <h3>Login</h3>
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
  
      <!-- Formularios para Registro -->
      <form @submit.prevent="handleRegister">
        <h3>Registro</h3>
        <input type="email" v-model="registerEmail" placeholder="Email" required />
        <input type="password" v-model="registerPassword" placeholder="Password" required />
        <button type="submit">Registrarse</button>
      </form>
  
      <!-- Botón para Logout -->
      <button @click="logout" v-if="isAuthenticated">Logout</button>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '@/stores/auth';
  import { ref } from 'vue';
  
  export default {
    setup() {
      const authStore = useAuthStore();
  
      // Variables para login
      const email = ref('');
      const password = ref('');
  
      // Variables para registro
      const registerEmail = ref('');
      const registerPassword = ref('');
  
      // Métodos
      const handleLogin = async () => {
        await authStore.login(email.value, password.value);
      };
  
      const handleRegister = async () => {
        await authStore.register(registerEmail.value, registerPassword.value);
      };
  
      const logout = async () => {
        await authStore.logout();
      };
  
      return {
        email,
        password,
        registerEmail,
        registerPassword,
        isAuthenticated: authStore.isAuthenticated,
        user: authStore.user,
        handleLogin,
        handleRegister,
        logout,
      };
    },
  };
  </script>
  
  <style scoped>
/* Agregamos estilos opcionales para que se vea ordenado */
div {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
}

button {
  margin: 5px;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
