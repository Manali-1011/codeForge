'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const difficultyRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (difficultyRef.current) observer.observe(difficultyRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white ">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50 animate-slideDown">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight hover:scale-105 transition-transform">
              <span className="text-cyan-400">&gt;</span> <span className="font-['Outfit']">CODEFORGE</span>
            </div>
            <Link href="/login" className="flex items-center gap-6">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-sm font-medium hover:scale-105 transition-transform">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative container mx-auto px-4 py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none animate-gridPulse" />
        
        <div className="absolute top-20 left-10 text-emerald-500/10 font-mono text-sm animate-float">
        </div>
        <div className="absolute top-40 right-20 text-cyan-500/10 font-mono text-sm animate-float" style={{ animationDelay: '1s' }}>
        </div>
        <div className="absolute bottom-40 right-1/4 text-purple-500/10 font-mono text-sm animate-float" style={{ animationDelay: '2s' }}>
          return memo[key];
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-block animate-[slideDown_0.6s_ease-out]">
            <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/50 font-medium px-4 py-1 hover:scale-110 transition-transform cursor-pointer">
              <span className="animate-pulse mr-2">●</span> BETA v1.0
            </Badge>
          </div>

          {/* Main Heading with staggered animation */}
          <h1 className="text-7xl md:text-8xl font-black tracking-tight animate-[fadeInUp_0.8s_ease-out_0.2s_both] font-['Outfit']">
            FORGE YOUR
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
              CODING SKILLS
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.4s_both] font-light">
            Master algorithms through battle-tested challenges. From fundamentals to advanced data structures.
            <span className="text-cyan-400 font-medium"> Level up today.</span>
          </p>

          {/* CTA Buttons */}
          <Link href="/signup">
            <div className="flex items-center justify-center gap-4 pt-6 animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-lg px-8 py-6 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-all font-medium hover:scale-105 group">
                SignUp Now 
              </Button>
            </div>
          </Link>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 pt-12 animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
            <div className="text-center hover:scale-110 transition-transform cursor-default">
              <div className="text-sm text-zinc-600 uppercase tracking-wider mt-1 font-medium">Structured DSA Practice</div>
            </div>
            <div className="h-12 w-px bg-zinc-800" />
            <div className="text-center hover:scale-110 transition-transform cursor-default">
              <div className="text-sm text-zinc-600 uppercase tracking-wider mt-1 font-medium">Difficulty-Based Filtering</div>
            </div>
            <div className="h-12 w-px bg-zinc-800" />
            <div className="text-center hover:scale-110 transition-transform cursor-default">
              <div className="text-sm text-zinc-600 uppercase tracking-wider mt-1 font-medium">Progress Tracking</div>
            </div>
          </div>
        </div>

        {/* Glowing orb effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-breathe" />
      </section>

      {/* Features Section */}
      <section id="everything-you-need" ref={featuresRef} className="container mx-auto px-4 py-32 relative opacity-0 translate-y-10 transition-all duration-1000 scroll-mt-24" >

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4 animate-[fadeIn_0.6s_ease-out]">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="text-sm uppercase tracking-wider text-zinc-500 font-medium">Features</span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
          <h2 className="text-5xl font-bold tracking-tight font-['Outfit'] animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            Everything You <span className="text-cyan-400">Need</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
              {
                icon: '📚',
                title: 'Curated Problem Sets',
                description: 'Carefully selected DSA problems categorized by topic and difficulty.',
                delay: '0s',
                link: '/problems'
              },
              {
                icon: '🧠',
                title: 'Structured Learning Path',
                description: 'Follow a guided roadmap designed for interview preparation.',
                delay: '0.1s',
                link: '/learning-path'
              },
              {
                icon: '📈',
                title: 'Track Your Progress',
                description: 'Mark problems as solved and monitor your improvement over time.',
                delay: '0.2s',
                link: '/progress'
              },
              {
                icon: '🔍',
                title: 'Smart Filtering',
                description: 'Filter problems by difficulty and topic to practice efficiently.',
                delay: '0.3s',
                link: '/problems'
              },
              {
                icon: '💬',
                title: 'Solution Discussions',
                description: 'Read and share approaches with other learners.',
                delay: '0.4s',
                link: '/discussions'
              },
              {
                icon: '🗂️',
                title: 'Topic-Based Practice',
                description: 'Practice Arrays, Trees, Graphs, DP and more in one place.',
                delay: '0.5s',
                link: '/topics'
              },
            ].map((feature, idx) => (
            <Link key={idx} href={feature.link}>
              <Card
                className="group border-zinc-800 bg-zinc-950 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] animate-[slideUp_0.6s_ease-out_both] cursor-pointer h-full hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: feature.delay }}
              >
                <CardContent className="p-8 space-y-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300 group-hover:rotate-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-500 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Difficulty Levels Section */}
      <section ref={difficultyRef} className="container mx-auto px-4 py-32 relative opacity-0 translate-y-10 transition-all duration-1000">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tight mb-4 font-['Outfit']">
            Choose Your <span className="text-cyan-400">Challenge</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light">
            Problems designed for every skill level, from beginner to expert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              level: 'EASY',
              color: 'emerald',
              problems: '12',
              description: 'Build fundamentals with arrays, strings, and basic algorithms.',
            },
            {
              level: 'MEDIUM',
              color: 'yellow',
              problems: '14',
              description: 'Tackle trees, graphs, dynamic programming, and system design.',
            },
            {
              level: 'HARD',
              color: 'red',
              problems: '6',
              description: 'Master advanced algorithms and optimize for peak performance.',
            },
          ].map((tier, idx) => (
            <Card
              key={idx}
              className="group border-zinc-800 bg-zinc-950 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] animate-[fadeIn_0.8s_ease-out_both] hover:scale-105"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <CardContent className="p-8 space-y-6 text-center">
                <Badge
                  variant="outline"
                  className={`bg-${tier.color}-500/10 text-${tier.color}-500 border-${tier.color}-500/50 text-sm px-4 py-2 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all font-medium group-hover:scale-110`}
                >
                  {tier.level}
                </Badge>
                <div className="text-5xl font-black text-zinc-100 group-hover:text-cyan-400 transition-colors font-['Outfit']">
                  {tier.problems}
                </div>
                <p className="text-zinc-500 leading-relaxed font-light">
                  {tier.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-32 relative">
        <Card className="border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 max-w-4xl mx-auto overflow-hidden relative">
          {/* Animated border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-20 blur-xl animate-pulse" />
          
          <CardContent className="relative z-10 p-16 text-center space-y-8">
            <h2 className="text-5xl font-black tracking-tight font-['Outfit']">
              Ready to Level Up?
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
              Join thousands of developers mastering algorithms and acing technical interviews.
            </p>
            <div className="flex items-center justify-center gap-4 pt-6">
              <Link href="/signup">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-lg px-10 py-6 shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] transition-all font-medium">
                  Create Account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-20 bg-zinc-950/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

            {/* Brand Info - Takes 6 columns */}
            <div className="md:col-span-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold hover:scale-105 transition-transform inline-block cursor-pointer">
                  <span className="text-cyan-400">&gt;</span> <span className="font-['Outfit']">CODEFORGE</span>
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-md font-light">
                  A focused platform for practicing DSA problems, tracking progress, and learning effectively. Built to help developers ace technical interviews.
                </p>
              </div>

              {/* Contact Info with better styling */}
              <div className="space-y-3 pt-4">
                <h4 className="text-xs uppercase tracking-wider text-zinc-600 font-medium mb-3">
                  Get in Touch
                </h4>
                <div className="space-y-2">
                  <a 
                    href="mailto:manali.desai1011@gmail.com" 
                    className="flex items-center gap-3 text-zinc-400 hover:text-cyan-400 transition-all text-sm group hover:translate-x-2"
                  >
                    <span className="text-cyan-500/50 group-hover:text-cyan-400 group-hover:scale-110 transition-all">📧</span>
                    <span className="font-light">manali.desai1011@gmail.com</span>
                  </a>
                  <a 
                    href="tel:+919604731482" 
                    className="flex items-center gap-3 text-zinc-400 hover:text-cyan-400 transition-all text-sm group hover:translate-x-2"
                  >
                    <span className="text-cyan-500/50 group-hover:text-cyan-400 group-hover:scale-110 transition-all">📞</span>
                    <span className="font-light">+91 9604731482</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Features Links - Takes 4 columns */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-zinc-600 font-medium mb-4">
                Features
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/#everything-you-need" className="text-zinc-400 hover:text-cyan-400 transition-all text-sm flex items-center gap-2 group font-light hover:translate-x-2">
                    <span className="text-cyan-500/0 group-hover:text-cyan-500/100 transition-colors">→</span>
                    Curated Problem Sets
                  </Link>
                </li>
                <li>
                  <Link href="/#everything-you-need" className="text-zinc-400 hover:text-cyan-400 transition-all text-sm flex items-center gap-2 group font-light hover:translate-x-2">
                    <span className="text-cyan-500/0 group-hover:text-cyan-500/100 transition-colors">→</span>
                    Structured Learning Path
                  </Link>
                </li>
                <li>
                  <Link href="/#everything-you-need" className="text-zinc-400 hover:text-cyan-400 transition-all text-sm flex items-center gap-2 group font-light hover:translate-x-2">
                    <span className="text-cyan-500/0 group-hover:text-cyan-500/100 transition-colors">→</span>
                    Track Your Progress
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#everything-you-need" className="text-zinc-400 hover:text-cyan-400 transition-all text-sm flex items-center gap-2 group font-light hover:translate-x-2">
                    <span className="text-cyan-500/0 group-hover:text-cyan-500/100 transition-colors">→</span>
                    Smart Filtering
                  </Link>
                </li>
                <li>
                  <Link href="/#everything-you-need" className="text-zinc-400 hover:text-cyan-400 transition-all text-sm flex items-center gap-2 group font-light hover:translate-x-2">
                    <span className="text-cyan-500/0 group-hover:text-cyan-500/100 transition-colors">→</span>
                    Solution Discussions
                  </Link>
                </li>
                <li>
                  <Link href="/#everything-you-need" className="text-zinc-400 hover:text-cyan-400 transition-all text-sm flex items-center gap-2 group font-light hover:translate-x-2">
                    <span className="text-cyan-500/0 group-hover:text-cyan-500/100 transition-colors">→</span>
                    Topic-Based Practice
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links - Takes 2 columns */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-zinc-600 font-medium mb-4">
                Connect
              </h4>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://github.com/Manali-1011" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-400 hover:text-cyan-400 transition-all text-sm group hover:translate-x-2"
                >
                  <svg className="w-5 h-5 text-cyan-500/50 group-hover:text-cyan-400 group-hover:scale-110 transition-all" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="font-light">GitHub</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/manali-desai-b46213332" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-400 hover:text-cyan-400 transition-all text-sm group hover:translate-x-2"
                >
                  <svg className="w-5 h-5 text-cyan-500/50 group-hover:text-cyan-400 group-hover:scale-110 transition-all" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="font-light">LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-zinc-800/50">
            <div className="flex justify-center">
              <p className="text-zinc-600 text-xs font-light text-center hover:text-cyan-400 transition-colors">
                © 2026 CodeForge. Crafted with ♥ by Manali Desai 
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Add custom animations */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.3;
          }
        }

        @keyframes gridPulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }

        .animate-gridPulse {
          animation: gridPulse 3s ease-in-out infinite;
        }

        .animate-rotate {
          animation: rotate 10s linear infinite;
        }

        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}