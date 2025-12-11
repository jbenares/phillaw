import { createRouter, createWebHistory } from "vue-router";

import notFound from '../pages/notFound.vue'
import login from '../pages/login.vue'
import dean_dash from '../pages/dean/dashboard.vue'
import listTeacher from '../pages/dean/list_teachers.vue'
import listCourse from '../pages/dean/list_courses.vue'
import assignTeacher from '../pages/dean/assign_teacher.vue'


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
        path:'/dean/assign_teacher',
        component: assignTeacher,
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
