'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'

export default function ProblemsPage() {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState('all')

  useEffect(() => {
    async function fetchProblems() {
      try {
        const response = await fetch('/api/problems')
        if (!response.ok) throw new Error('Failed to fetch problems')
        const data = await response.json()
        setProblems(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProblems()
  }, [])

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDifficulty = filterDifficulty === 'all' || problem.difficulty === filterDifficulty
    return matchesSearch && matchesDifficulty
  })

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
        <div className="text-zinc-400 font-['Outfit']">Loading problems...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 font-['Outfit']">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3 font-['Outfit'] tracking-tight">
            Practice Problems
          </h1>
          <p className="text-zinc-400 font-['Outfit']">
            Master your coding skills with curated challenges
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-zinc-950 border-zinc-800 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  type="text"
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black border-zinc-800 text-white placeholder:text-zinc-500 focus:border-cyan-500 font-['Outfit']"
                />
              </div>

              {/* Difficulty Filter */}
              <div className="flex gap-2">
                <Button
                  variant={filterDifficulty === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterDifficulty('all')}
                  className={`font-['Outfit'] ${
                    filterDifficulty === 'all'
                      ? 'bg-cyan-500 hover:bg-cyan-600 text-black'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  All
                </Button>
                <Button
                  variant={filterDifficulty === 'Easy' ? 'default' : 'outline'}
                  onClick={() => setFilterDifficulty('Easy')}
                  className={`font-['Outfit'] ${
                    filterDifficulty === 'Easy'
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-black'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  Easy
                </Button>
                <Button
                  variant={filterDifficulty === 'Medium' ? 'default' : 'outline'}
                  onClick={() => setFilterDifficulty('Medium')}
                  className={`font-['Outfit'] ${
                    filterDifficulty === 'Medium'
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  Medium
                </Button>
                <Button
                  variant={filterDifficulty === 'Hard' ? 'default' : 'outline'}
                  onClick={() => setFilterDifficulty('Hard')}
                  className={`font-['Outfit'] ${
                    filterDifficulty === 'Hard'
                      ? 'bg-red-500 hover:bg-red-600 text-black'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  Hard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problems List */}
        <div className="space-y-3">
          {filteredProblems.length === 0 ? (
            <Card className="bg-zinc-950 border-zinc-800">
              <CardContent className="p-12 text-center">
                <p className="text-zinc-500 font-['Outfit']">No problems found</p>
              </CardContent>
            </Card>
          ) : (
            filteredProblems.map((problem) => (
              <Link key={problem.id} href={`/protected/problems/${problem.id}`}>
                <Card className="bg-zinc-950 border-zinc-800 hover:border-cyan-500/50 transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors font-['Outfit']">
                            {problem.title}
                          </h3>
                          <Badge className={`${getDifficultyColor(problem.difficulty)} border font-['Outfit']`}>
                            {problem.difficulty}
                          </Badge>
                        </div>
                        
                        {/* Tags */}
                        {problem.tags && problem.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {problem.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 font-['Outfit']"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Acceptance Rate */}
                        <div className="text-sm text-zinc-500 font-['Outfit']">
                          Acceptance: {problem.acceptance_rate}%
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <div className="text-zinc-600 group-hover:text-cyan-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}