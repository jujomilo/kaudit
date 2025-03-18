<template>
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5">
            <div class="box">
              <h1 class="title has-text-centered">Registrarse</h1>
              <form @submit.prevent="handleRegister">
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

                <!-- NUEVO: Input para subir imagen -->
              <div class="field">
                <label class="label" for="profilePicture">Foto de perfil:</label>
                <div class="control">
                  <input
                    class="input"
                    type="file"
                    id="profilePicture"
                    @change="handleFileChange"
                    accept="image/*"
                  />
                </div>
              </div>

                <div class="field">
                  <div class="control">
                    <button class="button is-primary is-fullwidth">
                      Registrarse
                    </button>
                  </div>
                </div>
              </form>
              <p class="has-text-centered">
                ¿Ya tienes cuenta?
                <router-link to="/login">Inicia sesión aquí</router-link>
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
  import { useRouter } from 'vue-router'; // Importamos el router para redirecciones y enlaces
  import { useToast } from "vue-toastification"; // Importamos el notificador
  import { getAuth } from "firebase/auth";

  export default {
    setup() {
      const authStore = useAuthStore();
      const router = useRouter(); // Guardamos router enuna constante lista para usar
      const toast = useToast();
      const email = ref('');
      const password = ref('');
      // referencia para la foto de usuario
      const profilePicture = ref(null); // Aseguramos que la referencia existe

      const handleFileChange = (event) => {
      const file = event.target.files[0];

      if (!file) {
        toast.error("No se seleccionó ningún archivo.");
        return;
      }

      // 🔥 Validación de tamaño (máx 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB en bytes
      if (file.size > maxSize) {
        toast.error("La imagen es demasiado grande. Elige una de máximo 2MB.");
        return;
      }

      profilePicture.value = file; // ✅ Solo asignamos la imagen si pasa la validación
      };



      const handleRegister = async () => {
        try {
          await authStore.register(email.value, password.value, profilePicture.value);
          // Mostrar notificación de éxito
          const auth = getAuth();
          console.log("Usuario autenticado después del registro:", auth.currentUser); // ✅ Verifica si Firebase asigna el usuario
          toast.success("¡Registro exitoso! 🎉");
          // redirigir al login después del registro exitoso
          router.push('/login');
        } catch (error) {
          console.error('Error al registrarse:', error.message);
          toast.error("Error al registrarse inténtalo de nuevo.");

        }
      };
  
      return {
        email,
        password,
        profilePicture, // añadimos la referencia para la imagen
        handleFileChange,
        handleRegister,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Los estilos son idénticos al Login */
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
  