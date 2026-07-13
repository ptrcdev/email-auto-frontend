<template>
  <div class="settings-page">
    <header class="settings-header">
      <div class="header-left">
        <div class="brand">
          <div class="brand-icon">A</div>
          <span class="brand-name">AMICUS</span>
        </div>
      </div>
      <div class="header-right">
        <button class="btn-back" @click="$router.push({ path: '/dashboard', query: { email } })">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Dashboard
        </button>
      </div>
    </header>

    <main class="settings-main">
      <h1 class="settings-title">Settings</h1>

      <div class="settings-card">
        <h2>Digest Schedule</h2>
        <p class="section-desc">Choose when you receive your daily email summary.</p>

        <div class="field-group">
          <label class="field-label">Morning digest time</label>
          <input v-model="form.digestTime" type="time" class="time-input" />
        </div>

        <div class="field-group">
          <label class="field-label">Timezone</label>
          <select v-model="form.timezone" class="select-input">
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

      <div class="settings-card">
        <h2>Daily Reminder</h2>
        <p class="section-desc">Get a reminder to set tomorrow's priorities.</p>

        <div class="toggle-row" @click="form.reminderEnabled = !form.reminderEnabled">
          <div class="toggle-info">
            <div>
              <span class="toggle-label">Enable daily reminder</span>
              <span class="toggle-desc">Receive a calendar event and/or push notification</span>
            </div>
          </div>
          <button class="toggle-switch" :class="{ on: form.reminderEnabled }" @click.stop="form.reminderEnabled = !form.reminderEnabled" type="button">
            <span class="toggle-knob"></span>
          </button>
        </div>

        <div v-if="form.reminderEnabled" class="reminder-options">
          <div class="field-group">
            <label class="field-label">Reminder time</label>
            <input v-model="form.reminderTime" type="time" class="time-input" />
          </div>

          <div class="reminder-channels">
            <h3>Notification channels</h3>

            <div class="channel-option">
              <div class="channel-info">
                <div class="channel-icon cal-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <div>
                  <span class="channel-label">Google Calendar</span>
                  <span class="channel-desc">Creates a daily calendar event</span>
                </div>
              </div>
              <a v-if="!calendarConnected" :href="calendarConnectUrl" class="btn-connect">Connect</a>
              <span v-else class="connected-badge">Connected</span>
            </div>

            <div class="channel-option">
              <div class="channel-info">
                <div class="channel-icon ics-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div>
                  <span class="channel-label">Apple Calendar / .ics</span>
                  <span class="channel-desc">Download a file to import into any calendar app</span>
                </div>
              </div>
              <a :href="icsDownloadUrl" class="btn-download" download>Download .ics</a>
            </div>

            <div class="channel-option">
              <div class="channel-info">
                <div class="channel-icon push-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
                <div>
                  <span class="channel-label">Push Notifications</span>
                  <span class="channel-desc">Browser notification (requires PWA install on mobile)</span>
                </div>
              </div>
              <button v-if="!pushEnabled" class="btn-connect" @click="enablePush" :disabled="!pushSupported">
                {{ pushSupported ? 'Enable' : 'Not supported' }}
              </button>
              <button v-else class="btn-disconnect" @click="disablePush">Disable</button>
            </div>

            <p v-if="!pushSupported" class="push-note">Push notifications require a PWA-capable browser. On iOS, add this app to your Home Screen first.</p>
          </div>
        </div>
      </div>

      <button class="btn btn-primary" @click="handleSave" :disabled="saving">
        {{ saving ? 'Saving...' : 'Save Settings' }}
      </button>

      <p v-if="message" class="message" :class="{ error: isError }">{{ message }}</p>
    </main>
  </div>
</template>

<script>
import { getUserSettings, saveUserSettings, subscribePush, unsubscribePush, getVapidPublicKey } from '../api.js'

