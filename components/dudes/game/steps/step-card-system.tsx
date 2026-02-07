'use client'

import { useGameWizard } from '../game-context'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptionGrid } from '../shared/option-grid'
import { CARD_TYPE_OPTIONS } from '@/lib/game-pipeline/constants'

export function StepCardSystem() {
  const { config, updateConfig, setCurrentStep } = useGameWizard()
  const { t } = useTranslation()
  const cs = config.cardSystem
  const updateCS = (updates: Partial<typeof cs>) => {
    updateConfig({ cardSystem: { ...cs, ...updates } })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('game.cardSystem.title')}</CardTitle>
        <CardDescription>{t('game.cardSystem.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="basics">{t('game.cardSystem.tabBasics')}</TabsTrigger>
            <TabsTrigger value="anatomy">{t('game.cardSystem.tabAnatomy')}</TabsTrigger>
            <TabsTrigger value="rarity">{t('game.cardSystem.tabRarity')}</TabsTrigger>
            <TabsTrigger value="elements">{t('game.cardSystem.tabElements')}</TabsTrigger>
            <TabsTrigger value="deck">{t('game.cardSystem.tabDeck')}</TabsTrigger>
            <TabsTrigger value="hand">{t('game.cardSystem.tabHand')}</TabsTrigger>
            <TabsTrigger value="resources">{t('game.cardSystem.tabResources')}</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-4 pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.cardSystem.totalCards')}</label>
                <Input type="number" min={1} max={10000} value={cs.totalCards} onChange={(e) => updateCS({ totalCards: parseInt(e.target.value) || 100 })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.cardSystem.expansionCadence')}</label>
                <Input value={cs.expansionCadence} onChange={(e) => updateCS({ expansionCadence: e.target.value })} placeholder="e.g. Every 3 months" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="anatomy" className="space-y-4 pt-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">{t('game.cardSystem.cardTypes')}</h4>
              <OptionGrid options={CARD_TYPE_OPTIONS} selected={cs.cardTypes} onSelect={(v) => {
                const current = cs.cardTypes
                updateCS({ cardTypes: current.includes(v) ? current.filter(x => x !== v) : [...current, v] })
              }} mode="multi" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.cardSystem.costRange')}</label>
                <div className="flex gap-2 items-center">
                  <Input type="number" min={0} value={cs.costRange.min} onChange={(e) => updateCS({ costRange: { ...cs.costRange, min: parseInt(e.target.value) || 0 } })} className="w-20" />
                  <span className="text-xs">to</span>
                  <Input type="number" min={0} value={cs.costRange.max} onChange={(e) => updateCS({ costRange: { ...cs.costRange, max: parseInt(e.target.value) || 10 } })} className="w-20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.cardSystem.powerRange')}</label>
                <div className="flex gap-2 items-center">
                  <Input type="number" min={0} value={cs.powerRange.min} onChange={(e) => updateCS({ powerRange: { ...cs.powerRange, min: parseInt(e.target.value) || 0 } })} className="w-20" />
                  <span className="text-xs">to</span>
                  <Input type="number" min={0} value={cs.powerRange.max} onChange={(e) => updateCS({ powerRange: { ...cs.powerRange, max: parseInt(e.target.value) || 10 } })} className="w-20" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardSystem.keywords')}</label>
              <Input value={cs.keywords.join(', ')} onChange={(e) => updateCS({ keywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} placeholder="e.g. Taunt, Rush, Stealth, Lifesteal" />
              <p className="text-xs text-muted-foreground">{t('game.cardSystem.keywordsHint')}</p>
            </div>
          </TabsContent>

          <TabsContent value="rarity" className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">{t('game.cardSystem.rarityDesc')}</p>
            <div className="space-y-3">
              {cs.rarityDistribution.map((entry, i) => (
                <div key={entry.rarity} className="grid grid-cols-4 gap-2 items-center">
                  <span className="text-sm font-medium capitalize">{entry.rarity}</span>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground">%</label>
                    <Input type="number" min={0} max={100} value={entry.percentage} onChange={(e) => {
                      const updated = [...cs.rarityDistribution]
                      updated[i] = { ...entry, percentage: parseFloat(e.target.value) || 0 }
                      updateCS({ rarityDistribution: updated })
                    }} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground">Drop %</label>
                    <Input type="number" min={0} max={100} value={entry.dropRate} onChange={(e) => {
                      const updated = [...cs.rarityDistribution]
                      updated[i] = { ...entry, dropRate: parseFloat(e.target.value) || 0 }
                      updateCS({ rarityDistribution: updated })
                    }} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground">Craft</label>
                    <Input type="number" min={0} value={entry.craftCost} onChange={(e) => {
                      const updated = [...cs.rarityDistribution]
                      updated[i] = { ...entry, craftCost: parseInt(e.target.value) || 0 }
                      updateCS({ rarityDistribution: updated })
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="elements" className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">{t('game.cardSystem.elementsDesc')}</p>
            {cs.elements.map((el, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 items-end">
                <div className="space-y-1">
                  <label className="text-xs font-medium">{t('game.cardSystem.elementName')}</label>
                  <Input value={el.name} onChange={(e) => {
                    const updated = [...cs.elements]
                    updated[i] = { ...el, name: e.target.value }
                    updateCS({ elements: updated })
                  }} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">{t('game.cardSystem.elementColor')}</label>
                  <Input type="color" value={el.color} onChange={(e) => {
                    const updated = [...cs.elements]
                    updated[i] = { ...el, color: e.target.value }
                    updateCS({ elements: updated })
                  }} />
                </div>
                <Button variant="ghost" size="sm" onClick={() => {
                  updateCS({ elements: cs.elements.filter((_, j) => j !== i) })
                }}>{t('common.remove')}</Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => {
              updateCS({ elements: [...cs.elements, { name: '', color: '#000000', chainBonus: '' }] })
            }}>{t('game.cardSystem.addElement')}</Button>
          </TabsContent>

          <TabsContent value="deck" className="space-y-4 pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.cardSystem.deckSizeMin')}</label>
                <Input type="number" min={1} value={cs.deckSize.min} onChange={(e) => updateCS({ deckSize: { ...cs.deckSize, min: parseInt(e.target.value) || 20 } })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.cardSystem.deckSizeMax')}</label>
                <Input type="number" min={1} value={cs.deckSize.max} onChange={(e) => updateCS({ deckSize: { ...cs.deckSize, max: parseInt(e.target.value) || 40 } })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.cardSystem.maxCopies')}</label>
                <Input type="number" min={1} max={10} value={cs.maxCopiesPerCard} onChange={(e) => updateCS({ maxCopiesPerCard: parseInt(e.target.value) || 2 })} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardSystem.deckRestrictions')}</label>
              <Textarea value={cs.deckRestrictions} onChange={(e) => updateCS({ deckRestrictions: e.target.value })} placeholder="e.g. Max 1 legendary per deck, faction-only decks..." rows={2} />
            </div>
          </TabsContent>

          <TabsContent value="hand" className="space-y-4 pt-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.cardSystem.startingHand')}</label>
                <Input type="number" min={1} max={20} value={cs.startingHandSize} onChange={(e) => updateCS({ startingHandSize: parseInt(e.target.value) || 5 })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.cardSystem.drawPerTurn')}</label>
                <Input type="number" min={0} max={10} value={cs.drawPerTurn} onChange={(e) => updateCS({ drawPerTurn: parseInt(e.target.value) || 1 })} />
              </div>
              <div className="flex items-center gap-2 pt-5">
                <Switch checked={cs.mulliganAllowed} onCheckedChange={(v) => updateCS({ mulliganAllowed: v })} />
                <label className="text-xs font-medium">{t('game.cardSystem.mulligan')}</label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4 pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.cardSystem.resourceName')}</label>
                <Input value={cs.resourceSystem.name} onChange={(e) => updateCS({ resourceSystem: { ...cs.resourceSystem, name: e.target.value } })} placeholder="e.g. Mana, Energy, Gold" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.cardSystem.startingAmount')}</label>
                <Input type="number" min={0} value={cs.resourceSystem.startingAmount} onChange={(e) => updateCS({ resourceSystem: { ...cs.resourceSystem, startingAmount: parseInt(e.target.value) || 0 } })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.cardSystem.gainPerTurn')}</label>
                <Input type="number" min={0} value={cs.resourceSystem.gainPerTurn} onChange={(e) => updateCS({ resourceSystem: { ...cs.resourceSystem, gainPerTurn: parseInt(e.target.value) || 1 } })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium">{t('game.cardSystem.maxCap')}</label>
                <Input type="number" min={0} value={cs.resourceSystem.maxCap} onChange={(e) => updateCS({ resourceSystem: { ...cs.resourceSystem, maxCap: parseInt(e.target.value) || 10 } })} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">{t('game.cardSystem.specialMechanic')}</label>
              <Input value={cs.resourceSystem.specialMechanic} onChange={(e) => updateCS({ resourceSystem: { ...cs.resourceSystem, specialMechanic: e.target.value } })} placeholder="e.g. Overload, Ramp, Sacrifice" />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(16)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <Button onClick={() => setCurrentStep(18)}>
            {t('game.common.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
