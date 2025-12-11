<template>
    <navigation>
         <header
            class="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-30 h-16 flex items-center justify-between px-6"
            >
            <h1 class="text-lg font-semibold text-[#7030A0]">Manage Grades</h1>
            </header>
        <div class="pt-20 p-6">
            <!-- Search Panel -->
            <div
            class="bg-white shadow rounded-xl p-6 mb-8 "
            >
            <h2 class="text-lg font-semibold text-[#7030A0] mb-4">
                Search Class
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Course -->
                <div>
                <label class="block text-sm font-medium mb-1">Course</label>
                <select v-model="selectedCourse"
                        class="w-full p-2 border rounded-lg focus:ring-[#7030A0] focus:border-[#7030A0]">
                    <option value="">Select Course</option>
                    <option v-for="course in courses" :key="course" :value="course">{{ course }}</option>
                </select>
                </div>

                <!-- Section -->
                <div>
                <label class="block text-sm font-medium mb-1">Section</label>
                <select v-model="selectedSection"
                        class="w-full p-2 border rounded-lg focus:ring-[#7030A0] focus:border-[#7030A0]">
                    <option value="">Select Section</option>
                    <option v-for="section in sections" :key="section" :value="section">{{ section }}</option>
                </select>
                </div>

                <!-- Search Button -->
                <div class="flex items-end">
                <button
                    @click="searchStudents"
                    class="w-full bg-[#7030A0] text-white py-2 rounded-lg hover:bg-[#5a267f] transition"
                >
                    Search
                </button>
                </div>
            </div>
            </div>

            <!-- Students Table -->
            <div
            v-if="students.length"
            class="bg-white shadow-lg rounded-xl p-4"
            >
            <h2 class="text-lg font-semibold text-[#7030A0] mb-4">
                Students List
            </h2>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse rounded-xl overflow-hidden">
                <thead class="bg-[#7030A0] text-white">
                    <tr>
                    <th class="p-3 text-left">Student ID</th>
                    <th class="p-3 text-left">Name</th>
                    <th class="p-3 text-left">Subject</th>
                    <th class="p-3 text-left">Grade</th>
                    <th class="p-3 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                    v-for="student in students"
                    :key="student.id"
                    class="border-b hover:bg-[#f3e8ff] transition"
                    >
                    <td class="p-3">{{ student.id }}</td>
                    <td class="p-3">{{ student.name }}</td>
                    <td class="p-3">{{ student.grade?.subject || '-' }}</td>
                    <td class="p-3">{{ student.grade?.score || '-' }}</td>
                    <td class="p-3 text-center">
                        <button
                        @click="openModal(student)"
                        class="bg-[#7030A0] text-white px-3 py-1 rounded-lg hover:bg-[#5a267f] text-sm"
                        >
                        Add / Edit Grade
                        </button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>

            <!-- MODAL -->
            <div
            v-if="showModal"
            class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
            <div class="bg-white w-full max-w-md p-6 rounded-xl shadow-xl border border-[#7030A0]/40">
                <h2 class="text-xl font-semibold text-[#7030A0] mb-4">
                Add / Edit Grade
                </h2>

                <!-- Student Name -->
                <div class="mb-3">
                <label class="text-sm font-medium">Student</label>
                <input type="text"
                        :value="activeStudent?.name"
                        disabled
                        class="w-full p-2 border rounded-lg bg-gray-100">
                </div>

                <!-- Subject Dropdown -->
                <div class="mb-3">
                <label class="text-sm font-medium">Subject</label>
                <select v-model="modalSubject"
                        class="w-full p-2 border rounded-lg">
                    <option value="">Select Subject</option>
                    <option v-for="subject in subjects" :key="subject" :value="subject">{{ subject }}</option>
                </select>
                </div>

                <!-- Grade Input -->
                <div class="mb-3">
                <label class="text-sm font-medium">Grade</label>
                <input type="number"
                        v-model="modalGrade"
                        class="w-full p-2 border rounded-lg"
                        placeholder="Enter grade...">
                </div>

                <!-- Buttons -->
                <div class="flex justify-end gap-2 mt-4">
                <button
                    @click="closeModal"
                    class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                    Cancel
                </button>

                <button
                    @click="saveGrade"
                    class="px-4 py-2 bg-[#7030A0] text-white rounded-lg hover:bg-[#5a267f]"
                >
                    Save
                </button>
                </div>
            </div>
            </div>
        </div>
    </navigation>
</template>


<script setup>
import { ref, reactive, computed } from "vue";
import navigation from "./components/navigation.vue";

/* Selected filters */
const selectedCourse = ref("");
const selectedSection = ref("");

/* Options */
const courses = ["BSIT", "BSED", "BSBA"];
const sections = ["A", "B", "C"];
const subjects = ["Math", "English", "Science", "Programming"];

/* Students data */
const students = ref([]);

/* Modal states */
const showModal = ref(false);
const activeStudent = ref(null);
const modalSubject = ref("");
const modalGrade = ref("");

/* Computed (optional) if you need filtered sections or courses later */
const filteredSections = computed(() => {
  // Example: return sections based on course
  return sections;
});

/* METHODS */

/* Search students based on selected course and section */
const searchStudents = () => {
  if (!selectedCourse.value || !selectedSection.value) {
    alert("Please select a course and section first.");
    return;
  }

  // Sample data
  students.value = [
    { id: "2025-001", name: "Juan Dela Cruz", grade: null },
    { id: "2025-002", name: "Maria Santos", grade: null },
    { id: "2025-003", name: "Pedro Ramos", grade: null },
  ];
};

/* Open modal to add/edit grade */
const openModal = (student) => {
  activeStudent.value = student;
  modalSubject.value = student.grade?.subject || "";
  modalGrade.value = student.grade?.score || "";
  showModal.value = true;
};

/* Close modal */
const closeModal = () => {
  showModal.value = false;
  modalSubject.value = "";
  modalGrade.value = "";
};

/* Save grade */
const saveGrade = () => {
  if (!modalSubject.value || !modalGrade.value) {
    alert("Please complete all fields.");
    return;
  }

  activeStudent.value.grade = {
    subject: modalSubject.value,
    score: modalGrade.value,
  };

  closeModal();
};
</script>

<style scoped>
/* Optional: smoother modal animation */
</style>
