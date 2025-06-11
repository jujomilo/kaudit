<template>
  <header class="header">
    <div class="user-info">
      <img :src="user?.photoURL || '/default-avatar.png'" alt="Foto de perfil" class="profile-pic">
      <span class="user-email">Bienvenido, {{ user?.email }}</span>
    </div>

    <!-- 🔥 Agrupamos los botones en un div -->
    <div class="button-group">
     
      <router-link to="/edit-profile" class="edit-profile-button">Editar Perfil</router-link>
      
      <router-link to="/wall" class="edit-profile-button">
  🧱  Ver Muro
      </router-link>


       <!-- Enlace a la vista de SuperUsuario (sólo si el usuario es superusuario)-->
       <router-link v-if="isSuperUser" to="/superuser" class="edit-profile-button">Panel Admin</router-link>
      
      <!-- 🔥 Botón solo visible si el usuario es superusuario -->
      <router-link v-if="isSuperUser" to="/create-audit" class="edit-profile-button">
        ➕ Crear Auditoría
      </router-link>

      <button @click="logout" class="logout-button">Cerrar sesión</button>

    </div>
  </header>
</template>


  
<script>
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification"; // Importamos el notificador
// Importaciones para saber si el usuario es superusuario
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
  name: 'HeaderDashboardComponent',
  setup() {
    const auth = getAuth();
    const router = useRouter();
    const toast = useToast();
    
    const user = ref(null);
    // Variable para saber si el usuairo es superusuario, falsa en inicio 
    const isSuperUser = ref(false);

    // Verificar estado del usuario al montar el componente
    onMounted(() => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          user.value = {
            email: currentUser.email || 'Usuario', // Mostrar email
            photoURL: currentUser.photoURL || '/default-avatar.png', // Imagen por defecto si no tiene foto
          };
          // Consultar Firestore para verificar si el usuario es superuser
          try{
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if(userDoc.exists() && userDoc.data().role === "superuser") {
              isSuperUser.value = true; // Si es super usuario activamos al variable para que se muestre el botón de acceos a admin panel
            }
          } catch(error) {
            console.error("Error al obtener el rol del usuario:", error);
          }

        } else {
          router.push('/login'); // Redirigir al login si no hay usuario
        }
      });
    });

    // Función para cerrar sesión
    const logout = async () => {
      try {
        await signOut(auth); // Cerrar sesión en Firebase
        toast.success("Has cerrado sesión");
        router.push('/login'); // Redirigir al login
      } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
      }
    };

    return {
      user,
      logout,
      isSuperUser, // 🔥 Retornar esta variable para que Vue la use en el template
    };
  },
};
</script>

  
<style scoped lang="scss">
@import '@/styles/main.scss'; /* Asegúrate de importar las variables */

/* 🔥 Estilo del header */
.header-dashboard {
  margin: 0;
  padding: 0.8rem 1.5rem;
  border-radius: 15px;
  background: $gray-800;
  box-shadow: $box-shadow-light, $box-shadow-dark;
  display: flex;
  justify-content: space-between; /* Separar texto y botones */
  align-items: center; /* Centrar verticalmente todos los elementos */
  width: 100%;
  flex-wrap: wrap; /* 🔥 Permite que los elementos bajen en pantallas pequeñas */
}

/* 🔥 Grupo de botones */
.button-group {
  display: flex;
  gap: 10px; /* Espaciado entre los botones */
  flex-wrap: wrap; /* 🔥 Permite ajuste en móvil */
  justify-content: center;
}

/* 🔥 Estilo del título */
.title {
  font-size: 0.9rem;
  font-family: 'Orbitron', sans-serif;
  color: $orange-highlight;
  text-shadow: 1px 1px 2px $gray-900, -1px -1px 2px $gray-500;
  margin: 0;
  padding: 0 0.5rem;
  line-height: 1.5;
}

/* 🔥 Botón de cerrar sesión */
.logout-button {
  margin: 10px;
  padding: 0.5rem;
  font-size: 0.8rem;
  border: none;
  border-radius: 10px;
  background: $orange-highlight;
  box-shadow: 2px 2px 5px rgba(233, 84, 32, 0.4), -2px -2px 5px rgba(255, 133, 85, 0.2);
  color: #fff;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  transition: all 0.3s ease;
  line-height: 1.5;
}

.logout-button:hover {
  box-shadow: inset 3px 3px 5px rgba(233, 84, 32, 0.4), inset -3px -3px 5px rgba(255, 133, 85, 0.3);
  cursor: pointer;
}

/* 🔥 Usuario e imagen */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  flex-wrap: wrap; /* 🔥 Permite que en móvil la imagen no rompa el diseño */
}

.profile-pic {
  width: 70px;
  height: 70px;
  border-radius: 12%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.user-email {
  font-size: 13px;
}

/* 🔥 Botón Editar Perfil */
.edit-profile-button {
  margin: 10px;
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 40px;
  transition: background 0.3s ease, color 0.3s ease;
}

.edit-profile-button:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* 🔥 Ajustes para pantallas pequeñas */
@media (max-width: 768px) {
  .header-dashboard {
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .user-info {
    flex-direction: column;
    text-align: center;
  }

  .button-group {
    width: 100%;
    justify-content: center;
    margin-top: 10px;
  }

  .edit-profile-button,
  .logout-button {
    width: 100%; /* 🔥 Botones ocupan toda la pantalla en móvil */
    text-align: center;
  }

  .profile-pic {
    width: 60px;
    height: 60px;
  }

}
</style>

  
  
  
  