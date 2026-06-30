<template>
  <div class="error-page">
    <div class="error-bg"><div class="bg-gradient"></div></div>
    <div class="error-container">
      <div class="error-card">
        <div class="error-icon">
          <svg viewBox="0 0 52 52" width="64" height="64">
            <circle cx="26" cy="26" r="25" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="157" stroke-dashoffset="0" opacity="0.2"/>
            <path d="M20 20l12 12M32 20l-12 12" fill="none" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>
        <h1 class="error-title">Authentication Failed</h1>
        <p class="error-subtitle">{{ errorMessage }}</p>
        <div class="actions">
          <button class="btn btn-primary" @click="$router.push('/login')">Try Again</button>
          <button class="btn btn-secondary" @click="$router.push('/login')">Back to Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthError',
  computed: {
    errorMessage() {
      return this.$route.query.message || 'Something went wrong during sign-in. Please try again.'
    }
  }
}
</script>

<style scoped>
.error-page {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  position: relative; background: #0f172a;
}
.error-bg { position: absolute; inset: 0; }
.bg-gradient {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(220,38,38,0.15), transparent),
    radial-gradient(ellipse 60% 40% at 80% 50%, rgba(220,38,38,0.08), transparent);
}
.error-container { position: relative; z-index: 1; width: 100%; max-width: 400px; padding: 24px; }
.error-card {
  background: rgba(255,255,255,0.97); border-radius: 16px; padding: 48px 32px;
  text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
.error-icon { margin-bottom: 24px; }
.error-title { font-size: 22px; font-weight: 700; color: #0f172a; margin: 0 0 8px; }
.error-subtitle { font-size: 14px; color: #64748b; margin: 0 0 32px; line-height: 1.6; }
.actions { display: flex; flex-direction: column; gap: 12px; }
.btn {
  padding: 13px 24px; border-radius: 8px; font-size: 15px; font-weight: 600;
  cursor: pointer; border: none; transition: all 0.15s;
}
.btn-primary { background: #0078D4; color: #fff; box-shadow: 0 2px 8px rgba(0,120,212,0.3); }
.btn-primary:hover { background: #005a9e; transform: translateY(-1px); }
.btn-secondary { background: transparent; color: #475569; border: 1px solid #e2e8f0; }
.btn-secondary:hover { background: #f8fafc; border-color: #cbd5e1; }
</style>
