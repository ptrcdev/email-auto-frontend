<template>
  <div class="prompt-page">
    <header class="prompt-header">
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

    <main class="prompt-main">
      <div class="prompt-card">
        <div class="prompt-icon">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0078D4" stroke-width="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <h1>What matters tomorrow?</h1>
        <p class="prompt-subtitle">Set your priorities so AMICUS can highlight what's relevant in your inbox.</p>

        <div class="priorities-input">
          <div v-for="(priority, index) in priorities" :key="index" class="priority-row">
            <span class="priority-num">{{ index + 1 }}</span>
            <input
              v-model="priorities[index]"
              type="text"
              class="priority-input"
              :placeholder="placeholders[index] || 'Another priority...'"
              @keyup.enter="addPriority"
            />
            <button v-if="priorities.length > 1" class="btn-remove" @click="removePriority(index)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <button class="btn-add" @click="addPriority" v-if="priorities.length < 5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add another
          </button>
        </div>

        <button class="btn btn-primary" @click="handleSubmit" :disabled="loading || !hasPriorities">
          {{ loading ? 'Saving...' : 'Save Priorities' }}
        </button>

        <p v-if="message" class="message" :class="{ error: isError }">{{ message }}</p>

        <div v-if="activePriorities.length > 0" class="current-priorities">
          <h3>Current active priorities</h3>
          <div v-for="p in activePriorities" :key="p.id" class="active-priority">
            <span class="priority-text">{{ p.rawText }}</span>
            <span class="priority-expires">Expires {{ formatExpiry(p.expiresAt) }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getPriorities, savePriorities } from '../api.js'

export default {
  name: 'PromptPage',
  data() {
    return {
      priorities: ['', '', ''],
      activePriorities: [],
      loading: false,
      message: '',
      isError: false,
      placeholders: [
        'e.g. Follow up with contractor about permits',
        'e.g. Review budget for Phase 2',
        'e.g. Call insurance agent',
      ],
    }
  },
  computed: {
    email() { return this.$route.query.email || '' },
    hasPriorities() { return this.priorities.some(p => p.trim()) },
  },
  mounted() {
    if (!this.email) {
      this.$router.push('/login')
      return
    }
    this.loadPriorities()
  },
  methods: {
    async loadPriorities() {
      try {
        this.activePriorities = await getPriorities(this.email)
      } catch (e) {
        console.error('Failed to load priorities:', e)
      }
    },
    addPriority() {
      if (this.priorities.length < 5) {
        this.priorities.push('')
      }
    },
    removePriority(index) {
      this.priorities.splice(index, 1)
    },
    async handleSubmit() {
      this.loading = true
      this.message = ''
      this.isError = false
      try {
        const filled = this.priorities.filter(p => p.trim())
        await savePriorities(this.email, filled)
        this.message = 'Priorities saved!'
        await this.loadPriorities()
        this.priorities = ['', '', '']
      } catch (e) {
        this.message = e.message || 'Failed to save priorities'
        this.isError = true
      } finally {
        this.loading = false
      }
    },
    formatExpiry(dateStr) {
      const date = new Date(dateStr)
      const now = new Date()
      const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24))
      if (diffDays <= 0) return 'today'
      if (diffDays === 1) return 'tomorrow'
      return `in ${diffDays} days`
    },
  },
}
</script>

<style scoped>
.prompt-page {
  min-height: 100vh;
  background: #f8fafc;
}

.prompt-header {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 32px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.btn-back:hover { background: #f1f5f9; border-color: #cbd5e1; }

.prompt-main {
  max-width: 600px; margin: 0 auto; padding: 32px 24px;
}

.prompt-card {
  background: #fff; border-radius: 16px; padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.prompt-icon { text-align: center; margin-bottom: 16px; }

h1 {
  font-size: 22px; font-weight: 700; color: #0f172a;
  margin: 0 0 8px; text-align: center;
}

.prompt-subtitle {
  font-size: 14px; color: #64748b; margin: 0 0 24px; text-align: center;
}

.priorities-input { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }

.priority-row { display: flex; align-items: center; gap: 10px; }

.priority-num {
  width: 28px; height: 28px; border-radius: 50%;
  background: #f1f5f9; color: #64748b;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600; flex-shrink: 0;
}

.priority-input {
  flex: 1; padding: 12px 14px; border: 1px solid #e2e8f0; border-radius: 8px;
  font-size: 14px; color: #0f172a; outline: none;
}
.priority-input:focus {
  border-color: #0078D4; box-shadow: 0 0 0 3px rgba(0,120,212,0.1);
}

.btn-remove {
  width: 32px; height: 32px; border-radius: 6px; border: none;
  background: transparent; color: #94a3b8; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
}
.btn-remove:hover { background: #fef2f2; color: #dc2626; }

.btn-add {
  display: flex; align-items: center; gap: 6px;
  padding: 10px; border-radius: 8px; border: 1px dashed #cbd5e1;
  background: transparent; color: #64748b; font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 0.15s;
}
.btn-add:hover { border-color: #0078D4; color: #0078D4; }

.btn {
  width: 100%; padding: 13px; border-radius: 8px; font-size: 15px; font-weight: 600;
  cursor: pointer; border: none; transition: all 0.15s;
}
.btn-primary { background: #0078D4; color: #fff; box-shadow: 0 2px 8px rgba(0,120,212,0.3); }
.btn-primary:hover:not(:disabled) { background: #005a9e; transform: translateY(-1px); }
.btn-primary:disabled { background: #94a3b8; cursor: not-allowed; }

.message { font-size: 13px; margin-top: 12px; text-align: center; color: #059669; }
.message.error { color: #dc2626; }

.current-priorities { margin-top: 24px; padding-top: 20px; border-top: 1px solid #f1f5f9; }
.current-priorities h3 {
  font-size: 13px; font-weight: 700; color: #94a3b8; text-transform: uppercase;
  letter-spacing: 0.3px; margin: 0 0 12px;
}
.active-priority {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 12px; background: #f0fdf4; border-radius: 8px; border-left: 3px solid #059669;
  margin-bottom: 8px;
}
.priority-text { font-size: 13px; color: #0f172a; font-weight: 500; }
.priority-expires { font-size: 11px; color: #64748b; }
</style>
