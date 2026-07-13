import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import AuthSuccess from './components/AuthSuccess.vue'
import AuthError from './components/AuthError.vue'
import OnboardingPage from './components/OnboardingPage.vue'
import DashboardPage from './components/DashboardPage.vue'
import PromptPage from './components/PromptPage.vue'
import SettingsPage from './components/SettingsPage.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/success', name: 'AuthSuccess', component: AuthSuccess },
  { path: '/error', name: 'AuthError', component: AuthError },
  { path: '/onboarding', name: 'Onboarding', component: OnboardingPage },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage },
  { path: '/prompt', name: 'Prompt', component: PromptPage },
  { path: '/settings', name: 'Settings', component: SettingsPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
