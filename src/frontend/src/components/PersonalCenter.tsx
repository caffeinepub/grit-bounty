import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useGetCallerUserProfile, useGetMyPostedBounties, useGetMyAcceptedQuests } from '../hooks/useQueries';
import { QuestStatus } from '../backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Loader2, Trophy, Target, Camera, Eye, Trash2, LogOut, AlertTriangle } from 'lucide-react';
import CreditScoreDisplay from './CreditScoreDisplay';
import DailyCheckIn from './DailyCheckIn';
import VisualComparison from './VisualComparison';
import DeleteQuestDialog from './DeleteQuestDialog';
import ExitQuestDialog from './ExitQuestDialog';
import AbandonQuestDialog from './AbandonQuestDialog';

export default function PersonalCenter() {
  const { t } = useLanguage();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: postedBounties = [], isLoading: postedLoading } = useGetMyPostedBounties();
  const { data: acceptedQuests = [], isLoading: acceptedLoading } = useGetMyAcceptedQuests();

  const [checkInQuestId, setCheckInQuestId] = useState<bigint | null>(null);
  const [viewProgressQuestId, setViewProgressQuestId] = useState<bigint | null>(null);
  const [deleteQuestId, setDeleteQuestId] = useState<bigint | null>(null);
  const [exitQuestId, setExitQuestId] = useState<bigint | null>(null);
  const [abandonQuestId, setAbandonQuestId] = useState<bigint | null>(null);

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
  const deleteQuest = postedBounties.find((q) => q.questId === deleteQuestId);
  const exitQuest = postedBounties.find((q) => q.questId === exitQuestId);
  const abandonQuest = acceptedQuests.find((q) => q.questId === abandonQuestId);

  const handleDeleteClick = (questId: bigint) => {
    console.log('[PersonalCenter] Delete button clicked for questId:', questId.toString());
    setDeleteQuestId(questId);
  };

  const handleExitClick = (questId: bigint) => {
    console.log('[PersonalCenter] Exit button clicked for questId:', questId.toString());
    setExitQuestId(questId);
  };

  const handleAbandonClick = (questId: bigint) => {
    console.log('[PersonalCenter] Abandon button clicked for questId:', questId.toString());
    setAbandonQuestId(questId);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {userProfile && <CreditScoreDisplay />}

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neon-blue">{t('personalCenter.title')}</h2>
        <p className="text-muted-foreground mt-2">{t('personalCenter.subtitle')}</p>
      </div>

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
                const rewardPoolICP = Number(quest.rewardPool) / 100000000;
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
                            onClick={() => handleAbandonClick(quest.questId)}
                            variant="destructive"
                            size="sm"
                            className="w-full"
                          >
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            {t('personalCenter.abandonQuest')}
                          </Button>
                        </div>
                      )}

                      {(quest.status === QuestStatus.pendingVerification || quest.status === QuestStatus.completed) &&
                        quest.dailyCheckIns.length > 0 && (
                          <Button
                            onClick={() => setViewProgressQuestId(quest.questId)}
                            variant="outline"
                            size="sm"
                            className="w-full border-neon-blue/30"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            {t('personalCenter.viewProgress')}
                          </Button>
                        )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-lg text-muted-foreground">{t('personalCenter.noAcceptedQuests')}</p>
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
                const rewardPoolICP = Number(quest.rewardPool) / 100000000;
                const hasWarrior = quest.warriorId !== undefined && quest.warriorId !== null;
                const hasCrowdfunding = quest.crowdfundingContributions.length > 0;
                const canDelete = quest.status === QuestStatus.active && !hasWarrior;
                const canExit = quest.status === QuestStatus.active && !hasWarrior && hasCrowdfunding;

                console.log('[PersonalCenter] Quest card rendered:', {
                  questId: quest.questId.toString(),
                  canDelete,
                  canExit,
                  status: quest.status,
                  hasWarrior,
                  hasCrowdfunding
                });

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
                    <CardContent className="space-y-3">
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
                        <span className="font-semibold text-neon-blue">{Number(quest.hypeCount)}</span>
                      </div>

                      {quest.warriorId && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t('personalCenter.warrior')}</span>
                          <span className="font-mono text-xs truncate max-w-[200px]">
                            {quest.warriorId.toString().slice(0, 8)}...
                          </span>
                        </div>
                      )}

                      {(canDelete || canExit) && (
                        <div className="flex gap-2 pt-2">
                          {canDelete && (
                            <Button
                              onClick={() => handleDeleteClick(quest.questId)}
                              variant="destructive"
                              size="sm"
                              className="flex-1"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              {t('personalCenter.deleteQuest')}
                            </Button>
                          )}
                          {canExit && (
                            <Button
                              onClick={() => handleExitClick(quest.questId)}
                              variant="outline"
                              size="sm"
                              className="flex-1 border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              {t('personalCenter.exitQuest')}
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-lg text-muted-foreground">{t('personalCenter.noPostedBounties')}</p>
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

      {deleteQuest && (
        <DeleteQuestDialog
          open={!!deleteQuestId}
          onOpenChange={(open) => {
            console.log('[PersonalCenter] DeleteQuestDialog onOpenChange:', open);
            if (!open) setDeleteQuestId(null);
          }}
          quest={deleteQuest}
        />
      )}

      {exitQuest && (
        <ExitQuestDialog
          open={!!exitQuestId}
          onOpenChange={(open) => !open && setExitQuestId(null)}
          quest={exitQuest}
        />
      )}

      {abandonQuest && (
        <AbandonQuestDialog
          open={!!abandonQuestId}
          onOpenChange={(open) => !open && setAbandonQuestId(null)}
          quest={abandonQuest}
        />
      )}
    </div>
  );
}
