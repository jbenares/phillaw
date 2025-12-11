<template>
  <navigation>
    <!-- Page Header -->
    <header
      class="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-30 h-16 flex items-center justify-between px-6"
    >
      <h1 class="text-lg font-semibold text-gray-800">Manage Teachers</h1>

    </header>

    <!-- Page Content -->
    <div class="pt-20 p-6">
      <div class="bg-white p-6 shadow-md rounded-xl">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Teachers List</h2>
          <button
            @click="openAddModal"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            + Add Teacher
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
              v-for="teacher in teachers"
              :key="teacher.id"
              class="border-b"
            >
              <td class="p-3">{{ teacher.name }}</td>
              <td class="p-3">{{ teacher.email }}</td>
              <td class="p-3">
                <span
                  class="px-2 py-1 text-xs rounded-lg"
                  :class="teacher.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'"
                >
                  {{ teacher.status }}
                </span>
              </td>
              <td class="p-3 flex gap-2">
                <button
                  @click="openEditModal(teacher)"
                  class="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  @click="openDeleteModal(teacher)"
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
              {{ isEditing ? 'Edit Teacher' : 'Add Teacher' }}
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
                @click="saveTeacher"
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
            <h3 class="text-lg font-semibold mb-4">Delete Teacher?</h3>
            <p class="mb-4 text-gray-600">
              Are you sure you want to delete
              <strong>{{ selectedTeacher?.name }}</strong>?
            </p>

            <div class="flex justify-end gap-2">
              <button
                @click="showDeleteModal = false"
                class="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                @click="deleteTeacher"
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
const teachers = ref([
  { id: 1, name: "Juan Dela Cruz", email: "juan@example.com", status: "Active" },
  { id: 2, name: "Maria Santos", email: "maria@example.com", status: "Inactive" },
  { id: 3, name: "Alex Reyes", email: "alex@example.com", status: "Active" }
]);

/* MODAL STATES */
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);

const form = ref({
  id: null,
  name: "",
  email: "",
  status: "Active"
});

const selectedTeacher = ref(null);

/* OPEN MODALS */
const openAddModal = () => {
  isEditing.value = false;
  form.value = { id: null, name: "", email: "", status: "Active" };
  showModal.value = true;
};

const openEditModal = (teacher) => {
  isEditing.value = true;
  form.value = { ...teacher };
  showModal.value = true;
};

const openDeleteModal = (teacher) => {
  selectedTeacher.value = teacher;
  showDeleteModal.value = true;
};

/* CLOSE MODAL */
const closeModal = () => {
  showModal.value = false;
};

/* SAVE TEACHER (ADD/EDIT) */
const saveTeacher = () => {
  if (isEditing.value) {
    // update
    const index = teachers.value.findIndex(t => t.id === form.value.id);
    teachers.value[index] = { ...form.value };
  } else {
    // add new
    teachers.value.push({
      ...form.value,
      id: Date.now()
    });
  }
  showModal.value = false;
};

/* DELETE TEACHER */
const deleteTeacher = () => {
  teachers.value = teachers.value.filter(t => t.id !== selectedTeacher.value.id);
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
