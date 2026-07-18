import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - desktop */}
      <div className="hidden lg:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar
              collapsed={false}
              onToggle={() => setMobileMenuOpen(false)}
            />
          </div>
        </>
      )}

      {/* Main content */}
      <div
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'lg:ml-[68px]' : 'lg:ml-[240px]',
        )}
      >
        <TopNavigation onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
