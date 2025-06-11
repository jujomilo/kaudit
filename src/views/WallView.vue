<template>
    <div class="wall-view">
      <HeaderDashboardComponent />
  
      <main class="container">
        <h1>Muro de actuaciones</h1>
  
        <div v-if="wallPosts.length === 0" class="empty-wall">
          <p>No hay publicaciones todavía.</p>
          <p>Aquí aparecerán las actuaciones con observaciones y fotos en tiempo real.</p>
        </div>

        <WallPost
          v-for="post in wallPosts"
          :key="post.id"
          :post="post"
        />

      </main>

      <FooterComponent />
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import HeaderDashboardComponent from "@/components/HeaderDashboardComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import WallPost from "@/components/WallPost.vue";

const wallPosts = ref([]);

onMounted(() => {
  const q = query(
    collection(db, "wallPosts"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snapshot) => {
    wallPosts.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("📸 Nuevos posts:", wallPosts.value); // Verás esto si funciona
  });
});
</script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 1rem;
  }
  .empty-wall {
    text-align: center;
    color: #888;
    padding: 2rem;
  }
  </style>
  