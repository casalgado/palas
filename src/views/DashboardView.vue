<script setup>
import { ref } from "vue";
import axios from "axios";

const apiKey = ref("");
const prompt = ref("");
const generatedText = ref("");
const loading = ref(false);
const error = ref(null);

const generateText = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.post(
      "/api/v1/chat/completions", // Updated URL to use the proxy
      {
        model: "claude-3-sonnet-20240229",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt.value }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey.value,
          "anthropic-version": "2023-06-01",
        },
      }
    );

    generatedText.value = response.data.choices[0].message.content;
  } catch (err) {
    error.value = err.response ? err.response.data.error : err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <h2>Anthropic API Text Generation</h2>
    <div>
      <label for="api-key">API Key:</label>
      <input
        id="api-key"
        v-model="apiKey"
        type="password"
        placeholder="Enter your Anthropic API key"
      />
    </div>
    <div>
      <label for="prompt">Prompt:</label>
      <textarea
        id="prompt"
        v-model="prompt"
        placeholder="Enter your prompt here"
      ></textarea>
    </div>
    <button @click="generateText" :disabled="loading || !apiKey || !prompt">
      Generate Text
    </button>

    <div v-if="loading">Generating...</div>
    <div v-if="error" class="error">Error: {{ error }}</div>
    <div v-if="generatedText">
      <h3>Generated Text:</h3>
      <p>{{ generatedText }}</p>
    </div>
  </div>
</template>

<style scoped>
div {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input,
textarea {
  width: 100%;
  padding: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.error {
  color: red;
}
</style>
