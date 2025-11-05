import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './components/ui/card';
import axios from 'axios';

interface AuthPageProps {
  onNavigate: (page: 'signin' | 'signup') => void;
}

export function SignInPage({ onNavigate }: AuthPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/signin', { email, password });
      localStorage.setItem('token', res.data.token);
      setMessageType('success');
      setMessage('Sign in successful!');
      setTimeout(() => {
        window.location.href = '/'; // Redirect to home page
      }, 1000);
    } catch (err: any) {
      setMessageType('error');
      if (err.response && err.response.data && err.response.data.msg) {
        setMessage(err.response.data.msg);
      } else if (err.message) {
        setMessage(err.message);
      } else {
        setMessage('Failed to connect to server. Please make sure the backend is running.');
      }
    }
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
                autoComplete="email"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          {message && <p className={`mt-4 text-center text-sm ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600 dark:text-gray-400 justify-center">
          <p>
            Don't have an account? <button onClick={() => onNavigate('signup')} className="text-blue-600 hover:underline font-medium cursor-pointer">
              Sign Up
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}