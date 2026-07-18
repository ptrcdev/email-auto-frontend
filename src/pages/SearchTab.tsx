import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, CheckCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PriorityBadge } from '@/components/dashboard/PriorityBadge';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { useAuth } from '@/hooks/useAuth';
import { searchEmails } from '@/lib/api';
import type { SearchResult, EmailRecord } from '@/types';

function getVariantForCategory(category: string): 'urgent' | 'needsReview' | 'low' {
  switch (category) {
    case 'urgent': return 'urgent';
    case 'needs_review': return 'needsReview';
    default: return 'low';
  }
}

export function SearchTab() {
  const { email } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !email) return;

    setLoading(true);
    setSearched(true);

    // Update URL
    const params = new URLSearchParams(searchParams);
    params.set('q', query.trim());
    setSearchParams(params);

    try {
      const searchResult = await searchEmails(email, query.trim());
      setResult(searchResult);
    } catch (e) {
      console.error('Search failed:', e);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Search</h1>
        <p className="text-muted-foreground mt-1">
          Semantic search across all your emails using AI.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder='Search emails... e.g. "invoice from Stripe" or "meeting with John"'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-12"
          />
        </div>
        <Button type="submit" size="lg" disabled={loading || !query.trim()}>
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Search'
          )}
        </Button>
      </form>

      {/* Results */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : !searched ? (
        <EmptyState
          icon={<Search className="w-8 h-8 text-muted-foreground" />}
          title="Search your emails"
          description='Try asking questions like "When was the last invoice from Stripe?" or "What did John say about the project?"'
        />
      ) : result && (result.answer || result.related.length > 0 || result.results.length > 0) ? (
        <div className="space-y-6">
          {/* Interpretation */}
          {result.interpretation && (
            <p className="text-sm text-muted-foreground italic">
              {result.interpretation}
            </p>
          )}

          {/* Best Match */}
          {result.answer && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  Best Match
                </span>
              </div>
              <SummaryCard email={result.answer} />
              {result.explanation && (
                <p className="text-sm text-muted-foreground mt-2 italic">
                  {result.explanation}
                </p>
              )}
            </div>
          )}

          {/* Related */}
          {result.related.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Related Emails
              </h3>
              <div className="space-y-3">
                {result.related.map((email) => (
                  <SummaryCard key={email.id} email={email} />
                ))}
              </div>
            </div>
          )}

          {/* Other Results */}
          {result.results.length > 0 && !result.answer && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Results ({result.results.length})
              </h3>
              <div className="space-y-3">
                {result.results.slice(0, 10).map((email) => (
                  <SummaryCard key={email.id} email={email} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          title="No results found"
          description="Try a different search query."
        />
      )}
    </div>
  );
}
