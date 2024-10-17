<script setup>
import { ref, onMounted } from "vue";
import Anthropic from "@anthropic-ai/sdk";

const apiKey = ref(import.meta.env.VITE_ANTHROPIC_KEY);
const prompt = ref("");
const generatedText = ref("");
const loading = ref(false);
const error = ref(null);

let anthropic;

onMounted(() => {
  // Initialize Anthropic client when component mounts
  anthropic = new Anthropic({
    apiKey: apiKey.value,
    dangerouslyAllowBrowser: true,
  });
});

const generateText = async () => {
  if (!anthropic) {
    error.value =
      "Anthropic client not initialized. Please enter your API key.";
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt.value }],
    });

    generatedText.value = response.content[0].text;
  } catch (err) {
    error.value = err.message || "An error occurred";
    console.error("Full error:", err);
  } finally {
    loading.value = false;
  }
};

const updateApiKey = () => {
  anthropic = new Anthropic({
    apiKey: apiKey.value,
  });
};
</script>

<template>
  <div>
    <h2>Anthropic SDK Text Generation</h2>
    <div>
      <label for="api-key">API Key:</label>
      <input
        id="api-key"
        v-model="apiKey"
        type="password"
        placeholder="Enter your Anthropic API key"
        @input="updateApiKey"
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
