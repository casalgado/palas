<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/dashboard">Dashboard</RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
nav {
  padding: 1rem;

  a {
    font-weight: bold;
    color: var(--background-blue);
    text-decoration: none;
    margin: 0 0.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: var(--light-blue);
    }

    &.router-link-exact-active {
      color: var(--dark-blue);
    }
  }
}
</style>
