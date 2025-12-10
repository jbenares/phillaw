<template>
  <section class="pt-15 min-h-screen bg-green-900 flex items-center justify-center px-4">
    <transition name="slide-down">
      <div
        v-if="errorMessage"
        class="fixed top-4 left-1/2 transform -translate-x-1/2
        bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg
        z-50 text-sm animate-fade"
      >
        {{ errorMessage }}
      </div>
    </transition>

    <div
      class="w-full max-w-md backdrop-blur-lg sm:bg-white sm:shadow-xl sm:rounded-2xl p-6 sm:p-8"
    >
      <h1 class="text-3xl font-bold text-white sm:text-green-700 mb-2 text-center">
        Welcome Back
      </h1>

      <p class="text-green-100 sm:text-green-600 text-center mb-6">
        Login to your account
      </p>

      <div class="mb-4">
        <label class="block text-green-200 sm:text-green-700 mb-1">Email</label>
        <input
          type="email"
          v-model="email"
          @keyup="submitOnEnter"
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          placeholder="Enter your email"
        />
      </div>

      <div class="mb-6">
        <label class="block text-green-200 sm:text-green-700 mb-1">Password</label>
        <input
          type="password"
          v-model="password"
          @keyup="submitOnEnter"
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        @click="handleLogin"
        :disabled="loading"
        class="relative w-full py-3 bg-green-600 text-white rounded-lg font-semibold
        flex items-center justify-center overflow-hidden transition
        disabled:opacity-80 disabled:cursor-not-allowed"
      >
        <span :class="loading ? 'invisible' : 'visible'" class="transition-all duration-200">
          Login
        </span>

        <div v-if="loading" class="absolute inset-0 flex items-center justify-center space-x-1">
          <span class="w-2 h-2 bg-white rounded-full animate-bounce"></span>
          <span class="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-.2s]"></span>
          <span class="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-.4s]"></span>
        </div>
      </button>

      <p class="text-center text-sm text-green-100 sm:text-green-600 mt-4">
        Forgot your password?
        <a href="#" class="underline hover:text-green-200 sm:hover:text-green-700">Reset here</a>
      </p>
    </div>
  </section>

  <footer class="bg-white py-6 border-t">
    <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
      <p class="text-sm text-gray-500">&copy; 2025 AMS System. All rights reserved.</p>
      <div class="space-x-3 text-sm">
        <a href="#" class="text-gray-500 hover:text-green-600">Privacy</a>
        <a href="#" class="text-gray-500 hover:text-green-600">Terms</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

const handleLogin = () => {
  loading.value = true;
  errorMessage.value = "";

  setTimeout(() => {
    const lowerEmail = email.value.toLowerCase();

    if (!lowerEmail || !password.value) {
      errorMessage.value = "Please enter both email and password.";
    } else if (lowerEmail.includes("dean")) {
      router.push("/dean/dashboard");
    } else if (lowerEmail.includes("teacher")) {
      router.push("/teacher/dashboard");
    } else if (lowerEmail.includes("student")) {
      router.push("/student/dashboard");
    } else {
      errorMessage.value = "Account does not exist.";
    }

    // Auto-hide error after showing
    if (errorMessage.value) {
      setTimeout(() => {
        errorMessage.value = "";
      }, 3000);
    }

    loading.value = false;
  }, 1200);
};

const submitOnEnter = (e) => {
  if (e.key === "Enter") handleLogin();
};
</script>


