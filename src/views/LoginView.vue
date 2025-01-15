<template>
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5">
            <div class="box">
              <h1 class="title has-text-centered">Iniciar Sesión</h1>
              <form @submit.prevent="handleLogin">
                <div class="field">
                  <label class="label" for="email">Email:</label>
                  <div class="control">
                    <input
                      class="input"
                      type="email"
                      id="email"
                      placeholder="Ingresa tu correo"
                      v-model="email"
                      required
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label" for="password">Contraseña:</label>
                  <div class="control">
                    <input
                      class="input"
                      type="password"
                      id="password"
                      placeholder="Ingresa tu contraseña"
                      v-model="password"
                      required
                    />
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button class="button is-primary is-fullwidth">Login</button>
                  </div>
                </div>
              </form>
              <p class="has-text-centered">
                ¿No tienes cuenta?
                <router-link to="/register">Regístrate aquí</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>  

<script>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Importamos router para redirigir

export default {
  setup() {
    const authStore = useAuthStore(); // Usamos el store de autenticación
    const router = useRouter(); // Para manejar la redirección

    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const handleLogin = async () => {
      try {
        // Llamar a la función de login del store
        await authStore.login(email.value, password.value);

        // Redirigir al dashboard tras login exitoso
        router.push('/dashboard');
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        errorMessage.value = 'Credenciales inválidas, por favor intenta nuevamente.';
      }
    };

    return {
      email,
      password,
      handleLogin,
      errorMessage,
    };
  },
};
</script>


<style scoped>
.section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.box {
  border-radius: 10px;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  color: #363636;
}

input.input {
  font-size: 1rem;
}

button.button {
  font-size: 1.2rem;
}

.has-text-centered {
  margin-top: 1rem;
}
</style>