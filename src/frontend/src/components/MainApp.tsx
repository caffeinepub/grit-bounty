import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '../hooks/useLanguage';
import BountyBoard from './BountyBoard';
import LaunchMission from './LaunchMission';
import PersonalCenter from './PersonalCenter';
import DisputeVoting from './DisputeVoting';
import { Target, Rocket, User, Scale } from 'lucide-react';

export default function MainApp() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('bounty-board');

  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('activeTab', value);
  };

  return (
    <div className="container py-8">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-4 h-14 bg-card/50 border border-neon-cyan/20">
          <TabsTrigger
            value="bounty-board"
            className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan data-[state=active]:shadow-lg data-[state=active]:shadow-neon-cyan/20 font-semibold"
          >
            <Target className="mr-2 h-5 w-5" />
            {t('tabs.bountyBoard')}
          </TabsTrigger>
          <TabsTrigger
            value="launch-mission"
            className="data-[state=active]:bg-neon-magenta/20 data-[state=active]:text-neon-magenta data-[state=active]:shadow-lg data-[state=active]:shadow-neon-magenta/20 font-semibold"
          >
            <Rocket className="mr-2 h-5 w-5" />
            {t('tabs.launchMission')}
          </TabsTrigger>
          <TabsTrigger
            value="dispute-resolution"
            className="data-[state=active]:bg-neon-magenta/20 data-[state=active]:text-neon-magenta data-[state=active]:shadow-lg data-[state=active]:shadow-neon-magenta/20 font-semibold"
          >
            <Scale className="mr-2 h-5 w-5" />
            {t('tabs.disputeResolution')}
          </TabsTrigger>
          <TabsTrigger
            value="personal-center"
            className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue data-[state=active]:shadow-lg data-[state=active]:shadow-neon-blue/20 font-semibold"
          >
            <User className="mr-2 h-5 w-5" />
            {t('tabs.personalCenter')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="bounty-board" className="mt-8">
          <BountyBoard />
        </TabsContent>
        <TabsContent value="launch-mission" className="mt-8">
          <LaunchMission />
        </TabsContent>
        <TabsContent value="dispute-resolution" className="mt-8">
          <DisputeVoting />
        </TabsContent>
        <TabsContent value="personal-center" className="mt-8">
          <PersonalCenter />
        </TabsContent>
      </Tabs>
    </div>
  );
}
