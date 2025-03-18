<template>
  <section class="section">
    <div class="container is-fluid">
      <!-- Barra superior -->
      <HeaderDashboardComponent class="header-dashboard" />

      <!-- Contenido principal del dashboard -->
      <div class="content-dashboard">
        <h1 class="title has-text-light">Auditorías Pendientes</h1>

        <!-- Lista de tareas -->
        <TaskListComponent
         :tasks="tasks"
         @complete-task="completeTask" 
          />
      </div>
    </div>
    <FooterComponent />
  </section>
</template>
  
  
  <script>
  import HeaderDashboardComponent from '@/components/HeaderDashboardComponent.vue';
  import FooterComponent from '@/components/FooterComponent.vue';
  import TaskListComponent from "@/components/TaskListComponent.vue";

  // Importaciones para acceder a la colección y documentos de Firestore
  import { ref, onMounted } from "vue";
  import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
  import { db } from "@/firebase";


  export default {
    components: {
      HeaderDashboardComponent,
      FooterComponent,
      TaskListComponent,
    },
    
    setup() {
    const tasks = ref([]); // Almacenar las tareas

    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        tasks.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Tareas obtenidas:", tasks.value);
      } catch (error) {
        console.error("Error obteniendo las tareas:", error);
      }
    };

    // ejecuta la función fetchTasks cuando el componente es montado
    // esto carga las tareas desde Firestore y las almacena en la variable tasks
    onMounted(() => {
      fetchTasks();
    });

    /*
    - Función que se llama cuando una tarea es completada
    - Filtra el array tasks.value para eliminar la tarea con el ID correspondiente (taskId)
    */
    const completeTask = async (taskId) => {
  try {
    // Referencia al documento en Firestore
    const taskRef = doc(db, "tasks", taskId);

    // Actualizamos el campo `status` a "completed"
    await updateDoc(taskRef, { status: "completed" });

    // Filtramos la tarea localmente para actualizar la UI
    tasks.value = tasks.value.filter((task) => task.id !== taskId);

    console.log(`Tarea con ID ${taskId} marcada como completada en Firestore`);
  } catch (error) {
    console.error("Error actualizando la tarea en Firestore:", error);
  }
};

     // Expone tasks y completeTask al template del componente:
    return {
      tasks,
      completeTask,
    };
  },
};

</script> 
  
  <style scoped>
  .container {
    margin: 0 auto;
    padding: 1rem;
  }
  
  .content-dashboard {
    margin-top: 1rem;
    text-align: center;
    font-size: 1rem;
    color: #aaa; /* Texto más claro */
  }
  
  .section {
    background-color: #1c1c1c; /* Fondo oscuro */
    color: #fff; /* Texto blanco */
    min-height: calc(100vh - 60px); /* Ajusta según el tamaño del footer */
  }
  
  .header-dashboard {
  margin: 0; /* Elimina el margen */
  padding: 0; /* Elimina el padding */
  width: 100%; /* Asegura que ocupe todo el ancho */

  .title {
  text-align: center;
}



}
  </style>
  
  