<template>
  <div class="wall-post">

    <!-- Mostrar autor del post -->
<div v-if="author" class="post-author">
  <img
    v-if="author.photoURL"
    :src="author.photoURL"
    alt="Avatar"
    class="author-avatar"
  />
  <span class="author-name">{{ author.displayName || author.email }}</span>
</div>

    <p><strong>Zona:</strong> {{ post.zone }}</p>
    <p><strong>Turno:</strong> {{ post.shift }}</p>
    <p><strong>Comentario:</strong> {{ post.comment }}</p>

    <div v-if="post.imageUrls && post.imageUrls.length > 0">
      <p><strong>Imágenes:</strong></p>
      <div class="images">
        <img class="images"
          v-for="(url, index) in post.imageUrls"
          :key="index"
          :src="url"
          alt="Imagen de auditoría"
        />
      </div>
    </div>

    <!-- ❤️ BOTÓN DE LIKE -->
    <div class="like-section">
      <button 
        class="like-button" 
        @click="likePost"
        :disabled="alreadyLiked"
      >
        {{ alreadyLiked ? "✅ Votado" : "❤️ Me gusta" }}
      </button>
      <span class="like-count">{{ post.likes }} like{{ post.likes === 1 ? '' : 's' }}</span>
    </div>
  </div>
</template>

<script setup>
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase";
import { computed, ref, onMounted } from "vue";

// Props
// eslint-disable-next-line no-undef
const props = defineProps({
  post: Object
});

// Usuario actual
const auth = getAuth();
const currentUser = auth.currentUser;

// Control de likes
const alreadyLiked = computed(() => {
  if (!props.post.likedBy || !currentUser) return false;
  return props.post.likedBy.includes(currentUser.uid);
});

// Acción de like
async function likePost() {
  if (!currentUser) {
    console.error("Usuario no autenticado");
    return;
  }

  if (alreadyLiked.value) {
    console.log("Ya has dado like a este post");
    return;
  }

  try {
    const postRef = doc(db, "wallPosts", props.post.id);
    await updateDoc(postRef, {
      likes: increment(1),
      likedBy: arrayUnion(currentUser.uid)
    });

    console.log("❤️ Like registrado correctamente");
  } catch (error) {
    console.error("Error al dar like:", error);
  }
}

// Cargar datos del autor del post
const author = ref(null);

onMounted(async () => {
  if (!props.post.userId) return;

  try {
    const userRef = doc(db, "users", props.post.userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      author.value = userSnap.data();
    }
  } catch (error) {
    console.error("Error al cargar autor del post:", error);
  }
});
</script>


<style scoped>
.wall-post {
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
  color: #eee;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.wall-post strong {
  color: #ff914d;
}

.wall-post p {
  margin: 0.2rem 0;
  text-align: left;
  width: 100%;
}

.images {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1rem 0;
}

.post-image {
  display: block;
  max-width: 90%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 6px;
  border: 1px solid #444;
  margin: 0 auto;
}

.like-section {
  width: 100%;
  border-top: 1px solid #444;
  margin-top: 1rem;
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.like-button {
  background: #ff3366;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
}

.like-button:hover:not(:disabled) {
  background: #ff1f57;
}

.like-button:disabled {
  background: #444;
  color: #ccc;
  cursor: not-allowed;
}

.like-count {
  font-size: 0.9rem;
  color: #bbb;
}

.post-author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #666;
}

.author-name {
  color: #ccc;
  font-size: 0.9rem;
}



</style>
