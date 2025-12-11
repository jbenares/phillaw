<template>
  <navigation>
    <!-- Header -->
    <header
      class="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-30 h-16 flex items-center justify-between px-6"
    >
      <h1 class="text-lg font-semibold text-gray-800">Manage Subjects</h1>
    </header>

    <!-- Content -->
    <div class="pt-20 p-6">
      <div class="bg-white p-6 shadow-md rounded-xl">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Subjects List</h2>
          <button
            @click="openAddModal"
            class="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            + Add Subject
          </button>
        </div>

        <!-- Subject Table -->
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 text-left">
              <th class="p-3">Subject Code</th>
              <th class="p-3">Subject Name</th>
              <th class="p-3">Units</th>
              <th class="p-3 w-32">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="subject in subjects"
              :key="subject.id"
              class="border-b"
            >
              <td class="p-3 font-medium">{{ subject.code }}</td>
              <td class="p-3">{{ subject.name }}</td>
              <td class="p-3">{{ subject.units }}</td>

              <td class="p-3 flex gap-2">
                <button
                  @click="openEditModal(subject)"
                  class="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  @click="openDeleteModal(subject)"
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
              {{ isEditing ? 'Edit Subject' : 'Add Subject' }}
            </h3>

            <div class="space-y-3">
              <input
                v-model="form.code"
                type="text"
                placeholder="Subject Code (e.g. MATH101)"
                class="w-full p-2 border rounded"
              />

              <input
                v-model="form.name"
                type="text"
                placeholder="Subject Name"
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
                @click="saveSubject"
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
            <h3 class="text-lg font-semibold mb-4">Delete Subject?</h3>
            <p class="mb-4 text-gray-600">
              Are you sure you want to delete
              <strong>{{ selectedSubject?.name }}</strong>?
            </p>

            <div class="flex justify-end gap-2">
              <button
                @click="showDeleteModal = false"
                class="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                @click="deleteSubject"
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
const subjects = ref([
  { id: 1, code: "MATH101", name: "Calculus I", units: 3 },
  { id: 2, code: "ENG201", name: "English Literature", units: 3 },
  { id: 3, code: "CS301", name: "Programming Fundamentals", units: 4 }
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

const selectedSubject = ref(null);

/* OPEN MODALS */
const openAddModal = () => {
  isEditing.value = false;
  form.value = { id: null, code: "", name: "", units: 3 };
  showModal.value = true;
};

const openEditModal = (subject) => {
  isEditing.value = true;
  form.value = { ...subject };
  showModal.value = true;
};

const openDeleteModal = (subject) => {
  selectedSubject.value = subject;
  showDeleteModal.value = true;
};

/* CLOSE MODAL */
const closeModal = () => {
  showModal.value = false;
};

/* SAVE SUBJECT */
const saveSubject = () => {
  if (isEditing.value) {
    const index = subjects.value.findIndex((s) => s.id === form.value.id);
    subjects.value[index] = { ...form.value };
  } else {
    subjects.value.push({
      ...form.value,
      id: Date.now()
    });
  }
  showModal.value = false;
};

/* DELETE SUBJECT */
const deleteSubject = () => {
  subjects.value = subjects.value.filter(
    (s) => s.id !== selectedSubject.value.id
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
