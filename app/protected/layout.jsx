'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AppLayout({ children }) {
  const handleLogout = () => {
    // TODO: Add your logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold tracking-tight cursor-pointer hover:scale-105 transition-transform font-['Outfit']">
              <span className="text-cyan-400">&gt;</span> CODEFORGE
            </div>
          </Link>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/protected" className="text-zinc-400 hover:text-cyan-400 transition-colors font-medium">
              Dashboard
            </Link>
            <Link href="/protected/problem" className="text-zinc-400 hover:text-cyan-400 transition-colors font-medium">
              Problems
            </Link>
            <Link href="/">
                <Button
                onClick={handleLogout}
                variant="outline"
                className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-cyan-400 transition-colors"
                >
                Logout
                </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content - Children Pages */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-32 bg-zinc-950/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            {/* Brand Info - Takes 6 columns */}
            <div className="md:col-span-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-['Outfit']">
                  <span className="text-cyan-400">&gt;</span> CODEFORGE
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-md font-light">
                  A focused platform for practicing DSA problems, tracking progress, and learning effectively.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <h4 className="text-xs uppercase tracking-wider text-zinc-600 font-medium mb-3">
                  Get in Touch
                </h4>
                <div className="space-y-2">
                  <a 
                    href="mailto:manali.desai1011@gmail.com" 
                    className="flex items-center gap-3 text-zinc-400 hover:text-cyan-400 transition-all text-sm group hover:translate-x-2"
                  >
                    <span className="text-cyan-500/50 group-hover:text-cyan-400 transition-all">📧</span>
                    <span className="font-light">manali.desai1011@gmail.com</span>
                  </a>
                  <a 
                    href="tel:+919604731482" 
                    className="flex items-center gap-3 text-zinc-400 hover:text-cyan-400 transition-all text-sm group hover:translate-x-2"
                  >
                    <span className="text-cyan-500/50 group-hover:text-cyan-400 transition-all">📞</span>
                    <span className="font-light">+91 9604731482</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links - Takes 4 columns */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-zinc-600 font-medium mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/protected/problem" className="text-zinc-400 hover:text-cyan-400 transition-all text-sm flex items-center gap-2 group font-light hover:translate-x-2">
                    <span className="text-cyan-500/0 group-hover:text-cyan-500/100 transition-colors">→</span>
                    Problems List
                  </Link>
                </li>
                <li>
                  <Link href="/protected" className="text-zinc-400 hover:text-cyan-400 transition-all text-sm flex items-center gap-2 group font-light hover:translate-x-2">
                    <span className="text-cyan-500/0 group-hover:text-cyan-500/100 transition-colors">→</span>
                    Dashboard
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

          <div className="pt-8 border-t border-zinc-800/50">
            <div className="flex justify-center">
              <p className="text-zinc-600 text-xs font-light text-center hover:text-cyan-400 transition-colors">
                © 2026 CodeForge. Crafted with ♥ by Manali Desai
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
}