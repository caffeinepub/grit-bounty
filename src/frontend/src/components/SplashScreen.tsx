import { useLanguage } from '../hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onLoginClick: () => void;
}

export default function SplashScreen({ onLoginClick }: SplashScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/generated/splash-bg.dim_1920x1080.png)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <img
            src="/assets/generated/logo.dim_256x256.png"
            alt="Grit Bounty Logo"
            className="h-32 w-32 animate-pulse"
          />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-blue bg-clip-text text-transparent animate-gradient">
          GRIT BOUNTY
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light tracking-wide">
          {t('splash.subtitle')}
        </p>

        <p className="text-lg md:text-xl text-neon-cyan mb-12 font-semibold">
          {t('splash.tagline')}
        </p>

        <Button
          onClick={onLoginClick}
          size="lg"
          className="bg-gradient-to-r from-neon-cyan to-neon-magenta hover:from-neon-cyan/90 hover:to-neon-magenta/90 text-black font-bold text-xl px-12 py-6 rounded-full shadow-lg shadow-neon-cyan/50 hover:shadow-neon-magenta/50 transition-all duration-300 transform hover:scale-105"
        >
          <Sparkles className="mr-2 h-6 w-6" />
          {t('splash.enter')}
        </Button>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-card/30 backdrop-blur-sm border border-neon-cyan/30 rounded-lg p-6">
            <h3 className="text-neon-cyan font-bold text-lg mb-2">{t('splash.feature1Title')}</h3>
            <p className="text-gray-400 text-sm">{t('splash.feature1Desc')}</p>
          </div>
          <div className="bg-card/30 backdrop-blur-sm border border-neon-magenta/30 rounded-lg p-6">
            <h3 className="text-neon-magenta font-bold text-lg mb-2">{t('splash.feature2Title')}</h3>
            <p className="text-gray-400 text-sm">{t('splash.feature2Desc')}</p>
          </div>
          <div className="bg-card/30 backdrop-blur-sm border border-neon-blue/30 rounded-lg p-6">
            <h3 className="text-neon-blue font-bold text-lg mb-2">{t('splash.feature3Title')}</h3>
            <p className="text-gray-400 text-sm">{t('splash.feature3Desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
