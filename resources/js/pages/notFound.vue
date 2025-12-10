<template>
  <section class="min-h-screen bg-green-900 flex items-center justify-center px-6">

    <div class="w-full max-w-md backdrop-blur-lg sm:bg-white sm:shadow-xl sm:rounded-2xl p-8 text-center">

      <!-- Icon -->
      <div class="text-6xl mb-4">⚠️</div>

      <!-- Heading -->
      <h1 class="text-3xl font-bold text-white sm:text-green-700 mb-2">
        Page Not Found
      </h1>

      <p class="text-green-100 sm:text-green-600 mb-6">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <div class="flex justify-center gap-3">
        <!-- Report Button -->
        <button
          class="px-5 py-2 bg-green-100 text-green-800 
          rounded-lg font-medium transition hover:bg-green-200"
        >
          Report Issue
        </button>

        <!-- Dashboard Button -->
        <a
          href="/dashboard"
          class="px-5 py-2 bg-green-600 text-white 
          rounded-lg font-medium transition hover:bg-green-700"
        >
          Back to Dashboard
        </a>
      </div>

    </div>

  </section>
</template>
