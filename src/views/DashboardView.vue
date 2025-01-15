<template>
    <section class="section">
      <div class="container is-fluid">
        <!-- Barra superior -->
        <HeaderDashboardComponent />
  
        <!-- Contenido del dashboard -->
        <div class="content-dashboard">
          <p>Aquí se mostrará el contenido del dashboard más adelante.</p>
        </div>
      </div>
    </section>
  </template>
  
  
  <script>
  import HeaderDashboardComponent from '@/components/HeaderDashboardComponent.vue';
  
  export default {
    components: {
      HeaderDashboardComponent,
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin: 0 auto;
    padding: 1rem;
  }
  
  .content-dashboard {
    margin-top: 3rem;
    text-align: center;
    font-size: 1.25rem;
    color: #aaa; /* Texto más claro */
  }
  
  .section {
    background-color: #1c1c1c; /* Fondo oscuro */
    color: #fff; /* Texto blanco */
    min-height: 100vh; /* Asegurar altura completa */
  }
  
  header {
    margin-bottom: 2rem;
  }
  </style>
  