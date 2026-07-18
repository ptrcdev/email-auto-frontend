import { useState, useEffect } from 'react';
import { Layers, Plus, Pencil, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import {
  getDailyPriorities,
  getPermanentPriorities,
  savePriorities,
  addPermanentPriority,
  updatePermanentPriority,
  deletePermanentPriority,
  deletePriority,
} from '@/lib/api';
import type { Priority } from '@/types';

export function PromptPage() {
  const { email } = useAuth();

  const [prioritiesText, setPrioritiesText] = useState('');
  const [dailyPriorities, setDailyPriorities] = useState<Priority[]>([]);
  const [permanentPriorities, setPermanentPriorities] = useState<Priority[]>([]);

  const [newPermanent, setNewPermanent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!email) return;

    Promise.all([
      getDailyPriorities(email),
      getPermanentPriorities(email),
    ]).then(([daily, permanent]) => {
      setDailyPriorities(daily);
      setPermanentPriorities(permanent);
    }).catch(console.error).finally(() => setLoading(false));
  }, [email]);

  const hasPriorities = prioritiesText.split('\n').some((l) => l.trim()) ||
    dailyPriorities.length > 0 ||
    permanentPriorities.length > 0;

  const handleSave = async () => {
    if (!email) return;

    setSaving(true);
    setMessage('');
    setIsError(false);

    try {
      const filled = prioritiesText
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);

      if (filled.length > 0) {
        await savePriorities(email, filled);
      }

      setPrioritiesText('');
      const [daily, permanent] = await Promise.all([
        getDailyPriorities(email),
        getPermanentPriorities(email),
      ]);
      setDailyPriorities(daily);
      setPermanentPriorities(permanent);
      setMessage('Saved!');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to save');
      setIsError(true);
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveDaily = async (id: string) => {
    if (!email) return;

    try {
      await deletePriority(email, id);
      const [daily, permanent] = await Promise.all([
        getDailyPriorities(email),
        getPermanentPriorities(email),
      ]);
      setDailyPriorities(daily);
      setPermanentPriorities(permanent);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to remove');
      setIsError(true);
    }
  };

  const handleAddPermanent = async () => {
    if (!email || !newPermanent.trim()) return;

    try {
      await addPermanentPriority(email, newPermanent.trim());
      setNewPermanent('');
      const permanent = await getPermanentPriorities(email);
      setPermanentPriorities(permanent);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to add');
      setIsError(true);
    }
  };

  const handleSavePermanentEdit = async (id: string) => {
    if (!email || !editingText.trim()) return;

    try {
      await updatePermanentPriority(email, id, editingText.trim());
      setEditingId(null);
      setEditingText('');
      const permanent = await getPermanentPriorities(email);
      setPermanentPriorities(permanent);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to update');
      setIsError(true);
    }
  };

  const handleRemovePermanent = async (id: string) => {
    if (!email) return;

    try {
      await deletePermanentPriority(email, id);
      const permanent = await getPermanentPriorities(email);
      setPermanentPriorities(permanent);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to remove');
      setIsError(true);
    }
  };

  const formatExpiry = (expiresAt: string | null) => {
    if (!expiresAt) return 'permanent';
    const date = new Date(expiresAt);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'today';
    if (diffDays === 1) return 'tomorrow';
    return `in ${diffDays} days`;
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-64" />
          <div className="h-64 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
          <Layers className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">What matters tomorrow?</h1>
        <p className="text-muted-foreground mt-1">
          Add today's priorities, keep permanent ones, or both.
        </p>
      </div>

      {/* Today's Note */}
      <Card>
        <CardHeader>
          <CardTitle>Today's note</CardTitle>
          <CardDescription>
            Type freely — one line per priority. Saved items join today's list below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={prioritiesText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrioritiesText(e.target.value)}
            rows={7}
            placeholder={"e.g. Follow up with contractor about permits\nReview budget for Phase 2\nCall insurance agent about the claim"}
          />
        </CardContent>
      </Card>

      {/* Today's Priorities */}
      <Card>
        <CardHeader>
          <CardTitle>Today's priorities</CardTitle>
          <CardDescription>
            Set for the next few days, then they expire on their own.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dailyPriorities.length > 0 ? (
            <div className="space-y-2">
              {dailyPriorities.map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <span className="flex-1 text-sm">{p.rawText}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatExpiry(p.expiresAt)}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleRemoveDaily(p.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">No daily priorities yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Permanent Priorities */}
      <Card>
        <CardHeader>
          <CardTitle>Permanent priorities</CardTitle>
          <CardDescription>
            Always-on. Never expire, always used to spot relevant emails.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {permanentPriorities.length > 0 && (
            <div className="space-y-2">
              {permanentPriorities.map((p) => (
                <div key={p.id} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  {editingId === p.id ? (
                    <Input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSavePermanentEdit(p.id)}
                      className="flex-1"
                      autoFocus
                    />
                  ) : (
                    <span className="flex-1 text-sm">{p.rawText}</span>
                  )}
                  <div className="flex items-center gap-1">
                    {editingId === p.id ? (
                      <Button size="sm" onClick={() => handleSavePermanentEdit(p.id)}>
                        <Save className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingId(p.id);
                          setEditingText(p.rawText);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRemovePermanent(p.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Input
              placeholder="e.g. Keep an eye on the bank loan"
              value={newPermanent}
              onChange={(e) => setNewPermanent(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddPermanent()}
            />
            <Button onClick={handleAddPermanent} disabled={!newPermanent.trim()}>
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        disabled={saving || !hasPriorities}
        className="w-full"
        size="lg"
      >
        <Save className="w-4 h-4 mr-2" />
        {saving ? 'Saving...' : 'Save'}
      </Button>

      {message && (
        <p className={`text-sm text-center ${isError ? 'text-destructive' : 'text-emerald-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
