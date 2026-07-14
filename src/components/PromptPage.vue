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
        <p class="prompt-subtitle">Add today's priorities, keep permanent ones, or both. At least one is required.</p>

        <section class="prompt-section">
          <h3 class="section-title">Today's note</h3>
          <p class="section-desc">Type freely — one line per priority. Saved items join today's list below.</p>
          <textarea
            v-model="prioritiesText"
            class="priority-textarea"
            rows="7"
            placeholder="e.g. Follow up with contractor about permits&#10;Review budget for Phase 2&#10;Call insurance agent about the claim"
          ></textarea>
        </section>

        <section class="prompt-section">
          <h3 class="section-title">Today's priorities</h3>
          <p class="section-desc">Set for the next few days, then they expire on their own.</p>
          <div v-if="dailyPriorities.length > 0" class="list-block">
            <div v-for="p in dailyPriorities" :key="p.id" class="list-row">
              <span class="list-text">{{ p.rawText }}</span>
              <span class="priority-expires">{{ formatExpiry(p.expiresAt) }}</span>
              <div class="list-actions">
                <button class="btn-mini btn-danger" @click="removeDaily(p.id)">Remove</button>
              </div>
            </div>
          </div>
          <p v-else class="empty-note">No daily priorities yet.</p>
        </section>

        <section class="prompt-section">
          <h3 class="section-title">Permanent priorities</h3>
          <p class="section-desc">Always-on. Never expire, always used to spot relevant emails.</p>
          <div v-if="permanentPriorities.length > 0" class="list-block">
            <div v-for="p in permanentPriorities" :key="p.id" class="list-row">
              <input
                v-if="editingId === p.id"
                v-model="editingText"
                class="list-input"
                @keyup.enter="savePermanentEdit(p.id)"
              />
              <span v-else class="list-text">{{ p.rawText }}</span>
              <div class="list-actions">
                <button v-if="editingId === p.id" class="btn-mini btn-save" @click="savePermanentEdit(p.id)">Save</button>
                <button v-else class="btn-mini" @click="startPermanentEdit(p)">Edit</button>
                <button class="btn-mini btn-danger" @click="removePermanent(p.id)">Remove</button>
              </div>
            </div>
          </div>
          <p v-else class="empty-note">No permanent priorities yet.</p>
          <div class="add-row">
            <input
              v-model="newPermanent"
              class="list-input"
              placeholder="e.g. Keep an eye on the bank loan"
              @keyup.enter="addPermanent"
            />
            <button class="btn-add-item" @click="addPermanent" :disabled="!newPermanent.trim()">Add</button>
          </div>
        </section>

        <button class="btn btn-primary" @click="handleSubmit" :disabled="loading || !hasPriorities">
          {{ loading ? 'Saving...' : 'Save' }}
        </button>

        <p v-if="message" class="message" :class="{ error: isError }">{{ message }}</p>
      </div>
    </main>
  </div>
</template>

<script>
import {
  getDailyPriorities,
  getPermanentPriorities,
  savePriorities,
  addPermanentPriority,
  updatePermanentPriority,
  deletePermanentPriority,
  deletePriority,
} from '../api.js'

