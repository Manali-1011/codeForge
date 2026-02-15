'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Mock problem data - TODO: Replace with API call
const problem = {
  id: '1',
  title: 'Two Sum',
  difficulty: 'Easy',
  description:
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
    },
  ],
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    'Only one valid answer exists.',
  ],
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'Medium':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    case 'Hard':
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    default:
      return '';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'accepted':
      return 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10';
    case 'wrong_answer':
      return 'text-red-400 border-red-500/50 bg-red-500/10';
    case 'error':
      return 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10';
    default:
      return 'text-zinc-500 border-zinc-700 bg-zinc-900';
  }
};

export default function ProblemDetailPage() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    // TODO: Replace with actual code execution
    setTimeout(() => {
      setOutput({
        status: 'accepted',
        message: 'All test cases passed!\n\nRuntime: 82 ms\nMemory: 44.2 MB',
      });
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    // TODO: Replace with actual submission logic
    setTimeout(() => {
      setOutput({
        status: Math.random() > 0.5 ? 'accepted' : 'wrong_answer',
        message:
          Math.random() > 0.5
            ? 'Accepted! Your solution passed all test cases.\n\nTest Cases: 187/187'
            : 'Wrong Answer on test case 3\n\nExpected: [0,1]\nReceived: [1,0]',
      });
      setIsRunning(false);
    }, 2000);
  };

  const handleReset = () => {
    setCode('');
    setOutput(null);
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL - Problem Description */}
        <div className="w-1/2 border-r border-zinc-800 overflow-y-auto">
          <div className="p-8 space-y-8">
            {/* Problem Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-4xl font-bold tracking-tight font-['Outfit']">{problem.title}</h1>
                <Badge variant="outline" className={`${getDifficultyColor(problem.difficulty)} uppercase text-xs font-medium px-3 py-1`}>
                  {problem.difficulty}
                </Badge>
              </div>
              <div className="h-0.5 w-24 bg-gradient-to-r from-cyan-500 to-transparent" />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Description</h2>
              <p className="text-zinc-300 leading-relaxed font-light">{problem.description}</p>
            </div>

            <Separator className="bg-zinc-800" />

            {/* Examples */}
            <div className="space-y-6">
              <h2 className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Examples</h2>
              {problem.examples.map((example, idx) => (
                <Card key={idx} className="border-zinc-800 bg-zinc-950 rounded-xl">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
                      <span className="text-cyan-400">▸</span> Example {idx + 1}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-zinc-600 mb-2 font-medium">INPUT:</div>
                        <code className="block bg-black border border-zinc-800 rounded-lg px-4 py-3 text-sm text-emerald-400 font-mono">
                          {example.input}
                        </code>
                      </div>

                      <div>
                        <div className="text-xs text-zinc-600 mb-2 font-medium">OUTPUT:</div>
                        <code className="block bg-black border border-zinc-800 rounded-lg px-4 py-3 text-sm text-cyan-400 font-mono">
                          {example.output}
                        </code>
                      </div>

                      {example.explanation && (
                        <div>
                          <div className="text-xs text-zinc-600 mb-2 font-medium">EXPLANATION:</div>
                          <p className="text-sm text-zinc-400 font-light">{example.explanation}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator className="bg-zinc-800" />

            {/* Constraints */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Constraints</h2>
              <ul className="space-y-2">
                {problem.constraints.map((constraint, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400 font-light">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <code className="font-mono">{constraint}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Code Editor & Console */}
        <div className="w-1/2 flex flex-col">
                    <Button 
              onClick={handleReset}
              variant="outline" 
              size="sm"
              className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all"
            >
              Reset
            </Button>
          {/* Code Editor */}
          <div className="flex-1 flex flex-col p-6">
            <Card className="flex-1 flex flex-col border-zinc-800 bg-zinc-950 overflow-hidden rounded-xl">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-zinc-500">solution.ts</span>
                </div>
                <select className="bg-zinc-800 text-zinc-300 text-xs font-mono px-3 py-1.5 rounded-lg border border-zinc-700 focus:outline-none focus:border-cyan-500 transition-colors">
                  <option>JavaScript</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>C++</option>
                </select>
              </div>

              {/* Editor Area */}
              <div className="flex-1 relative">
                {/* Line Numbers */}
                <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-zinc-800 bg-zinc-900/50 overflow-hidden">
                  <div className="py-3 px-2 text-zinc-600 text-xs font-mono text-right leading-6">
                    {Array.from({ length: 30 }, (_, i) => (
                      <div key={i + 1}>{i + 1}</div>
                    ))}
                  </div>
                </div>

                {/* Code Textarea */}
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full pl-16 pr-4 py-3 bg-transparent text-zinc-100 text-sm font-mono leading-6 focus:outline-none resize-none"
                  placeholder="// Write your solution here..."
                  spellCheck={false}
                />
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-6">
              <Button
                onClick={handleRun}
                disabled={isRunning}
                variant="outline"
                className="flex-1 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all font-medium"
              >
                {isRunning ? 'RUNNING...' : 'RUN CODE'}
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isRunning}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-medium shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all"
              >
                {isRunning ? 'SUBMITTING...' : 'SUBMIT'}
              </Button>
            </div>
          </div>

          {/* Console Output */}
          <div className="h-64 border-t border-zinc-800">
            <div className="h-full flex flex-col">
              {/* Console Header */}
              <div className="px-6 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Console</span>
              </div>

              {/* Console Content */}
              <div className="flex-1 p-6 overflow-auto">
                {!output ? (
                  <p className="text-zinc-600 text-sm font-mono font-light">// Run your code to see output</p>
                ) : (
                  <div className="space-y-4">
                    <div className={`px-4 py-3 rounded-lg border font-mono text-sm ${getStatusColor(output.status)}`}>
                      <div className="font-bold uppercase mb-1">
                        {output.status === 'accepted' ? '✓ Accepted' : '✗ ' + output.status?.replace('_', ' ')}
                      </div>
                    </div>
                    <pre className="text-zinc-400 text-sm font-mono whitespace-pre-wrap font-light">{output.message}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
}