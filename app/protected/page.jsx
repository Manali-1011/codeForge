"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Demo data
const statsData = {
  easy: 45,
  medium: 32,
  hard: 18
};

const totalProblems = statsData.easy + statsData.medium + statsData.hard;

// Calendar data - last 12 months with submission counts
const generateCalendarData = () => {
  const data = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 11);
  startDate.setDate(1);
  
  let currentDate = new Date(startDate);
  while (currentDate <= today) {
    const submissions = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0;
    data.push({
      date: new Date(currentDate).toISOString().split('T')[0],
      count: submissions,
      month: currentDate.getMonth(),
      year: currentDate.getFullYear()
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};

const calendarData = generateCalendarData();

const recentlySolved = [
  { id: 1, title: "Two Sum", difficulty: "easy", date: "2024-02-14", time: "14:32" },
  { id: 2, title: "Binary Tree Level Order Traversal", difficulty: "medium", date: "2024-02-14", time: "12:15" },
  { id: 3, title: "Merge K Sorted Lists", difficulty: "hard", date: "2024-02-13", time: "18:45" },
  { id: 4, title: "Valid Parentheses", difficulty: "easy", date: "2024-02-13", time: "16:20" },
  { id: 5, title: "Longest Palindromic Substring", difficulty: "medium", date: "2024-02-12", time: "10:30" },
  { id: 6, title: "Trapping Rain Water", difficulty: "hard", date: "2024-02-12", time: "09:15" },
  { id: 7, title: "Reverse Linked List", difficulty: "easy", date: "2024-02-11", time: "20:10" },
  { id: 8, title: "Container With Most Water", difficulty: "medium", date: "2024-02-11", time: "15:45" }
];

const Dashboard = () => {
  const [hoveredDay, setHoveredDay] = useState(null);

  // Calculate percentages for circle graph
  const easyPercent = (statsData.easy / totalProblems) * 100;
  const mediumPercent = (statsData.medium / totalProblems) * 100;
  const hardPercent = (statsData.hard / totalProblems) * 100;

  // SVG circle calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  const getDayColor = (count) => {
    if (count === 0) return 'bg-zinc-800';
    if (count === 1) return 'bg-emerald-900';
    if (count === 2) return 'bg-emerald-700';
    if (count === 3) return 'bg-emerald-600';
    return 'bg-emerald-500';
  };

  const getDifficultyBadge = (difficulty) => {
    const colors = {
      easy: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      hard: 'bg-red-500/10 text-red-500 border-red-500/20'
    };
    return colors[difficulty];
  };

  // Group calendar data by months
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthsData = {};
  
  calendarData.forEach(day => {
    const monthKey = `${day.year}-${day.month}`;
    if (!monthsData[monthKey]) {
      monthsData[monthKey] = {
        name: monthNames[day.month],
        year: day.year,
        days: []
      };
    }
    monthsData[monthKey].days.push(day);
  });

  const months = Object.values(monthsData);

  return (
    <div className="min-h-screen bg-black font-['Outfit']">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-6 font-['Outfit']">
              Dash<span className="text-cyan-400">board</span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
              Track your coding progress and achievements
            </p>
          </div>

        {/* Top Section - Problems Solved and Overview Side by Side in Single Card */}
        <Card className="bg-zinc-950 border-zinc-800 rounded-xl mb-8">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left: Problems Solved - Circle Graph */}
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">Problems Solved</h2>
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <svg width="240" height="240" className="transform -rotate-90">
                      {/* Background circle */}
                      <circle
                        cx="120"
                        cy="120"
                        r={radius}
                        fill="none"
                        stroke="#27272a"
                        strokeWidth="24"
                      />
                      {/* Easy segment */}
                      <circle
                        cx="120"
                        cy="120"
                        r={radius}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="24"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (easyPercent / 100) * circumference}
                        strokeLinecap="round"
                      />
                      {/* Medium segment */}
                      <circle
                        cx="120"
                        cy="120"
                        r={radius}
                        fill="none"
                        stroke="#eab308"
                        strokeWidth="24"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (mediumPercent / 100) * circumference}
                        strokeLinecap="round"
                        style={{ transform: `rotate(${(easyPercent / 100) * 360}deg)`, transformOrigin: '120px 120px' }}
                      />
                      {/* Hard segment */}
                      <circle
                        cx="120"
                        cy="120"
                        r={radius}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="24"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (hardPercent / 100) * circumference}
                        strokeLinecap="round"
                        style={{ transform: `rotate(${((easyPercent + mediumPercent) / 100) * 360}deg)`, transformOrigin: '120px 120px' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-white">{totalProblems}</div>
                        <div className="text-sm text-zinc-400 mt-1">Total</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 max-w-sm">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                      <span className="text-zinc-400 text-base">Easy</span>
                    </div>
                    <span className="text-white font-bold text-xl">{statsData.easy}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                      <span className="text-zinc-400 text-base">Medium</span>
                    </div>
                    <span className="text-white font-bold text-xl">{statsData.medium}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                      <span className="text-zinc-400 text-base">Hard</span>
                    </div>
                    <span className="text-white font-bold text-xl">{statsData.hard}</span>
                  </div>
                </div>
              </div>

              {/* Right: Overview - 2x2 Grid */}
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">Overview</h2>
                <div className="grid grid-cols-2 gap-5 flex-1">
                  <div className="p-8 bg-black border border-zinc-800 rounded-xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="text-5xl font-bold text-emerald-500 mb-3">{statsData.easy}</div>
                      <div className="text-base text-zinc-400">Easy</div>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mt-6">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(statsData.easy / 100) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="p-8 bg-black border border-zinc-800 rounded-xl hover:border-yellow-500/30 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="text-5xl font-bold text-yellow-500 mb-3">{statsData.medium}</div>
                      <div className="text-base text-zinc-400">Medium</div>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mt-6">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(statsData.medium / 100) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="p-8 bg-black border border-zinc-800 rounded-xl hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="text-5xl font-bold text-red-500 mb-3">{statsData.hard}</div>
                      <div className="text-base text-zinc-400">Hard</div>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mt-6">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${(statsData.hard / 50) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="p-8 bg-black border border-zinc-800 rounded-xl hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="text-5xl font-bold text-cyan-400 mb-3">{totalProblems}</div>
                      <div className="text-base text-zinc-400">Total</div>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mt-6">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Heatmap - Month-wise like LeetCode */}
        <Card className="bg-zinc-950 border-zinc-800 rounded-xl mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Submission Activity</h2>
              <div className="flex items-center space-x-2 text-xs text-zinc-400">
                <span>Less</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-sm bg-zinc-800"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-900"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-700"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-600"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
                </div>
                <span>More</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="flex space-x-3">
                {months.map((month, monthIndex) => (
                  <div key={monthIndex} className="flex flex-col">
                    <div className="text-xs text-zinc-500 mb-2 font-medium">{month.name}</div>
                    <div className="grid grid-rows-7 grid-flow-col gap-1">
                      {month.days.map((day, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`w-3 h-3 rounded-sm ${getDayColor(day.count)} hover:ring-2 hover:ring-cyan-400 transition-all cursor-pointer`}
                          onMouseEnter={() => setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                          title={`${day.date}: ${day.count} submissions`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {hoveredDay && (
              <div className="mt-4 text-sm text-zinc-400">
                <span className="text-white font-semibold">{hoveredDay.date}</span>: {hoveredDay.count} submission{hoveredDay.count !== 1 ? 's' : ''}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recently Solved Problems */}
        <Card className="bg-zinc-950 border-zinc-800 rounded-xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Recently Solved</h2>
            <div className="space-y-3">
              {recentlySolved.map((problem) => (
                <div
                  key={problem.id}
                  className="flex items-center justify-between p-4 bg-black border border-zinc-800 rounded-lg hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-1">
                      <h3 className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                        {problem.title}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <Badge className={`${getDifficultyBadge(problem.difficulty)} border text-xs`}>
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </Badge>
                        <span className="text-xs text-zinc-500">
                          {problem.date} at {problem.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-zinc-500 group-hover:text-cyan-400 transition-colors">
                      View Solution →
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-cyan-400 hover:bg-zinc-800 hover:border-cyan-500/30 transition-all duration-300">
              View All Submissions
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;