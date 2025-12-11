<template>
  <div class="flex min-h-screen bg-gray-100 text-gray-800">

    <!-- BACKDROP (mobile only) -->
    <div
      v-if="mobileOpen"
      @click="mobileOpen = false"
      class="fixed inset-0 bg-black/40 z-40 md:hidden"
    ></div>

    <!-- SIDEBAR -->
    <transition name="slide-sidebar">
      <aside
        class="fixed top-0 left-0 h-full bg-green-900 text-white transition-all duration-300 z-50"
        :class="[
          // width behavior
          mobileOpen ? 'w-56' : expanded ? 'w-56' : 'w-16',

          // slide behavior
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        ]"
      >
        <!-- SIDEBAR HEADER -->
        <div class="flex items-center justify-between h-16 border-b border-green-700 px-4"> 
          <span v-if="expanded || mobileOpen" class="text-lg font-bold whitespace-nowrap">
            Dean Panel
          </span>

          <!-- Desktop collapse toggle -->
          <button
            @click="expanded = !expanded"
            class="p-2 rounded hover:bg-green-800 transition hidden md:block"
            title="Toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

          <!-- Mobile close button -->
          <button
            @click="mobileOpen = false"
            class="p-2 rounded hover:bg-green-800 transition md:hidden"
          >
            ✕
          </button>
        </div>

        <!-- NAVIGATION -->
        <nav class="mt-4 overflow-y-auto">
          <ul>

            <!-- STATIC ITEMS -->
            <li
              v-for="item in staticMenu"
              :key="item.name"
            >
              <router-link
                :to="item.route"
                class="flex items-center gap-3 py-3 px-4 hover:bg-green-800 transition-colors"
                @click="mobileOpen = false"
              >
                <component :is="item.icon" class="w-6 h-6" />
                <span v-if="expanded || mobileOpen" class="whitespace-nowrap">
                  {{ item.name }}
                </span>
              </router-link>
            </li>

            <!-- TEACHERS DROPDOWN -->
            <li>
              <button
                @click="toggleDropdown('teachers')"
                class="flex items-center justify-between w-full py-3 px-4 hover:bg-green-800 transition"
              >
                <div class="flex items-center gap-3">
                  <Users class="w-6 h-6" />
                  <span v-if="expanded || mobileOpen">Teachers</span>
                </div>

                <svg
                  v-if="expanded || mobileOpen"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 transform transition-transform duration-200"
                  :class="{ 'rotate-90': dropdowns.teachers }"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <transition name="dropdown">
                <ul
                  v-show="dropdowns.teachers && (expanded || mobileOpen)"
                  class="pl-12 bg-green-800/50 text-sm text-gray-200"
                >
                  <li>
                    <router-link class="block py-2 hover:text-white" to="/dean/list_teachers" @click="mobileOpen = false">
                      Teachers List
                    </router-link>
                  </li>
                  <!-- <li>
                    <router-link class="block py-2 hover:text-white" to="/dean/teachers/activate" @click="mobileOpen = false">
                      Activate Teacher
                    </router-link>
                  </li> -->
                </ul>
              </transition>
            </li>

            <!-- COURSES DROPDOWN -->
            <li>
              <button
                @click="toggleDropdown('courses')"
                class="flex items-center justify-between w-full py-3 px-4 hover:bg-green-800 transition"
              >
                <div class="flex items-center gap-3">
                  <BookOpen class="w-6 h-6" />
                  <span v-if="expanded || mobileOpen">Courses</span>
                </div>

                <svg
                  v-if="expanded || mobileOpen"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 transform transition-transform duration-200"
                  :class="{ 'rotate-90': dropdowns.courses }"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <transition name="dropdown">
                <ul
                  v-show="dropdowns.courses && (expanded || mobileOpen)"
                  class="pl-12 bg-green-800/50 text-sm text-gray-200"
                >
                  <li>
                    <router-link class="block py-2 hover:text-white" to="/dean/list_courses" @click="mobileOpen = false">
                      List of Courses
                    </router-link>
                  </li>
                  <li>
                    <router-link class="block py-2 hover:text-white" to="/dean/assign_teacher" @click="mobileOpen = false">
                      Assign Teacher
                    </router-link>
                  </li>
                </ul>
              </transition>
            </li>

          </ul>
        </nav>
      </aside>
    </transition>

    <!-- MAIN CONTENT -->
    <div
      class="flex-1 transition-all duration-300 ml-0 md:ml-16"
      :class="{ 'md:ml-56': expanded }"
    >
      <!-- MOBILE OPEN BUTTON -->
      <button
		@click="mobileOpen = true"
		class="p-2 px-3 md:hidden mt-3 ml-3 bg-gray-100 text-gray-600 rounded-lg  absolute right-0 mr-4 z-50"
		aria-label="Open menu"
		>
		☰
		</button>

      <main class="">
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
