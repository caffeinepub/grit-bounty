import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AppealSubmissionProps {
  questId: bigint;
  currentTier: 'first' | 'second' | 'third';
  userRole: 'publisher' | 'warrior' | 'viewer';
}

export default function AppealSubmission({ questId, currentTier, userRole }: AppealSubmissionProps) {
  const { t } = useLanguage();
  const [reasoning, setReasoning] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const minCharacters = 100;
  const characterCount = reasoning.length;
  const isValid = characterCount >= minCharacters;
  const canSubmit = userRole === 'publisher' || userRole === 'warrior';

  const handleSubmit = async () => {
    if (!isValid || !canSubmit) return;

    setIsSubmitting(true);
    try {
      // Placeholder for backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasSubmitted(true);
      toast.success(t('appeal.submitSuccess'));
    } catch (error: any) {
      toast.error(t('appeal.submitError') + ': ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTierBadge = () => {
    const tierColors = {
      first: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      second: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      third: 'bg-red-500/20 text-red-400 border-red-500/30',
    };

    return (
      <Badge className={tierColors[currentTier]}>
        {t(`appeal.${currentTier}Tier`)}
      </Badge>
    );
  };

  return (
    <Card className="border-neon-magenta/30 bg-card/80 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-neon-magenta" />
            {t('appeal.title')}
          </CardTitle>
          {getTierBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {canSubmit && !hasSubmitted ? (
          <>
            <div className="space-y-2">
              <label className="text-sm font-semibold">{t('appeal.yourArgument')}</label>
              <Textarea
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                placeholder={t('appeal.argumentPlaceholder')}
                className="min-h-[200px] resize-none"
                disabled={isSubmitting}
              />
              <div className="flex items-center justify-between text-xs">
                <span className={characterCount < minCharacters ? 'text-red-400' : 'text-green-400'}>
                  {characterCount} / {minCharacters} {t('appeal.charactersMinimum')}
                </span>
                {isValid && <CheckCircle className="h-4 w-4 text-green-400" />}
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-400">{t('appeal.submissionInfo')}</p>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className="w-full bg-neon-magenta text-white hover:bg-neon-magenta/90 font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Send className="mr-2 h-4 w-4 animate-pulse" />
                  {t('appeal.submitting')}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {t('appeal.submitAppeal')}
                </>
              )}
            </Button>
          </>
        ) : hasSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-400 mb-3" />
            <p className="text-lg font-semibold text-green-400">{t('appeal.submitted')}</p>
            <p className="text-sm text-muted-foreground mt-2">{t('appeal.submittedDescription')}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">{t('appeal.viewerOnly')}</p>
          </div>
        )}

        <Separator />

        {/* Display submitted appeals */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">{t('appeal.submittedAppeals')}</h4>
          <div className="space-y-3">
            {/* Placeholder for submitted appeals */}
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
                  {t('appeal.publisher')}
                </Badge>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('appeal.noSubmissionsYet')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
