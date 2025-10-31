import React from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './components/ui/card';

interface AuthPageProps {
  onNavigate: (page: 'signin' | 'signup') => void;
}

export function SignInPage({ onNavigate }: AuthPageProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Later, this will call our backend API
    console.log('Signing in...');
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md dark:bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl dark:text-white">Welcome Back</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Sign in to access your profile and saved jobs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jane.doe@example.com"
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600 dark:text-gray-400 justify-center">
          <p>
            Don't have an account? <button onClick={() => onNavigate('signup')} className="text-blue-600 hover:underline font-medium">
              Sign Up
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}