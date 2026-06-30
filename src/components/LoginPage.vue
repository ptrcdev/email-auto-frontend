<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="bg-gradient"></div>
      <div class="bg-pattern"></div>
    </div>

    <div class="login-container">
      <div class="login-card">
        <div class="brand">
          <div class="brand-icon">A</div>
          <h1 class="brand-name">AMICUS</h1>
          <p class="brand-tagline">Your intelligent email assistant</p>
        </div>

        <div class="login-divider">
          <span>Sign in to continue</span>
        </div>

        <div class="button-group">
          <a :href="`${apiUrl}/auth/google`" class="btn btn-google">
            <svg class="btn-icon" viewBox="0 0 24 24" width="20" height="20">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </a>

          <a :href="`${apiUrl}/auth/microsoft`" class="btn btn-outlook">
            <svg class="btn-icon" viewBox="0 0 24 24" width="20" height="20">
              <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
              <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
              <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
              <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
            </svg>
            Continue with Outlook
          </a>
        </div>

        <p class="login-footer">
          By signing in, you agree to our terms of service.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const apiUrl = import.meta.env.VITE_API_URL
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #0f172a;
}

.login-bg {
  position: absolute;
  inset: 0;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 120, 212, 0.25), transparent),
    radial-gradient(ellipse 60% 40% at 80% 50%, rgba(108, 92, 231, 0.15), transparent),
    radial-gradient(ellipse 50% 50% at 20% 80%, rgba(0, 120, 212, 0.1), transparent);
}

.bg-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
  background-size: 32px 32px;
}

.login-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  padding: 24px;
}

.login-card {
  background: rgba(255, 255, 255, 0.97);
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.brand {
  text-align: center;
  margin-bottom: 32px;
}

.brand-icon {
  display: inline-flex;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0078D4, #6C5CE7);
  color: #fff;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(0, 120, 212, 0.3);
}

.brand-name {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin: 0;
  background: linear-gradient(135deg, #0078D4, #6C5CE7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline {
  font-size: 14px;
  color: #64748b;
  margin: 8px 0 0;
}

.login-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.login-divider::before,
.login-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.login-divider span {
  font-size: 13px;
  color: #94a3b8;
  white-space: nowrap;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  transition: all 0.15s;
  border: none;
}

.btn-icon { flex-shrink: 0; }

.btn-google {
  background: #fff;
  color: #0f172a;
  border: 1px solid #e2e8f0;
}

.btn-google:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.btn-outlook {
  background: #0078D4;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 120, 212, 0.3);
}

.btn-outlook:hover {
  background: #005a9e;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 120, 212, 0.4);
}

.btn:active { transform: translateY(0); }

.login-footer {
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
  margin-top: 24px;
}
</style>