export default {
  name: 'SettingsPage',
  data() {
    return {
      form: {
        digestTime: '08:00',
        reminderTime: '18:00',
        reminderEnabled: false,
        timezone: 'Europe/Lisbon',
      },
      userId: '',
      calendarConnected: false,
      pushEnabled: false,
      pushSupported: false,
      saving: false,
      message: '',
      isError: false,
    }
  },
  computed: {
    email() { return this.$route.query.email || '' },
    calendarConnectUrl() {
      const id = this.userId || this.email
      return `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/calendar/connect/${encodeURIComponent(id)}`
    },
    icsDownloadUrl() {
      return `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/calendar/ics/${encodeURIComponent(this.email)}`
    },
  },
  async mounted() {
    if (!this.email) {
      this.$router.push('/login')
      return
    }

    await this.loadSettings()
    this.checkPushSupport()

    if (this.$route.query.calendar === 'connected') {
      this.calendarConnected = true
      this.message = 'Calendar connected successfully!'
      // Auto-enable the reminder toggle if it wasn't already on
      if (!this.form.reminderEnabled) {
        this.form.reminderEnabled = true
        await saveUserSettings(this.email, this.form).catch(() => {})
      }
    }
  },
  methods: {
    async loadSettings() {
      try {
        const settings = await getUserSettings(this.email)
        this.userId = settings.userId || ''
        this.form.digestTime = settings.digestTime || '08:00'
        this.form.reminderTime = settings.reminderTime || '18:00'
        this.form.reminderEnabled = settings.reminderEnabled || false
        this.form.timezone = settings.timezone || 'Europe/Lisbon'
        this.calendarConnected = settings.calendarConnected || false
        this.pushEnabled = !!settings.pushSubscription
      } catch (e) {
        console.error('Failed to load settings:', e)
      }
    },
    checkPushSupport() {
      this.pushSupported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window
    },
    async enablePush() {
      if (!this.pushSupported) return
      try {
        const permission = await Notification.requestPermission()
        if (permission !== 'granted') {
          this.message = 'Notification permission denied'
          this.isError = true
          return
        }

        const reg = await navigator.serviceWorker.ready
        const vapidRes = await getVapidPublicKey()
        if (!vapidRes.publicKey) {
          this.message = 'Push notifications not configured on server'
          this.isError = true
          return
        }

        const subscription = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(vapidRes.publicKey),
        })

        await subscribePush(this.email, subscription.toJSON())
        this.pushEnabled = true
        this.message = 'Push notifications enabled!'
        this.isError = false
      } catch (e) {
        this.message = e.message || 'Failed to enable push'
        this.isError = true
      }
    },
    async disablePush() {
      try {
        const reg = await navigator.serviceWorker.ready
        const subscription = await reg.pushManager.getSubscription()
        if (subscription) await subscription.unsubscribe()
        await unsubscribePush(this.email)
        this.pushEnabled = false
        this.message = 'Push notifications disabled'
        this.isError = false
      } catch (e) {
        console.error('Failed to disable push:', e)
      }
    },
    urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4)
      const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
      const rawData = window.atob(base64)
      const outputArray = new Uint8Array(rawData.length)
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
    },
    async handleSave() {
      this.saving = true
      this.message = ''
      this.isError = false
      try {
        await saveUserSettings(this.email, this.form)
        this.message = 'Settings saved!'
        this.isError = false
      } catch (e) {
        this.message = e.message || 'Failed to save settings'
        this.isError = true
      } finally {
        this.saving = false
      }
    },
  },
}
</script>

