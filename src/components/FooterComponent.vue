<template>
  <footer class="footer">
    <div class="footer-content">
      <img src="@/assets/Arcelormittal-Logo.png" alt="Arcelormittal Logo" class="logo" />
      <nav class="footer-links">
        <a href="#about">Acerca de</a>
        <a href="#services">Servicios</a>
        <a href="#contact">Contacto</a>
        <a href="#privacy">Política de privacidad</a>
      </nav>
      <p class="copyright">
        © 2025 ArcelorMittal. Todos los derechos reservados.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss"; // Variables globales

.footer {
  background-color: $gray-800; // Más claro que $gray-900
  padding: 1.5rem 1rem;
  border-radius: 12px 12px 0 0;
  box-shadow: -8px -8px 16px rgba(255, 255, 255, 0.05), 8px 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: $gray-400; // Texto más claro para contraste

  .footer-content {
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo {
      height: 80px; // Reduce el tamaño del logo
      margin-bottom: 1rem;
    }

    .footer-links {
      margin: 1rem 0;

      a {
        color: lighten($orange-highlight, 15%); // Naranja más suave
        text-decoration: none;
        margin: 0 0.5rem;
        font-size: 0.9rem; // Texto más pequeño
        transition: color 0.3s;

        &:hover {
          color: lighten($orange-highlight, 25%);
        }
      }
    }

    .copyright {
      font-size: 0.75rem; // Texto más pequeño y sobrio
      color: $gray-500; // Texto más claro
      margin-top: 0.5rem;
    }
  }
}
</style>
