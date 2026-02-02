'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TestTube, ArrowLeft, ArrowRight, Play, Check, X, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/language-provider'
import { getProjectConfig } from '@/app/actions/pipeline'

interface TestCase {
  id: string
  name: string
  category: string
  status: 'pending' | 'running' | 'passed' | 'failed'
  duration?: number
  error?: string
}

interface TestSuite {
  name: string
  tests: TestCase[]
}

export default function TestDudePage() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const projectId = searchParams.get('project')

  const [project, setProject] = useState<{ name: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const [testSuites, setTestSuites] = useState<TestSuite[]>([
    {
      name: 'Unit Tests',
      tests: [
        { id: 'u1', name: 'Component rendering', category: 'unit', status: 'pending' },
        { id: 'u2', name: 'State management', category: 'unit', status: 'pending' },
        { id: 'u3', name: 'Utility functions', category: 'unit', status: 'pending' },
        { id: 'u4', name: 'Form validation', category: 'unit', status: 'pending' },
      ],
    },
    {
      name: 'Integration Tests',
      tests: [
        { id: 'i1', name: 'API endpoints', category: 'integration', status: 'pending' },
        { id: 'i2', name: 'Database operations', category: 'integration', status: 'pending' },
        { id: 'i3', name: 'Authentication flow', category: 'integration', status: 'pending' },
      ],
    },
    {
      name: 'E2E Tests',
      tests: [
        { id: 'e1', name: 'User registration', category: 'e2e', status: 'pending' },
        { id: 'e2', name: 'Login/logout flow', category: 'e2e', status: 'pending' },
        { id: 'e3', name: 'CRUD operations', category: 'e2e', status: 'pending' },
      ],
    },
    {
      name: 'Performance Tests',
      tests: [
        { id: 'p1', name: 'Page load time', category: 'performance', status: 'pending' },
        { id: 'p2', name: 'API response time', category: 'performance', status: 'pending' },
      ],
    },
  ])

  useEffect(() => {
    async function loadProject() {
      if (!projectId) {
        setIsLoading(false)
        return
      }

      const result = await getProjectConfig(projectId)
      if (!result.error && result.data) {
        setProject({ name: result.data.name })
      }
      setIsLoading(false)
    }
    loadProject()
  }, [projectId])

  const runTests = async () => {
    setIsRunning(true)

    // Reset all tests to pending
    setTestSuites(prev =>
      prev.map(suite => ({
        ...suite,
        tests: suite.tests.map(test => ({ ...test, status: 'pending' as const, duration: undefined, error: undefined })),
      }))
    )

    // Run each test with simulated delays
    for (const suite of testSuites) {
      for (const test of suite.tests) {
        // Set test to running
        setTestSuites(prev =>
          prev.map(s =>
            s.name === suite.name
              ? { ...s, tests: s.tests.map(t => (t.id === test.id ? { ...t, status: 'running' as const } : t)) }
              : s
          )
        )

        // Simulate test execution
        await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500))

        // Randomly pass/fail (90% pass rate)
        const passed = Math.random() > 0.1
        const duration = Math.floor(50 + Math.random() * 200)

        setTestSuites(prev =>
          prev.map(s =>
            s.name === suite.name
              ? {
                  ...s,
                  tests: s.tests.map(t =>
                    t.id === test.id
                      ? {
                          ...t,
                          status: passed ? 'passed' : 'failed',
                          duration,
                          error: passed ? undefined : 'Assertion failed: expected value to match',
                        }
                      : t
                  ),
                }
              : s
          )
        )
      }
    }

    setIsRunning(false)
  }

  const totalTests = testSuites.reduce((acc, suite) => acc + suite.tests.length, 0)
  const passedTests = testSuites.reduce(
    (acc, suite) => acc + suite.tests.filter(t => t.status === 'passed').length,
    0
  )
  const failedTests = testSuites.reduce(
    (acc, suite) => acc + suite.tests.filter(t => t.status === 'failed').length,
    0
  )
  const hasRun = passedTests > 0 || failedTests > 0
  const allPassed = hasRun && failedTests === 0

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pipeline">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">{t('pipeline.dudes.test.name')}</h2>
          <p className="text-muted-foreground">
            {t('pipeline.dudes.test.description')}
          </p>
        </div>
        {projectId && hasRun && allPassed && (
          <Link href={`/dashboard/pipeline/deploy?project=${projectId}`}>
            <Button>
              Continue to Deploy
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      {!projectId ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-yellow-100">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <CardTitle>No Project Selected</CardTitle>
                <CardDescription>
                  Complete the earlier pipeline steps first
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/pipeline/preset">
              <Button>
                Start with Preset Dude
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Test Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Test Results for {project?.name}</CardTitle>
                  <CardDescription>
                    {hasRun
                      ? `${passedTests} passed, ${failedTests} failed out of ${totalTests} tests`
                      : `${totalTests} tests ready to run`}
                  </CardDescription>
                </div>
                <Button onClick={runTests} disabled={isRunning}>
                  {isRunning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Running...
                    </>
                  ) : hasRun ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Re-run Tests
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run All Tests
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            {hasRun && (
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1 rounded-lg bg-green-50 p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{passedTests}</p>
                    <p className="text-sm text-green-700">Passed</p>
                  </div>
                  <div className="flex-1 rounded-lg bg-red-50 p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{failedTests}</p>
                    <p className="text-sm text-red-700">Failed</p>
                  </div>
                  <div className="flex-1 rounded-lg bg-muted p-4 text-center">
                    <p className="text-2xl font-bold">{totalTests}</p>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Test Suites */}
          <div className="grid gap-4 md:grid-cols-2">
            {testSuites.map((suite) => {
              const suitePassed = suite.tests.filter(t => t.status === 'passed').length
              const suiteFailed = suite.tests.filter(t => t.status === 'failed').length
              const suiteHasRun = suitePassed > 0 || suiteFailed > 0

              return (
                <Card key={suite.name}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{suite.name}</CardTitle>
                      {suiteHasRun && (
                        <span className={`text-sm ${suiteFailed > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {suitePassed}/{suite.tests.length} passed
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {suite.tests.map((test) => (
                        <div
                          key={test.id}
                          className={`flex items-center justify-between rounded-lg border p-3 ${
                            test.status === 'failed' ? 'border-red-200 bg-red-50' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                                test.status === 'passed'
                                  ? 'bg-green-100'
                                  : test.status === 'failed'
                                    ? 'bg-red-100'
                                    : test.status === 'running'
                                      ? 'bg-primary/10'
                                      : 'bg-muted'
                              }`}
                            >
                              {test.status === 'passed' ? (
                                <Check className="h-4 w-4 text-green-600" />
                              ) : test.status === 'failed' ? (
                                <X className="h-4 w-4 text-red-600" />
                              ) : test.status === 'running' ? (
                                <Loader2 className="h-4 w-4 text-primary animate-spin" />
                              ) : (
                                <TestTube className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{test.name}</p>
                              {test.error && (
                                <p className="text-xs text-red-600">{test.error}</p>
                              )}
                            </div>
                          </div>
                          {test.duration && (
                            <span className="text-xs text-muted-foreground">
                              {test.duration}ms
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Next Step */}
          {hasRun && (
            <Card className={allPassed ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${allPassed ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    {allPassed ? (
                      <Check className="h-6 w-6 text-green-600" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <CardTitle className={allPassed ? 'text-green-800' : 'text-yellow-800'}>
                      {allPassed ? 'All Tests Passed!' : 'Some Tests Failed'}
                    </CardTitle>
                    <CardDescription className={allPassed ? 'text-green-700' : 'text-yellow-700'}>
                      {allPassed
                        ? 'Your application is ready for deployment.'
                        : 'Fix the failing tests before deploying.'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {allPassed ? (
                    <Link href={`/dashboard/pipeline/deploy?project=${projectId}`}>
                      <Button>
                        Continue to Deploy Dude
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button onClick={runTests} variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Re-run Tests
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
