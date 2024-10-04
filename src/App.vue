<template>
  <TheHeader />
  <main class="main-content">
    <RouterView />
  </main>
  <TheFooter />
</template>

<script setup>
import TheFooter from "./components/templates/TheFooter.vue";
import TheHeader from "./components/templates/TheHeader.vue";
</script>

<style scoped>
.main-content {
}
</style>
