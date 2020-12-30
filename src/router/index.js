import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home'
import Login from '../views/login/Login'
import Register from '../views/register/Register'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter(to, from, next) {
            const isLogin = localStorage.isLogin
            if (isLogin) {
                next({ name: 'Home' })
            } else {
                next()
            }
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter(to, from, next) {
            const isLogin = localStorage.isLogin
            if (isLogin) {
                next({ name: 'Home' })
            } else {
                next()
            }
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.isLogin
    const { name } = to
    const isLoginOrRegister = name === 'Login' || name === 'Register'
    if (isLogin || isLoginOrRegister) {
        next()
    } else {
        next({ name: 'Login' })
    }
})

export default router
