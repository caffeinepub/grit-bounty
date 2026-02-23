import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      sessionStorage.removeItem('splashSeen');
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-neon-cyan/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/generated/logo.dim_256x256.png" alt="Grit Bounty" className="h-10 w-10" />
            <h1 className="text-2xl font-bold tracking-tight text-neon-cyan">GRIT BOUNTY</h1>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated && <LanguageSwitcher />}
            <Button
              onClick={handleAuth}
              disabled={disabled}
              variant={isAuthenticated ? 'outline' : 'default'}
              className={isAuthenticated ? 'border-neon-magenta/50 text-neon-magenta hover:bg-neon-magenta/10' : 'bg-neon-cyan text-black hover:bg-neon-cyan/90'}
            >
              {loginStatus === 'logging-in' ? (
                'Connecting...'
              ) : isAuthenticated ? (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </>
              )}
            </Button>
          </div>
        </div>
      </header>
      <main className="pt-16">{children}</main>
      <footer className="border-t border-neon-cyan/20 bg-card/50 py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
