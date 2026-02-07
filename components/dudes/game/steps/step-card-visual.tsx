'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function StepCardVisual() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()
  const vi = config.visualIdentity
  const anim = config.animations

  const updateVI = (updates: Partial<typeof vi>) => {
    updateConfig({ visualIdentity: { ...vi, ...updates } })
  }
  const updateAnim = (updates: Partial<typeof anim>) => {
    updateConfig({ animations: { ...anim, ...updates } })
  }

  const handleColorChange = (index: number, color: string) => {
    const updated = [...vi.colorPalette]
    updated[index] = color
    updateVI({ colorPalette: updated })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.cardVisual.title')}</CardTitle>
        <CardDescription>{t('game.cardVisual.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.cardVisual.colorPalette')}</h4>
          <p className="text-xs text-muted-foreground">{t('game.cardVisual.colorPaletteHint')}</p>
          <div className="flex gap-3">
            {vi.colorPalette.map((color, i) => (
              <div key={i} className="space-y-1 text-center">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(i, e.target.value)}
                  className="h-12 w-12 cursor-pointer p-1"
                />
                <span className="text-[10px] text-muted-foreground">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.cardVisual.cardDesign')}</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardVisual.cardShape')}</label>
              <Input
                value={vi.cardShape}
                onChange={(e) => updateVI({ cardShape: e.target.value })}
                placeholder="e.g. Rounded rectangle, Portrait, Square"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardVisual.cardBorder')}</label>
              <Input
                value={vi.cardBorder}
                onChange={(e) => updateVI({ cardBorder: e.target.value })}
                placeholder="e.g. Gold frame, Glowing edge, Minimal"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardVisual.cardIllustration')}</label>
              <Input
                value={vi.cardIllustration}
                onChange={(e) => updateVI({ cardIllustration: e.target.value })}
                placeholder="e.g. Full art, Portrait window, Icon-based"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardVisual.cardBack')}</label>
              <Input
                value={vi.cardBack}
                onChange={(e) => updateVI({ cardBack: e.target.value })}
                placeholder="e.g. Logo pattern, Animated swirl, Solid color"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardVisual.uiStyle')}</label>
              <Input
                value={vi.uiStyle}
                onChange={(e) => updateVI({ uiStyle: e.target.value })}
                placeholder="e.g. Flat, Skeuomorphic, Glassmorphism"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardVisual.fontStyle')}</label>
              <Input
                value={vi.fontStyle}
                onChange={(e) => updateVI({ fontStyle: e.target.value })}
                placeholder="e.g. Fantasy serif, Clean sans-serif, Handwritten"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">{t('game.cardVisual.animations')}</h4>
          <p className="text-xs text-muted-foreground">{t('game.cardVisual.animationsHint')}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardVisual.animCardPlay')}</label>
              <Input
                value={anim.cardPlay}
                onChange={(e) => updateAnim({ cardPlay: e.target.value })}
                placeholder="e.g. Slide from hand, Slam down, Fade in"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardVisual.animCombo')}</label>
              <Input
                value={anim.combo}
                onChange={(e) => updateAnim({ combo: e.target.value })}
                placeholder="e.g. Chain lightning, Glow burst, Screen shake"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardVisual.animDamage')}</label>
              <Input
                value={anim.damage}
                onChange={(e) => updateAnim({ damage: e.target.value })}
                placeholder="e.g. Red flash, Number popup, Crack effect"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardVisual.animVictory')}</label>
              <Input
                value={anim.victory}
                onChange={(e) => updateAnim({ victory: e.target.value })}
                placeholder="e.g. Confetti, Trophy reveal, Fireworks"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardVisual.animDefeat')}</label>
              <Input
                value={anim.defeat}
                onChange={(e) => updateAnim({ defeat: e.target.value })}
                placeholder="e.g. Screen shatter, Fade to black, Collapse"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardVisual.animPackOpening')}</label>
              <Input
                value={anim.packOpening}
                onChange={(e) => updateAnim({ packOpening: e.target.value })}
                placeholder="e.g. Tear open, Light reveal, Card flip"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardVisual.animLegendary')}</label>
              <Input
                value={anim.legendary}
                onChange={(e) => updateAnim({ legendary: e.target.value })}
                placeholder="e.g. Golden glow, Dragon fly-by, Thunder crack"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(18)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(20)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
