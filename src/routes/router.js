import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.map'
import {TOKEN_NAME} from "../config/api";

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: 'history'
})

const token = localStorage.getItem(TOKEN_NAME)
router.beforeEach((to, from, next) => {
    if (to.meta.logged == true && !token) return next({ name: 'login' })
    next()
})

export default router