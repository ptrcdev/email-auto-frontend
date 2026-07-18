export type EmailCategory = 'urgent' | 'needs_review' | 'low_priority';

export interface ExtractedFields {
  amount?: string;
  projectName?: string;
  deadline?: string;
  senderRole?: string;
}

export interface EmailRecord {
  id: string;
  userId: string;
  gmailMessageId: string;
  subject: string;
  sender: string;
  bodyPreview?: string;
  receivedAt: string;
  category: EmailCategory;
  summary?: string;
  suggestedAction?: string;
  extractedFields?: ExtractedFields;
  includedInDigest: boolean;
  digestId?: string;
  createdAt: string;
}

export interface DashboardStats {
  total: number;
  urgent: number;
  needsReview: number;
  lowPriority: number;
  needsReply: number;
  meetings: number;
  finance: number;
  updates: number;
  topSenders: { sender: string; count: number }[];
  upcomingDeadlines: { subject: string; deadline: string; sender: string }[];
}

export interface CategoryEmails {
  count: number;
  emails: EmailRecord[];
}

export interface DailyBrief {
  date: string;
  greeting: string;
  summary: string[];
  stats: {
    emailsProcessed: number;
    highPriority: number;
    needReply: number;
    informational: number;
  };
  categories: {
    highPriority: CategoryEmails;
    needsReply: CategoryEmails;
    meetings: CategoryEmails;
    finance: CategoryEmails;
    updates: CategoryEmails;
  };
}

export interface Analytics {
  emailsThisWeek: number;
  averagePerDay: number;
  categoryBreakdown: {
    urgent: number;
    needsReview: number;
    lowPriority: number;
  };
  topSenders: { sender: string; count: number }[];
  highPriorityCount: number;
  dailyVolume: { date: string; count: number }[];
}

export interface SearchResult {
  answer: EmailRecord | null;
  related: EmailRecord[];
  results: EmailRecord[];
  interpretation: string;
  explanation: string;
}

export interface UserSettings {
  userId?: string;
  name?: string;
  preferredName?: string;
  role?: string;
  addressStyle?: string;
  digestTime: string;
  reminderTime: string;
  reminderEnabled: boolean;
  timezone: string;
  calendarConnected: boolean;
  pushSubscription?: Record<string, unknown>;
  importantSenders?: string[];
}

export interface Priority {
  id: string;
  userId: string;
  rawText: string;
  extractedEntities?: {
    people?: string[];
    projects?: string[];
    topics?: string[];
    deadlines?: string[];
  };
  active: boolean;
  expiresAt: string | null;
  permanent: boolean;
  createdAt: string;
}
