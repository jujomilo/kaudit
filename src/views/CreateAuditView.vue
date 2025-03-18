<template>
  <section class="section">
  <div class="container">
    <h1 class="title has-text-light">Crear Nueva Auditoría</h1>

    <form @submit.prevent="createAudit">
      <!-- 🔹 Título de la auditoría -->
      <div class="field">
        <label class="label">Título</label>
        <input v-model="title" type="text" class="input" placeholder="Ejemplo: Inspección de seguridad" required>
      </div>

     <!-- 🔹 Descripción de la auditoría -->
      <div class="field">
        <label class="label">Descripción</label>
        <textarea v-model="description" class="textarea" placeholder="Explica qué debe hacerse en esta auditoría" required></textarea>
      </div>

      <!-- 🔹 Fecha límite -->
      <div class="field">
        <label class="label">Fecha Límite</label>
        <input v-model="deadline" type="date" class="input" required />
      </div>
     
      <!-- 🔹 Selección de usuarios -->
       <div class="field">
        <label class="label">Asignar Usuario</label>
        <div class="select is-fullwidth">
            <select v-model="assignedUser" required>
                <option value="" disable>Selecciona un usuario</option>
                <option v-for="user in users" :key="user.uid" :value="user.uid">
                    {{ user.email }}
                </option>
            </select>
        </div>
       </div>

       <!-- 🔹 Botón de enviar -->
        <div class="field">
            <button type="submit" class="button is-primary">Guardar Auditoría</button>
        </div>
    </form>
  </div>
  </section>
</template>

<script>
// Importaciones necesarias
import { ref, onMounted } from "vue";
import { getAuth } from "firebase/auth";                          // autenticación
import { collection, getDocs, addDoc } from "firebase/firestore"; // acceso a colecciones y documentos de Firestore
import { db } from "@/firebase";                                  // acceso a la base de datos 
import { useToast } from "vue-toastification";                    // Toast para mensajes
import { useRouter } from "vue-router";                           // Acceso al router

export default {
    name: "CreateAuditView",
    setup() {
        const title = ref("");  // ref("") está vacío al inicio porque queremos que la variable empiece vacía y luego cambie cuando el usuario interactúe con ella.
        const description = ref("") // es decir son variablesREACTIVAS y tomarán valor cuando el usar rellene el campo asociado.
        const deadline = ref("");
        const assignedUser = ref("");
        const users = ref([]); // Lista de usuarios disponibles (una variable reactiva puede ser un objeto, un array etc)
        const auth = getAuth();
        const toast = useToast();
        const router = useRouter();

        // Cargar la lista de usuarios en Firestore filtrando solo los usarios con el role de user
        const fetchUsers = async () => {
            try {
                // creamos la consulta y la gardamos en una constante
                const querySnapshot = await getDocs(collection(db, "users")); // querySnapshot.docs devuelve un array con todos los documentos.
                users.value = querySnapshot.docs.map(doc => ({               // .map(doc => ({ ... })) recorre cada documento y extrae sus datos.Transformamos los documentos en un array de usuarios
                    uid: doc.id,                                             // Guarda el uid del usuario (ID del documento en Firestore)
                    ...doc.data(),                                           //  Extrae los campos del documento y los agrega al objeto.
                }))

                .filter((user) => user.role === "user");                     // Filtrar solo usuraios con role user 

            } catch(error) {
               console.error("Error obteniendo usuarios: ", error);
            }
        };

        onMounted(fetchUsers);                                                // Al montar la vista ejecutamos la función fetchUsers

        // 🔥 Función para crear la auditoría en Firestore
        const createAudit = async () => {
            if (!title.value || !description.value || !deadline.value || !assignedUser.value) {
                toast.error("Todos los campos son obligatorios");
                return;
            }

            // Creamos la Auditoría y la colección auditsTemplates, con los datos obtenidos, en la función fetchusers usando el método de firebase addDoc
            // Observa que todos estos valores a la derecha son las variables reactivas en el setup() que se han llenado con los valores dados por el usuario
            try {
              await  addDoc(collection(db, "auditsTemplates"), {
                title: title.value,
                description: description.value,
                assignedTo: assignedUser.value,
                createdBy: auth.currentUser.uid,
                // variables añadidas
                status: "active",
                deadline: deadline.value,
                createdAt: new Date()
              });

              // Si todo ha salido bien mensaje de éxto y redireccionado de usuario a su dashboard
              toast.success("Auditoría creada con éxito");
              router.push("/dashboard");
            }catch (error) {
              console.error("Error al guardar la auditoría: ", error); // depuración
              toast.error("Error al guardar la auditoría"); 
            }
        };

        // exponemos las variables al template
        return {
            title,
            description,
            deadline,
            assignedUser,
            users,
            createAudit // función
        };
    }
};
</script>

<style scoped lang="scss">
@import '@/styles/main.scss';

.section {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  background: $gray-800;
  border-radius: 10px;
  box-shadow: $box-shadow-light;
}

.input, .textarea, .select select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
}

.button {
  width: 100%;
  margin-top: 1rem;
}
</style>