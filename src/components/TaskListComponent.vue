<template>
   <div class="task-list">
     <!-- Comprobar si hay tareas -->
     <div v-if="tasks && tasks.length">
       <div
         class="box task-item"
         v-for="task in tasks"
         :key="task.id"
       >
         <p>
           <strong>Fecha:</strong> {{ task.fecha }}
           <strong>Turno:</strong> {{ task.turno }}
         </p>
         <p>
           <strong>Equipo:</strong> {{ task.equipo }}
           <strong>Responsable:</strong> {{ task.responsable }}
         </p>
         <p>
           <strong>Descripción:</strong> {{ task.descripcion }}
         </p>
         <p>
           <strong>Plazo:</strong> {{ task.plazo }}
         </p>
         <!-- Botón de completar -->
          <button
          class="button is-success is-small"
          @click="markAsCompleted(task.id)"          
          >Completar
        </button>

       </div>
     </div>
 
     <!-- Mensaje si no hay tareas -->
     <div v-else class="no-tasks">
       <p>No tienes auditorías pendientes en este momento.</p>
     </div>
   </div>
 </template>
 
 <script>
 export default {
   props: {
     tasks: {
       type: Array,
       required: true,
     },
   },
   methods: {
     markAsCompleted(taskId) {
       // Emitimos un evento al componente padre con el ID de la tarea
       this.$emit("complete-task", taskId);
     },
   },
 };
 </script>
 
 <style scoped>
 .task-list {
   margin-top: 1rem;
 }
 
 .task-item {
   background: #2c2c2c;
   color: #fff;
   border-radius: 8px;
   padding: 1rem;
   margin-bottom: 1rem;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
 }
 
 .no-tasks {
   text-align: center;
   color: #888;
   font-style: italic;
 }

 button {
  margin-top: 1rem;
}
 </style>
 