export default {
  name: 'PromptPage',
  data() {
    return {
      prioritiesText: '',
      dailyPriorities: [],
      permanentPriorities: [],
      newPermanent: '',
      editingId: null,
      editingText: '',
      loading: false,
      message: '',
      isError: false,
    }
  },
  computed: {
    email() { return this.$route.query.email || '' },
    hasPriorities() {
      const hasText = this.prioritiesText.split('\n').some((l) => l.trim())
      return hasText || this.dailyPriorities.length > 0 || this.permanentPriorities.length > 0
    },
  },
  mounted() {
    if (!this.email) {
      this.$router.push('/login')
      return
    }
    this.loadAll()
  },
  methods: {
    async loadAll() {
      try {
        const [daily, permanent] = await Promise.all([
          getDailyPriorities(this.email),
          getPermanentPriorities(this.email),
        ])
        this.dailyPriorities = daily
        this.permanentPriorities = permanent
      } catch (e) {
        console.error('Failed to load priorities:', e)
      }
    },
    async handleSubmit() {
      this.loading = true
      this.message = ''
      this.isError = false
      try {
        const filled = this.prioritiesText
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
        if (filled.length > 0) {
          await savePriorities(this.email, filled)
        }
        this.prioritiesText = ''
        await this.loadAll()
        this.message = 'Saved!'
      } catch (e) {
        this.message = e.message || 'Failed to save'
        this.isError = true
      } finally {
        this.loading = false
      }
    },
    async removeDaily(id) {
      try {
        await deletePriority(this.email, id)
        await this.loadAll()
      } catch (e) {
        this.message = e.message || 'Failed to remove priority'
        this.isError = true
      }
    },
    startPermanentEdit(p) {
      this.editingId = p.id
      this.editingText = p.rawText
    },
    async savePermanentEdit(id) {
      const text = this.editingText.trim()
      if (!text) return
      try {
        await updatePermanentPriority(this.email, id, text)
        this.editingId = null
        this.editingText = ''
        await this.loadAll()
      } catch (e) {
        this.message = e.message || 'Failed to update priority'
        this.isError = true
      }
    },
    async addPermanent() {
      const text = this.newPermanent.trim()
      if (!text) return
      try {
        await addPermanentPriority(this.email, text)
        this.newPermanent = ''
        await this.loadAll()
      } catch (e) {
        this.message = e.message || 'Failed to add priority'
        this.isError = true
      }
    },
    async removePermanent(id) {
      try {
        await deletePermanentPriority(this.email, id)
        await this.loadAll()
      } catch (e) {
        this.message = e.message || 'Failed to remove priority'
        this.isError = true
      }
    },
    formatExpiry(dateStr) {
      if (!dateStr) return 'permanent'
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
.prompt-page { min-height: 100vh; background: #f8fafc; }

.prompt-header {
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
.btn-back:hover { background: #f1f5f9; border-color: #cbd5e1; }

.prompt-main { max-width: 600px; margin: 0 auto; padding: 32px 24px; }

.prompt-card {
  background: #fff; border-radius: 16px; padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
.prompt-icon { text-align: center; margin-bottom: 16px; }
h1 { font-size: 22px; font-weight: 700; color: #0f172a; margin: 0 0 8px; text-align: center; }
.prompt-subtitle { font-size: 14px; color: #64748b; margin: 0 0 24px; text-align: center; }

.prompt-section {
  padding: 18px; background: #f8fafc; border: 1px solid #e2e8f0;
  border-radius: 12px; margin-bottom: 16px;
}
.section-title {
  font-size: 14px; font-weight: 700; color: #0f172a; margin: 0 0 4px;
}
.section-desc { font-size: 12px; color: #94a3b8; margin: 0 0 14px; }

.priority-textarea {
  width: 100%; padding: 14px; border: 1px solid #e2e8f0; border-radius: 10px;
  font-size: 14px; line-height: 1.6; color: #0f172a; outline: none;
  resize: vertical; font-family: inherit; box-sizing: border-box;
}
.priority-textarea:focus { border-color: #0078D4; box-shadow: 0 0 0 3px rgba(0,120,212,0.1); }

.list-block { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
.list-row {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 10px 12px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px;
}
.list-text { font-size: 14px; color: #0f172a; font-weight: 500; flex: 1; }
.list-input {
  flex: 1; padding: 11px 12px; border: 1px solid #e2e8f0; border-radius: 8px;
  font-size: 14px; color: #0f172a; outline: none;
}
.list-input:focus { border-color: #0078D4; box-shadow: 0 0 0 3px rgba(0,120,212,0.1); }
.list-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.priority-expires { font-size: 11px; color: #64748b; flex-shrink: 0; }

.btn-mini {
  padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;
  border: 1px solid #e2e8f0; background: #fff; color: #475569; cursor: pointer;
  transition: all 0.15s;
}
.btn-mini:hover { background: #f1f5f9; }
.btn-save { background: #0078D4; color: #fff; border-color: #0078D4; }
.btn-save:hover { background: #005a9e; }
.btn-danger { color: #dc2626; border-color: #fca5a5; background: #fef2f2; }
.btn-danger:hover { background: #fee2e2; }

.add-row { display: flex; align-items: center; gap: 8px; }
.btn-add-item {
  padding: 11px 18px; border-radius: 8px; font-size: 13px; font-weight: 600;
  border: none; background: #0078D4; color: #fff; cursor: pointer; flex-shrink: 0;
  transition: all 0.15s;
}
.btn-add-item:hover:not(:disabled) { background: #005a9e; }
.btn-add-item:disabled { background: #94a3b8; cursor: not-allowed; }

.empty-note { font-size: 13px; color: #94a3b8; margin: 0 0 14px; font-style: italic; }

.btn {
  width: 100%; padding: 13px; border-radius: 8px; font-size: 15px; font-weight: 600;
  cursor: pointer; border: none; transition: all 0.15s;
}
.btn-primary { background: #0078D4; color: #fff; box-shadow: 0 2px 8px rgba(0,120,212,0.3); }
.btn-primary:hover:not(:disabled) { background: #005a9e; transform: translateY(-1px); }
.btn-primary:disabled { background: #94a3b8; cursor: not-allowed; }

.message { font-size: 13px; margin-top: 12px; text-align: center; color: #059669; }
.message.error { color: #dc2626; }
</style>
