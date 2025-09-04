"use client"

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let success = false;
      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await signup(name, email, password);
      }

      if (!success) {
        setError(isLogin ? 'Invalid credentials' : 'Failed to create account');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-nude-secondary p-8 rounded-lg shadow-sm border border-nude-accent">
      <h2 className="text-2xl font-bold text-nude-text text-center mb-6">
        {isLogin ? 'Sign In' : 'Sign Up'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-nude-text font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text placeholder-nude-muted focus:outline-none focus:ring-2 focus:ring-nude-accent"
              placeholder="Your full name"
              required={!isLogin}
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-nude-text font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text placeholder-nude-muted focus:outline-none focus:ring-2 focus:ring-nude-accent"
            placeholder="your@email.com"
            required
          />
        </div>

        {isLogin && (
          <div>
            <label htmlFor="password" className="block text-nude-text font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text placeholder-nude-muted focus:outline-none focus:ring-2 focus:ring-nude-accent"
              placeholder="Your password"
              required
            />
            <p className="text-xs text-nude-muted mt-1">
              Demo: demo@example.com / password
            </p>
          </div>
        )}

        {error && (
          <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-nude-accent text-nude-secondary py-3 px-6 font-semibold hover:bg-nude-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-nude-muted hover:text-nude-accent transition-colors text-sm"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}