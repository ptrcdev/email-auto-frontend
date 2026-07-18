import { Link } from 'react-router-dom';
import { Mail, Zap, Shield, Clock, BarChart2, Bell } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const features = [
  {
    icon: Mail,
    title: 'Daily email briefs',
    description:
      'Get a concise, AI-generated summary of your inbox every morning — no more inbox overload.',
  },
  {
    icon: Zap,
    title: 'Smart prioritisation',
    description:
      'AMICUS learns what matters to you and surfaces the emails that need your attention first.',
  },
  {
    icon: Clock,
    title: 'Digest on your schedule',
    description:
      'Choose your delivery time and timezone so your brief arrives exactly when you start your day.',
  },
  {
    icon: BarChart2,
    title: 'Email analytics',
    description:
      'Understand your inbox patterns — busiest senders, volume trends, and response times at a glance.',
  },
  {
    icon: Bell,
    title: 'Reminders & notifications',
    description:
      'Get push and calendar reminders to set your priorities before the day begins.',
  },
  {
    icon: Shield,
    title: 'Privacy first',
    description:
      'Your data is processed solely to deliver your brief. We never sell or share it with third parties.',
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

      {/* Nav */}
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-lg tracking-tight">AMICUS</span>
          </div>
          <Link
            to="/login"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-medium mb-6">
            <Zap className="w-3 h-3" />
            AI-powered email assistant
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Your inbox, summarised.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Every morning.
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            AMICUS connects to your Google or Microsoft email account and delivers a
            clear, prioritised daily brief so you always know what needs your attention —
            without spending an hour in your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`${BASE_URL}/auth/google`}
              className="flex items-center justify-center gap-3 px-6 py-3 bg-white rounded-xl text-slate-900 font-medium hover:bg-slate-100 transition-colors"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Get started with Google
            </a>
            <a
              href={`${BASE_URL}/auth/microsoft`}
              className="flex items-center justify-center gap-3 px-6 py-3 bg-[#00a4ef] rounded-xl text-white font-medium hover:bg-[#0090d9] transition-colors"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              Get started with Microsoft
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <h2 className="text-center text-xl font-semibold text-slate-200 mb-10">
            Everything you need to stay on top of your inbox
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-3"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-white/10">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <h2 className="text-center text-xl font-semibold text-slate-200 mb-12">
              How it works
            </h2>
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              {[
                { step: '1', title: 'Connect your email', body: 'Sign in with Google or Microsoft. AMICUS gets read access to your inbox — nothing is ever sent or deleted.' },
                { step: '2', title: 'Set your priorities', body: 'Tell AMICUS what topics and senders matter to you. It uses these to rank and filter your daily brief.' },
                { step: '3', title: 'Receive your brief', body: 'Every morning at your chosen time, AMICUS sends you a concise summary of everything that matters.' },
              ].map(({ step, title, body }) => (
                <div key={step} className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto text-sm font-bold">
                    {step}
                  </div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10">
          <div className="max-w-5xl mx-auto px-6 py-20 text-center">
            <h2 className="text-2xl font-bold mb-4">Start your day with clarity</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm">
              Join AMICUS and spend less time in your inbox, more time on work that matters.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              Get started free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© 2026 AzulLogic · AMICUS</p>
          <div className="flex items-center gap-5">
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <a href="mailto:info@azullogic.com" className="hover:text-slate-300 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
