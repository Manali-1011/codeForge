'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Add your authentication logic here
    // Example: await signIn(email, password);
    
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Redirect to dashboard after successful login
      // router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-50" />
      
      {/* Glowing orb effect */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-breathe" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none animate-breathe" style={{ animationDelay: '1s' }} />

      {/* Floating code snippets */}
      <div className="absolute top-20 left-10 text-cyan-500/10 font-mono text-sm animate-float">
        const auth = () =&gt; &#123;
      </div>
      <div className="absolute bottom-20 right-10 text-emerald-500/10 font-mono text-sm animate-float" style={{ animationDelay: '1.5s' }}>
        return token;
      </div>
      <div className="absolute top-1/2 right-20 text-purple-500/10 font-mono text-sm animate-float" style={{ animationDelay: '0.5s' }}>
        if (user) &#123;
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-950/80 backdrop-blur-xl relative z-10 shadow-[0_0_50px_rgba(34,211,238,0.1)] animate-fadeInUp">
        <CardHeader className="space-y-4 text-center pb-8">
          {/* Back Button */}
          <Link 
            href="/"
            className="absolute top-6 left-6 text-zinc-400 hover:text-cyan-400 transition-colors group flex items-center gap-2"
          >
            <svg 
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </Link>

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="inline-block">
              <h1 className="text-3xl font-bold tracking-tight font-['Outfit']">
                <span className="text-cyan-400">&gt;</span> <span className="text-white">CODEFORGE</span>
              </h1>
            </div>
          </div>

          <CardTitle className="text-2xl font-bold text-white font-['Outfit']">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Sign in to your account to continue your journey
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300 text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300 text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="border-zinc-700 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-zinc-400 cursor-pointer hover:text-zinc-300 transition-colors"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-6 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <>
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:underline"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Add custom animations */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

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
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}