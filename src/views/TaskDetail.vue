<template>
    <div v-if="task && task.title" class="task-detail">  <!--Al usar v-if="task && task.title", Vue no intenta acceder a nada hasta que esté definido.--> 
      <h1>{{ task.title }}</h1>
      <p><strong>Descripción:</strong> {{ task.description }}</p>
      <p v-if="task.deadline"><strong>Fecha límite:</strong> {{ task.deadline }}</p>
      <p><strong>Estado:</strong> {{ task.status }}</p>

      <CompleteAuditComponent
        v-if="task.status !== 'completed'" 
        :task="task"   
       @completed="handleCompletion"
       />


    </div>
    <div v-else>
      <p style="color: white;">Cargando auditoría...</p>
    </div>
  </template>
  

<script setup>  // 👉 “Estoy usando la Composition API en modo simplificado”.

// mporto el componente hijo CompleteAuditComponent
import CompleteAuditComponent from '@/components/CompleteAuditComponent.vue';

// Importamos funciones reactivas y de ciclo de vida de Vue
import { ref, onMounted } from 'vue';
// Importamos Vue Roter para acceder a los parámetros dela URL (como el ID de la tarea)
import { useRoute } from 'vue-router';
// Importamos funciones de Firestore para obtener y actualizar documentos
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

// route será un objeto con toda la info de la URL actual (params, query, etc)
const route = useRoute();

// task es una variable reactiva que almacenará los datos de la tarea
const task = ref(null);

// Esto simplemente actualiza la vista para que ya no se muestre el formulario tras completar la tarea.
function handleCompletion() {
  task.value.status = 'completed';
}


// Este bloque se ejecuta cuando el componente se monta en panatalla
onMounted(async () => {
    // Obtenemos el ID del la tarea desde la URL
    const id = route.params.id;

    // Creamos una referencia al documento en Firestore
    const taskRef = doc(db, 'auditsTemplates', id);

    // Intentamos obtener ese documento
    const taskSnap = await getDoc(taskRef);

    // Si el documento existe, guardamos sus datos en 'task'
    if(taskSnap.exists()) {

        task.value = {id, ...taskSnap.data()}
        /*
         Esto es un objeto combinado:
         {}: estamos creando un objeto nuevo
         id: crea una clave id con el valor que tenías
         ...taskSnap.data(): añade todas las claves del documento
        */

    } else {
        console.error("No se encontró la tarea");
    }
});
  
</script>

<style scoped>
.task-detail {
  padding: 2rem;
  background-color: #1e1e1e;
  border-radius: 10px;
  color: #fff;
  max-width: 600px;
  margin: 0 auto;
  text-align: left; /* ✅ Alínea el contenido a la izquierda */
}
button {
  margin-top: 1rem;
  background: #00ff99;
  color: #000;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  background: #00cc77;
}
</style>