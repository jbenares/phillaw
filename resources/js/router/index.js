import { createRouter, createWebHistory } from "vue-router";

import notFound from '../pages/notFound.vue'
import login from '../pages/login.vue'
import dean_dash from '../pages/dean/dashboard.vue'
import listTeacher from '../pages/dean/list_teachers.vue'
import listCourse from '../pages/dean/list_courses.vue'
import listSubject from '../pages/dean/list_subjects.vue'
import assignTeacher from '../pages/dean/assign_teacher.vue'

import teacher_dash from '../pages/teacher/dashboard.vue'
import listStudent from '../pages/teacher/list_students.vue'
import addGrades from '../pages/teacher/add_grades.vue'
import listSubjectTeacher from '../pages/teacher/list_subjects.vue'
import studentsEnrolled from '../pages/teacher/students_enrolled.vue'



const routes = [
    {
        path:'/',
        component: login,
    },
    {
        path:'/dean/dashboard',
        component: dean_dash,
    },
    {
        path:'/dean/list_teachers',
        component: listTeacher,
    },
    {
        path:'/dean/list_courses',
        component: listCourse,
    },
    {
        path:'/dean/list_subjects',
        component: listSubject,
    },
    {
        path:'/dean/assign_teacher',
        component: assignTeacher,
    },
    {
        path:'/teacher/dashboard',
        component: teacher_dash,
    },
    {
        path:'/teacher/list_students',
        component: listStudent,
    },
    {
        path:'/teacher/list_subjects',
        component: listSubjectTeacher,
    },
    {
        path:'/teacher/students_enrolled',
        component: studentsEnrolled,
    },
    {
        path:'/teacher/add_grades',
        component: addGrades,
    },
    {
        path:'/:pathMatch(.*)*',
        name:'notFound',
        component: notFound,
        meta:{
            requiresAuth:false
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
