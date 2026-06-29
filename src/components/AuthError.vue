<template>
  <div class="error-container">
    <div class="error-card">
      <div class="error-icon">
        <svg viewBox="0 0 52 52" width="64" height="64">
          <circle cx="26" cy="26" r="25" fill="none" stroke="#ef4444" stroke-width="2"/>
          <line x1="16" y1="16" x2="36" y2="36" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>
          <line x1="36" y1="16" x2="16" y2="36" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </div>

      <h1 class="error-title">Authentication Failed</h1>
      <p class="error-subtitle">Something went wrong during sign-in.</p>
      <p class="error-message">{{ message }}</p>

      <div class="actions">
        <button class="btn btn-retry" @click="handleRetry">Try Again</button>
        <button class="btn btn-home" @click="handleHome">Back to Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthError',
  props: {
    message: {
      type: String,
      default: 'We couldn\'t complete your authentication. Please check your credentials and try again.'
    }
  },
  methods: {
    handleRetry() {
      this.$router.push('/login')
    },
    handleHome() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
}

.error-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 48px 40px;
  width: 100%;
  max-width: 440px;
  text-align: center;
}

.error-icon {
  margin-bottom: 20px;
}

.error-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.error-subtitle {
  font-size: 15px;
  color: #666;
  margin: 0 0 8px;
}

.error-message {
  font-size: 14px;
  color: #999;
  margin: 0 0 32px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;
}

.btn-retry {
  background: #0078D4;
  color: #fff;
}

.btn-retry:hover {
  background: #006CBE;
}

.btn-home {
  background: transparent;
  color: #666;
  border: 1px solid #d1d5db;
}

.btn-home:hover {
  background: #f9fafb;
}
</style>
