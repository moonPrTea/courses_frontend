import {createRouter, createWebHistory, type RouteLocationNormalized} from 'vue-router'
import {clearToken, getToken} from "@/composables/login.ts";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage/HomePage.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage/LoginPage.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/RegistrationPage/RegistrationPage.vue')
    }
  ],
})


router.beforeEach((to: RouteLocationNormalized) => {
  if (to.meta.requiresAuth && !getToken()) {
    clearToken();
    return {
      path: '/login'
    }
  }
})

export default router
