import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/home/Home')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/Login'),
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
        path: '/shop/:id',
        name: 'Shop',
        component: () => import('../views/shop/Shop')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/register/Register'),
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
