import { useLanguage } from '../hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, Home } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function PaymentCancel() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="border-yellow-500/30 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-500">
            <XCircle className="h-6 w-6" />
            {t('recharge.cancelTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">{t('recharge.cancelMessage')}</p>
          <p className="text-muted-foreground">{t('recharge.cancelDescription')}</p>
          <Button onClick={handleReturnHome} className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/90">
            <Home className="mr-2 h-4 w-4" />
            {t('recharge.returnHome')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