<style scoped>
.settings-page { min-height: 100vh; background: #f8fafc; }

.settings-header {
  background: #fff; border-bottom: 1px solid #e2e8f0;
  padding: 0 32px; height: 60px;
  display: flex; align-items: center; justify-content: space-between;
}
.header-left { display: flex; align-items: center; gap: 20px; }
.brand { display: flex; align-items: center; gap: 8px; }
.brand-icon {
  width: 32px; height: 32px; border-radius: 8px;
  background: linear-gradient(135deg, #0078D4, #6C5CE7);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 15px; font-weight: 800;
}
.brand-name {
  font-size: 16px; font-weight: 800; letter-spacing: -0.3px;
  background: linear-gradient(135deg, #0078D4, #6C5CE7);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.btn-back {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 14px; border-radius: 8px; border: 1px solid #e2e8f0;
  background: #fff; color: #475569; font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 0.15s;
}
.btn-back:hover { background: #f1f5f9; }

.settings-main { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
.settings-title { font-size: 24px; font-weight: 700; color: #0f172a; margin: 0 0 24px; }

.settings-card {
  background: #fff; border-radius: 12px; padding: 24px;
  border: 1px solid #e2e8f0; margin-bottom: 20px;
}
.settings-card h2 { font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 4px; }
.section-desc { font-size: 13px; color: #64748b; margin: 0 0 20px; }

.field-group { margin-bottom: 16px; }
.field-label { display: block; font-size: 13px; font-weight: 600; color: #0f172a; margin-bottom: 6px; }
.time-input, .select-input {
  width: 100%; padding: 11px 12px; border: 1px solid #e2e8f0; border-radius: 8px;
  font-size: 14px; color: #0f172a; outline: none;
}
.time-input:focus, .select-input:focus {
  border-color: #0078D4; box-shadow: 0 0 0 3px rgba(0,120,212,0.1);
}

.toggle-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px; background: #f8fafc; border-radius: 12px; cursor: pointer;
}
.toggle-row:hover { background: #f1f5f9; }
.toggle-info { display: flex; align-items: center; gap: 12px; }
.toggle-label { font-size: 14px; font-weight: 600; color: #0f172a; display: block; }
.toggle-desc { font-size: 12px; color: #94a3b8; display: block; margin-top: 2px; }
.toggle-switch {
  width: 48px; height: 26px; border-radius: 9999px; background: #cbd5e1;
  border: none; cursor: pointer; position: relative; transition: background 0.2s; padding: 0; flex-shrink: 0;
}
.toggle-switch.on { background: #0078D4; }
.toggle-knob {
  position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%;
  background: #fff; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}
.toggle-switch.on .toggle-knob { transform: translateX(22px); }

.reminder-options { margin-top: 16px; }
.reminder-channels h3 {
  font-size: 13px; font-weight: 700; color: #94a3b8; text-transform: uppercase;
  letter-spacing: 0.3px; margin: 0 0 12px;
}

.channel-option {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px; background: #f8fafc; border-radius: 10px; margin-bottom: 8px;
}
.channel-info { display: flex; align-items: center; gap: 12px; }
.channel-icon {
  width: 40px; height: 40px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
}
.cal-icon { background: #dbeafe; color: #2563eb; }
.ics-icon { background: #fef3c7; color: #d97706; }
.push-icon { background: #e0e7ff; color: #4f46e5; }
.channel-label { font-size: 14px; font-weight: 600; color: #0f172a; display: block; }
.channel-desc { font-size: 12px; color: #94a3b8; display: block; margin-top: 2px; }

.btn-connect, .btn-download {
  padding: 7px 14px; border-radius: 6px; font-size: 12px; font-weight: 600;
  text-decoration: none; cursor: pointer; border: none; transition: all 0.15s;
}
.btn-connect { background: #0078D4; color: #fff; }
.btn-connect:hover { background: #005a9e; }
.btn-connect:disabled { background: #cbd5e1; cursor: not-allowed; }
.btn-download { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
.btn-download:hover { background: #e2e8f0; }
.btn-disconnect { padding: 7px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; background: #fef2f2; color: #dc2626; border: 1px solid #fca5a5; cursor: pointer; }
.connected-badge { font-size: 12px; font-weight: 600; color: #059669; }

.push-note { font-size: 12px; color: #94a3b8; margin-top: 8px; font-style: italic; }

.btn {
  width: 100%; padding: 13px; border-radius: 8px; font-size: 15px; font-weight: 600;
  cursor: pointer; border: none; transition: all 0.15s;
}
.btn-primary { background: #0078D4; color: #fff; box-shadow: 0 2px 8px rgba(0,120,212,0.3); }
.btn-primary:hover:not(:disabled) { background: #005a9e; }
.btn-primary:disabled { background: #94a3b8; cursor: not-allowed; }

.message { font-size: 13px; margin-top: 12px; text-align: center; color: #059669; }
.message.error { color: #dc2626; }
</style>
