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
        class="fixed top-0 left-0 h-full bg-[#7030A0] text-white transition-all duration-300 z-50"
        :class="[
          mobileOpen ? 'w-56' : expanded ? 'w-56' : 'w-16',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]"
      >
        <!-- SIDEBAR HEADER -->
        <div class="flex items-center justify-between h-16 border-b border-[#7030A0] px-4"> 
          <span v-if="expanded || mobileOpen" class="text-lg font-bold whitespace-nowrap">
            Teachers Panel
          </span>

          <!-- Desktop collapse toggle -->
          <button
            @click="expanded = !expanded"
            class="p-2 rounded hover:bg-[#5a267f] transition hidden md:block"
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
            class="p-2 rounded hover:bg-[#5a267f] transition md:hidden"
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
                class="flex items-center gap-3 py-3 px-4 hover:bg-[#5a267f] transition-colors"
                @click="mobileOpen = false"
              >
                <component :is="item.icon" class="w-6 h-6" />
                <span v-if="expanded || mobileOpen" class="whitespace-nowrap">
                  {{ item.name }}
                </span>
              </router-link>
            </li>

            <!-- SUBJECTS DROPDOWN -->
            <li>
              <button
                @click="toggleDropdown('subjects')"
                class="flex items-center justify-between w-full py-3 px-4 hover:bg-[#5a267f] transition"
              >
                <div class="flex items-center gap-3">
                  <BookOpen class="w-6 h-6" />
                  <span v-if="expanded || mobileOpen">Subjects</span>
                </div>

                <svg
                  v-if="expanded || mobileOpen"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 transform transition-transform duration-200"
                  :class="{ 'rotate-90': dropdowns.subjects }"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <transition name="dropdown">
                <ul
                  v-show="dropdowns.subjects && (expanded || mobileOpen)"
                  class="pl-12 bg-[#5a267f]/50 text-sm text-gray-200"
                >
                  <li>
                    <router-link class="block py-2 hover:text-white" to="/teacher/list_subjects" @click="mobileOpen = false">
                      My Subjects
                    </router-link>
                  </li>

                  <li>
                    <router-link class="block py-2 hover:text-white" to="/teacher/students_enrolled" @click="mobileOpen = false">
                      Subject Students
                    </router-link>
                  </li>
                </ul>
              </transition>
            </li>

            <!-- STUDENTS + GRADES DROPDOWN -->
            <li>
              <button
                @click="toggleDropdown('students')"
                class="flex items-center justify-between w-full py-3 px-4 hover:bg-[#5a267f] transition"
              >
                <div class="flex items-center gap-3">
                  <Users class="w-6 h-6" />
                  <span v-if="expanded || mobileOpen">Students</span>
                </div>

                <svg
                  v-if="expanded || mobileOpen"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 transform transition-transform duration-200"
                  :class="{ 'rotate-90': dropdowns.students }"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <transition name="dropdown">
                <ul
                  v-show="dropdowns.students && (expanded || mobileOpen)"
                  class="pl-12 bg-[#5a267f]/50 text-sm text-gray-200"
                >
                  <li>
                    <router-link class="block py-2 hover:text-white" to="/teacher/list_students" @click="mobileOpen = false">
                      Students List
                    </router-link>
                  </li>

                  <li>
                    <router-link class="block py-2 hover:text-white" to="/teacher/add_grades" @click="mobileOpen = false">
                      Add / Edit Grades
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
      <button
        @click="mobileOpen = true"
        class="p-2 px-3 md:hidden mt-3 ml-3 bg-gray-100 text-gray-600 rounded-lg absolute right-0 mr-4 z-50"
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
  subjects: false,
  students: false,
});

const toggleDropdown = (key) => {
  dropdowns.value[key] = !dropdowns.value[key];
};

const staticMenu = [
  { name: "Dashboard", icon: LayoutDashboard, route: "/teacher/dashboard" },
  { name: "Home", icon: Home, route: "/teacher/home" },
];
</script>
