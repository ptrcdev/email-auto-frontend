import { useState, useEffect } from 'react';
import {
  Clock,
  Bell,
  Calendar,
  FileText,
  Smartphone,
  Plus,
  Pencil,
  Trash2,
  Save,
  TriangleAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import {
  getUserSettings,
  saveUserSettings,
  getPermanentPriorities,
  addPermanentPriority,
  updatePermanentPriority,
  deletePermanentPriority,
  subscribePush,
  unsubscribePush,
  getVapidPublicKey,
  deleteAccount,
} from '@/lib/api';
import type { UserSettings, Priority } from '@/types';

const timezones = [
  { value: 'Europe/Lisbon', label: 'Europe/Lisbon (GMT+0/+1)' },
  { value: 'Europe/London', label: 'Europe/London (GMT+0/+1)' },
  { value: 'Europe/Paris', label: 'Europe/Paris (GMT+1/+2)' },
  { value: 'Europe/Berlin', label: 'Europe/Berlin (GMT+1/+2)' },
  { value: 'America/New_York', label: 'America/New_York (GMT-5/-4)' },
  { value: 'America/Chicago', label: 'America/Chicago (GMT-6/-5)' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles (GMT-8/-7)' },
  { value: 'America/Sao_Paulo', label: 'America/Sao_Paulo (GMT-3)' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo (GMT+9)' },
  { value: 'Asia/Shanghai', label: 'Asia/Shanghai (GMT+8)' },
];

function generateTimeOptions() {
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = String(h).padStart(2, '0');
      const min = String(m).padStart(2, '0');
      times.push(`${hour}:${min}`);
    }
  }
  return times;
}

const timeOptions = generateTimeOptions();

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function SettingsPage() {
  const { email } = useAuth();

  const [settings, setSettings] = useState<UserSettings>({
    digestTime: '08:00',
    reminderTime: '18:00',
    reminderEnabled: false,
    timezone: 'Europe/Lisbon',
    calendarConnected: false,
    importantSenders: [],
  });

  const [permanentPriorities, setPermanentPriorities] = useState<Priority[]>([]);
  const [newPermanent, setNewPermanent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const [importantSenders, setImportantSenders] = useState<string[]>([]);
  const [newSender, setNewSender] = useState('');

  const [pushSupported, setPushSupported] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!email) return;

    Promise.all([
      getUserSettings(email),
      getPermanentPriorities(email),
    ]).then(([settingsData, priorities]) => {
      setSettings({
        digestTime: settingsData.digestTime || '08:00',
        reminderTime: settingsData.reminderTime || '18:00',
        reminderEnabled: settingsData.reminderEnabled || false,
        timezone: settingsData.timezone || 'Europe/Lisbon',
        calendarConnected: settingsData.calendarConnected || false,
        importantSenders: settingsData.importantSenders || [],
      });
      setImportantSenders(settingsData.importantSenders || []);
      setPermanentPriorities(priorities);
      setPushEnabled(!!settingsData.pushSubscription);
    }).catch(console.error).finally(() => setLoading(false));

    setPushSupported(
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      'Notification' in window,
    );
  }, [email]);

  const handleSave = async () => {
    if (!email) return;

    setSaving(true);
    setMessage('');
    setIsError(false);

    try {
      await saveUserSettings(email, {
        ...settings,
        importantSenders,
      });
      setMessage('Settings saved!');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to save settings');
      setIsError(true);
    } finally {
      setSaving(false);
    }
  };

  const handleAddPermanent = async () => {
    if (!email || !newPermanent.trim()) return;

    try {
      await addPermanentPriority(email, newPermanent.trim());
      setNewPermanent('');
      const priorities = await getPermanentPriorities(email);
      setPermanentPriorities(priorities);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to add priority');
      setIsError(true);
    }
  };

  const handleSavePermanentEdit = async (id: string) => {
    if (!email || !editingText.trim()) return;

    try {
      await updatePermanentPriority(email, id, editingText.trim());
      setEditingId(null);
      setEditingText('');
      const priorities = await getPermanentPriorities(email);
      setPermanentPriorities(priorities);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to update priority');
      setIsError(true);
    }
  };

  const handleDeletePermanent = async (id: string) => {
    if (!email) return;

    try {
      await deletePermanentPriority(email, id);
      const priorities = await getPermanentPriorities(email);
      setPermanentPriorities(priorities);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to delete priority');
      setIsError(true);
    }
  };

  const handleAddSender = () => {
    const sender = newSender.trim().toLowerCase();
    if (!sender || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(sender)) return;
    if (importantSenders.includes(sender)) return;
    setImportantSenders([...importantSenders, sender]);
    setNewSender('');
  };

  const handleRemoveSender = (index: number) => {
    setImportantSenders(importantSenders.filter((_, i) => i !== index));
  };

  const handleEnablePush = async () => {
    if (!pushSupported || !email) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setMessage('Notification permission denied');
        setIsError(true);
        return;
      }

      const reg = await navigator.serviceWorker.ready;
      const vapidRes = await getVapidPublicKey();
      if (!vapidRes.publicKey) {
        setMessage('Push notifications not configured');
        setIsError(true);
        return;
      }

      const padding = '='.repeat((4 - (vapidRes.publicKey.length % 4)) % 4);
      const base64 = (vapidRes.publicKey + padding).replace(/-/g, '+').replace(/_/g, '/');
      const rawData = window.atob(base64);
      const applicationServerKey = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        applicationServerKey[i] = rawData.charCodeAt(i);
      }

      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey.buffer,
      });

      await subscribePush(email, subscription.toJSON());
      setPushEnabled(true);
      setMessage('Push notifications enabled!');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to enable push');
      setIsError(true);
    }
  };

  const handleDisablePush = async () => {
    if (!email) return;

    try {
      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.getSubscription();
      if (subscription) await subscription.unsubscribe();
      await unsubscribePush(email);
      setPushEnabled(false);
      setMessage('Push notifications disabled');
    } catch (e) {
      console.error('Failed to disable push:', e);
    }
  };

  const handleDeleteAccount = async () => {
    if (!email) return;
    setDeleting(true);
    try {
      await deleteAccount(email);
      logout();
    } catch (e) {
      setDeleting(false);
      setShowDeleteDialog(false);
      setMessage(e instanceof Error ? e.message : 'Failed to delete account');
      setIsError(true);
    }
  };

  const isValidSender = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(newSender.trim());

  const calendarConnectUrl = `${BASE_URL}/calendar/connect/${encodeURIComponent(email || '')}`;
  const icsDownloadUrl = `${BASE_URL}/calendar/ics/${encodeURIComponent(email || '')}`;

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-48" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>

      {/* Digest Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Digest Schedule
          </CardTitle>
          <CardDescription>
            Choose when you receive your daily email summary.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Digest Time</label>
              <Select
                value={settings.digestTime}
                onValueChange={(v) => setSettings({ ...settings, digestTime: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Timezone</label>
              <Select
                value={settings.timezone}
                onValueChange={(v) => setSettings({ ...settings, timezone: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Reminder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Daily Reminder
          </CardTitle>
          <CardDescription>
            Get a reminder to set tomorrow's priorities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="flex items-center justify-between p-4 bg-muted/50 rounded-lg cursor-pointer"
            onClick={() => setSettings({ ...settings, reminderEnabled: !settings.reminderEnabled })}
          >
            <div>
              <p className="text-sm font-medium">Enable daily reminder</p>
              <p className="text-xs text-muted-foreground">
                Receive a calendar event and/or push notification
              </p>
            </div>
            <div
              className={`w-11 h-6 rounded-full transition-colors ${
                settings.reminderEnabled ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform mt-0.5 ${
                  settings.reminderEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`}
              />
            </div>
          </div>

          {settings.reminderEnabled && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Reminder Time</label>
                <Select
                  value={settings.reminderTime}
                  onValueChange={(v) => setSettings({ ...settings, reminderTime: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  Notification Channels
                </p>

                {/* Google Calendar */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Google Calendar</p>
                      <p className="text-xs text-muted-foreground">Creates a daily calendar event</p>
                    </div>
                  </div>
                  {settings.calendarConnected ? (
                    <span className="text-xs font-medium text-emerald-600">Connected</span>
                  ) : (
                    <a href={calendarConnectUrl} className="text-xs font-medium text-blue-600 hover:underline">
                      Connect
                    </a>
                  )}
                </div>

                {/* ICS Download */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Apple Calendar / .ics</p>
                      <p className="text-xs text-muted-foreground">Download a file to import</p>
                    </div>
                  </div>
                  <a href={icsDownloadUrl} download className="text-xs font-medium text-slate-600 hover:underline">
                    Download .ics
                  </a>
                </div>

                {/* Push Notifications */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Push Notifications</p>
                      <p className="text-xs text-muted-foreground">Browser notification</p>
                    </div>
                  </div>
                  {pushEnabled ? (
                    <button onClick={handleDisablePush} className="text-xs font-medium text-red-600 hover:underline">
                      Disable
                    </button>
                  ) : (
                    <button
                      onClick={handleEnablePush}
                      disabled={!pushSupported}
                      className="text-xs font-medium text-blue-600 hover:underline disabled:text-slate-400"
                    >
                      {pushSupported ? 'Enable' : 'Not supported'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Permanent Priorities */}
      <Card>
        <CardHeader>
          <CardTitle>Permanent Priorities</CardTitle>
          <CardDescription>
            These never expire and are always used to spot relevant emails.
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
                        Save
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
                      onClick={() => handleDeletePermanent(p.id)}
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

      {/* Important Senders */}
      <Card>
        <CardHeader>
          <CardTitle>Important Senders</CardTitle>
          <CardDescription>
            Emails from these addresses are always flagged.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {importantSenders.length > 0 && (
            <div className="space-y-2">
              {importantSenders.map((sender, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">{sender}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleRemoveSender(i)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="name@company.com"
              value={newSender}
              onChange={(e) => setNewSender(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSender()}
            />
            <Button onClick={handleAddSender} disabled={!isValidSender}>
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button onClick={handleSave} disabled={saving} className="w-full" size="lg">
        <Save className="w-4 h-4 mr-2" />
        {saving ? 'Saving...' : 'Save Settings'}
      </Button>

      {message && (
        <p className={`text-sm text-center ${isError ? 'text-destructive' : 'text-emerald-600'}`}>
          {message}
        </p>
      )}

      {/* Danger Zone */}
      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <TriangleAlert className="w-5 h-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions that affect your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/30 bg-destructive/5">
            <div>
              <p className="text-sm font-medium">Delete account</p>
              <p className="text-xs text-muted-foreground">
                Permanently removes your account and all associated data.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="w-4 h-4 mr-1.5" />
              Delete account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TriangleAlert className="w-5 h-5 text-destructive" />
              Delete your account?
            </DialogTitle>
            <DialogDescription className="pt-1">
              This will permanently delete your account and all your data — priorities,
              settings, email history, and subscriptions. <strong>This cannot be undone.</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="my-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            Signed in as <span className="font-medium">{email}</span>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Yes, delete my account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
