import { useState, useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useActor } from './hooks/useActor';
import { useQueryClient } from '@tanstack/react-query';
import { LanguageProvider } from './hooks/useLanguage';
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import MainApp from './components/MainApp';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';
import { Toaster } from '@/components/ui/sonner';
import { Loader2 } from 'lucide-react';

type FlowStep = 'splash' | 'authenticating' | 'authenticated';

function RootComponent() {
  const { identity, login, loginStatus, isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();
  const [flowStep, setFlowStep] = useState<FlowStep>('splash');

  const isAuthenticated = !!identity;

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

  useEffect(() => {
    if (flowStep === 'authenticating' && loginStatus !== 'logging-in') {
      const timeout = setTimeout(() => {
        if (!isAuthenticated || !actor) {
          console.error('[App] Initialization timeout - forcing retry');
          setFlowStep('splash');
        }
      }, 10000);

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

  if (flowStep === 'splash') {
    return (
      <>
        <Toaster />
        <SplashScreen onLoginClick={handleLoginClick} />
      </>
    );
  }

  if (flowStep === 'authenticating' || isInitializing || (isAuthenticated && actorFetching)) {
    return (
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
    );
  }

  return (
    <Layout>
      <Toaster />
      <MainApp />
    </Layout>
  );
}

const rootRoute = createRootRoute({
  component: RootComponent,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => null,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: PaymentSuccess,
});

const paymentCancelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-cancel',
  component: PaymentCancel,
});

const routeTree = rootRoute.addChildren([indexRoute, paymentSuccessRoute, paymentCancelRoute]);

const router = createRouter({ routeTree });

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}
