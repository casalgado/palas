<script setup>
import { ref, onMounted } from "vue";
import { test_data } from "../lib/external_data";

// Create refs to store data, loading, and error states
const data = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(() => {
  test_data
    .then((result) => {
      data.value = result;
    })
    .catch((err) => {
      error.value = "Failed to load data";
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<template>
  <section>
    <div class="data-container">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <pre>{{ data }}</pre>
        <!-- Displaying data as JSON for demo purposes -->
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}

.data-container {
}
</style>
