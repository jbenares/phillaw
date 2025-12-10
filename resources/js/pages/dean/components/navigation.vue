<template>
  <div class="flex min-h-screen bg-gray-100 text-gray-800">
    <aside
      class="fixed top-0 left-0 h-full bg-green-900 text-white transition-all duration-300 z-50"
      :class="[
        expanded ? 'w-56' : 'w-16',
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <div class="flex items-center justify-between h-16 border-b border-green-700 px-4">
        <span v-if="expanded" class="text-lg font-bold whitespace-nowrap">
          Dean Panel
        </span>

        <button
          @click="expanded = !expanded"
          class="p-2 rounded hover:bg-green-800 transition"
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

      <nav class="mt-4 overflow-y-auto">
        <ul>
          <li
            v-for="item in staticMenu"
            :key="item.name"
            class="group"
          >
            <router-link
              :to="item.route"
              class="flex items-center gap-3 py-3 px-4 hover:bg-green-800 transition-colors"
            >
              <component :is="item.icon" class="w-6 h-6" />
              <span v-if="expanded" class="whitespace-nowrap">{{ item.name }}</span>
            </router-link>
          </li>

          <li>
            <button
              @click="toggleDropdown('teachers')"
              class="flex items-center justify-between w-full py-3 px-4 hover:bg-green-800 transition-colors"
            >
              <div class="flex items-center gap-3">
                <Users class="w-6 h-6" />
                <span v-if="expanded">Teachers</span>
              </div>

              <svg
                v-if="expanded"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 transform transition-transform duration-200"
                :class="{ 'rotate-90': dropdowns.teachers }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <transition name="dropdown">
              <ul
                v-show="dropdowns.teachers && expanded"
                class="pl-12 bg-green-800/50 text-gray-200 text-sm"
              >
                <li><router-link to="/dean/teachers" class="block py-2 hover:text-white">All Teachers</router-link></li>
                <li><router-link to="/dean/teachers/activate" class="block py-2 hover:text-white">Activate Teacher</router-link></li>
              </ul>
            </transition>
          </li>

          <li>
            <button
              @click="toggleDropdown('courses')"
              class="flex items-center justify-between w-full py-3 px-4 hover:bg-green-800 transition-colors"
            >
              <div class="flex items-center gap-3">
                <BookOpen class="w-6 h-6" />
                <span v-if="expanded">Courses</span>
              </div>

              <svg
                v-if="expanded"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 transform transition-transform duration-200"
                :class="{ 'rotate-90': dropdowns.courses }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <transition name="dropdown">
              <ul
                v-show="dropdowns.courses && expanded"
                class="pl-12 bg-green-800/50 text-gray-200 text-sm"
              >
                <li><router-link to="/dean/courses" class="block py-2 hover:text-white">List of Courses</router-link></li>
                <li><router-link to="/dean/assign-course" class="block py-2 hover:text-white">Assign Teacher</router-link></li>
              </ul>
            </transition>
          </li>

        </ul>
      </nav>
    </aside>

    <div
      v-if="mobileOpen"
      @click="mobileOpen = false"
      class="fixed inset-0 bg-black/40 z-40 md:hidden"
    ></div>

    <div
      class="flex-1 transition-all duration-300 ml-0 md:ml-16"
      :class="{ 'md:ml-56': expanded }"
    >
      <header
        class="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-30 h-16 flex items-center justify-between px-6"
      >
        <h1 class="text-lg font-semibold text-gray-800">Dean Dashboard</h1>

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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
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
import { ref } from "vue";
import { Home, BookOpen, Users, LayoutDashboard } from "lucide-vue-next";

const expanded = ref(true);
const mobileOpen = ref(false);

const dropdowns = ref({
  teachers: false,
  courses: false,
});

const toggleDropdown = (key) => {
  dropdowns.value[key] = !dropdowns.value[key];
};

const staticMenu = [
  { name: "Dashboard", icon: LayoutDashboard, route: "/dean/dashboard" },
  { name: "Home", icon: Home, route: "/dean/home" },
];
</script>

