<template>
  <navigation>
    <!-- Page Header -->
    <header
      class="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-30 h-16 flex items-center justify-between px-6"
    >
      <h1 class="text-lg font-semibold text-gray-800">My Subjects</h1>
    </header>

    <!-- Page Content -->
    <div class="pt-20 p-6">
      <div class="bg-white p-6 shadow-md rounded-xl">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Subjects List</h2>
          <button
            @click="openAddModal"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            + Add Subject
          </button>
        </div>

        <!-- Table -->
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 text-left">
              <th class="p-3">Subject Name</th>
              <th class="p-3">Code</th>
              <th class="p-3">Status</th>
              <th class="p-3 w-40">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="subject in subjects"
              :key="subject.id"
              class="border-b"
            >
              <td class="p-3">{{ subject.name }}</td>
              <td class="p-3">{{ subject.code }}</td>
              <td class="p-3">
                <span
                  class="px-2 py-1 text-xs rounded-lg"
                  :class="subject.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'"
                >
                  {{ subject.status }}
                </span>
              </td>
              <td class="p-3 flex gap-2">
                <router-link
                  :to="`/teacher/subject_students/${subject.id}`"
                  class="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  View Students
                </router-link>
                <button
                  @click="openEditModal(subject)"
                  class="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add / Edit Modal -->
      <transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div class="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <h3 class="text-lg font-semibold mb-4">
              {{ isEditing ? 'Edit Subject' : 'Add Subject' }}
            </h3>

            <div class="space-y-3">
              <input
                v-model="form.name"
                type="text"
                placeholder="Subject Name"
                class="w-full p-2 border rounded"
              />
              <input
                v-model="form.code"
                type="text"
                placeholder="Subject Code"
                class="w-full p-2 border rounded"
              />
              <select
                v-model="form.status"
                class="w-full p-2 border rounded"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div class="flex justify-end mt-6 gap-2">
              <button
                @click="closeModal"
                class="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                @click="saveSubject"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
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

/* SAMPLE SUBJECT DATA */
const subjects = ref([
  { id: 1, name: "Mathematics", code: "MATH101", status: "Active" },
  { id: 2, name: "English", code: "ENG102", status: "Active" },
  { id: 3, name: "Science", code: "SCI103", status: "Inactive" }
]);

/* MODAL STATES */
const showModal = ref(false);
const isEditing = ref(false);
const form = ref({ id: null, name: "", code: "", status: "Active" });

/* OPEN MODALS */
const openAddModal = () => {
  isEditing.value = false;
  form.value = { id: null, name: "", code: "", status: "Active" };
  showModal.value = true;
};

const openEditModal = (subject) => {
  isEditing.value = true;
  form.value = { ...subject };
  showModal.value = true;
};

/* CLOSE MODAL */
const closeModal = () => {
  showModal.value = false;
};

/* SAVE SUBJECT (ADD/EDIT) */
const saveSubject = () => {
  if (isEditing.value) {
    const index = subjects.value.findIndex(s => s.id === form.value.id);
    subjects.value[index] = { ...form.value };
  } else {
    subjects.value.push({ ...form.value, id: Date.now() });
  }
  showModal.value = false;
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
