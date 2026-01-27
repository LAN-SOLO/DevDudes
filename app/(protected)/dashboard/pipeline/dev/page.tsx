import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Play, Eye, Terminal } from 'lucide-react'
import Link from 'next/link'

export default function DevDudePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pipeline">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dev Dude</h2>
          <p className="text-muted-foreground">
            Interactive development environment with live preview
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Code Editor Placeholder */}
        <Card className="lg:row-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Code Editor</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Play className="h-4 w-4 mr-1" />
                  Run
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-zinc-900 text-zinc-100 p-4 font-mono text-sm h-[400px] overflow-auto">
              <div className="text-zinc-500">{'// Dev Dude - Interactive IDE'}</div>
              <div className="text-zinc-500">{'// Code editor will appear here'}</div>
              <br />
              <div className="text-blue-400">import</div>
              <span className="text-zinc-100"> {'{ useState }'} </span>
              <span className="text-blue-400">from</span>
              <span className="text-green-400"> &apos;react&apos;</span>
              <br /><br />
              <div className="text-blue-400">export default function</div>
              <span className="text-yellow-400"> App</span>
              <span className="text-zinc-100">() {'{'}</span>
              <br />
              <span className="text-zinc-100">  </span>
              <span className="text-blue-400">return</span>
              <span className="text-zinc-100"> (</span>
              <br />
              <span className="text-zinc-100">    </span>
              <span className="text-zinc-500">{'<'}</span>
              <span className="text-red-400">div</span>
              <span className="text-zinc-500">{'>'}</span>
              <br />
              <span className="text-zinc-100">      Hello DevDudes!</span>
              <br />
              <span className="text-zinc-100">    </span>
              <span className="text-zinc-500">{'</'}</span>
              <span className="text-red-400">div</span>
              <span className="text-zinc-500">{'>'}</span>
              <br />
              <span className="text-zinc-100">  )</span>
              <br />
              <span className="text-zinc-100">{'}'}</span>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Live Preview</CardTitle>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-white h-[180px] flex items-center justify-center">
              <p className="text-muted-foreground">Preview will appear here</p>
            </div>
          </CardContent>
        </Card>

        {/* Terminal */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Terminal</CardTitle>
              <Button variant="ghost" size="sm">
                <Terminal className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-zinc-900 text-zinc-100 p-4 font-mono text-xs h-[180px] overflow-auto">
              <div className="text-green-400">$ npm run dev</div>
              <div className="text-zinc-400">Ready - started server on http://localhost:3000</div>
              <div className="text-zinc-400">✓ Compiled successfully</div>
              <div className="text-green-400">$</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
