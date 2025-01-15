<template>
   <NavbarComponent />
      <!-- Cuerpo principal -->
      <section class="section">
      <div class="container has-text-centered">
        <h1 class="title">Auditorías Kamishibai rápidas y efectivas</h1>
        <p class="subtitle">Simplifica tus auditorías con KAUDIT.</p>
        <button class="button is-primary is-large">Comenzar ahora</button>
       <!-- <AuthTestComponent /> --> 
      </div>
    </section>
    <FooterComponent />
</template>


<script>
import NavbarComponent from "@/components/NavbarComponent.vue";  // Importación de componentes
import FooterComponent from "@/components/FooterComponent.vue";
// import AuthTestComponent from '@/components/AuthTestComponent.vue';

export default {
  name: "HomeView",
  data() {
    return {

    };
  },
  
  components: {
    NavbarComponent,
    FooterComponent,
    // AuthTestComponent // componente de prueba para la autenticación con Firebase
  },

  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    },
  },
};
</script>


<style lang="scss">
.section {
  background-color: $gray-850; // Fondo más claro que antes
  padding: 2rem 1.5rem; // Espaciado más compacto
  border-radius: 12px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3), -10px -10px 20px rgba(255, 255, 255, 0.07);

  .title {
    color: $orange-highlight; // Naranja ya definido
    font-size: 1.5rem; // Tamaño reducido
    font-weight: 500; // Peso más ligero
    text-align: center;
  }

  .subtitle {
    color: $gray-400; // Texto claro para contraste
    font-size: 0.9rem; // Más pequeño
    font-weight: 400; // Ligero
    text-align: center;
  }

  .button {
    margin-top: 1rem;
    padding: 0.5rem 1rem; // Botón más compacto
    font-size: 0.85rem; // Texto más pequeño
    font-weight: 500; // Peso más ligero
    color: $gray-900;
    background: lighten($orange-highlight, 10%);
    border: none;
    border-radius: 8px;
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.2), -6px -6px 12px rgba(255, 255, 255, 0.05);
    cursor: pointer;

    &:hover {
      background: lighten($orange-highlight, 20%);
      color: $gray-800;
    }

    &:active {
      box-shadow: inset 6px 6px 12px rgba(0, 0, 0, 0.3),
                  inset -6px -6px 12px rgba(255, 255, 255, 0.1);
    }
  }
}
</style>


