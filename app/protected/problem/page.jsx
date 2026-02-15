'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const problems = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Find two numbers that add up to a target value.',
  },
  {
    id: '2',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    description: 'Return the length of the longest substring without duplicates.',
  },
  {
    id: '3',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    description: 'Find the median of two sorted arrays.',
  },
  {
    id: '4',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: 'Determine if the input string of brackets is valid.',
  },
  {
    id: '5',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    description: 'Merge all overlapping intervals.',
  },
  {
    id: '6',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    description: 'Find the maximum path sum in a binary tree.',
  },
];

function getDifficultyStyles(level) {
  switch (level) {
    case 'Easy':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'Medium':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    case 'Hard':
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    default:
      return '';
  }
}

export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Main Section */}
      <main className="relative max-w-6xl mx-auto px-4 py-32">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

        <div className="relative z-10">
          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-6 font-['Outfit']">
              Master the <span className="text-cyan-400">Algorithms</span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
              Solve structured coding problems and level up your DSA skills with
              a clean, distraction-free experience.
            </p>
          </div>

          {/* Section Label */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="text-sm uppercase tracking-wider text-zinc-500 font-medium">
              All Problems
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>

          {/* Problems Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <Link key={problem.id} href={`/problem/${problem.id}`}>
                <Card
                  className="
                    group cursor-pointer
                    bg-zinc-950 border border-zinc-800
                    hover:border-cyan-500/50
                    hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
                    hover:scale-[1.02]
                    transition-all duration-300
                    rounded-2xl
                    h-full
                  "
                >
                  <CardContent className="p-6 space-y-4 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors font-['Outfit']">
                        {problem.title}
                      </h2>
                      <Badge
                        variant="outline"
                        className={`${getDifficultyStyles(
                          problem.difficulty
                        )} px-3 py-1 text-xs uppercase font-medium shrink-0`}
                      >
                        {problem.difficulty}
                      </Badge>
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed font-light flex-1">
                      {problem.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-zinc-600">
                      <span className="text-cyan-400">#{problem.id}</span>
                      <span>•</span>
                      <span>Problem</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
}