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
  
  export default {
    components: {
      HeaderDashboardComponent,
      FooterComponent,
      TaskListComponent,
    },
    data() {
    return {
      tasks: [
        {
          id: 1,
          fecha: "2025-01-15",
          turno: "T",
          equipo: "2",
          responsable: "Jefe EQ1",
          descripcion: "Revisar entrada de soldadora",
          plazo: "2025-01-20",
        },
        {
          id: 2,
          fecha: "2025-01-16",
          turno: "M",
          equipo: "3",
          responsable: "Jefe EQ2",
          descripcion: "Comprobar salida de proceso",
          plazo: "2025-01-21",
        },
      ],
    };
  },

  methods: {
    completeTask(taskId) {
       // Marcar como completada (esto será reemplazado por lógica con Firestore)
       this.tasks = this.tasks.filter((task) => task.id !== taskId);

      // Aquí podríamos actualizar Firestore:
      // firestore.collection("tasks").doc(taskId).update({ status: "completada" });
      console.log(`Tarea con ID ${taskId} marcada como completada`);
    }
  }
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
  