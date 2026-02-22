import { useLanguage } from '../hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Scale, ThumbsUp, ThumbsDown, Clock, AlertCircle } from 'lucide-react';

export default function DisputeVoting() {
  const { t } = useLanguage();

  // Placeholder data - will be replaced with real data from backend
  const hasDisputes = false;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neon-magenta flex items-center gap-2">
          <Scale className="h-8 w-8" />
          {t('dispute.title')}
        </h2>
        <p className="text-muted-foreground mt-2">{t('dispute.subtitle')}</p>
      </div>

      {!hasDisputes ? (
        <Card className="border-neon-magenta/30 bg-card/80 backdrop-blur">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Scale className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <p className="text-lg text-muted-foreground">{t('dispute.noDisputes')}</p>
            <p className="text-sm text-muted-foreground mt-2">{t('dispute.noDisputesDescription')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Example Dispute Card - will be mapped from real data */}
          <Card className="border-neon-magenta/30 bg-card/80 backdrop-blur">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">Quest Title Example</CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      {t('dispute.firstAppeal')}
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      <Clock className="h-3 w-3 mr-1" />
                      {t('dispute.timeRemaining')}: 18h 32m
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dispute Context */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-neon-cyan mb-2">{t('dispute.publisherArgument')}</p>
                  <p className="text-sm text-muted-foreground p-3 rounded-lg bg-muted/50">
                    Placeholder for publisher's argument...
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neon-blue mb-2">{t('dispute.warriorArgument')}</p>
                  <p className="text-sm text-muted-foreground p-3 rounded-lg bg-muted/50">
                    Placeholder for warrior's argument...
                  </p>
                </div>
              </div>

              <Separator />

              {/* Voting Progress */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{t('dispute.currentVotes')}</span>
                  <span className="text-xs text-muted-foreground">{t('dispute.weightedVoting')}</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-green-400">{t('dispute.supportPublisher')}</span>
                      <span className="text-sm font-semibold text-green-400">42%</span>
                    </div>
                    <Progress value={42} className="h-2 bg-muted [&>div]:bg-green-500" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-400">{t('dispute.supportWarrior')}</span>
                      <span className="text-sm font-semibold text-blue-400">38%</span>
                    </div>
                    <Progress value={38} className="h-2 bg-muted [&>div]:bg-blue-500" />
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-400">{t('dispute.votingInfo')}</p>
                </div>
              </div>

              {/* Voting Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {t('dispute.votePublisher')}
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  {t('dispute.voteWarrior')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
