<template>
  <navigation>
    <!-- Page Header -->
    <header
      class="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-30 h-16 flex items-center justify-between px-6"
    >
      <h1 class="text-lg font-semibold text-gray-800">Subject Students</h1>
    </header>

    <!-- Page Content -->
    <div class="pt-20 p-6">
      <div class="bg-white p-6 shadow-md rounded-xl">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Students Enrolled</h2>
          <button
            @click="openAddModal"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            + Add Student
          </button>
        </div>

        <!-- Table -->
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 text-left">
              <th class="p-3">Name</th>
              <th class="p-3">Email</th>
              <th class="p-3">Status</th>
              <th class="p-3 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="student in subjectStudents"
              :key="student.id"
              class="border-b"
            >
              <td class="p-3">{{ student.name }}</td>
              <td class="p-3">{{ student.email }}</td>
              <td class="p-3">
                <span
                  class="px-2 py-1 text-xs rounded-lg"
                  :class="student.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'"
                >
                  {{ student.status }}
                </span>
              </td>
              <td class="p-3 flex gap-2">
                <button
                  @click="openEditModal(student)"
                  class="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  @click="openDeleteModal(student)"
                  class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
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
              {{ isEditing ? 'Edit Student' : 'Add Student' }}
            </h3>

            <div class="space-y-3">
              <input
                v-model="form.name"
                type="text"
                placeholder="Full Name"
                class="w-full p-2 border rounded"
              />
              <input
                v-model="form.email"
                type="email"
                placeholder="Email"
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
                @click="saveStudent"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Delete Confirmation -->
      <transition name="fade">
        <div
          v-if="showDeleteModal"
          class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div class="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg">
            <h3 class="text-lg font-semibold mb-4">Remove Student?</h3>
            <p class="mb-4 text-gray-600">
              Are you sure you want to remove
              <strong>{{ selectedStudent?.name }}</strong> from this subject?
            </p>

            <div class="flex justify-end gap-2">
              <button
                @click="showDeleteModal = false"
                class="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                @click="deleteStudent"
                class="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Remove
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

/* SAMPLE STUDENT DATA FOR SUBJECT */
const subjectStudents = ref([
  { id: 1, name: "John Doe", email: "john@student.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@student.com", status: "Inactive" },
  { id: 3, name: "Carlos Medina", email: "carlos@student.com", status: "Active" }
]);

/* MODAL STATES */
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const selectedStudent = ref(null);

const form = ref({ id: null, name: "", email: "", status: "Active" });

/* OPEN MODALS */
const openAddModal = () => {
  isEditing.value = false;
  form.value = { id: null, name: "", email: "", status: "Active" };
  showModal.value = true;
};

const openEditModal = (student) => {
  isEditing.value = true;
  form.value = { ...student };
  showModal.value = true;
};

const openDeleteModal = (student) => {
  selectedStudent.value = student;
  showDeleteModal.value = true;
};

/* CLOSE MODAL */
const closeModal = () => {
  showModal.value = false;
};

/* SAVE STUDENT (ADD/EDIT) */
const saveStudent = () => {
  if (isEditing.value) {
    const index = subjectStudents.value.findIndex(s => s.id === form.value.id);
    subjectStudents.value[index] = { ...form.value };
  } else {
    subjectStudents.value.push({ ...form.value, id: Date.now() });
  }
  showModal.value = false;
};

/* DELETE STUDENT */
const deleteStudent = () => {
  subjectStudents.value = subjectStudents.value.filter(s => s.id !== selectedStudent.value.id);
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
