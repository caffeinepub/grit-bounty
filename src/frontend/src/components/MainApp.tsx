import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '../hooks/useLanguage';
import { useActor } from '../hooks/useActor';
import BountyBoard from './BountyBoard';
import LaunchMission from './LaunchMission';
import PersonalCenter from './PersonalCenter';
import { Target, Rocket, User } from 'lucide-react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MainApp() {
  const { t } = useLanguage();
  const { actor, isFetching } = useActor();
  const [activeTab, setActiveTab] = useState<string>('bounty-board');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab && ['bounty-board', 'launch-mission', 'personal-center'].includes(savedTab)) {
      setActiveTab(savedTab);
    } else {
      setActiveTab('bounty-board');
      localStorage.setItem('activeTab', 'bounty-board');
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('activeTab', value);
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    window.location.reload();
  };

  if (isFetching) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-neon-cyan mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Loading quest system...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!actor) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-destructive mb-2">Connection Failed</h3>
            <p className="text-muted-foreground mb-6">
              Unable to connect to the quest system. Please check your connection and try again.
            </p>
            <Button onClick={handleRetry} className="bg-neon-cyan text-black hover:bg-neon-cyan/90">
              Retry Connection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Fixed navigation bar */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-neon-cyan/20">
        <div className="container py-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 h-14 bg-card/50 border border-neon-cyan/20">
              <TabsTrigger
                value="bounty-board"
                className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan data-[state=active]:shadow-lg data-[state=active]:shadow-neon-cyan/20 font-semibold transition-all"
              >
                <Target className="mr-2 h-5 w-5" />
                {t('nav.bountyBoard')}
              </TabsTrigger>
              <TabsTrigger
                value="launch-mission"
                className="data-[state=active]:bg-neon-magenta/20 data-[state=active]:text-neon-magenta data-[state=active]:shadow-lg data-[state=active]:shadow-neon-magenta/20 font-semibold transition-all"
              >
                <Rocket className="mr-2 h-5 w-5" />
                {t('nav.launchMission')}
              </TabsTrigger>
              <TabsTrigger
                value="personal-center"
                className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue data-[state=active]:shadow-lg data-[state=active]:shadow-neon-blue/20 font-semibold transition-all"
              >
                <User className="mr-2 h-5 w-5" />
                {t('nav.personalCenter')}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Tab content */}
      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsContent value="bounty-board" className="mt-0">
            <BountyBoard />
          </TabsContent>
          <TabsContent value="launch-mission" className="mt-0">
            <LaunchMission />
          </TabsContent>
          <TabsContent value="personal-center" className="mt-0">
            <PersonalCenter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
