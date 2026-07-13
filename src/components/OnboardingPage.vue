<template>
  <div class="onboarding-page">
    <div class="onboarding-bg">
      <div class="bg-gradient"></div>
      <div class="bg-pattern"></div>
    </div>

    <div class="onboarding-container">
      <div class="onboarding-card">
        <h1 class="onboarding-title">Set Your Schedule</h1>
        <p class="onboarding-subtitle">Choose when you'd like to receive your daily digest.</p>

        <div class="schedule-form">
          <div class="field-group">
            <label class="field-label">Morning digest</label>
            <p class="field-hint">Receive a summary of your inbox</p>
            <input v-model="form.digestTime" type="time" class="time-input" />
          </div>
          <div class="field-group">
            <label class="field-label">Timezone</label>
            <select v-model="form.timezone" class="timezone-select">
              <option value="Europe/Lisbon">Europe/Lisbon (GMT+0/+1)</option>
              <option value="Europe/London">Europe/London (GMT+0/+1)</option>
              <option value="Europe/Paris">Europe/Paris (GMT+1/+2)</option>
              <option value="Europe/Berlin">Europe/Berlin (GMT+1/+2)</option>
              <option value="Europe/Madrid">Europe/Madrid (GMT+1/+2)</option>
              <option value="America/New_York">America/New_York (GMT-5/-4)</option>
              <option value="America/Chicago">America/Chicago (GMT-6/-5)</option>
              <option value="America/Denver">America/Denver (GMT-7/-6)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (GMT-8/-7)</option>
              <option value="America/Sao_Paulo">America/Sao_Paulo (GMT-3)</option>
              <option value="America/Buenos_Aires">America/Buenos_Aires (GMT-3)</option>
              <option value="America/Santiago">America/Santiago (GMT-4/-3)</option>
              <option value="America/Bogota">America/Bogota (GMT-5)</option>
              <option value="America/Mexico_City">America/Mexico_City (GMT-6/-5)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
              <option value="Asia/Shanghai">Asia/Shanghai (GMT+8)</option>
              <option value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</option>
              <option value="Australia/Sydney">Australia/Sydney (GMT+10/+11)</option>
            </select>
          </div>
        </div>

        <button class="btn btn-primary" @click="handleSubmit" :disabled="loading">
          {{ loading ? 'Saving...' : 'Finish Setup' }}
        </button>

        <p v-if="error" class="error-text">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { putOnboarding } from '../api.js'

export default {
  name: 'OnboardingPage',
  data() {
    return {
      loading: false,
      error: '',
      form: {
        digestTime: '08:00',
        timezone: 'Europe/Lisbon',
      },
    }
  },
  computed: {
    email() { return this.$route.query.email || '' },
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      this.error = ''
      try {
        await putOnboarding(this.email, {
          digestTime: this.form.digestTime,
          timezone: this.form.timezone,
        })
        this.$router.push('/dashboard?email=' + encodeURIComponent(this.email))
      } catch (e) {
        this.error = e.message || 'Something went wrong. Please try again.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.onboarding-page {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden; background: #0f172a;
}
.onboarding-bg { position: absolute; inset: 0; }
.bg-gradient {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,120,212,0.25), transparent),
    radial-gradient(ellipse 60% 40% at 20% 50%, rgba(108,92,231,0.15), transparent),
    radial-gradient(ellipse 50% 50% at 80% 80%, rgba(0,120,212,0.1), transparent);
}
.bg-pattern {
  position: absolute; inset: 0; opacity: 0.03;
  background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
  background-size: 32px 32px;
}
.onboarding-container { position: relative; z-index: 1; width: 100%; max-width: 460px; padding: 24px; }
.onboarding-card {
  background: rgba(255,255,255,0.97); border-radius: 16px;
  padding: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

.onboarding-title { font-size: 22px; font-weight: 700; color: #0f172a; margin: 0 0 8px; text-align: center; }
.onboarding-subtitle { font-size: 14px; color: #64748b; margin: 0 0 24px; text-align: center; }

.schedule-form { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
.field-group { display: flex; flex-direction: column; }
.field-label { display: block; font-size: 13px; font-weight: 600; color: #0f172a; margin-bottom: 6px; }
.field-hint { font-size: 12px; color: #94a3b8; margin: 0 0 6px; }
.time-input {
  padding: 11px 12px; border: 1px solid #e2e8f0; border-radius: 8px;
  font-size: 14px; color: #0f172a; outline: none; width: 100%;
}
.time-input:focus, .timezone-select:focus {
  border-color: #0078D4; box-shadow: 0 0 0 3px rgba(0,120,212,0.1);
}
.timezone-select {
  padding: 11px 12px; border: 1px solid #e2e8f0; border-radius: 8px;
  font-size: 14px; color: #0f172a; background: #fff; outline: none; width: 100%;
}

.btn {
  width: 100%; padding: 13px; border-radius: 8px; font-size: 15px; font-weight: 600;
  cursor: pointer; border: none; transition: all 0.15s;
}
.btn-primary { background: #0078D4; color: #fff; box-shadow: 0 2px 8px rgba(0,120,212,0.3); }
.btn-primary:hover:not(:disabled) { background: #005a9e; transform: translateY(-1px); }
.btn-primary:disabled { background: #94a3b8; cursor: not-allowed; }
.error-text { color: #dc2626; font-size: 13px; margin-top: 16px; text-align: center; }
</style>
