<script setup>
import UserCard from "../components/home/UserCard.vue";
</script>

<template>
  <section>
    <h1>Home</h1>
    <p>Welcome to the Home page</p>
    <div class="card-container">
      <UserCard
        :user="{
          firstName: 'John',
          lastName: 'Doe',
          jobDescription: 'Software Developer',
          totalBalance: 10000,
        }"
      />
    </div>
  </section>
</template>

<style scoped>
.card-container {
  display: flex;
  gap: 16px;
  margin-top: 30px;
}
</style>
