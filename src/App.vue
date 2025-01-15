<template>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #121212; /* Fondo oscuro */
  color: #e0e0e0; /* Texto claro */
  min-height: 100vh; /* Asegura que ocupe toda la pantalla */
}

/* Navbar */
nav {
  background-color: #1e1e1e; /* Fondo del navbar */
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  a {
    font-weight: bold;
    color: #e0e0e0; /* Color claro para los enlaces */
    text-decoration: none;

    &:hover {
      color: #42b983; /* Resalta en verde al pasar el cursor */
    }

    &.router-link-exact-active {
      color: #42b983; /* Indica la página activa */
    }
  }
}

/* Sección central */
.section {
  padding: 2rem;
  background-color: #1a1a1a; /* Fondo un poco más claro para contraste */
  border-radius: 10px; /* Bordes suaves */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Sombra elegante */
}

/* Botones */
.button {
  background-color: #42b983;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;

  &:hover {
    background-color: #369b6a; /* Color más oscuro al pasar el cursor */
    transform: scale(1.05); /* Efecto de agrandamiento */
    transition: all 0.2s ease-in-out;
  }
}
</style>

