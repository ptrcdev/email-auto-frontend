import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import AuthSuccess from './components/AuthSuccess.vue'
import AuthError from './components/AuthError.vue'
import OnboardingPage from './components/OnboardingPage.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/success', name: 'AuthSuccess', component: AuthSuccess },
  { path: '/error', name: 'AuthError', component: AuthError },
  { path: '/onboarding', name: 'Onboarding', component: OnboardingPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
