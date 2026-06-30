<template>
  <div class="onboarding-page">
    <div class="onboarding-bg">
      <div class="bg-gradient"></div>
      <div class="bg-pattern"></div>
    </div>

    <div class="onboarding-container">
      <div class="onboarding-card">
        <div class="step-indicator">
          <div class="step" :class="{ active: step === 1, done: step > 1 }">
            <span class="step-num">{{ step > 1 ? '\u2713' : '1' }}</span>
            <span class="step-label">Notifications</span>
          </div>
          <div class="step-line" :class="{ active: step > 1 }"></div>
          <div class="step" :class="{ active: step === 2 }">
            <span class="step-num">2</span>
            <span class="step-label">Schedule</span>
          </div>
        </div>

        <!-- Step 1 -->
        <div v-if="step === 1">
          <h1 class="onboarding-title">Stay Updated</h1>
          <p class="onboarding-subtitle">Get notified about priority emails directly on WhatsApp.</p>

          <div class="toggle-row" @click="form.whatsappOptedIn = !form.whatsappOptedIn">
            <div class="toggle-info">
              <div class="toggle-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <span class="toggle-label">WhatsApp notifications</span>
                <span class="toggle-desc">Get priority alerts on your phone</span>
              </div>
            </div>
            <button class="toggle-switch" :class="{ on: form.whatsappOptedIn }" @click.stop="form.whatsappOptedIn = !form.whatsappOptedIn" type="button">
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
              <input v-model="form.phoneNumber" type="tel" class="phone-input" placeholder="Phone number" />
            </div>
          </div>

          <button class="btn btn-primary" @click="nextStep" :disabled="form.whatsappOptedIn && !form.phoneNumber">
            {{ form.whatsappOptedIn ? 'Continue' : 'Skip for now' }}
          </button>
        </div>

        <!-- Step 2 -->
        <div v-if="step === 2">
          <h1 class="onboarding-title">Set Your Schedule</h1>
          <p class="onboarding-subtitle">Choose when you'd like to receive your updates.</p>

          <div class="schedule-form">
            <div class="field-group">
              <label class="field-label">Morning digest</label>
              <p class="field-hint">Receive a summary of your inbox</p>
              <input v-model="form.digestTime" type="time" class="time-input" />
            </div>
            <div class="field-group">
              <label class="field-label">Priority prompt</label>
              <p class="field-hint">Get a WhatsApp prompt for tomorrow's priorities</p>
              <input v-model="form.whatsappPromptTime" type="time" class="time-input" :disabled="!form.whatsappOptedIn" />
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
    email() { return this.$route.query.email || '' },
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
          whatsappNumber: this.form.whatsappOptedIn ? `${this.form.countryCode}${this.form.phoneNumber}` : null,
        }
        await putOnboarding(this.email, payload)
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

.step-indicator { display: flex; align-items: center; justify-content: center; margin-bottom: 32px; }
.step { display: flex; align-items: center; gap: 8px; }
.step-num {
  width: 32px; height: 32px; border-radius: 50%; background: #f1f5f9; color: #94a3b8;
  display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600;
  transition: all 0.2s;
}
.step.active .step-num { background: #0078D4; color: #fff; box-shadow: 0 2px 8px rgba(0,120,212,0.3); }
.step.done .step-num { background: #059669; color: #fff; box-shadow: 0 2px 8px rgba(5,150,105,0.3); }
.step-label { font-size: 13px; color: #94a3b8; font-weight: 500; transition: color 0.2s; }
.step.active .step-label { color: #0f172a; }
.step.done .step-label { color: #059669; }
.step-line { width: 48px; height: 2px; background: #e2e8f0; margin: 0 12px; transition: background 0.2s; }
.step-line.active { background: #059669; }

.onboarding-title { font-size: 22px; font-weight: 700; color: #0f172a; margin: 0 0 8px; text-align: center; }
.onboarding-subtitle { font-size: 14px; color: #64748b; margin: 0 0 24px; text-align: center; }

.toggle-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px; background: #f8fafc; border-radius: 12px; margin-bottom: 20px; cursor: pointer;
}
.toggle-row:hover { background: #f1f5f9; }
.toggle-info { display: flex; align-items: center; gap: 12px; }
.toggle-icon {
  width: 40px; height: 40px; border-radius: 8px; display: flex;
  align-items: center; justify-content: center; background: rgba(37,211,102,0.1);
}
.toggle-label { font-size: 14px; font-weight: 600; color: #0f172a; display: block; }
.toggle-desc { font-size: 12px; color: #94a3b8; display: block; margin-top: 2px; }
.toggle-switch {
  width: 48px; height: 26px; border-radius: 9999px; background: #cbd5e1;
  border: none; cursor: pointer; position: relative; transition: background 0.2s; padding: 0; flex-shrink: 0;
}
.toggle-switch.on { background: #25D366; }
.toggle-knob {
  position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%;
  background: #fff; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}
.toggle-switch.on .toggle-knob { transform: translateX(22px); }

.phone-section { margin-bottom: 20px; }
.field-label { display: block; font-size: 13px; font-weight: 600; color: #0f172a; margin-bottom: 6px; }
.field-hint { font-size: 12px; color: #94a3b8; margin: 0 0 6px; }
.phone-input-group { display: flex; gap: 8px; }
.country-select {
  width: 120px; padding: 11px 8px; border: 1px solid #e2e8f0; border-radius: 8px;
  font-size: 14px; color: #0f172a; background: #fff; outline: none;
}
.phone-input {
  flex: 1; padding: 11px 12px; border: 1px solid #e2e8f0; border-radius: 8px;
  font-size: 14px; color: #0f172a; outline: none;
}
.country-select:focus, .phone-input:focus, .time-input:focus, .timezone-select:focus {
  border-color: #0078D4; box-shadow: 0 0 0 3px rgba(0,120,212,0.1);
}

.schedule-form { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
.field-group { display: flex; flex-direction: column; }
.time-input {
  padding: 11px 12px; border: 1px solid #e2e8f0; border-radius: 8px;
  font-size: 14px; color: #0f172a; outline: none; width: 100%;
}
.time-input:disabled { background: #f1f5f9; color: #94a3b8; cursor: not-allowed; }
.timezone-select {
  padding: 11px 12px; border: 1px solid #e2e8f0; border-radius: 8px;
  font-size: 14px; color: #0f172a; background: #fff; outline: none; width: 100%;
}

.button-row { display: flex; gap: 12px; }
.btn {
  flex: 1; padding: 13px; border-radius: 8px; font-size: 15px; font-weight: 600;
  cursor: pointer; border: none; transition: all 0.15s;
}
.btn-primary { background: #0078D4; color: #fff; box-shadow: 0 2px 8px rgba(0,120,212,0.3); }
.btn-primary:hover:not(:disabled) { background: #005a9e; transform: translateY(-1px); }
.btn-primary:disabled { background: #94a3b8; cursor: not-allowed; }
.btn-secondary { background: transparent; color: #475569; border: 1px solid #e2e8f0; }
.btn-secondary:hover { background: #f8fafc; }
.error-text { color: #dc2626; font-size: 13px; margin-top: 16px; text-align: center; }
</style>
