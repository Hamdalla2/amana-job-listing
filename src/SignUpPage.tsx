import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './components/ui/card';
import axios from 'axios';

interface AuthPageProps {
  onNavigate: (page: 'signin' | 'signup') => void;
}

export function SignUpPage({ onNavigate }: AuthPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/signup', { name, email, password });
      localStorage.setItem('token', res.data.token);
      setMessageType('success');
      setMessage('Sign up successful!');
      setTimeout(() => {
        window.location.href = '/'; // Redirect to home page
      }, 1000);
    } catch (err: any) {
      setMessageType('error');
      setMessage(err.response.data.msg);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md dark:bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl dark:text-white">Create an Account</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Join our platform to find your dream job.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="dark:text-gray-200">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jane Doe"
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jane.doe@example.com"
                required
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
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          {message && <p className={`mt-4 text-center text-sm ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600 dark:text-gray-400 justify-center">
          <p>
            Already have an account? <button onClick={() => onNavigate('signin')} className="text-blue-600 hover:underline font-medium cursor-pointer">
              Sign In
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}