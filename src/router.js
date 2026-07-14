import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import AuthSuccess from './components/AuthSuccess.vue'
import AuthError from './components/AuthError.vue'
import OnboardingPage from './components/OnboardingPage.vue'
import DashboardPage from './components/DashboardPage.vue'
import PromptPage from './components/PromptPage.vue'
import SettingsPage from './components/SettingsPage.vue'
import { getSession } from './session.js'

// Routes that require an authenticated session (email in storage or query)
const PROTECTED = ['/dashboard', '/onboarding', '/prompt', '/settings']

const routes = [
  {
    path: '/',
    redirect: () => {
      const email = getSession()
      return email ? { path: '/dashboard', query: { email } } : '/login'
    }
  },
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

router.beforeEach((to, _from, next) => {
  if (!PROTECTED.includes(to.path)) return next()

  // If the route already carries an email query param, accept it as-is
  if (to.query.email) return next()

  // Otherwise try to restore from localStorage
  const email = getSession()
  if (email) return next({ path: to.path, query: { ...to.query, email } })

  // No session — send to login
  next('/login')
})

export default router
