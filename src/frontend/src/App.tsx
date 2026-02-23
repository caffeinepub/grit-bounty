import { useState, useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useActor } from './hooks/useActor';
import { useQueryClient } from '@tanstack/react-query';
import { LanguageProvider } from './hooks/useLanguage';
import MainApp from './components/MainApp';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import { Toaster } from '@/components/ui/sonner';
import { Loader2 } from 'lucide-react';

type FlowStep = 'splash' | 'authenticating' | 'authenticated';

export default function App() {
  const { identity, login, loginStatus, isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();
  const [flowStep, setFlowStep] = useState<FlowStep>('splash');

  const isAuthenticated = !!identity;

  // Manage flow progression with timeout fallback
  useEffect(() => {
    if (isInitializing) {
      return;
    }

    if (isAuthenticated && actor && !actorFetching) {
      setFlowStep('authenticated');
    } else if (loginStatus === 'logging-in') {
      setFlowStep('authenticating');
    }
  }, [isAuthenticated, actor, actorFetching, loginStatus, isInitializing]);

  // Safety timeout: if stuck in authenticating for too long, show error
  useEffect(() => {
    if (flowStep === 'authenticating' && loginStatus !== 'logging-in') {
      const timeout = setTimeout(() => {
        if (!isAuthenticated || !actor) {
          console.error('[App] Initialization timeout - forcing retry');
          setFlowStep('splash');
        }
      }, 10000); // 10 second timeout

      return () => clearTimeout(timeout);
    }
  }, [flowStep, loginStatus, isAuthenticated, actor]);

  const handleLoginClick = async () => {
    try {
      setFlowStep('authenticating');
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      setFlowStep('splash');
    }
  };

  return (
    <LanguageProvider>
      {/* Show splash screen first */}
      {flowStep === 'splash' && (
        <>
          <Toaster />
          <SplashScreen onLoginClick={handleLoginClick} />
        </>
      )}

      {/* Show authenticating state */}
      {(flowStep === 'authenticating' || isInitializing || (isAuthenticated && actorFetching)) && (
        <Layout>
          <Toaster />
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-neon-cyan mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                {loginStatus === 'logging-in' ? 'Authenticating...' : 'Initializing...'}
              </p>
            </div>
          </div>
        </Layout>
      )}

      {/* Show main app after authentication */}
      {flowStep === 'authenticated' && isAuthenticated && actor && (
        <Layout>
          <Toaster />
          <MainApp />
        </Layout>
      )}
    </LanguageProvider>
  );
}
