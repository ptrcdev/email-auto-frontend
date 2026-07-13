<template>
  <div class="success-page">
    <div class="success-bg">
      <div class="bg-gradient"></div>
    </div>
    <div class="success-container">
      <div class="success-card">
        <div class="success-icon">
          <svg viewBox="0 0 52 52" width="64" height="64">
            <circle cx="26" cy="26" r="25" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="157" stroke-dashoffset="0" opacity="0.2"/>
            <circle cx="26" cy="26" r="25" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="157" stroke-dashoffset="157" class="circle-anim"/>
            <path d="M15 27l7 7 15-15" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="40" stroke-dashoffset="40" class="check-anim"/>
          </svg>
        </div>
        <h1 class="success-title">Welcome to AMICUS</h1>
        <p class="success-subtitle">Authentication successful</p>
        <div class="redirect-info">
          <div class="spinner"></div>
          <span>Redirecting{{ isNew ? ' to setup' : ' to dashboard' }}...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveSession } from '../session.js'

export default {
  name: 'AuthSuccess',
  data() {
    return { isNew: false }
  },
  mounted() {
    const params = new URLSearchParams(this.$route.query)
    const email = params.get('email')
    this.isNew = params.get('new') === 'true'
    if (!email) { this.$router.replace('/login'); return }
    saveSession(email)
    setTimeout(() => {
      if (this.isNew) {
        this.$router.replace({ path: '/onboarding', query: { email } })
      } else {
        this.$router.replace({ path: '/dashboard', query: { email } })
      }
    }, 1200)
  },
}
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #0f172a;
}
.success-bg { position: absolute; inset: 0; }
.bg-gradient {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(5,150,105,0.2), transparent),
    radial-gradient(ellipse 60% 40% at 80% 50%, rgba(5,150,105,0.1), transparent);
}
.success-container { position: relative; z-index: 1; width: 100%; max-width: 400px; padding: 24px; }
.success-card {
  background: rgba(255,255,255,0.97);
  border-radius: 16px;
  padding: 48px 32px;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
.success-icon { margin-bottom: 24px; }
.circle-anim { animation: drawCircle 0.6s cubic-bezier(0.4,0,0.2,1) 0.2s forwards; }
.check-anim { animation: drawCheck 0.4s cubic-bezier(0.4,0,0.2,1) 0.6s forwards; }
@keyframes drawCircle { to { stroke-dashoffset: 0; } }
@keyframes drawCheck { to { stroke-dashoffset: 0; } }
.success-title { font-size: 22px; font-weight: 700; color: #0f172a; margin: 0 0 8px; }
.success-subtitle { font-size: 14px; color: #64748b; margin: 0 0 32px; }
.redirect-info {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  font-size: 13px; color: #94a3b8;
}
.spinner {
  width: 16px; height: 16px;
  border: 2px solid #e2e8f0; border-top-color: #0078D4;
  border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
