<template>
  <section>
    <Form
      v-if="!store.userSignedIn"
      ref="formObject"
      @submit="handleSubmit"
      :validation-schema="schema"
    >
      <div class="card input-card">
        <h4>Email</h4>
        <Field class="clean-border" name="email" />
        <ErrorMessage name="email" />
        <h4>Contraseña</h4>
        <Field class="clean-border" name="password" type="password" />
        <ErrorMessage name="password" />
      </div>

      <div class="card input-card">
        <TheButton :text="'Registro'" />
      </div>
    </Form>
    <div v-if="store.userSignedIn" class="card input-card">
      <TheButton :text="'Cerrar Sesión'" @btnClick="signOutUser" />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "../../stores/cartStore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import TheButton from "@/components/TheButton.vue";

const schema = yup.object({
  email: yup.string().email().required("debe incluir email"),
  password: yup.string().required("debe incluir contraseña").min(6),
});

const auth = getAuth();
const store = useCartStore();

const authStatus = ref("No Auth Status");

function handleSubmit(values) {
  signIn(values.email, values.password);
}

function signIn(email, password) {
  const username = email.split("@")[0];
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      localStorage.setItem("AuthToken", user.accessToken);
      localStorage.setItem("username", username);
      store.updateUserAuth(true);
      authStatus.value = "Authorized";
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = error.message;
      authStatus.value = errorMessage;
    });
}

function signOutUser() {
  signOut(auth)
    .then(() => {
      authStatus.value = "Unauthorized";
      localStorage.setItem("AuthToken", null);
      localStorage.setItem("username", null);
      store.updateUserAuth(false);
    })
    .catch((error) => {
      authStatus.value = error.message;
    });
}

/**

sendRequest: function () {
      if (auth.currentUser) {
        auth.currentUser
          .getIdToken() // 'true' here forces refresh of the token
          .then((idToken) => {
            this.user = idToken;
            server({
              method: "get",
              url: "/",
              headers: {
                AuthToken: idToken,
              },
            })
              .then((res) => {
                this.response = res.data.message;
              })
              .catch((error) => {
                this.response = error;
              });
          })
          .catch((error) => {
            this.response = "Error getting auth token";
          });
      } else {
        server({
          method: "get",
          url: "/",
        })
          .then((res) => {
            this.response = res.data.message;
          })
          .catch((error) => {
            this.response = error;
          });
      }
    },
 */
</script>

<style scoped></style>
