<template>
  <div>
  <!-- Encabezado-->
   <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <span class="navbar-item">KAUDIT</span>
  <!-- Burguer button-->
   <a
   role = "button"
   class = "navbar-burger"
   :class = "{ 'is-active' : isActive }"
   aria-label = "menu"
   aria-expanded = "false"
   @click = "toggleMenu"
   >
   <span aria-hidden="true"></span>
   <span aria-hidden="true"></span>
   <span aria-hidden="true"></span>
   </a>
  </div>
  <!-- Menu -->
  <div class="navbar-menu" :class="{ 'is-active': isActive }">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Inicio</router-link>
          <router-link class="navbar-item" to="/login">Login</router-link>
          <a class="navbar-item" href="#">Registrarse</a>
        </div>
      </div>
    </nav>   
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
    
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="scss">

.navbar {
  background-color: $gray-800; // Fondo de la barra de navegación
  padding: 1rem;

  .navbar-item {
    font-weight: bold;
    color: white;

    &:hover {
      color: $orange-highlight; // Naranja del logo
    }
  }
}
</style>