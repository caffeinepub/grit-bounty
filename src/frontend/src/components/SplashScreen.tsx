import { useLanguage } from '../hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onEnter: () => void;
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  const { t } = useLanguage();

  return (
    <div
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/generated/splash-bg.dim_1920x1080.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      <div className="relative z-10 max-w-4xl px-6 text-center">
        <h1 className="mb-8 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-magenta bg-clip-text text-transparent animate-pulse">
            {t('splash.title')}
          </span>
        </h1>
        <p className="mb-12 text-xl text-foreground/90 md:text-2xl leading-relaxed max-w-3xl mx-auto">
          {t('splash.subtitle')}
        </p>
        <Button
          onClick={onEnter}
          size="lg"
          className="group relative overflow-hidden bg-neon-cyan text-black hover:bg-neon-cyan/90 font-bold text-xl px-12 py-6 h-auto rounded-full shadow-lg shadow-neon-cyan/50 hover:shadow-neon-cyan/70 transition-all"
        >
          <span className="relative z-10 flex items-center gap-2">
            {t('splash.enter')}
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </span>
        </Button>
      </div>
    </div>
  );
}
