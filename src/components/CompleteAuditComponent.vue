<template>
<div class="complete-form">
    <!-- Comentario -->
     <div class="field mt-4">
        <label for="" class="label has-text-light">Observaviones (opcional)</label>
        <textarea v-model="comment" class="textarea" placeholder="Describe cualquier acción o incidencia..."></textarea>
     </div>

     <!-- Subida de imágenes si hay comentario-->

     <!--Solo se muestra la subida si el comentario existe (eliminamos espacios en blanco con trim())-->
      <div class="field mt-4" v-if="comment.trim().length > 0">
        <label class="label has-text-light"> Subir imágenes (máximo 2)</label>
        <input type="file" accept="image/*" multiple @change="handleImageUpload" />
      </div>
      <!-- Botón de subida-->
       <button @click="markAsCompleted" class="button is-success met-4">
        Marcar como completada
       </button>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth } from "firebase/auth";
import { doc, deleteDoc, collection, addDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '@/firebase' // Instancia de la base de datos

// Props --> desde el componente padre TaskDetail.vue enviaremos la task (aún no lo hemos hecho) y la recibiremos en este componente hijo

/* eslint-disable no-undef */  // Sin estos ocmentarios no complila
const props = defineProps({
    task: Object
});

// Emits para notificar al padre cuando se complete (es decir el usuario hace click en el botón completar)
const emit = defineEmits(['completed']);
/* eslint-enable no-undef */ //  Esto no afecta en nada a la ejecución, simplemente le dice a ESLint que no proteste.

// Estados locales (variables reactivas para el comentario y las imágenes)
const comment = ref("");
const imageFiles = ref([]);

// Función para manejar archivos ()
function handleImageUpload(event) {
    const files = Array.from(event.target.files);  // Guardamos los archivos que vienen como array en una constante
    imageFiles.value = files.slice(0,2); // máximo 2 slice(principio, final)  -> posiciones 0 y 1
}

// Función principal
async function markAsCompleted() {
    if(!props.task) return; // Si no hay tarea salimos de la función
    // construimos la referencia de la tarea para modificarla, necesitamos la BBBB, la colección y el id del documento (que viene en la prop):
    const taskRef = doc(db, 'auditsTemplates', props.task.id);

    // Si no hay comentario elminamos la tarea de la base de datos
    if(!comment.value.trim()) {
        await deleteDoc(taskRef);
        emit("completed"); // Notifica al padre
        return;
    }

    // Subimos la imagen si hay 
    const storage = getStorage();
    const downloadURLs = [];

    for (let i = 0; i < imageFiles.value.length; i++) {
        const file = imageFiles.value[i];
        // Guardamosla imagen en el storage  componenmos su nombre de archiv, taskImages/id_de_la_tarea_numero
        const fileRef = storageRef(storage, `taskImages/${props.task.id}_${i}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);  // Guardamos la url del archivo subido
        downloadURLs.push(url);  // Guardo la url en el Array que contruí a tal efecto para subirlas luego en el update 
    } 

    // Actualizamos la tarea 
    await updateDoc(taskRef, {
        status: "completed",
        comment: comment.value.trim(),
        imageUrls: downloadURLs, // el array con las url de las imágenes
        completedAt: Timestamp.now()
    });

    // Llevar la tarea al wall
// Crear post en el muro
try {
  const auth = getAuth();

  const wallPostData = {
    taskId: props.task.id,
    userId: auth.currentUser.uid,
    comment: comment.value.trim(),
    imageUrls: downloadURLs,
    createdAt: Timestamp.now(),
    zone: props.task.zone || "No definida",
    shift: props.task.shift || "No definido",
    likes: 0,
    likedBy: []
  };

  console.log("🧪 Datos que se enviarán al wall:", wallPostData);

  await addDoc(collection(db, "wallPosts"), wallPostData); // << 🔥 Esto es lo que faltaba

  console.log("✅ WallPost creado correctamente");

} catch (error) {
  console.error("❌ Error al crear wallPost:", error);
}

 emit("completed"); // Notifica al padre (caso de imagenes y comentarios)
 
}
</script>

<style scoped>
.completion-form {
  background: #222;
  padding: 1.5rem;
  border-radius: 10px;
  margin-top: 2rem;
  color: #fff;
}
</style>
