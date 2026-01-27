import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderOpen, Sparkles, Clock, TrendingUp } from 'lucide-react'
import { getProjectStats } from '@/app/actions/projects'

export async function StatsCards() {
  const stats = await getProjectStats()

  const cards = [
    {
      title: 'Total Projects',
      value: stats.total.toString(),
      description: stats.total === 0 ? 'Create your first app' : 'projects created',
      icon: FolderOpen,
    },
    {
      title: 'Apps Deployed',
      value: stats.deployed.toString(),
      description: stats.deployed === 0 ? 'Deploy your first app' : 'in production',
      icon: Sparkles,
    },
    {
      title: 'In Draft',
      value: stats.draft.toString(),
      description: 'awaiting configuration',
      icon: Clock,
    },
    {
      title: 'This Month',
      value: stats.thisMonth.toString(),
      description: 'projects created',
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
