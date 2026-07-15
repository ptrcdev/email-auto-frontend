<template>
  <div class="dashboard">
    <header class="dash-header">
      <div class="header-left">
        <div class="brand">
          <div class="brand-icon">A</div>
          <span class="brand-name">AMICUS</span>
        </div>
        <p class="user-email">{{ email }}</p>
      </div>
      <div class="header-right">
        <button class="btn-settings" @click="$router.push({ path: '/settings', query: { email } })">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Settings
        </button>
        <button class="btn-logout" @click="logout">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Sign out
        </button>
      </div>
    </header>

    <main class="dash-main">
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon stat-total">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div class="stat-content">
            <span class="stat-number">{{ stats.total }}</span>
            <span class="stat-label">Total Emails</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-urgent">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div class="stat-content">
            <span class="stat-number stat-num-urgent">{{ stats.urgent }}</span>
            <span class="stat-label">Urgent</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-review">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div class="stat-content">
            <span class="stat-number stat-num-review">{{ stats.needsReview }}</span>
            <span class="stat-label">Needs Review</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-low">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div class="stat-content">
            <span class="stat-number stat-num-low">{{ stats.lowPriority }}</span>
            <span class="stat-label">Low Priority</span>
          </div>
        </div>
      </div>

      <div class="search-section">
        <div class="search-bar">
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Ask anything... e.g. &quot;when did the lawyer send me the invoice?&quot;"
            @keyup.enter="handleSearch"
          />
          <button class="btn-search" @click="handleSearch" :disabled="searchLoading || !searchQuery.trim()">
            {{ searchLoading ? 'Searching...' : 'Search' }}
          </button>
        </div>
        <p v-if="searchInterpretation" class="search-interpretation">{{ searchInterpretation }}</p>
        <div v-if="searchAnswer" class="search-answer">
          <div class="answer-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Best match
          </div>
          <div
            class="email-card answer-card"
            :class="'cat-' + searchAnswer.category"
          >
            <div class="email-header" @click="toggleExpand(searchAnswer.id)">
              <span class="category-badge" :class="'badge-' + searchAnswer.category">{{ formatCategory(searchAnswer.category) }}</span>
              <span class="email-subject">{{ searchAnswer.subject }}</span>
              <span class="email-date">{{ formatDate(searchAnswer.receivedAt) }}</span>
              <svg class="expand-icon" :class="{ expanded: expandedId === searchAnswer.id }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="email-summary">
              <span class="email-sender">{{ searchAnswer.sender }}</span>
              <p>{{ searchAnswer.summary }}</p>
            </div>
            <div v-if="expandedId === searchAnswer.id" class="email-detail">
              <div class="detail-row" v-if="searchAnswer.bodyPreview">
                <label>Preview</label>
                <p>{{ searchAnswer.bodyPreview }}</p>
              </div>
              <div class="detail-fields" v-if="searchAnswer.extractedFields">
                <div v-if="searchAnswer.extractedFields.amount" class="detail-field">
                  <label>Amount</label><span>{{ searchAnswer.extractedFields.amount }}</span>
                </div>
                <div v-if="searchAnswer.extractedFields.deadline" class="detail-field">
                  <label>Deadline</label><span>{{ searchAnswer.extractedFields.deadline }}</span>
                </div>
                <div v-if="searchAnswer.extractedFields.projectName" class="detail-field">
                  <label>Project</label><span>{{ searchAnswer.extractedFields.projectName }}</span>
                </div>
                <div v-if="searchAnswer.extractedFields.senderRole" class="detail-field">
                  <label>Sender Role</label><span>{{ searchAnswer.extractedFields.senderRole }}</span>
                </div>
              </div>
              <div class="detail-action" v-if="searchAnswer.suggestedAction">
                <label>Suggested Action</label>
                <span class="action-badge">{{ searchAnswer.suggestedAction }}</span>
              </div>
            </div>
          </div>
          <p v-if="searchExplanation" class="answer-explanation">{{ searchExplanation }}</p>
        </div>

        <div v-if="searchRelated.length > 0" class="search-related">
          <h3 class="related-title">Related emails on this topic</h3>
          <div class="search-results">
            <div
              v-for="email in searchRelated"
              :key="email.id"
              class="email-card search-result-card"
            >
              <div class="email-header" @click="toggleExpand(email.id)">
                <span class="category-badge" :class="'badge-' + email.category">{{ formatCategory(email.category) }}</span>
                <span class="email-subject">{{ email.subject }}</span>
                <span class="email-date">{{ formatDate(email.receivedAt) }}</span>
                <svg class="expand-icon" :class="{ expanded: expandedId === email.id }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <div class="email-summary">
                <span class="email-sender">{{ email.sender }}</span>
                <p>{{ email.summary }}</p>
              </div>
              <div v-if="expandedId === email.id" class="email-detail">
                <div class="detail-row" v-if="email.bodyPreview">
                  <label>Preview</label>
                  <p>{{ email.bodyPreview }}</p>
                </div>
                <div class="detail-fields" v-if="email.extractedFields">
                  <div v-if="email.extractedFields.amount" class="detail-field">
                    <label>Amount</label><span>{{ email.extractedFields.amount }}</span>
                  </div>
                  <div v-if="email.extractedFields.deadline" class="detail-field">
                    <label>Deadline</label><span>{{ email.extractedFields.deadline }}</span>
                  </div>
                  <div v-if="email.extractedFields.projectName" class="detail-field">
                    <label>Project</label><span>{{ email.extractedFields.projectName }}</span>
                  </div>
                  <div v-if="email.extractedFields.senderRole" class="detail-field">
                    <label>Sender Role</label><span>{{ email.extractedFields.senderRole }}</span>
                  </div>
                </div>
                <div class="detail-action" v-if="email.suggestedAction">
                  <label>Suggested Action</label>
                  <span class="action-badge">{{ email.suggestedAction }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="searchResults.length > 0" class="search-results">
          <div
            v-for="email in searchResults"
            :key="email.id"
            class="email-card search-result-card"
          >
            <div class="email-header" @click="toggleExpand(email.id)">
              <span class="category-badge" :class="'badge-' + email.category">{{ formatCategory(email.category) }}</span>
              <span class="email-subject">{{ email.subject }}</span>
              <span class="email-date">{{ formatDate(email.receivedAt) }}</span>
              <svg class="expand-icon" :class="{ expanded: expandedId === email.id }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="email-summary">
              <span class="email-sender">{{ email.sender }}</span>
              <p>{{ email.summary }}</p>
            </div>
            <div v-if="expandedId === email.id" class="email-detail">
              <div class="detail-row" v-if="email.bodyPreview">
                <label>Preview</label>
                <p>{{ email.bodyPreview }}</p>
              </div>
              <div class="detail-fields" v-if="email.extractedFields">
                <div v-if="email.extractedFields.amount" class="detail-field">
                  <label>Amount</label><span>{{ email.extractedFields.amount }}</span>
                </div>
                <div v-if="email.extractedFields.deadline" class="detail-field">
                  <label>Deadline</label><span>{{ email.extractedFields.deadline }}</span>
                </div>
                <div v-if="email.extractedFields.projectName" class="detail-field">
                  <label>Project</label><span>{{ email.extractedFields.projectName }}</span>
                </div>
                <div v-if="email.extractedFields.senderRole" class="detail-field">
                  <label>Sender Role</label><span>{{ email.extractedFields.senderRole }}</span>
                </div>
              </div>
              <div class="detail-action" v-if="email.suggestedAction">
                <label>Suggested Action</label>
                <span class="action-badge">{{ email.suggestedAction }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="searchQuery && !searchLoading && searchDone && !searchAnswer && !searchRelated.length && searchResults.length === 0" class="no-results">
          No emails found matching your query.
        </div>
      </div>

      <div class="toolbar">
        <div class="toolbar-left">
          <h2 class="section-title">Emails</h2>
          <div class="filter-chips">
            <button class="chip" :class="{ active: activeFilter === 'all' }" @click="activeFilter = 'all'">All</button>
            <button class="chip" :class="{ active: activeFilter === 'urgent' }" @click="activeFilter = 'urgent'">
              <span class="chip-dot dot-urgent"></span>Urgent
            </button>
            <button class="chip" :class="{ active: activeFilter === 'needs_review' }" @click="activeFilter = 'needs_review'">
              <span class="chip-dot dot-review"></span>Needs Review
            </button>
            <button class="chip" :class="{ active: activeFilter === 'low_priority' }" @click="activeFilter = 'low_priority'">
              <span class="chip-dot dot-low"></span>Low
            </button>
          </div>
        </div>
        <div class="toolbar-right">
          <div class="time-range">
            <button v-for="opt in timeOptions" :key="opt.value" class="time-btn" :class="{ active: selectedDays === opt.value }" @click="changeTimeRange(opt.value)">{{ opt.label }}</button>
          </div>
          <select v-model="sortBy" class="sort-select">
            <option value="date">Newest first</option>
            <option value="date-asc">Oldest first</option>
          </select>
        </div>
      </div>

      <div class="content-grid">
        <div class="emails-section">
          <div v-if="loading" class="loading-state">
            <div class="skeleton-group">
              <div class="skel skel-header"></div>
              <div class="skel skel-card"></div>
              <div class="skel skel-card"></div>
              <div class="skel skel-card"></div>
            </div>
          </div>

          <div v-else-if="filteredEmails.length === 0" class="empty-state">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#cbd5e1" stroke-width="1.2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <p v-if="activeFilter !== 'all'">No {{ formatCategory(activeFilter).toLowerCase() }} emails.</p>
            <p v-else>No emails yet. They'll appear here once synced.</p>
          </div>

          <div v-else class="day-groups">
            <div v-for="(emails, date) in filteredGroupedEmails" :key="date" class="day-group">
              <div class="day-header">
                <span class="day-date">{{ formatDayHeader(date) }}</span>
                <span class="day-count">{{ emails.length }} email{{ emails.length !== 1 ? 's' : '' }}</span>
              </div>
              <div class="day-emails">
                <div
                  v-for="email in emails"
                  :key="email.id"
                  class="email-card"
                  :class="'cat-' + email.category"
                >
                  <div class="email-header" @click="toggleExpand(email.id)">
                    <span class="category-badge" :class="'badge-' + email.category">{{ formatCategory(email.category) }}</span>
                    <span class="email-subject">{{ email.subject }}</span>
                    <span class="email-time">{{ formatTime(email.receivedAt) }}</span>
                    <svg class="expand-icon" :class="{ expanded: expandedId === email.id }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                  <div class="email-summary">
                    <span class="email-sender">{{ email.sender }}</span>
                    <p>{{ email.summary }}</p>
                  </div>
                  <div v-if="expandedId === email.id" class="email-detail">
                    <div class="detail-row" v-if="email.bodyPreview">
                      <label>Preview</label>
                      <p>{{ email.bodyPreview }}</p>
                    </div>
                    <div class="detail-fields" v-if="email.extractedFields">
                      <div v-if="email.extractedFields.amount" class="detail-field">
                        <label>Amount</label><span>{{ email.extractedFields.amount }}</span>
                      </div>
                      <div v-if="email.extractedFields.deadline" class="detail-field">
                        <label>Deadline</label><span>{{ email.extractedFields.deadline }}</span>
                      </div>
                      <div v-if="email.extractedFields.projectName" class="detail-field">
                        <label>Project</label><span>{{ email.extractedFields.projectName }}</span>
                      </div>
                      <div v-if="email.extractedFields.senderRole" class="detail-field">
                        <label>Sender Role</label><span>{{ email.extractedFields.senderRole }}</span>
                      </div>
                    </div>
                    <div class="detail-action" v-if="email.suggestedAction">
                      <label>Suggested Action</label>
                      <span class="action-badge">{{ email.suggestedAction }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside class="sidebar">
          <div class="sidebar-section">
            <h3>Top Senders</h3>
            <div v-if="stats.topSenders && stats.topSenders.length > 0" class="sender-list">
              <div v-for="s in stats.topSenders" :key="s.sender" class="sender-item">
                <div class="sender-avatar" :style="{ background: getAvatarColor(s.sender) }">{{ getInitials(s.sender) }}</div>
                <span class="sender-name">{{ s.sender }}</span>
                <span class="sender-count">{{ s.count }}</span>
              </div>
            </div>
            <p v-else class="empty-text">No data yet</p>
          </div>

          <div class="sidebar-section">
            <h3>Upcoming Deadlines</h3>
            <div v-if="stats.upcomingDeadlines && stats.upcomingDeadlines.length > 0" class="deadline-list">
              <div v-for="d in stats.upcomingDeadlines" :key="d.subject + d.deadline" class="deadline-item">
                <span class="deadline-text">{{ d.subject }}</span>
                <span class="deadline-date">{{ d.deadline }}</span>
                <span class="deadline-sender">{{ d.sender }}</span>
              </div>
            </div>
            <p v-else class="empty-text">No upcoming deadlines</p>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script>
import { getDashboardEmails, searchEmails, getDashboardStats } from '../api.js'
import { subscribeUserToPush } from '../push.js'
import { clearSession } from '../session.js'

export default {
  name: 'DashboardPage',
  data() {
    return {
      email: '',
      groupedEmails: {},
      stats: { total: 0, urgent: 0, needsReview: 0, lowPriority: 0, topSenders: [], upcomingDeadlines: [] },
      loading: true,
      searchQuery: '',
      searchResults: [],
      searchAnswer: null,
      searchRelated: [],
      searchInterpretation: '',
      searchExplanation: '',
      searchLoading: false,
      searchDone: false,
      expandedId: null,
      activeFilter: 'all',
      selectedDays: 30,
      sortBy: 'date',
      timeOptions: [
        { label: '7d', value: 7 },
        { label: '14d', value: 14 },
        { label: '30d', value: 30 },
      ],
    }
  },
  computed: {
    allEmails() {
      const list = []
      for (const emails of Object.values(this.groupedEmails)) {
        list.push(...emails)
      }
      return list
    },
    filteredEmails() {
      let emails = this.allEmails
      if (this.activeFilter !== 'all') {
        emails = emails.filter(e => e.category === this.activeFilter)
      }
      emails.sort((a, b) => {
        const da = new Date(a.receivedAt)
        const db = new Date(b.receivedAt)
        return this.sortBy === 'date' ? db - da : da - db
      })
      return emails
    },
    filteredGroupedEmails() {
      const groups = {}
      for (const email of this.filteredEmails) {
        const date = email.receivedAt.split('T')[0]
        if (!groups[date]) groups[date] = []
        groups[date].push(email)
      }
      return groups
    },
  },
  mounted() {
    this.email = this.$route.query.email || ''
    if (!this.email) {
      this.$router.push('/login')
      return
    }
    this.loadData()
    subscribeUserToPush(this.email)
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        const [emails, stats] = await Promise.all([
          getDashboardEmails(this.email, this.selectedDays),
          getDashboardStats(this.email),
        ])
        this.groupedEmails = emails
        this.stats = stats
      } catch (e) {
        console.error('Failed to load dashboard data:', e)
      } finally {
        this.loading = false
      }
    },
    async changeTimeRange(days) {
      this.selectedDays = days
      this.loading = true
      try {
        this.groupedEmails = await getDashboardEmails(this.email, days)
      } catch (e) {
        console.error('Failed to load emails:', e)
      } finally {
        this.loading = false
      }
    },
    async handleSearch() {
      if (!this.searchQuery.trim() || this.searchLoading) return
      this.searchLoading = true
      this.searchDone = false
      this.searchResults = []
      this.searchAnswer = null
      this.searchRelated = []
      this.searchInterpretation = ''
      this.searchExplanation = ''
      try {
        const result = await searchEmails(this.email, this.searchQuery)
        console.log('Search result:', JSON.stringify({ hasAnswer: !!result.answer, hasRelated: result.related?.length, hasResults: result.results?.length, interpretation: result.interpretation }))
        this.searchAnswer = result.answer || null
        this.searchRelated = result.related || []
        this.searchResults = result.results || []
        this.searchInterpretation = result.interpretation || ''
        this.searchExplanation = result.explanation || ''
      } catch (e) {
        console.error('Search failed:', e)
        this.searchInterpretation = 'Search failed. Please try again.'
      } finally {
        this.searchLoading = false
        this.searchDone = true
      }
    },
    toggleExpand(id) {
      this.expandedId = this.expandedId === id ? null : id
    },
    formatCategory(cat) {
      const map = { urgent: 'Urgent', needs_review: 'Needs Review', low_priority: 'Low' }
      return map[cat] || cat
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    },
    formatTime(dateStr) {
      return new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    },
    formatDayHeader(dateStr) {
      const today = new Date().toISOString().split('T')[0]
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
      if (dateStr === today) return 'Today'
      if (dateStr === yesterday) return 'Yesterday'
      return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    },
    getInitials(name) {
      return name.split(/[@.\s]/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
    },
    getAvatarColor(str) {
      const colors = ['#0078D4', '#6C5CE7', '#059669', '#D97706', '#DC2626', '#7C3AED', '#0891B2', '#DB2777']
      let hash = 0
      for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
      return colors[Math.abs(hash) % colors.length]
    },
    logout() {
      clearSession()
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  min-height: 100dvh;
  overflow-x: hidden;
}

/* ── Header ── */
.dash-header {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 12px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.brand-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: linear-gradient(135deg, #0078D4, #6C5CE7);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
}

.brand-name {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.3px;
  background: linear-gradient(135deg, #0078D4, #6C5CE7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.user-email {
  font-size: 12px;
  color: #94a3b8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 140px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.btn-settings,
.btn-logout {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #475569;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  min-height: 36px;
}

.btn-settings:hover,
.btn-logout:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.btn-settings:active,
.btn-logout:active {
  background: #e2e8f0;
}

.btn-settings .btn-label,
.btn-logout .btn-label {
  display: none;
}

/* ── Main ── */
.dash-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 12px 48px;
}

/* ── Stats ── */
.stats-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

.stat-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: box-shadow 0.15s;
}

.stat-card:active {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-total { background: #e0f2fe; color: #0284c7; }
.stat-urgent { background: #fef2f2; color: #dc2626; }
.stat-review { background: #fffbeb; color: #d97706; }
.stat-low { background: #f3f4f6; color: #6b7280; }

.stat-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stat-number {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
}

.stat-num-urgent { color: #dc2626; }
.stat-num-review { color: #d97706; }
.stat-num-low { color: #6b7280; }

.stat-label {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 2px;
}

/* ── Search ── */
.search-section {
  margin-bottom: 16px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 3px 3px 3px 12px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.search-bar:focus-within {
  border-color: #0078D4;
  box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.1);
}

.search-icon { flex-shrink: 0; display: none; }

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px 8px;
  font-size: 14px;
  color: #0f172a;
  background: transparent;
  min-width: 0;
}

.search-input::placeholder { color: #94a3b8; }

.btn-search {
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: #0078D4;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-search:hover:not(:disabled) { background: #005a9e; }
.btn-search:disabled { background: #93c5fd; cursor: not-allowed; }

.search-interpretation {
  font-size: 13px;
  color: #64748b;
  margin: 8px 0 0;
  font-style: italic;
}

.search-results,
.search-related {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-result-card { border-left: 3px solid #0078D4 !important; }

.search-answer { margin-top: 12px; }

.answer-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 9999px;
  background: #059669;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 6px;
}

.answer-card {
  border: 1px solid #059669 !important;
  box-shadow: 0 2px 10px rgba(5, 150, 105, 0.15);
}

.answer-explanation {
  font-size: 13px;
  color: #64748b;
  margin: 6px 0 0;
  font-style: italic;
}

.related-title {
  font-size: 12px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin: 0 0 8px;
}

.no-results {
  text-align: center;
  padding: 20px;
  color: #94a3b8;
  font-size: 14px;
}

/* ── Toolbar ── */
.toolbar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-bottom: 2px;
}

.chip {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #475569;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
  min-height: 32px;
}

.chip:active { background: #f1f5f9; }

.chip.active {
  background: #0078D4;
  color: #fff;
  border-color: #0078D4;
}

.chip.active .chip-dot { background: #fff; }

.chip-dot { width: 6px; height: 6px; border-radius: 50%; }
.dot-urgent { background: #dc2626; }
.dot-review { background: #d97706; }
.dot-low { background: #6b7280; }

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.time-range {
  display: flex;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.time-btn {
  padding: 5px 12px;
  border: none;
  background: transparent;
  color: #475569;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  min-height: 32px;
}

.time-btn:active { background: #f1f5f9; }

.time-btn.active {
  background: #0078D4;
  color: #fff;
}

.sort-select {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  padding: 5px 10px;
  font-size: 12px;
  color: #475569;
  cursor: pointer;
  outline: none;
  font-weight: 500;
  min-height: 32px;
}

/* ── Content Grid ── */
.content-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── Loading ── */
.loading-state { padding: 32px 0; }

.skeleton-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skel {
  border-radius: 8px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skel-header { height: 16px; width: 160px; margin-bottom: 8px; }
.skel-card { height: 72px; width: 100%; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Emails ── */
.day-groups {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.day-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid #e2e8f0;
}

.day-date {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
}

.day-count {
  font-size: 11px;
  color: #94a3b8;
}

.day-emails {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.email-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.15s;
}

.email-card:active {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.email-card.cat-urgent { border-left: 3px solid #dc2626; }
.email-card.cat-needs_review { border-left: 3px solid #d97706; }
.email-card.cat-low_priority { border-left: 3px solid #e2e8f0; }

.email-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  cursor: pointer;
  user-select: none;
}

.category-badge {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  flex-shrink: 0;
}

.badge-urgent { background: #fef2f2; color: #dc2626; }
.badge-needs_review { background: #fffbeb; color: #d97706; }
.badge-low_priority { background: #f3f4f6; color: #6b7280; }

.email-subject {
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: #0f172a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.email-date, .email-time {
  font-size: 11px;
  color: #94a3b8;
  white-space: nowrap;
  flex-shrink: 0;
}

.expand-icon {
  color: #94a3b8;
  transition: transform 0.2s;
  flex-shrink: 0;
}

.expand-icon.expanded { transform: rotate(180deg); }

.email-summary {
  padding: 0 12px 10px;
}

.email-sender {
  font-size: 11px;
  color: #94a3b8;
}

.email-summary p {
  font-size: 12px;
  color: #64748b;
  margin: 3px 0 0;
  line-height: 1.5;
}

.email-detail {
  padding: 10px 12px 12px;
  border-top: 1px solid #f1f5f9;
}

.detail-row { margin-bottom: 10px; }

.detail-row label, .detail-field label, .detail-action label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 3px;
}

.detail-row p {
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

.detail-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
}

.detail-field span {
  font-size: 13px;
  color: #0f172a;
  font-weight: 500;
}

.action-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #e0f2fe;
  color: #0284c7;
}

/* ── Sidebar ── */
.sidebar {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.sidebar-section {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px;
}

.sidebar-section h3 {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  margin: 0 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sender-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sender-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  border-radius: 6px;
}

.sender-avatar {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.sender-name {
  flex: 1;
  font-size: 12px;
  color: #475569;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.sender-count {
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  background: #f1f5f9;
  padding: 1px 6px;
  border-radius: 9999px;
  flex-shrink: 0;
}

.deadline-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.deadline-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 10px;
  background: #fef2f2;
  border-radius: 6px;
  border-left: 3px solid #dc2626;
}

.deadline-text {
  font-size: 12px;
  color: #0f172a;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.deadline-date {
  font-size: 11px;
  color: #dc2626;
  font-weight: 600;
}

.deadline-sender {
  font-size: 10px;
  color: #94a3b8;
}

.empty-text {
  font-size: 12px;
  color: #cbd5e1;
  text-align: center;
  padding: 12px;
}

.empty-state {
  text-align: center;
  padding: 40px 16px;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.empty-state p { font-size: 13px; }

/* ══════════════════════════════════════════
   DESKTOP (>=768px)
   ══════════════════════════════════════════ */
@media (min-width: 768px) {
  .dash-header { padding: 0 24px; height: 60px; }
  .brand-icon { width: 32px; height: 32px; font-size: 15px; }
  .brand-name { font-size: 16px; }
  .user-email { font-size: 13px; max-width: 240px; }

  .btn-settings, .btn-logout { padding: 6px 14px; font-size: 13px; }
  .btn-settings .btn-label, .btn-logout .btn-label { display: inline; }

  .dash-main { padding: 24px 32px 48px; }

  .stats-row { grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .stat-card { padding: 18px; gap: 14px; }
  .stat-icon { width: 44px; height: 44px; }
  .stat-number { font-size: 26px; }
  .stat-label { font-size: 13px; }

  .search-icon { display: block; }
  .search-input { padding: 12px; font-size: 15px; }
  .btn-search { padding: 10px 20px; font-size: 14px; }

  .toolbar { flex-direction: row; justify-content: space-between; align-items: center; }
  .toolbar-right { gap: 10px; }
  .chip { padding: 6px 14px; font-size: 13px; }
  .time-btn { padding: 6px 14px; font-size: 13px; }
  .sort-select { padding: 6px 12px; font-size: 13px; }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 24px;
  }

  .day-emails { gap: 8px; }
  .email-card { border-radius: 10px; }
  .email-header { padding: 12px 16px; gap: 10px; }
  .category-badge { padding: 3px 8px; font-size: 10px; }
  .email-subject { font-size: 14px; }
  .email-date, .email-time { font-size: 12px; }
  .email-summary { padding: 0 16px 12px; }
  .email-sender { font-size: 12px; }
  .email-summary p { font-size: 13px; }
  .email-detail { padding: 12px 16px 16px; }
  .detail-row p { font-size: 13px; }
  .detail-field span { font-size: 14px; }
  .action-badge { padding: 4px 10px; font-size: 12px; }

  .sidebar-section { padding: 20px; }
}

/* ══════════════════════════════════════════
   LARGE DESKTOP (>=1024px)
   ══════════════════════════════════════════ */
@media (min-width: 1024px) {
  .dash-main { max-width: 1200px; padding: 28px 40px 48px; }

  .content-grid {
    grid-template-columns: 1fr 300px;
    gap: 28px;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
