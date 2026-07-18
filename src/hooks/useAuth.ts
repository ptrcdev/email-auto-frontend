import { useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getSession, saveSession, clearSession } from '@/lib/session';

export function useAuth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = useMemo(() => {
    return searchParams.get('email') || getSession() || '';
  }, [searchParams]);

  const isAuthenticated = Boolean(email);

  const login = useCallback(
    (userEmail: string) => {
      saveSession(userEmail);
      navigate(`/dashboard?email=${encodeURIComponent(userEmail)}`);
    },
    [navigate],
  );

  const logout = useCallback(() => {
    clearSession();
    navigate('/login');
  }, [navigate]);

  const redirectToDashboard = useCallback(() => {
    if (email) {
      navigate(`/dashboard?email=${encodeURIComponent(email)}`);
    }
  }, [email, navigate]);

  return { email, isAuthenticated, login, logout, redirectToDashboard };
}
