'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import { BUSINESS_MODEL_OPTIONS, DISTRIBUTION_OPTIONS } from '@/lib/game-pipeline/constants'
import { getMonetizationRecommendations } from '@/lib/game-pipeline/recommendations'

export function StepMonetization() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()

  const recs = getMonetizationRecommendations(config)

  const handleModel = (value: string) => {
    updateConfig({ businessModel: config.businessModel === value ? '' : value })
  }

  const handleDistribution = (value: string) => {
    const current = config.distribution
    if (current.includes(value)) {
      updateConfig({ distribution: current.filter((v) => v !== value) })
    } else {
      updateConfig({ distribution: [...current, value] })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.monetization.title')}</CardTitle>
        <CardDescription>{t('game.monetization.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.monetization.modelLabel')}</h3>
          <OptionGrid
            options={BUSINESS_MODEL_OPTIONS}
            selected={config.businessModel}
            onSelect={handleModel}
            mode="single"
            recommendations={recs.model}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t('game.monetization.distributionLabel')}</h3>
          <OptionGrid
            options={DISTRIBUTION_OPTIONS}
            selected={config.distribution}
            onSelect={handleDistribution}
            mode="multi"
            recommendations={recs.distribution}
          />
        </div>

        {(config.businessModel === 'free-to-play' || config.businessModel === 'freemium' || config.businessModel === 'battle-pass') && (
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <ChevronDown className="h-4 w-4" />
                {t('game.monetization.advancedTitle')}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-6 pt-4">
              <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
                <h4 className="text-sm font-medium">{t('game.monetization.detailTitle')}</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(['premiumCurrency', 'softCurrency', 'iapTiers', 'adPlacement', 'seasonPassDuration', 'battlePassTiers'] as const).map((field) => (
                    <div key={field} className="space-y-1">
                      <label className="text-xs font-medium">{t(`game.monetization.detail.${field}`)}</label>
                      <Input
                        value={config.monetizationDetail[field]}
                        onChange={(e) => updateConfig({ monetizationDetail: { ...config.monetizationDetail, [field]: e.target.value } })}
                        placeholder={t(`game.monetization.detail.${field}Placeholder`)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
                <h4 className="text-sm font-medium">{t('game.monetization.rewardEconomyTitle')}</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(['dailyRewardCycle', 'firstPurchaseBonus', 'vipTiers', 'referralReward'] as const).map((field) => (
                    <div key={field} className="space-y-1">
                      <label className="text-xs font-medium">{t(`game.monetization.economy.${field}`)}</label>
                      <Input
                        value={config.rewardEconomy[field]}
                        onChange={(e) => updateConfig({ rewardEconomy: { ...config.rewardEconomy, [field]: e.target.value } })}
                        placeholder={t(`game.monetization.economy.${field}Placeholder`)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(14)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(16)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
