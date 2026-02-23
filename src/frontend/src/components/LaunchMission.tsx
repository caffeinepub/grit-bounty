import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useCreateQuest } from '../hooks/useQueries';
import { Difficulty } from '../backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Rocket } from 'lucide-react';
import { toast } from 'sonner';

export default function LaunchMission() {
  const { t } = useLanguage();
  const { mutateAsync: createQuest, isPending } = useCreateQuest();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rewardPool, setRewardPool] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.easy);
  const [participantCount, setParticipantCount] = useState('1');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error(t('launchMission.titleRequired'));
      return;
    }

    if (!description.trim() || description.length < 20) {
      toast.error(t('launchMission.descriptionTooShort'));
      return;
    }

    if (!rewardPool) {
      toast.error(t('launchMission.fillAllFields'));
      return;
    }

    const rewardAmount = parseFloat(rewardPool);
    if (isNaN(rewardAmount) || rewardAmount <= 0) {
      toast.error(t('launchMission.invalidReward'));
      return;
    }

    const participants = parseInt(participantCount);
    if (isNaN(participants) || participants < 1 || participants > 100) {
      toast.error(t('launchMission.invalidParticipantCount'));
      return;
    }

    const rewardPoolE8s = BigInt(Math.floor(rewardAmount * 100000000));

    try {
      // TODO: Implement ICP payment before quest creation
      // For now, we'll proceed directly to quest creation
      const questId = await createQuest({
        title,
        description,
        rewardPool: rewardPoolE8s,
        difficulty,
        participantCount: BigInt(participants),
      });
      toast.success(t('launchMission.createSuccess') + ` (ID: ${questId})`);
      setTitle('');
      setDescription('');
      setRewardPool('');
      setDifficulty(Difficulty.easy);
      setParticipantCount('1');
    } catch (error: any) {
      toast.error(t('launchMission.createError') + ': ' + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neon-magenta flex items-center gap-2">
          <Rocket className="h-8 w-8" />
          {t('launchMission.title')}
        </h2>
        <p className="text-muted-foreground mt-2">{t('launchMission.subtitle')}</p>
      </div>

      <Card className="border-neon-magenta/30 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>{t('launchMission.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">{t('launchMission.questTitle')}</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('launchMission.titlePlaceholder')}
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t('launchMission.rules')}</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('launchMission.rulesPlaceholder')}
                className="min-h-[150px] resize-none"
                disabled={isPending}
              />
              <p className="text-xs text-muted-foreground">
                {description.length} / 20 {t('launchMission.minCharacters')}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="participantCount">{t('launchMission.participantCount')}</Label>
              <Input
                id="participantCount"
                type="number"
                min="1"
                max="100"
                value={participantCount}
                onChange={(e) => setParticipantCount(e.target.value)}
                placeholder={t('launchMission.participantCountPlaceholder')}
                disabled={isPending}
              />
              <p className="text-xs text-muted-foreground">
                {t('launchMission.participantCountHint')}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rewardPool">{t('launchMission.rewardPool')}</Label>
              <Input
                id="rewardPool"
                type="number"
                step="0.0001"
                value={rewardPool}
                onChange={(e) => setRewardPool(e.target.value)}
                placeholder={t('launchMission.rewardHint')}
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">{t('launchMission.difficulty')}</Label>
              <Select
                value={difficulty}
                onValueChange={(value) => setDifficulty(value as Difficulty)}
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Difficulty.easy}>{t('difficulty.easy')}</SelectItem>
                  <SelectItem value={Difficulty.medium}>{t('difficulty.medium')}</SelectItem>
                  <SelectItem value={Difficulty.hard}>{t('difficulty.hard')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-neon-magenta text-white hover:bg-neon-magenta/90 font-semibold"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('launchMission.creating')}
                </>
              ) : (
                t('launchMission.createQuest')
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
