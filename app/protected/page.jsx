"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase, getCurrentUser } from '@/lib/supabase';

const Dashboard = () => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // Real data states
  const [statsData, setStatsData] = useState({
    easy: 0,
    medium: 0,
    hard: 0
  });
  const [calendarData, setCalendarData] = useState([]);
  const [recentlySolved, setRecentlySolved] = useState([]);
  const [totalProblems, setTotalProblems] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      setLoading(true);

      // Get current user
      const { data: userData } = await getCurrentUser();
      setUser(userData?.user);

      const userId = userData?.user?.id || 'anonymous';

      // Fetch all submissions for this user
      const { data: submissions, error: submissionsError } = await supabase
        .from('submissions')
        .select(`
          *,
          problems (
            id,
            title,
            difficulty
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (submissionsError) throw submissionsError;

      // Calculate statistics
      const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted');
      
      // Get unique problems solved (by problem_id)
      const uniqueProblems = {};
      acceptedSubmissions.forEach(submission => {
        if (!uniqueProblems[submission.problem_id]) {
          uniqueProblems[submission.problem_id] = submission;
        }
      });

      const uniqueSolved = Object.values(uniqueProblems);

      // Count by difficulty
      const stats = {
        easy: 0,
        medium: 0,
        hard: 0
      };

      uniqueSolved.forEach(submission => {
        const difficulty = submission.problems?.difficulty?.toLowerCase();
        if (difficulty && stats[difficulty] !== undefined) {
          stats[difficulty]++;
        }
      });

      setStatsData(stats);
      setTotalProblems(uniqueSolved.length);

      // Generate calendar data from submissions
      const calendar = generateCalendarDataFromSubmissions(submissions);
      setCalendarData(calendar);

      // Get recently solved problems (last 10 unique)
      const recentUnique = [];
      const seenProblems = new Set();
      
      for (const submission of acceptedSubmissions) {
        if (!seenProblems.has(submission.problem_id) && recentUnique.length < 10) {
          seenProblems.add(submission.problem_id);
          recentUnique.push({
            id: submission.problem_id,
            title: submission.problems?.title || 'Unknown Problem',
            difficulty: submission.problems?.difficulty?.toLowerCase() || 'easy',
            date: new Date(submission.created_at).toISOString().split('T')[0],
            time: new Date(submission.created_at).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            })
          });
        }
      }

      setRecentlySolved(recentUnique);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  function generateCalendarDataFromSubmissions(submissions) {
    const data = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - 11);
    startDate.setDate(1);
    
    // Create a map of dates to submission counts
    const submissionCounts = {};
    submissions.forEach(submission => {
      const date = new Date(submission.created_at).toISOString().split('T')[0];
      submissionCounts[date] = (submissionCounts[date] || 0) + 1;
    });

    // Generate calendar data
    let currentDate = new Date(startDate);
    while (currentDate <= today) {
      const dateStr = new Date(currentDate).toISOString().split('T')[0];
      data.push({
        date: dateStr,
        count: submissionCounts[dateStr] || 0,
        month: currentDate.getMonth(),
        year: currentDate.getFullYear()
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return data;
  }

  // Calculate percentages for circle graph
  const easyPercent = totalProblems > 0 ? (statsData.easy / totalProblems) * 100 : 0;
  const mediumPercent = totalProblems > 0 ? (statsData.medium / totalProblems) * 100 : 0;
  const hardPercent = totalProblems > 0 ? (statsData.hard / totalProblems) * 100 : 0;

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
    return colors[difficulty] || colors.easy;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-400 font-['Outfit']">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-['Outfit']">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-6 font-['Outfit']">
            Dash<span className="text-cyan-400">board</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            {user?.email ? `Welcome back, ${user.user_metadata?.full_name || user.email}` : 'Track your coding progress and achievements'}
          </p>
        </div>

        {/* Show message if no problems solved yet */}
        {totalProblems === 0 ? (
          <Card className="bg-zinc-950 border-zinc-800 rounded-xl mb-8">
            <CardContent className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 text-cyan-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-2xl font-bold text-white mb-2">Start Your Journey</h3>
                <p className="text-zinc-400 mb-6">
                  You haven't solved any problems yet. Start practicing to see your progress!
                </p>
                <a 
                  href="/protected/problems"
                  className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
                >
                  Browse Problems
                </a>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Top Section - Problems Solved and Overview */}
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
                          {easyPercent > 0 && (
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
                          )}
                          {/* Medium segment */}
                          {mediumPercent > 0 && (
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
                          )}
                          {/* Hard segment */}
                          {hardPercent > 0 && (
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
                          )}
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
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min((statsData.easy / 100) * 100, 100)}%` }}></div>
                        </div>
                      </div>

                      <div className="p-8 bg-black border border-zinc-800 rounded-xl hover:border-yellow-500/30 transition-all duration-300 flex flex-col justify-between">
                        <div>
                          <div className="text-5xl font-bold text-yellow-500 mb-3">{statsData.medium}</div>
                          <div className="text-base text-zinc-400">Medium</div>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mt-6">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${Math.min((statsData.medium / 100) * 100, 100)}%` }}></div>
                        </div>
                      </div>

                      <div className="p-8 bg-black border border-zinc-800 rounded-xl hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between">
                        <div>
                          <div className="text-5xl font-bold text-red-500 mb-3">{statsData.hard}</div>
                          <div className="text-base text-zinc-400">Hard</div>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mt-6">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: `${Math.min((statsData.hard / 50) * 100, 100)}%` }}></div>
                        </div>
                      </div>

                      <div className="p-8 bg-black border border-zinc-800 rounded-xl hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between">
                        <div>
                          <div className="text-5xl font-bold text-cyan-400 mb-3">{totalProblems}</div>
                          <div className="text-base text-zinc-400">Total</div>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mt-6">
                          <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full" style={{ width: `${Math.min((totalProblems / 100) * 100, 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendar Heatmap */}
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
                {months.length > 0 ? (
                  <>
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
                  </>
                ) : (
                  <div className="text-center text-zinc-500 py-8">
                    No submission activity yet. Start solving problems to see your progress!
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recently Solved Problems */}
            {recentlySolved.length > 0 && (
              <Card className="bg-zinc-950 border-zinc-800 rounded-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Recently Solved</h2>
                  <div className="space-y-3">
                    {recentlySolved.map((problem) => (
                      <div
                        key={problem.id}
                        onClick={() => window.location.href = `/protected/problems/${problem.id}`}
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
                            View Problem →
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => window.location.href = '/protected/problems'}
                    className="w-full mt-6 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-cyan-400 hover:bg-zinc-800 hover:border-cyan-500/30 transition-all duration-300"
                  >
                    View All Problems
                  </button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;