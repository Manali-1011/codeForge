'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ChevronLeft, Play, CheckCircle2, XCircle, Clock } from 'lucide-react'

export default function ProblemPage() {
  const params = useParams()
  const router = useRouter()
  const problemId = params.id
  
  const [problem, setProblem] = useState(null)
  const [testCases, setTestCases] = useState([])
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    async function fetchProblemData() {
      try {
        console.log('Fetching problem ID:', problemId)
        
        // Fetch problem
        const problemRes = await fetch(`/api/problems/${problemId}`)
        console.log('Problem response status:', problemRes.status)
        
        if (!problemRes.ok) {
          const errorData = await problemRes.json()
          throw new Error(errorData.error || 'Failed to fetch problem')
        }
        
        const problemData = await problemRes.json()
        console.log('Problem data:', problemData)
        setProblem(problemData)
        setCode(problemData.starter_code || '')

        // Fetch test cases
        const testCasesRes = await fetch(`/api/problems/${problemId}/test-cases`)
        console.log('Test cases response status:', testCasesRes.status)
        
        if (testCasesRes.ok) {
          const testCasesData = await testCasesRes.json()
          console.log('Test cases:', testCasesData)
          setTestCases(testCasesData.filter(tc => !tc.is_hidden))
        }
      } catch (err) {
        console.error('Error fetching problem:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (problemId) {
      fetchProblemData()
    }
  }, [problemId])

  async function handleSubmit() {
    if (!problem) return
    
    setSubmitting(true)
    setResult(null)

    try {
      // Create submission
      const submissionRes = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem_id: problem.id,
          code,
          language,
          user_id: 'anonymous'
        })
      })
      
      if (!submissionRes.ok) throw new Error('Failed to create submission')
      const submission = await submissionRes.json()

      // Execute code
      const executeRes = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem_id: problem.id,
          code,
          language,
          submission_id: submission.id
        })
      })

      if (!executeRes.ok) throw new Error('Failed to execute code')
      const executeResult = await executeRes.json()
      setResult(executeResult)

    } catch (err) {
      console.error('Submission error:', err)
      setResult({ error: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
      case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'Hard': return 'bg-red-500/10 text-red-500 border-red-500/20'
      default: return 'bg-zinc-800 text-zinc-400'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-400 font-['Outfit']">Loading problem...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4 font-['Outfit']">Error: {error}</div>
          <Button 
            onClick={() => router.push('/protected/problems')}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-['Outfit']"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Problems
          </Button>
        </div>
      </div>
    )
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-400 font-['Outfit']">Problem not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur">
          <div className="max-w-full px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => router.push('/protected/problems')}
                  className="bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white font-['Outfit']"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-white font-['Outfit'] tracking-tight">
                    {problem.title}
                  </h1>
                  <Badge className={`${getDifficultyColor(problem.difficulty)} border font-['Outfit']`}>
                    {problem.difficulty}
                  </Badge>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-['Outfit'] font-semibold"
              >
                {submitting ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-2 overflow-hidden">
          {/* Left Panel - Problem Description */}
          <div className="border-r border-zinc-800 overflow-y-auto">
            <div className="p-8">
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-white mb-3 font-['Outfit']">Description</h2>
                <div className="text-zinc-400 whitespace-pre-wrap font-['Outfit'] leading-relaxed">
                  {problem.description}
                </div>
              </div>

              {/* Examples */}
              {problem.examples && problem.examples.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-white mb-3 font-['Outfit']">Examples</h2>
                  <div className="space-y-4">
                    {problem.examples.map((example, idx) => (
                      <Card key={idx} className="bg-zinc-950 border-zinc-800">
                        <CardContent className="p-4">
                          <div className="space-y-2 font-['Outfit']">
                            <div>
                              <span className="text-zinc-500 text-sm">Input:</span>
                              <code className="block mt-1 text-cyan-400 bg-black px-3 py-2 rounded border border-zinc-800">
                                {example.input}
                              </code>
                            </div>
                            <div>
                              <span className="text-zinc-500 text-sm">Output:</span>
                              <code className="block mt-1 text-cyan-400 bg-black px-3 py-2 rounded border border-zinc-800">
                                {example.output}
                              </code>
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="text-zinc-500 text-sm">Explanation:</span>
                                <p className="text-zinc-400 text-sm mt-1">{example.explanation}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Constraints */}
              {problem.constraints && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-white mb-3 font-['Outfit']">Constraints</h2>
                  <Card className="bg-zinc-950 border-zinc-800">
                    <CardContent className="p-4">
                      <pre className="text-zinc-400 text-sm whitespace-pre-wrap font-['Outfit']">
                        {problem.constraints}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Test Cases Preview */}
              {testCases.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-3 font-['Outfit']">Sample Test Cases</h2>
                  <div className="space-y-3">
                    {testCases.map((tc, idx) => (
                      <Card key={tc.id} className="bg-zinc-950 border-zinc-800">
                        <CardContent className="p-4">
                          <div className="space-y-2 font-['Outfit'] text-sm">
                            <div>
                              <span className="text-zinc-500">Input:</span>
                              <code className="block mt-1 text-cyan-400 bg-black px-2 py-1 rounded text-xs">
                                {tc.input}
                              </code>
                            </div>
                            <div>
                              <span className="text-zinc-500">Expected:</span>
                              <code className="block mt-1 text-cyan-400 bg-black px-2 py-1 rounded text-xs">
                                {tc.expected_output}
                              </code>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="flex flex-col bg-zinc-950">
            {/* Language Selector */}
            <div className="border-b border-zinc-800 p-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-black border border-zinc-800 text-white px-3 py-2 rounded-lg text-sm font-['Outfit'] focus:outline-none focus:border-cyan-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
              </select>
            </div>

            {/* Code Editor */}
            <div className="flex-1 overflow-hidden">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full resize-none bg-black border-0 text-white font-mono text-sm p-6 focus:outline-none focus:ring-0 font-['Outfit']"
                placeholder="Write your code here..."
              />
            </div>

            {/* Results Panel */}
            {result && (
              <div className="border-t border-zinc-800 p-6 max-h-64 overflow-y-auto">
                {result.error ? (
                  <Card className="bg-red-500/10 border-red-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-red-500 font-semibold mb-1 font-['Outfit']">Error</div>
                          <div className="text-red-400 text-sm font-['Outfit']">{result.error}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {/* Status */}
                    <Card className={`${
                      result.status === 'Accepted'
                        ? 'bg-emerald-500/10 border-emerald-500/20'
                        : 'bg-red-500/10 border-red-500/20'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {result.status === 'Accepted' ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500" />
                            )}
                            <div>
                              <div className={`font-semibold font-['Outfit'] ${
                                result.status === 'Accepted' ? 'text-emerald-500' : 'text-red-500'
                              }`}>
                                {result.status}
                              </div>
                              <div className="text-sm text-zinc-400 font-['Outfit']">
                                {result.passed_tests}/{result.total_tests} test cases passed
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-zinc-400 font-['Outfit']">
                            {result.runtime}ms
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Test Results */}
                    {result.results && result.results.length > 0 && (
                      <div className="space-y-2">
                        {result.results.map((r, idx) => (
                          <Card
                            key={idx}
                            className={`${
                              r.passed
                                ? 'bg-emerald-500/5 border-emerald-500/20'
                                : 'bg-red-500/5 border-red-500/20'
                            }`}
                          >
                            <CardContent className="p-3">
                              <div className="space-y-1 text-xs font-['Outfit']">
                                <div className="flex items-center justify-between mb-2">
                                  <span className={r.passed ? 'text-emerald-500' : 'text-red-500'}>
                                    Test Case {idx + 1}
                                  </span>
                                  {r.passed ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-500" />
                                  )}
                                </div>
                                <div>
                                  <span className="text-zinc-500">Input:</span>
                                  <code className="block text-cyan-400 bg-black px-2 py-1 rounded mt-1">
                                    {r.input}
                                  </code>
                                </div>
                                <div>
                                  <span className="text-zinc-500">Expected:</span>
                                  <code className="block text-cyan-400 bg-black px-2 py-1 rounded mt-1">
                                    {r.expected_output}
                                  </code>
                                </div>
                                <div>
                                  <span className="text-zinc-500">Got:</span>
                                  <code className={`block bg-black px-2 py-1 rounded mt-1 ${
                                    r.passed ? 'text-emerald-400' : 'text-red-400'
                                  }`}>
                                    {r.actual_output || r.error}
                                  </code>
                                </div>
                                {r.error && (
                                  <div className="text-red-400 mt-2">
                                    Error: {r.error}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}