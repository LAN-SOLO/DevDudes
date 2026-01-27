import { PresetWizard } from '@/components/dudes/preset/preset-wizard'

export default function PresetDudePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Preset Dude</h2>
        <p className="text-muted-foreground">
          Configure your application requirements step by step
        </p>
      </div>
      <PresetWizard />
    </div>
  )
}
