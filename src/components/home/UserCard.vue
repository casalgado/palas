<template>
  <div class="user-card">
    <h2>{{ user.firstName }} {{ user.lastName }}</h2>
    <p>Job: {{ user.jobDescription }}</p>
    <p>Total Balance: {{ formatCurrency(user.totalBalance) }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Define the prop object
const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({
      firstName: "",
      lastName: "",
      jobDescription: "",
      totalBalance: 0,
    }),
  },
});

// Helper function to format the balance as currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
</script>

<style scoped>
.user-card {
  border: 1px solid #ccc;
  background-color: var(--color-white);
  border-radius: 8px;
  padding: 16px;
  max-width: 300px;
  box-shadow: var(--shadow-1);
}

h2 {
  margin: 0 0 8px 0;
}

p {
  margin: 4px 0;
}
</style>
