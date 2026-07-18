import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { saveSession } from '@/lib/session';

export function AuthSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const email = searchParams.get('email');
    const isNew = searchParams.get('new') === 'true';

    if (!email) {
      navigate('/login');
      return;
    }

    saveSession(email);

    const timer = setTimeout(() => {
      if (isNew) {
        navigate(`/onboarding?email=${encodeURIComponent(email)}`);
      } else {
        navigate(`/dashboard?email=${encodeURIComponent(email)}`);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back!</h1>
        <p className="text-slate-400">Redirecting you to your dashboard...</p>
      </div>
    </div>
  );
}
