import { StatsCards } from '@/components/dashboard/stats-cards'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { ActiveProjects } from '@/components/dashboard/active-projects'
import { WelcomeBanner } from '@/components/dashboard/welcome-banner'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeBanner />
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your app generation activity
        </p>
      </div>
      <StatsCards />
      <div className="grid gap-6 lg:grid-cols-2">
        <ActiveProjects />
        <QuickActions />
      </div>
      <RecentActivity />
    </div>
  )
}
