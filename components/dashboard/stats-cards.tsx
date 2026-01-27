import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderOpen, Sparkles, Clock, TrendingUp } from 'lucide-react'

const stats = [
  {
    title: 'Total Projects',
    value: '0',
    description: 'Create your first app',
    icon: FolderOpen,
  },
  {
    title: 'Apps Generated',
    value: '0',
    description: 'Start generating',
    icon: Sparkles,
  },
  {
    title: 'Hours Saved',
    value: '0',
    description: 'vs manual development',
    icon: Clock,
  },
  {
    title: 'This Month',
    value: '0',
    description: 'apps created',
    icon: TrendingUp,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
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
