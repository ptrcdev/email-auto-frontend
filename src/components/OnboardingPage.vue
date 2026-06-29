<template>
  <div class="onboarding-container">
    <div class="onboarding-card">
      <div class="step-indicator">
        <div class="step" :class="{ active: step === 1, done: step > 1 }">
          <span class="step-num">{{ step > 1 ? '\u2713' : '1' }}</span>
          <span class="step-label">WhatsApp</span>
        </div>
        <div class="step-line" :class="{ active: step > 1 }"></div>
        <div class="step" :class="{ active: step === 2 }">
          <span class="step-num">2</span>
          <span class="step-label">Schedule</span>
        </div>
      </div>

      <!-- Step 1: WhatsApp -->
      <div v-if="step === 1">
        <h1 class="onboarding-title">Stay Updated via WhatsApp</h1>
        <p class="onboarding-subtitle">Get notified about priority emails directly on WhatsApp.</p>

        <div class="toggle-row">
          <label class="toggle-label">Enable WhatsApp notifications</label>
          <button
            class="toggle-switch"
            :class="{ on: form.whatsappOptedIn }"
            @click="form.whatsappOptedIn = !form.whatsappOptedIn"
            type="button"
          >
            <span class="toggle-knob"></span>
          </button>
        </div>

        <div v-if="form.whatsappOptedIn" class="phone-section">
          <label class="field-label">Phone number</label>
          <div class="phone-input-group">
            <select v-model="form.countryCode" class="country-select">
              <option value="+1">+1 (US/CA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+55">+55 (BR)</option>
              <option value="+351">+351 (PT)</option>
              <option value="+34">+34 (ES)</option>
              <option value="+33">+33 (FR)</option>
              <option value="+49">+49 (DE)</option>
              <option value="+91">+91 (IN)</option>
              <option value="+86">+86 (CN)</option>
              <option value="+81">+81 (JP)</option>
              <option value="+61">+61 (AU)</option>
              <option value="+52">+52 (MX)</option>
              <option value="+54">+54 (AR)</option>
              <option value="+56">+56 (CL)</option>
              <option value="+57">+57 (CO)</option>
            </select>
            <input
              v-model="form.phoneNumber"
              type="tel"
              class="phone-input"
              placeholder="Phone number"
              required
            />
          </div>
        </div>

        <button class="btn btn-primary" @click="nextStep" :disabled="form.whatsappOptedIn && !form.phoneNumber">
          {{ form.whatsappOptedIn ? 'Continue' : 'Skip' }}
        </button>
      </div>

      <!-- Step 2: Schedule -->
      <div v-if="step === 2">
        <h1 class="onboarding-title">Set Your Schedule</h1>
        <p class="onboarding-subtitle">Choose when you'd like to receive your updates.</p>

        <div class="schedule-form">
          <div class="field-group">
            <label class="field-label">Digest email time</label>
            <p class="field-hint">Receive a morning summary of your inbox</p>
            <input
              v-model="form.digestTime"
              type="time"
              class="time-input"
            />
          </div>

          <div class="field-group">
            <label class="field-label">Priority prompt time</label>
            <p class="field-hint">Get a WhatsApp prompt to set tomorrow's priorities</p>
            <input
              v-model="form.whatsappPromptTime"
              type="time"
              class="time-input"
              :disabled="!form.whatsappOptedIn"
            />
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

        <div class="button-row">
          <button class="btn btn-secondary" @click="step = 1">Back</button>
          <button class="btn btn-primary" @click="handleSubmit" :disabled="loading">
            {{ loading ? 'Saving...' : 'Finish Setup' }}
          </button>
        </div>
      </div>

      <p v-if="error" class="error-text">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { putOnboarding } from '../api.js'

export default {
  name: 'OnboardingPage',
  data() {
    return {
      step: 1,
      loading: false,
      error: '',
      form: {
        countryCode: '+1',
        phoneNumber: '',
        whatsappOptedIn: false,
        digestTime: '08:00',
        whatsappPromptTime: '18:00',
        timezone: 'Europe/Lisbon',
      },
    }
  },
  computed: {
    email() {
      return this.$route.query.email || ''
    },
  },
  methods: {
    nextStep() {
      if (this.form.whatsappOptedIn && !this.form.phoneNumber) return
      this.step = 2
    },
    async handleSubmit() {
      this.loading = true
      this.error = ''
      try {
        const payload = {
          digestTime: this.form.digestTime,
          whatsappPromptTime: this.form.whatsappPromptTime,
          timezone: this.form.timezone,
          whatsappOptedIn: this.form.whatsappOptedIn,
          whatsappNumber: this.form.whatsappOptedIn
            ? `${this.form.countryCode}${this.form.phoneNumber}`
            : null,
        }
        await putOnboarding(this.email, payload)
        this.$router.push('/success?email=' + encodeURIComponent(this.email))
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
.onboarding-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
}

.onboarding-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 48px 40px;
  width: 100%;
  max-width: 460px;
  text-align: center;
}

.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-bottom: 36px;
}

.step {
  display: flex;
  align-items: center;
  gap: 8px;
}

.step-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
}

.step.active .step-num {
  background: #0078D4;
  color: #fff;
}

.step.done .step-num {
  background: #22c55e;
  color: #fff;
}

.step-label {
  font-size: 13px;
  color: #9ca3af;
  font-weight: 500;
}

.step.active .step-label {
  color: #1a1a1a;
}

.step-line {
  width: 48px;
  height: 2px;
  background: #e5e7eb;
  margin: 0 12px;
}

.step-line.active {
  background: #22c55e;
}

.onboarding-title {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.onboarding-subtitle {
  font-size: 15px;
  color: #666;
  margin: 0 0 28px;
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #f9fafb;
  border-radius: 10px;
  margin-bottom: 20px;
}

.toggle-label {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.toggle-switch {
  width: 48px;
  height: 26px;
  border-radius: 13px;
  background: #d1d5db;
  border: none;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
  padding: 0;
}

.toggle-switch.on {
  background: #25D366;
}

.toggle-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.toggle-switch.on .toggle-knob {
  transform: translateX(22px);
}

.phone-section {
  margin-bottom: 20px;
}

.field-label {
  display: block;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.field-hint {
  font-size: 13px;
  color: #888;
  margin: 0 0 8px;
  text-align: left;
}

.phone-input-group {
  display: flex;
  gap: 8px;
}

.country-select {
  width: 120px;
  padding: 12px 8px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background: #fff;
  outline: none;
}

.country-select:focus,
.phone-input:focus,
.time-input:focus,
.timezone-select:focus {
  border-color: #0078D4;
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.15);
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

.schedule-form {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
}

.field-group {
  display: flex;
  flex-direction: column;
}

.time-input {
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  outline: none;
  width: 100%;
}

.time-input:disabled {
  background: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}

.timezone-select {
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background: #fff;
  outline: none;
  width: 100%;
}

.button-row {
  display: flex;
  gap: 12px;
}

.btn {
  flex: 1;
  padding: 13px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;
}

.btn-primary {
  background: #0078D4;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: #006CBE;
}

.btn-primary:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.btn-secondary {
  background: transparent;
  color: #666;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #f9fafb;
}

.error-text {
  color: #ef4444;
  font-size: 14px;
  margin-top: 16px;
}
</style>
