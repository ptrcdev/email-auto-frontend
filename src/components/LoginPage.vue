<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Email Automation</h1>
      <p class="login-subtitle">Sign in to continue</p>

      <div class="button-group">
        <a :href="`${import.meta.env.VITE_API_URL}/auth/google`" class="btn btn-google">
          <svg class="btn-icon" viewBox="0 0 24 24" width="20" height="20">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </a>

        <a :href="`${import.meta.env.VITE_API_URL}/auth/microsoft`" class="btn btn-outlook">
          <svg class="btn-icon" viewBox="0 0 24 24" width="20" height="20">
            <path d="M21.3 3H2.7C1.76 3 1 3.76 1 4.7v14.6c0 .94.76 1.7 1.7 1.7h18.6c.94 0 1.7-.76 1.7-1.7V4.7c0-.94-.76-1.7-1.7-1.7z" fill="#0078D4"/>
            <path d="M21.3 3l-9.3 7.5L2.7 3" fill="#0058A3"/>
            <path d="M1 4.7V19.3l8.5-6.8" fill="#28A8EA"/>
            <path d="M23 4.7V19.3l-8.5-6.8" fill="#28A8EA"/>
            <path d="M1 4.7l9.5 6.8" fill="#0058A3"/>
            <path d="M23 4.7l-9.5 6.8" fill="#0058A3"/>
          </svg>
          Sign in with Outlook
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
}

.login-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 48px 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.login-subtitle {
  font-size: 15px;
  color: #666;
  margin: 0 0 32px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
}

.btn-icon {
  flex-shrink: 0;
}

.btn-google {
  background: #fff;
  color: #333;
  border: 1px solid #dadce0;
}

.btn-google:hover {
  background: #f8f9fa;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.btn-outlook {
  background: #0078D4;
  color: #fff;
  border: 1px solid #0078D4;
}

.btn-outlook:hover {
  background: #006CBE;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
</style>
