import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../services/firebaseConfig.js'

const routes = [
    {
        meta: {
            title: 'Login'
          },
          path: '/',
          name: 'login',
          component: () => import('../views/LoginView.vue')
    },
    {
      meta: {
          title: 'Signup'
        },
        path: '/signup',
        name: 'signup',
        component: () => import('../views/SignupView.vue')
  },
  {
    meta: {
        title: 'Home'
      },
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      return savedPosition || { top: 0 }
    }
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' && auth.currentUser) {
    next('/home')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/')
    return;
  }

  next();
})
  
export default router
  