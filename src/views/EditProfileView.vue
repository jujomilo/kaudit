<template>
    <section class="section">
      <div class="container">
        <h1 class="title has-text-light">Editar Perfil</h1>
  
        <div class="profile-edit">
          <!-- La imagen está dentro de un label para que al hacer clic se abra el input -->
          <label for="fileInput">
            <img :src="user?.photoURL || '/default-avatar.png'" alt="Foto de perfil" class="profile-pic">
          </label>

          <!-- Input oculto para seleccionar imagen -->
          <input 
            id="fileInput"
            type="file" 
            @change="uploadImage" 
            accept="image/*" 
            class="file-input"
          >

          <!-- Asegurar que el botón NO está dentro del label -->
        <div class="button-container">
          <button @click="saveProfile($event)" type="button" class="save-button">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
  

<script>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'vue-router'; // Importamos Vue Router
import { useToast } from "vue-toastification"; // Importamos el notificador

export default {
    name: "EditProfile",
    setup(){
        const router = useRouter(); // Inicializamos el router
        const auth = getAuth();
        const storage = getStorage();
        const toast = useToast();
        
        // Variables para guardar el usuario conectado y la nueva imagen
        const user = ref(null);
        const newImage = ref(null);

        // Obtener los datos del usuario autenticado
        onMounted(() => {
            onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                    user.value = {
                      email: currentUser.email,
                      photoURL: currentUser.photoURL || '/default-avatar.png',
                    };
                }
            });
        });

        // Función para seleccionar la nueva imagen
        const uploadImage = (event) => {
        event.stopPropagation(); // Evita que el evento suba al label
        event.preventDefault();  // Previene comportamiento inesperado
        console.log("Seleccionando imagen..."); // 🔍 Depuración

        const file = event.target.files[0];

         if (!file) {
            toast.error("No se seleccionó ningún archivo.");
            return;
          }

          // 🔥 Validación de tamaño (máx 2MB)
          const maxSize = 2 * 1024 * 1024; // 2MB en bytes
          if(file.size > maxSize)
          {
             toast.error("La imagen es demasiado grande. Elige una de máximo 2MB.");
             return;
          }

          newImage.value = file;
        };


        // Función para guardar la nueva imagen en Firebase Storage y actualizar el perfil
        const saveProfile = async (event) => {
            event.preventDefault(); // Evita que el click se propague
            event.stopPropagation(); // Detiene cualquier otro evento que pueda interferir

            if (!newImage.value) {
                toast.error("Selecciona una imagen primero");
                return;
            }

            try {
                const userId = auth.currentUser.uid; // Obtener el UID del usuario
                const imageRef = storageRef(storage, `profilePictures/${userId}/profile.jpg`); // 🔥 Siempre usa el mismo nombre (Machacar foto antigua)
                // 🔥 Subir y sobrescribir la imagen anterior
        await uploadBytes(imageRef, newImage.value);
        const imageUrl = await getDownloadURL(imageRef);
        
        // 🔥 Actualizar la foto en el perfil del usuario
        await updateProfile(auth.currentUser, { photoURL: imageUrl });

        // 🔥 Actualizar la foto en la vista
        user.value.photoURL = imageUrl;
        toast.success("Imagen actualizada correctamente");

        // 🔥 Redirigir al Dashboard después del éxito
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);

            } catch (error) {
                console.error("Error al subir la imagen:", error);
                toast.error("Error al subir la imagen.");
            }
        };

        return { user, uploadImage, saveProfile };
    }
};
</script>

<style scoped>
.profile-edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
}

.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.file-input {
    display: none !important; /* 🔥 Evita que interfiera */
  pointer-events: none; /* 🔥 Evita clics accidentales */
  padding: 10px;
  background: white;
  border-radius: 8px;
}

.save-button {
  background: orange;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}
</style>