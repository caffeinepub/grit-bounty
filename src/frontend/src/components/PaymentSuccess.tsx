import { useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useGetStripeSessionStatus } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2, Home } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function PaymentSuccess() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { data: sessionStatus, isLoading, error } = useGetStripeSessionStatus(sessionId);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('session_id');
    if (id) {
      setSessionId(id);
    }
  }, []);

  const handleReturnHome = () => {
    navigate({ to: '/' });
  };

  if (isLoading || !sessionId) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-neon-cyan mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">{t('recharge.verifying')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Card className="border-destructive/30 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-destructive">{t('recharge.verificationError')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t('recharge.verificationErrorDesc')}</p>
            <Button onClick={handleReturnHome} className="w-full">
              <Home className="mr-2 h-4 w-4" />
              {t('recharge.returnHome')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="border-neon-cyan/30 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-neon-cyan">
            <CheckCircle2 className="h-6 w-6" />
            {t('recharge.successTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">{t('recharge.successMessage')}</p>
          <div className="p-4 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
            <p className="text-sm text-muted-foreground mb-2">{t('recharge.balanceUpdated')}</p>
          </div>
          <Button onClick={handleReturnHome} className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/90">
            <Home className="mr-2 h-4 w-4" />
            {t('recharge.returnHome')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
