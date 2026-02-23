import { useLanguage } from '../hooks/useLanguage';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface IntroductionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function IntroductionModal({ open, onOpenChange }: IntroductionModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-background/95 backdrop-blur-lg border-neon-cyan/30">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-blue bg-clip-text text-transparent">
            {t('introduction.title')}
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-300">
            {t('introduction.subtitle')}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-8 text-gray-200">
            {/* Section 1: Core Mission */}
            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">
                {t('introduction.coreMission.title')}
              </h2>
              <p className="text-base leading-relaxed">{t('introduction.coreMission.content')}</p>
            </section>

            <Separator className="bg-neon-cyan/20" />

            {/* Section 2: Use Cases */}
            <section>
              <h2 className="text-2xl font-bold text-neon-magenta mb-4">
                {t('introduction.useCases.title')}
              </h2>
              <p className="text-base leading-relaxed mb-4">{t('introduction.useCases.intro')}</p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-neon-cyan mr-3 mt-1">•</span>
                  <span>
                    <strong className="text-neon-cyan">{t('introduction.useCases.lifestyle')}:</strong>{' '}
                    {t('introduction.useCases.lifestyleExample')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-neon-cyan mr-3 mt-1">•</span>
                  <span>
                    <strong className="text-neon-cyan">{t('introduction.useCases.health')}:</strong>{' '}
                    {t('introduction.useCases.healthExample')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-neon-cyan mr-3 mt-1">•</span>
                  <span>
                    <strong className="text-neon-cyan">{t('introduction.useCases.exercise')}:</strong>{' '}
                    {t('introduction.useCases.exerciseExample')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-neon-cyan mr-3 mt-1">•</span>
                  <span>
                    <strong className="text-neon-cyan">{t('introduction.useCases.social')}:</strong>{' '}
                    {t('introduction.useCases.socialExample')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-neon-cyan mr-3 mt-1">•</span>
                  <span>
                    <strong className="text-neon-cyan">{t('introduction.useCases.enterprise')}:</strong>{' '}
                    {t('introduction.useCases.enterpriseExample')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-neon-cyan mr-3 mt-1">•</span>
                  <span>
                    <strong className="text-neon-cyan">{t('introduction.useCases.more')}:</strong>{' '}
                    {t('introduction.useCases.moreExample')}
                  </span>
                </li>
              </ul>
            </section>

            <Separator className="bg-neon-magenta/20" />

            {/* Section 3: Bounty Mechanism */}
            <section>
              <h2 className="text-2xl font-bold text-neon-blue mb-4">
                {t('introduction.bountyMechanism.title')}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-neon-cyan mb-2">
                    {t('introduction.bountyMechanism.publishTitle')}
                  </h3>
                  <p className="text-base leading-relaxed">{t('introduction.bountyMechanism.publishContent')}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neon-cyan mb-2">
                    {t('introduction.bountyMechanism.crowdfundTitle')}
                  </h3>
                  <p className="text-base leading-relaxed">{t('introduction.bountyMechanism.crowdfundContent')}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neon-cyan mb-2">
                    {t('introduction.bountyMechanism.acceptTitle')}
                  </h3>
                  <p className="text-base leading-relaxed">{t('introduction.bountyMechanism.acceptContent')}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neon-cyan mb-2">
                    {t('introduction.bountyMechanism.flexibleTitle')}
                  </h3>
                  <p className="text-base leading-relaxed">{t('introduction.bountyMechanism.flexibleContent')}</p>
                </div>
              </div>
            </section>

            <Separator className="bg-neon-blue/20" />

            {/* Section 4: Settlement Rules */}
            <section>
              <h2 className="text-2xl font-bold text-neon-cyan mb-4">
                {t('introduction.settlementRules.title')}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-neon-magenta mb-2">
                    {t('introduction.settlementRules.successTitle')}
                  </h3>
                  <p className="text-base leading-relaxed">{t('introduction.settlementRules.successContent')}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neon-magenta mb-2">
                    {t('introduction.settlementRules.unclaimedTitle')}
                  </h3>
                  <p className="text-base leading-relaxed">{t('introduction.settlementRules.unclaimedContent')}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neon-magenta mb-2">
                    {t('introduction.settlementRules.defaultTitle')}
                  </h3>
                  <p className="text-base leading-relaxed">{t('introduction.settlementRules.defaultContent')}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neon-magenta mb-2">
                    {t('introduction.settlementRules.feesTitle')}
                  </h3>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start">
                      <span className="text-neon-cyan mr-3 mt-1">•</span>
                      <span>
                        <strong>{t('introduction.settlementRules.feesSuccessLabel')}:</strong>{' '}
                        {t('introduction.settlementRules.feesSuccessContent')}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-cyan mr-3 mt-1">•</span>
                      <span>
                        <strong>{t('introduction.settlementRules.feesDefaultLabel')}:</strong>{' '}
                        {t('introduction.settlementRules.feesDefaultContent')}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator className="bg-neon-cyan/20" />

            {/* Section 5: Warrior Credit System */}
            <section>
              <h2 className="text-2xl font-bold text-neon-magenta mb-4">
                {t('introduction.warriorCredit.title')}
              </h2>
              <p className="text-base leading-relaxed mb-4">{t('introduction.warriorCredit.intro')}</p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-neon-cyan mb-2">
                    {t('introduction.warriorCredit.initialTitle')}
                  </h3>
                  <p className="text-base leading-relaxed">{t('introduction.warriorCredit.initialContent')}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neon-cyan mb-2">
                    {t('introduction.warriorCredit.rewardTitle')}
                  </h3>
                  <p className="text-base leading-relaxed">{t('introduction.warriorCredit.rewardContent')}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neon-cyan mb-2">
                    {t('introduction.warriorCredit.capTitle')}
                  </h3>
                  <p className="text-base leading-relaxed">{t('introduction.warriorCredit.capContent')}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neon-cyan mb-2">
                    {t('introduction.warriorCredit.penaltyTitle')}
                  </h3>
                  <p className="text-base leading-relaxed">{t('introduction.warriorCredit.penaltyContent')}</p>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
