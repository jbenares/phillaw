<template>
  <navigation>
    <!-- Header -->
    <header
      class="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-30 h-16 flex items-center justify-between px-6"
    >
      <h1 class="text-lg font-semibold text-gray-800">Assign Teacher to Course</h1>

    </header>

    <!-- CONTENT -->
    <div class="pt-20 p-6">
      <div class="bg-white shadow-md rounded-xl p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Teacher - Course Assignments</h2>
          <button
            @click="openAddModal"
            class="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + Assign Course
          </button>
        </div>

        <!-- Assignments Table -->
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 text-left">
              <th class="p-3">Teacher</th>
              <th class="p-3">Course</th>
              <th class="p-3 w-32">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in assignments"
              :key="item.id"
              class="border-b"
            >
              <td class="p-3 font-medium">{{ item.teacherName }}</td>
              <td class="p-3">{{ item.courseName }}</td>

              <td class="p-3">
                <button
                  @click="openDeleteModal(item)"
                  class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Assign Modal -->
      <transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 class="text-lg font-semibold mb-4">Assign Course to Teacher</h3>

            <!-- Teacher Select -->
            <label class="text-sm mb-1">Select Teacher</label>
            <select
              v-model="form.teacherId"
              class="w-full border p-2 rounded mb-4"
            >
              <option value="">-- Choose Teacher --</option>
              <option
                v-for="t in teachers"
                :key="t.id"
                :value="t.id"
              >
                {{ t.name }}
              </option>
            </select>

            <!-- Course Select -->
            <label class="text-sm mb-1">Select Course</label>
            <select
              v-model="form.courseId"
              class="w-full border p-2 rounded mb-4"
            >
              <option value="">-- Choose Course --</option>
              <option
                v-for="c in courses"
                :key="c.id"
                :value="c.id"
              >
                {{ c.code }} - {{ c.name }}
              </option>
            </select>

            <div class="flex justify-end gap-2">
              <button class="px-4 py-2 border rounded-lg" @click="closeModal">Cancel</button>
              <button
                class="px-4 py-2 bg-green-600 text-white rounded-lg"
                @click="saveAssignment"
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
          <div class="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full">
            <h3 class="text-lg font-semibold mb-2">Remove Assignment?</h3>
            <p class="mb-4 text-gray-600">
              Remove assignment of
              <strong>{{ selectedAssignment?.teacherName }}</strong>
              from
              <strong>{{ selectedAssignment?.courseName }}</strong>?
            </p>

            <div class="flex justify-end gap-2">
              <button class="px-4 py-2 border rounded-lg" @click="showDeleteModal = false">
                Cancel
              </button>
              <button
                class="px-4 py-2 bg-red-600 text-white rounded-lg"
                @click="deleteAssignment"
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

const mobileOpen = ref(false);

/* SAMPLE TEACHERS */
const teachers = ref([
  { id: 1, name: "John Dela Cruz" },
  { id: 2, name: "Maria Santos" },
  { id: 3, name: "Peter Reyes" },
]);

/* SAMPLE COURSES */
const courses = ref([
  { id: 1, code: "BSIT101", name: "Intro to Computing" },
  { id: 2, code: "BSIT202", name: "Data Structures" },
  { id: 3, code: "BSIT305", name: "Database Systems" },
]);

/* CURRENT ASSIGNMENTS */
const assignments = ref([
  { id: 1, teacherId: 1, teacherName: "John Dela Cruz", courseId: 3, courseName: "Database Systems" },
  { id: 2, teacherId: 2, teacherName: "Maria Santos", courseId: 1, courseName: "Intro to Computing" },
]);

/* MODAL STATES */
const showModal = ref(false);
const showDeleteModal = ref(false);

/* FORM */
const form = ref({
  teacherId: "",
  courseId: ""
});

/* SELECTED FOR DELETE */
const selectedAssignment = ref(null);

/* OPEN ADD MODAL */
const openAddModal = () => {
  form.value = { teacherId: "", courseId: "" };
  showModal.value = true;
};

/* CLOSE MODAL */
const closeModal = () => {
  showModal.value = false;
};

/* SAVE ASSIGNMENT */
const saveAssignment = () => {
  if (!form.value.teacherId || !form.value.courseId) return;

  const teacher = teachers.value.find(t => t.id == form.value.teacherId);
  const course = courses.value.find(c => c.id == form.value.courseId);

  assignments.value.push({
    id: Date.now(),
    teacherId: teacher.id,
    teacherName: teacher.name,
    courseId: course.id,
    courseName: course.name,
  });

  showModal.value = false;
};

/* OPEN DELETE MODAL */
const openDeleteModal = (item) => {
  selectedAssignment.value = item;
  showDeleteModal.value = true;
};

/* DELETE ASSIGNMENT */
const deleteAssignment = () => {
  assignments.value = assignments.value.filter(
    (a) => a.id !== selectedAssignment.value.id
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
