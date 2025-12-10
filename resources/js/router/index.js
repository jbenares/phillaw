import { createRouter, createWebHistory } from "vue-router";

import notFound from '../pages/notFound.vue'
import login from '../pages/login.vue'
import dean_dash from '../pages/dean/dashboard.vue'


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
