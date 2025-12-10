<template>
  <div class="flex min-h-screen bg-gray-50 text-gray-800">
    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 z-50"
      :class="[
        expanded ? 'w-56' : 'w-16',
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <!-- Header -->
      <div class="flex items-center justify-between h-16 border-b border-gray-700 px-4">
        <span v-if="expanded" class="text-lg font-bold whitespace-nowrap">MyWebsite</span>
        <button
          @click="expanded = !expanded"
          class="p-2 rounded hover:bg-gray-800 transition"
          title="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="expanded"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- Menu -->
      <nav class="mt-6 overflow-y-auto">
        <ul>
          <!-- Regular links -->
          <li v-for="item in staticMenu" :key="item.name" class="group">
            <a
              href="#"
              class="flex items-center gap-3 py-3 px-4 hover:bg-gray-800 transition-colors"
            >
              <component :is="item.icon" class="w-6 h-6" />
              <span v-if="expanded" class="whitespace-nowrap">{{ item.name }}</span>
            </a>
          </li>

          <!-- Dropdown 1 -->
          <li class="group">
            <button
              @click="toggleDropdown('services')"
              class="flex items-center justify-between w-full py-3 px-4 hover:bg-gray-800 transition-colors"
            >
              <div class="flex items-center gap-3">
                <Briefcase class="w-6 h-6" />
                <span v-if="expanded">Services</span>
              </div>
              <svg
                v-if="expanded"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 transform transition-transform duration-200"
                :class="{ 'rotate-90': dropdowns.services }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Animated dropdown -->
            <transition name="dropdown">
              <ul
                v-show="dropdowns.services && expanded"
                class="pl-12 bg-gray-800 text-gray-300 text-sm overflow-hidden"
              >
                <li><a href="#" class="block py-2 hover:text-white">Web Design</a></li>
                <li><a href="#" class="block py-2 hover:text-white">Marketing</a></li>
                <li><a href="#" class="block py-2 hover:text-white">Consulting</a></li>
              </ul>
            </transition>
          </li>

          <!-- Dropdown 2 -->
          <li class="group">
            <button
              @click="toggleDropdown('reports')"
              class="flex items-center justify-between w-full py-3 px-4 hover:bg-gray-800 transition-colors"
            >
              <div class="flex items-center gap-3">
                <Info class="w-6 h-6" />
                <span v-if="expanded">Reports</span>
              </div>
              <svg
                v-if="expanded"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 transform transition-transform duration-200"
                :class="{ 'rotate-90': dropdowns.reports }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Animated dropdown -->
            <transition name="dropdown">
              <ul
                v-show="dropdowns.reports && expanded"
                class="pl-12 bg-gray-800 text-gray-300 text-sm overflow-hidden"
              >
                <li><a href="#" class="block py-2 hover:text-white">Sales</a></li>
                <li><a href="#" class="block py-2 hover:text-white">Performance</a></li>
              </ul>
            </transition>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Overlay (for mobile) -->
    <div
      v-if="mobileOpen"
      @click="mobileOpen = false"
      class="fixed inset-0 bg-black/40 z-40 md:hidden"
    ></div>

    <!-- Main content -->
    <div
      class="flex-1 transition-all duration-300 ml-0 md:ml-16"
      :class="{ 'md:ml-56': expanded }"
    >
      <header class="fixed top-0 w-full bg-white/70 backdrop-blur-md shadow-sm z-30 h-16 flex items-center justify-between px-6">
        <h1 class="text-lg font-semibold text-gray-800">Dashboard</h1>

        <!-- Mobile menu button -->
        <button
          @click="mobileOpen = !mobileOpen"
          class="p-2 rounded-md text-gray-700 hover:bg-gray-200 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>

      <main class="pt-20 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { Home, Info, Briefcase, Phone } from "lucide-vue-next"

const expanded = ref(true)
const mobileOpen = ref(false)

const dropdowns = ref({
  services: false,
  reports: false,
})

const toggleDropdown = (menu) => {
  dropdowns.value[menu] = !dropdowns.value[menu]
}

const staticMenu = [
  { name: "Home", icon: Home },
  { name: "Contact", icon: Phone },
]
</script>

<style scoped>
aside {
  overflow: hidden;
}

/* Smooth dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.dropdown-enter-from,
.dropdown-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-5px);
}
.dropdown-enter-to,
.dropdown-leave-from {
  max-height: 200px;
  opacity: 1;
  transform: translateY(0);
}
</style>
