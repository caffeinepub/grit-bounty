import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useGetCallerUserProfile, useGetMyPostedBounties, useGetMyAcceptedQuests } from '../hooks/useQueries';
import { QuestStatus, QuestImmutable } from '../backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Loader2, Trophy, Target, Camera, Eye, Trash2, LogOut, AlertTriangle, XCircle } from 'lucide-react';
import CreditScoreDisplay from './CreditScoreDisplay';
import DailyCheckIn from './DailyCheckIn';
import VisualComparison from './VisualComparison';
import DeleteQuestDialog from './DeleteQuestDialog';
import ExitQuestDialog from './ExitQuestDialog';
import AbandonQuestDialog from './AbandonQuestDialog';
import CancelQuestDialog from './CancelQuestDialog';
import WalletSection from './WalletSection';

export default function PersonalCenter() {
  const { t } = useLanguage();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: postedBounties = [], isLoading: postedLoading } = useGetMyPostedBounties();
  const { data: acceptedQuests = [], isLoading: acceptedLoading } = useGetMyAcceptedQuests();

  const [checkInQuestId, setCheckInQuestId] = useState<bigint | null>(null);
  const [viewProgressQuestId, setViewProgressQuestId] = useState<bigint | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteQuest, setSelectedDeleteQuest] = useState<QuestImmutable | null>(null);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [selectedExitQuest, setSelectedExitQuest] = useState<QuestImmutable | null>(null);
  const [abandonDialogOpen, setAbandonDialogOpen] = useState(false);
  const [selectedAbandonQuest, setSelectedAbandonQuest] = useState<QuestImmutable | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedCancelQuest, setSelectedCancelQuest] = useState<QuestImmutable | null>(null);

  const getStatusColor = (status: QuestStatus) => {
    switch (status) {
      case QuestStatus.active:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case QuestStatus.inProgress:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case QuestStatus.pendingVerification:
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case QuestStatus.completed:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case QuestStatus.disputed:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case QuestStatus.cancelled:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: QuestStatus) => {
    switch (status) {
      case QuestStatus.active:
        return t('personalCenter.statusActive');
      case QuestStatus.inProgress:
        return t('personalCenter.statusInProgress');
      case QuestStatus.pendingVerification:
        return t('personalCenter.statusPending');
      case QuestStatus.completed:
        return t('personalCenter.statusCompleted');
      case QuestStatus.disputed:
        return t('personalCenter.statusDisputed');
      case QuestStatus.cancelled:
        return t('personalCenter.statusCancelled');
      default:
        return status;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const checkInQuest = acceptedQuests.find((q) => q.questId === checkInQuestId);
  const viewProgressQuest = acceptedQuests.find((q) => q.questId === viewProgressQuestId);

  const handleDeleteClick = (quest: QuestImmutable) => {
    console.log('[PersonalCenter] Delete button clicked for questId:', quest.questId.toString());
    setSelectedDeleteQuest(quest);
    setDeleteDialogOpen(true);
  };

  const handleExitClick = (quest: QuestImmutable) => {
    console.log('[PersonalCenter] Exit button clicked for questId:', quest.questId.toString());
    setSelectedExitQuest(quest);
    setExitDialogOpen(true);
  };

  const handleAbandonClick = (quest: QuestImmutable) => {
    console.log('[PersonalCenter] Abandon button clicked for questId:', quest.questId.toString());
    setSelectedAbandonQuest(quest);
    setAbandonDialogOpen(true);
  };

  const handleCancelClick = (quest: QuestImmutable) => {
    console.log('[PersonalCenter] Cancel button clicked for questId:', quest.questId.toString());
    setSelectedCancelQuest(quest);
    setCancelDialogOpen(true);
  };

  const handleDeleteDialogClose = (open: boolean) => {
    setDeleteDialogOpen(open);
    if (!open) {
      setSelectedDeleteQuest(null);
    }
  };

  const handleExitDialogClose = (open: boolean) => {
    setExitDialogOpen(open);
    if (!open) {
      setSelectedExitQuest(null);
    }
  };

  const handleAbandonDialogClose = (open: boolean) => {
    setAbandonDialogOpen(open);
    if (!open) {
      setSelectedAbandonQuest(null);
    }
  };

  const handleCancelDialogClose = (open: boolean) => {
    setCancelDialogOpen(open);
    if (!open) {
      setSelectedCancelQuest(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {userProfile && <CreditScoreDisplay />}

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neon-blue">{t('personalCenter.title')}</h2>
        <p className="text-muted-foreground mt-2">{t('personalCenter.subtitle')}</p>
      </div>

      {/* Wallet Section */}
      <WalletSection />

      <Tabs defaultValue="accepted" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 h-12 bg-card/50 border border-neon-blue/20">
          <TabsTrigger
            value="accepted"
            className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue font-semibold"
          >
            <Target className="mr-2 h-4 w-4" />
            {t('personalCenter.acceptedQuests')}
          </TabsTrigger>
          <TabsTrigger
            value="posted"
            className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue font-semibold"
          >
            <Trophy className="mr-2 h-4 w-4" />
            {t('personalCenter.postedBounties')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accepted" className="mt-6">
          {acceptedLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-neon-blue" />
            </div>
          ) : acceptedQuests.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {acceptedQuests.map((quest) => {
                const progressPercentage = (quest.dailyCheckIns.length / Number(quest.completionTarget)) * 100;
                const rewardPoolICP = Number(quest.reward) / 100000000;
                const depositAmountICP = Number(quest.depositAmount) / 100000000;

                return (
                  <Card
                    key={Number(quest.questId)}
                    className="border-neon-blue/30 bg-card/80 backdrop-blur"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg line-clamp-2">{quest.title}</CardTitle>
                        <Badge className={getDifficultyColor(quest.difficulty)}>
                          {t(`difficulty.${quest.difficulty}`)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t('personalCenter.progress')}</span>
                          <span className="font-semibold">
                            {quest.dailyCheckIns.length} / {Number(quest.completionTarget)}
                          </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t('personalCenter.status')}</span>
                        <Badge className={getStatusColor(quest.status)}>
                          {getStatusLabel(quest.status)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t('personalCenter.reward')}</span>
                        <span className="font-semibold text-neon-magenta">
                          {rewardPoolICP.toFixed(4)} ICP
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t('personalCenter.lockedDeposit')}</span>
                        <span className="font-semibold text-neon-cyan">
                          {depositAmountICP.toFixed(4)} ICP
                        </span>
                      </div>

                      {quest.status === QuestStatus.inProgress && (
                        <div className="space-y-2 pt-2">
                          <div className="flex gap-2">
                            <Button
                              onClick={() => setCheckInQuestId(quest.questId)}
                              className="flex-1 bg-neon-cyan text-black hover:bg-neon-cyan/90"
                              size="sm"
                            >
                              <Camera className="mr-2 h-4 w-4" />
                              {t('personalCenter.checkIn')}
                            </Button>
                            {quest.dailyCheckIns.length > 0 && (
                              <Button
                                onClick={() => setViewProgressQuestId(quest.questId)}
                                variant="outline"
                                size="sm"
                                className="border-neon-blue/30"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                {t('personalCenter.viewProgress')}
                              </Button>
                            )}
                          </div>
                          <Button
                            onClick={() => handleAbandonClick(quest)}
                            variant="destructive"
                            size="sm"
                            className="w-full"
                          >
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            {t('personalCenter.abandonQuest')}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {t('personalCenter.noAcceptedQuests')}
            </div>
          )}
        </TabsContent>

        <TabsContent value="posted" className="mt-6">
          {postedLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-neon-blue" />
            </div>
          ) : postedBounties.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {postedBounties.map((quest) => {
                const rewardPoolICP = Number(quest.reward) / 100000000;
                const hypeCount = Number(quest.hypeCount);
                const hasBountyContributions = quest.bountyContributions.length > 0;

                return (
                  <Card
                    key={Number(quest.questId)}
                    className="border-neon-magenta/30 bg-card/80 backdrop-blur"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg line-clamp-2">{quest.title}</CardTitle>
                        <Badge className={getDifficultyColor(quest.difficulty)}>
                          {t(`difficulty.${quest.difficulty}`)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t('personalCenter.status')}</span>
                        <Badge className={getStatusColor(quest.status)}>
                          {getStatusLabel(quest.status)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t('personalCenter.rewardPool')}</span>
                        <span className="font-semibold text-neon-magenta">
                          {rewardPoolICP.toFixed(4)} ICP
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t('personalCenter.hypeCount')}</span>
                        <span className="font-semibold">{hypeCount}</span>
                      </div>

                      {quest.warriorId && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t('personalCenter.warrior')}</span>
                          <span className="font-mono text-xs truncate max-w-[150px]">
                            {quest.warriorId.toString().slice(0, 10)}...
                          </span>
                        </div>
                      )}

                      {quest.status === QuestStatus.active && !quest.warriorId && (
                        <div className="flex gap-2 pt-2">
                          {hasBountyContributions ? (
                            <Button
                              onClick={() => handleExitClick(quest)}
                              variant="outline"
                              size="sm"
                              className="flex-1 border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              {t('personalCenter.exitQuest')}
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleCancelClick(quest)}
                              variant="outline"
                              size="sm"
                              className="flex-1 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              {t('personalCenter.cancelQuest')}
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDeleteClick(quest)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t('personalCenter.deleteQuest')}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {t('personalCenter.noPostedBounties')}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {checkInQuest && (
        <DailyCheckIn
          open={!!checkInQuestId}
          onOpenChange={(open) => !open && setCheckInQuestId(null)}
          quest={checkInQuest}
        />
      )}

      {viewProgressQuest && (
        <VisualComparison
          open={!!viewProgressQuestId}
          onOpenChange={(open) => !open && setViewProgressQuestId(null)}
          quest={viewProgressQuest}
        />
      )}

      <DeleteQuestDialog
        open={deleteDialogOpen}
        onOpenChange={handleDeleteDialogClose}
        quest={selectedDeleteQuest}
      />

      <ExitQuestDialog
        open={exitDialogOpen}
        onOpenChange={handleExitDialogClose}
        quest={selectedExitQuest}
      />

      <AbandonQuestDialog
        open={abandonDialogOpen}
        onOpenChange={handleAbandonDialogClose}
        quest={selectedAbandonQuest}
      />

      <CancelQuestDialog
        open={cancelDialogOpen}
        onOpenChange={handleCancelDialogClose}
        quest={selectedCancelQuest}
      />
    </div>
  );
}
