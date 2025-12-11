<template>
  <navigation>
    <!-- Header -->
    <header
      class="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-30 h-16 flex items-center justify-between px-6"
    >
      <h1 class="text-lg font-semibold text-gray-800">Manage Courses</h1>

      
    </header>

    <!-- Content -->
    <div class="pt-20 p-6">
      <div class="bg-white p-6 shadow-md rounded-xl">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Courses List</h2>
          <button
            @click="openAddModal"
            class="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            + Add Course
          </button>
        </div>

        <!-- Course Table -->
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 text-left">
              <th class="p-3">Course Code</th>
              <th class="p-3">Course Name</th>
              <th class="p-3">Units</th>
              <th class="p-3 w-32">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="course in courses"
              :key="course.id"
              class="border-b"
            >
              <td class="p-3 font-medium">{{ course.code }}</td>
              <td class="p-3">{{ course.name }}</td>
              <td class="p-3">{{ course.units }}</td>

              <td class="p-3 flex gap-2">
                <button
                  @click="openEditModal(course)"
                  class="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  @click="openDeleteModal(course)"
                  class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add/Edit Modal -->
      <transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div class="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <h3 class="text-lg font-semibold mb-4">
              {{ isEditing ? 'Edit Course' : 'Add Course' }}
            </h3>

            <div class="space-y-3">
              <input
                v-model="form.code"
                type="text"
                placeholder="Course Code (e.g. BSIT101)"
                class="w-full p-2 border rounded"
              />

              <input
                v-model="form.name"
                type="text"
                placeholder="Course Name"
                class="w-full p-2 border rounded"
              />

              <input
                v-model="form.units"
                type="number"
                min="1"
                placeholder="Units"
                class="w-full p-2 border rounded"
              />
            </div>

            <div class="flex justify-end mt-6 gap-2">
              <button
                @click="closeModal"
                class="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                @click="saveCourse"
                class="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Delete Modal -->
      <transition name="fade">
        <div
          v-if="showDeleteModal"
          class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div class="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg">
            <h3 class="text-lg font-semibold mb-4">Delete Course?</h3>
            <p class="mb-4 text-gray-600">
              Are you sure you want to delete
              <strong>{{ selectedCourse?.name }}</strong>?
            </p>

            <div class="flex justify-end gap-2">
              <button
                @click="showDeleteModal = false"
                class="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                @click="deleteCourse"
                class="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </navigation>
</template>

<script setup>
import { ref } from "vue";
import navigation from "./components/navigation.vue";

const mobileOpen = ref(false);

/* SAMPLE DATA */
const courses = ref([
  { id: 1, code: "BSIT101", name: "Introduction to Computing", units: 3 },
  { id: 2, code: "BSIT202", name: "Data Structures", units: 4 },
  { id: 3, code: "BSIT305", name: "Database Management", units: 3 }
]);

/* MODAL STATES */
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);

const form = ref({
  id: null,
  code: "",
  name: "",
  units: 3
});

const selectedCourse = ref(null);

/* OPEN MODALS */
const openAddModal = () => {
  isEditing.value = false;
  form.value = { id: null, code: "", name: "", units: 3 };
  showModal.value = true;
};

const openEditModal = (course) => {
  isEditing.value = true;
  form.value = { ...course };
  showModal.value = true;
};

const openDeleteModal = (course) => {
  selectedCourse.value = course;
  showDeleteModal.value = true;
};

/* CLOSE MODAL */
const closeModal = () => {
  showModal.value = false;
};

/* SAVE COURSE */
const saveCourse = () => {
  if (isEditing.value) {
    const index = courses.value.findIndex((c) => c.id === form.value.id);
    courses.value[index] = { ...form.value };
  } else {
    courses.value.push({
      ...form.value,
      id: Date.now()
    });
  }
  showModal.value = false;
};

/* DELETE COURSE */
const deleteCourse = () => {
  courses.value = courses.value.filter(
    (c) => c.id !== selectedCourse.value.id
  );
  showDeleteModal.value = false;
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
