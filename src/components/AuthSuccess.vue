<template>
  <div class="success-container">
    <div class="success-card">
      <div class="success-icon">
        <svg viewBox="0 0 52 52" width="64" height="64">
          <circle cx="26" cy="26" r="25" fill="none" stroke="#22c55e" stroke-width="2"/>
          <path d="M15 27l7 7 15-15" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <h1 class="success-title">Authentication Successful</h1>
      <p class="success-subtitle">You've been signed in successfully.</p>

      <p class="redirect-text">Redirecting to onboarding...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthSuccess',
  mounted() {
    const params = new URLSearchParams(this.$route.query)
    const email = params.get('email')
    const isNew = params.get('new') === 'true'

    if (isNew && email) {
      this.$router.replace({
        path: '/onboarding',
        query: { email },
      })
    }
  },
}
</script>

<style scoped>
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
}

.success-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 48px 40px;
  width: 100%;
  max-width: 440px;
  text-align: center;
}

.success-icon {
  margin-bottom: 20px;
}

.success-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.success-subtitle {
  font-size: 15px;
  color: #666;
  margin: 0 0 32px;
}

.whatsapp-section {
  background: #f8fdf8;
  border: 1px solid #e0f5e0;
  border-radius: 10px;
  padding: 24px;
  text-align: left;
}

.whatsapp-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.whatsapp-header h2 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.whatsapp-desc {
  font-size: 14px;
  color: #555;
  margin: 0 0 20px;
}

.phone-input-group {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.country-select {
  width: 110px;
  padding: 12px 8px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background: #fff;
  outline: none;
}

.country-select:focus {
  border-color: #25D366;
  box-shadow: 0 0 0 2px rgba(37, 211, 102, 0.15);
}

.phone-input {
  flex: 1;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  outline: none;
}

.phone-input:focus {
  border-color: #25D366;
  box-shadow: 0 0 0 2px rgba(37, 211, 102, 0.15);
}

.btn {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;
}

.btn + .btn {
  margin-top: 10px;
}

.btn-save {
  background: #25D366;
  color: #fff;
}

.btn-save:hover {
  background: #1fb85a;
}

.btn-skip {
  background: transparent;
  color: #666;
  border: 1px solid #d1d5db;
}

.btn-skip:hover {
  background: #f9fafb;
}
</style>
