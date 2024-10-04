<template>
  <TheHeader />
  <main class="main-content">
    <RouterView />
  </main>
  <TheFooter />
</template>

<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useCartStore } from "@/stores/cartStore.js";
import { useAuthStore } from "@/stores/authStore.js";
import TheFooter from "./components/templates/TheFooter.vue";
import TheHeader from "./components/templates/TheHeader.vue";

const store = useCartStore();
const authStore = useAuthStore();

function refreshToken() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      user.getIdToken(true).then((idToken) => {
        console.log("new token set");
        localStorage.setItem("AuthToken", idToken);
        store.updateUserAuth(true);
        authStore.updateUserAuth(true, idToken);
        console.log("logged in");
      });
      // ...
    } else {
      store.updateUserAuth(false);
      authStore.updateUserAuth(false, "");
      console.log("logged out");
    }
  });
}

onMounted(() => {
  localStorage.setItem("AuthToken", null);
  localStorage.setItem("username", "beto");
  store.loadCart();
  refreshToken();
});
</script>

<style scoped>
.main-content {
}
</style>
