<template>
  <section class="section">
    <div class="container is-fluid">
      <!-- Barra superior -->
      <HeaderDashboardComponent class="header-dashboard" />

      <!-- Contenido principal del dashboard -->
      <div class="content-dashboard">
        <h1 class="title has-text-light">Auditorías Pendientes</h1>

        <!-- Lista de tareas -->
        <div v-if="audits.length > 0">
          <ul>
           <li v-for="audit in audits" :key="audit.id">
              <strong>{{ audit.title }}</strong>: {{ audit.description }}
           </li>
         </ul>
      </div>
<p v-else>No tienes auditorías pendientes en este momento.</p>

      </div>
    </div>
    <FooterComponent />
  </section>
</template>
  
  
<script>
import HeaderDashboardComponent from '@/components/HeaderDashboardComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';


// Importaciones de Firebase
import { ref, onMounted } from "vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase";

export default {
  components: {
    HeaderDashboardComponent,
    FooterComponent,

  },
  
  setup() {
    const audits = ref([]); // Almacena las auditorías del usuario autenticado
    const auth = getAuth();

    // Función para obtener auditorías asignadas al usuario autenticado
    const fetchAudits = async () => {
      if (!auth.currentUser) {
        console.error("No hay usuario autenticado");
        return;
      }

      try {
        const q = query(collection(db, "auditsTemplates"), where("assignedTo", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);

        audits.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Auditorías obtenidas:", audits.value);
      } catch (error) {
        console.error("Error obteniendo las auditorías:", error);
      }
    };

    // Ejecuta la función cuando el componente se monta
    onMounted(() => {
      fetchAudits();
    });

    return {
      audits,
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
  
  