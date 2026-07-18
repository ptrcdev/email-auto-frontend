import { Link } from 'react-router-dom';
import { Mail, ShieldCheck, Sparkles, ListChecks, Eye, Lock } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

      {/* Nav */}
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0">
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

      <main className="max-w-4xl mx-auto px-6">

        {/* ── Hero ── */}
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-3">AMICUS</h1>
          <p className="text-xl font-medium text-blue-300 mb-6">AI Email Assistant</p>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            AMICUS is an AI-powered email assistant that helps users organise their inbox by
            automatically summarising emails, identifying important messages, and providing a
            daily overview of incoming communications.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
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

        <hr className="border-white/10" />

        {/* ── What AMICUS does ── */}
        <section className="py-16">
          <h2 className="text-2xl font-bold text-center mb-10">What AMICUS does</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: Mail,
                title: 'Connects to your inbox',
                body: 'Securely connects to your Gmail or Microsoft Outlook account with your explicit permission.',
              },
              {
                icon: Eye,
                title: 'Reads your emails',
                body: 'Reads emails you have authorised access to in order to generate summaries and insights.',
              },
              {
                icon: Sparkles,
                title: 'Generates AI summaries',
                body: 'Uses AI to produce a concise daily brief of your most important incoming messages.',
              },
              {
                icon: ListChecks,
                title: 'Highlights what matters',
                body: 'Identifies high-priority emails and surfaces them so nothing important gets missed.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4 p-5 rounded-xl border border-white/10 bg-white/5">
                <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/10" />

        {/* ── How it works ── */}
        <section className="py-16">
          <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { step: '1', title: 'Connect your email', body: 'Sign in with Google or Microsoft. AMICUS requests only the permissions needed to read your emails.' },
              { step: '2', title: 'AI analyses your inbox', body: 'AMICUS processes your incoming messages to identify what is important and generate plain-language summaries.' },
              { step: '3', title: 'Receive your daily brief', body: 'Every morning, you get a concise overview of your inbox — prioritised, summarised, and ready to act on.' },
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
        </section>

        <hr className="border-white/10" />

        {/* ── Why we request Google access ── */}
        <section className="py-16">
          <h2 className="text-2xl font-bold text-center mb-6">Why AMICUS requests Google access</h2>
          <div className="max-w-2xl mx-auto rounded-xl border border-blue-500/30 bg-blue-500/5 p-6 text-slate-300 text-sm leading-relaxed space-y-3">
            <p>
              AMICUS requests access to your Gmail account <strong className="text-white">only to retrieve emails
              that you explicitly authorise</strong>. Your emails are processed solely to generate
              summaries and help you manage your inbox more effectively.
            </p>
            <p>
              We do not sell your data, use it for advertising, or share it with third parties
              outside of what is described in our{' '}
              <Link to="/privacy" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              AMICUS's use of data received from Google APIs adheres to the{' '}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </div>
        </section>

        <hr className="border-white/10" />

        {/* ── Privacy & Security ── */}
        <section className="py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Privacy &amp; Security</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: ShieldCheck,
                title: 'Your data stays yours',
                body: 'We never sell your personal data or email content to third parties.',
              },
              {
                icon: Lock,
                title: 'Minimal permissions',
                body: 'AMICUS requests only the access it needs — read-only access to retrieve your messages.',
              },
              {
                icon: Eye,
                title: 'Transparent processing',
                body: 'Emails are processed to generate summaries for you. That is the only purpose.',
              },
              {
                icon: ListChecks,
                title: 'GDPR compliant',
                body: 'AMICUS is operated by AzulLogic and complies with GDPR and applicable data protection law.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4 p-5 rounded-xl border border-white/10 bg-white/5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 mt-4">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© 2026 AzulLogic · AMICUS</p>
          <nav className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <a href="mailto:info@azullogic.com" className="hover:text-slate-300 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </footer>

    </div>
  );
}
