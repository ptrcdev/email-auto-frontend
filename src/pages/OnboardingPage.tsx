import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Globe, Sparkles, ArrowRight, ArrowLeft, Coffee, Briefcase, Crown, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { putOnboarding } from '@/lib/api';

const timezones = [
  { value: 'Europe/Lisbon', label: 'Europe/Lisbon (GMT+0/+1)' },
  { value: 'Europe/London', label: 'Europe/London (GMT+0/+1)' },
  { value: 'Europe/Paris', label: 'Europe/Paris (GMT+1/+2)' },
  { value: 'Europe/Berlin', label: 'Europe/Berlin (GMT+1/+2)' },
  { value: 'Europe/Madrid', label: 'Europe/Madrid (GMT+1/+2)' },
  { value: 'America/New_York', label: 'America/New_York (GMT-5/-4)' },
  { value: 'America/Chicago', label: 'America/Chicago (GMT-6/-5)' },
  { value: 'America/Denver', label: 'America/Denver (GMT-7/-6)' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles (GMT-8/-7)' },
  { value: 'America/Sao_Paulo', label: 'America/Sao_Paulo (GMT-3)' },
  { value: 'America/Buenos_Aires', label: 'America/Buenos_Aires (GMT-3)' },
  { value: 'America/Santiago', label: 'America/Santiago (GMT-4/-3)' },
  { value: 'America/Bogota', label: 'America/Bogota (GMT-5)' },
  { value: 'America/Mexico_City', label: 'America/Mexico_City (GMT-6/-5)' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo (GMT+9)' },
  { value: 'Asia/Shanghai', label: 'Asia/Shanghai (GMT+8)' },
  { value: 'Asia/Kolkata', label: 'Asia/Kolkata (GMT+5:30)' },
  { value: 'Australia/Sydney', label: 'Australia/Sydney (GMT+10/+11)' },
];

const roles = [
  'Real Estate Developer',
  'Architect',
  'Contractor',
  'Lawyer',
  'Project Manager',
  'Financial Advisor',
  'Interior Designer',
  'Urban Planner',
];

const addressStyles = [
  {
    value: 'chill',
    label: 'Chill',
    icon: Coffee,
    description: "We're bros now. Short, punchy, zero fluff.",
    example: '"Yo, 3 emails need your attention."',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/50 hover:border-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    value: 'professional',
    label: 'Professional',
    icon: Briefcase,
    description: 'Polished and precise. Like a good handshake.',
    example: '"Good morning. You have 3 items requiring attention."',
    color: 'from-blue-500 to-indigo-500',
    borderColor: 'border-blue-500/50 hover:border-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    value: 'formal',
    label: 'Formal',
    icon: Crown,
    description: 'Proper. Distinguished. Your emails shall be served on a silver platter.',
    example: '"Good morning, Your Eminence. 3 missives await your review."',
    color: 'from-purple-500 to-violet-500',
    borderColor: 'border-purple-500/50 hover:border-purple-400',
    bg: 'bg-purple-500/10',
  },
];

function generateTimeOptions() {
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = String(h).padStart(2, '0');
      const min = String(m).padStart(2, '0');
      times.push({ value: `${hour}:${min}`, label: `${hour}:${min}` });
    }
  }
  return times;
}

const timeOptions = generateTimeOptions();
const TOTAL_STEPS = 5;

export function OnboardingPage() {
  const { email } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [preferredName, setPreferredName] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [addressStyle, setAddressStyle] = useState('');
  const [digestTime, setDigestTime] = useState('08:00');
  const [timezone, setTimezone] = useState('Europe/Lisbon');

  const canNext = () => {
    if (step === 1) return preferredName.trim().length > 0;
    if (step === 3) return roleInput.trim().length > 0;
    if (step === 4) return addressStyle.length > 0;
    return true;
  };

  const handleNext = () => {
    if (step === 3 && roleInput.trim()) {
      setRole(roleInput.trim());
    }
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSkipName = () => {
    setName('');
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    setError('');

    try {
      await putOnboarding(email, {
        preferredName: preferredName.trim(),
        name: name.trim() || undefined,
        role: role.trim() || undefined,
        addressStyle,
        digestTime,
        timezone,
      });
      navigate(`/dashboard?email=${encodeURIComponent(email)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save preferences');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome to AMICUS</h1>
          <p className="text-slate-400 mt-2">
            Let's get to know each other
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i + 1 <= step
                  ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'w-3 bg-slate-600'
              }`}
            />
          ))}
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/10">
          <CardContent className="p-8">
            {/* Step 1: Preferred name */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    What should we call you?
                  </h2>
                  <p className="text-slate-400 mt-1">
                    Nickname, first name, "Captain Awesome" — your call.
                  </p>
                </div>
                <Input
                  placeholder="e.g. Pat, Joao, Captain Awesome"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && canNext() && handleNext()}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 text-lg h-12"
                  autoFocus
                />
              </div>
            )}

            {/* Step 2: Full name */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    And your full name?
                  </h2>
                  <p className="text-slate-400 mt-1">
                    For when things get official. Totally optional though — we're not picky.
                  </p>
                </div>
                <Input
                  placeholder="e.g. Patricia Almeida"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 text-lg h-12"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  onClick={handleSkipName}
                  className="w-full text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Skip, I'm private like that
                </Button>
              </div>
            )}

            {/* Step 3: Role */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    What do you do?
                  </h2>
                  <p className="text-slate-400 mt-1">
                    We'll tailor your briefings to your world. No wrong answers (unless you say "influencer").
                  </p>
                </div>
                <Input
                  placeholder="Start typing or pick one below"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && canNext() && handleNext()}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 text-lg h-12"
                  autoFocus
                />
                <div className="flex flex-wrap gap-2">
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => setRoleInput(r)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                        roleInput === r
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Address style */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    How should we talk to you?
                  </h2>
                  <p className="text-slate-400 mt-1">
                    Pick your vibe. We won't judge. (Much.)
                  </p>
                </div>
                <div className="grid gap-3">
                  {addressStyles.map((style) => {
                    const Icon = style.icon;
                    const isSelected = addressStyle === style.value;
                    return (
                      <button
                        key={style.value}
                        onClick={() => setAddressStyle(style.value)}
                        className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? `${style.borderColor} ${style.bg}`
                            : 'border-white/10 hover:border-white/20 bg-white/5'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${style.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white">{style.label}</p>
                            <p className="text-sm text-slate-400 mt-0.5">{style.description}</p>
                            <p className="text-xs text-slate-500 mt-1 italic">{style.example}</p>
                          </div>
                          {isSelected && (
                            <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 5: Digest time + Timezone */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    One last thing, {preferredName || 'friend'}...
                  </h2>
                  <p className="text-slate-400 mt-1">
                    When do you want your morning briefing? We suggest coffee o'clock.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Digest Time
                  </label>
                  <Select value={digestTime} onValueChange={setDigestTime}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Timezone
                  </label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {error && (
              <p className="text-sm text-red-400 mt-4">{error}</p>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              )}
              {step < TOTAL_STEPS ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!canNext()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {loading ? 'Saving...' : "Let's go!"}
                  {!loading && <Sparkles className="w-4 h-4 ml-1" />}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
