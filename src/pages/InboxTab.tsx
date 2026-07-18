import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PriorityBadge } from '@/components/dashboard/PriorityBadge';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';
import { EmptyState } from '@/components/shared/EmptyState';
import { useAuth } from '@/hooks/useAuth';
import { getDashboardEmails } from '@/lib/api';
import type { EmailRecord } from '@/types';

type FilterType = 'all' | 'urgent' | 'needs_review' | 'low_priority';

const filterLabels: Record<FilterType, string> = {
  all: 'All',
  urgent: 'Urgent',
  needs_review: 'Needs Review',
  low_priority: 'Low Priority',
};

function getVariantForCategory(category: string): 'urgent' | 'needsReview' | 'low' {
  switch (category) {
    case 'urgent': return 'urgent';
    case 'needs_review': return 'needsReview';
    default: return 'low';
  }
}

function formatTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDayHeader(dateStr: string): string {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function InboxTab() {
  const { email } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [allEmails, setAllEmails] = useState<EmailRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [days, setDays] = useState(30);

  const filter = (searchParams.get('filter') as FilterType) || 'all';

  useEffect(() => {
    if (!email) return;

    setLoading(true);
    getDashboardEmails(email, days)
      .then((grouped) => {
        const emails = Object.values(grouped).flat();
        setAllEmails(emails);
      })
      .catch((e) => {
        console.error('Failed to load emails:', e);
      })
      .finally(() => setLoading(false));
  }, [email, days]);

  const filteredEmails = useMemo(() => {
    let emails = allEmails;

    if (filter !== 'all') {
      if (filter === 'urgent' || filter === 'needs_review' || filter === 'low_priority') {
        emails = emails.filter((e) => e.category === filter);
      } else if (filter === 'reply') {
        emails = emails.filter((e) => e.suggestedAction === 'reply');
      } else if (filter === 'meeting') {
        emails = emails.filter((e) => e.extractedFields?.deadline);
      } else if (filter === 'finance') {
        emails = emails.filter((e) => e.extractedFields?.amount);
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      emails = emails.filter(
        (e) =>
          e.subject.toLowerCase().includes(q) ||
          e.sender.toLowerCase().includes(q) ||
          e.summary?.toLowerCase().includes(q),
      );
    }

    return emails;
  }, [allEmails, filter, searchQuery]);

  const groupedEmails = useMemo(() => {
    const groups: Record<string, EmailRecord[]> = {};
    for (const email of filteredEmails) {
      const date = email.receivedAt.split('T')[0];
      if (!groups[date]) groups[date] = [];
      groups[date].push(email);
    }
    return groups;
  }, [filteredEmails]);

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete('filter');
    } else {
      params.set('filter', value);
    }
    setSearchParams(params);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">
          Inbox
          <span className="text-muted-foreground font-normal text-lg ml-2">
            ({filteredEmails.length})
          </span>
        </h1>

        <div className="flex items-center gap-3">
          <Select value={String(days)} onValueChange={(v) => setDays(Number(v))}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="14">14 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Filter emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {(Object.keys(filterLabels) as FilterType[]).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange(f)}
            >
              {filterLabels[f]}
            </Button>
          ))}
        </div>
      </div>

      {/* Email List */}
      {loading ? (
        <SkeletonLoader count={5} />
      ) : filteredEmails.length === 0 ? (
        <EmptyState
          title="No emails found"
          description={searchQuery ? 'Try a different search term.' : 'No emails match the current filter.'}
        />
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedEmails).map(([date, emails]) => (
            <div key={date}>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">
                  {formatDayHeader(date)}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {emails.length} email{emails.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-2">
                {emails.map((email) => (
                  <div
                    key={email.id}
                    className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === email.id ? null : email.id)
                      }
                      className="w-full text-left p-4 flex items-start gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <PriorityBadge variant={getVariantForCategory(email.category)} />
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(email.receivedAt)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground truncate">
                          {email.subject}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {email.sender}
                        </p>
                      </div>
                      {expandedId === email.id ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                      )}
                    </button>

                    {expandedId === email.id && (
                      <div className="px-4 pb-4 pt-0 border-t border-border">
                        {email.summary && (
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            {email.summary}
                          </p>
                        )}

                        {email.extractedFields && (
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            {email.extractedFields.amount && (
                              <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase">Amount</p>
                                <p className="text-sm font-medium">{email.extractedFields.amount}</p>
                              </div>
                            )}
                            {email.extractedFields.deadline && (
                              <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase">Deadline</p>
                                <p className="text-sm font-medium">{email.extractedFields.deadline}</p>
                              </div>
                            )}
                            {email.extractedFields.projectName && (
                              <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase">Project</p>
                                <p className="text-sm font-medium">{email.extractedFields.projectName}</p>
                              </div>
                            )}
                            {email.extractedFields.senderRole && (
                              <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase">Sender Role</p>
                                <p className="text-sm font-medium">{email.extractedFields.senderRole}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {email.suggestedAction && email.suggestedAction !== 'no action' && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full">
                            Suggested: {email.suggestedAction}
                          </div>
                        )}

                        {email.bodyPreview && (
                          <p className="text-xs text-muted-foreground mt-3 line-clamp-3">
                            {email.bodyPreview}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
