import { useEffect, useState } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import SplashScreen from './components/SplashScreen';
import MainApp from './components/MainApp';
import Layout from './components/Layout';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  const isAuthenticated = !!identity;
  
  // Show splash screen if authenticated and has profile
  const showSplash = isAuthenticated && userProfile && !hasSeenSplash;
  const showMainApp = isAuthenticated && userProfile && hasSeenSplash;

  useEffect(() => {
    const splashSeen = sessionStorage.getItem('splashSeen');
    if (splashSeen === 'true') {
      setHasSeenSplash(true);
    }
  }, []);

  const handleEnterApp = () => {
    sessionStorage.setItem('splashSeen', 'true');
    setHasSeenSplash(true);
  };

  return (
    <Layout>
      <Toaster />
      {showSplash && <SplashScreen onEnter={handleEnterApp} />}
      {showMainApp && <MainApp />}
    </Layout>
  );
}
