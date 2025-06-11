<template>
  <div class="task-card" @click="goToDetail">
    <h3>{{ task.title }}</h3>
    <p v-if="task.deadline">📅 Fecha límite: {{ task.deadline }}</p>
    <p>Estado: <Strong :class="task.status">{{ task.status }}</Strong></p>
  </div>
</template>

<script>
export default {
    name: 'TaskCard',
    props: {
        task: {
            type: Object,
            required: true
        }
    },

    methods: {
        goToDetail() {
            this.$router.push({ name: 'TaskDetail', params: { id: this.task.id}})
        }
    }
}
</script>

<style scoped>
 .task-card {
    cursor: pointer;
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid #444; /* ✅ Borde sutil */
    background: #1e1e1e;
    margin-bottom: 1rem;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
    transition: transform 0.2s ease;
 }
 .task-card:hover {
  transform: scale(1.02);
}
.task-card strong.active {
  color: #00ff99;
}
.task-card strong.completed {
  color: #888;
  text-decoration: line-through;
}

</style>