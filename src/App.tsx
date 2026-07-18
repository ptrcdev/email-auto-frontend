import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getSession } from '@/lib/session';
import { useTheme } from '@/hooks/useTheme';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoginPage } from '@/pages/LoginPage';
import { AuthSuccessPage } from '@/pages/AuthSuccessPage';
import { AuthErrorPage } from '@/pages/AuthErrorPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { DailyBriefTab } from '@/pages/DailyBriefTab';
import { AnalyticsTab } from '@/pages/AnalyticsTab';
import { SearchTab } from '@/pages/SearchTab';
import { SettingsPage } from '@/pages/SettingsPage';
import { PromptPage } from '@/pages/PromptPage';
import { TermsPage } from '@/pages/TermsPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { LandingPage } from '@/pages/LandingPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const email = getSession();
  if (!email) {
    return <Navigate to="/login" replace />;
  }
  return <AppLayout>{children}</AppLayout>;
}

function App() {
  useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/success" element={<AuthSuccessPage />} />
        <Route path="/error" element={<AuthErrorPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />

        {/* Protected routes */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />

        {/* Dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/daily-brief"
          element={
            <ProtectedRoute>
              <DailyBriefTab />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsTab />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/search"
          element={
            <ProtectedRoute>
              <SearchTab />
            </ProtectedRoute>
          }
        />

        {/* Other protected routes */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/prompt"
          element={
            <ProtectedRoute>
              <PromptPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
