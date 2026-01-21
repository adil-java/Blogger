import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { PenLine, Mail, Lock, User, Sparkles } from 'lucide-react';

export default function WriterAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState('');
  const { login, signup, loginWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isLogin) {
      // Login
      const result = await login(email, password);
      if (result.success) {
        toast.success('Welcome back!');
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } else {
      // Signup validation
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        toast.error('Passwords do not match');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        toast.error('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      const result = await signup(name, email, password);
      if (result.success) {
        toast.success('Account created successfully!');
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');
    
    const result = await loginWithGoogle();
    if (result.success) {
      toast.success('Welcome!');
    } else {
      setError(result.message);
      toast.error(result.message);
    }
    
    setGoogleLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 px-4 py-8">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mb-4 shadow-lg shadow-primary-200 transform hover:scale-105 transition-transform duration-300">
            <PenLine className="w-10 h-10 text-white" />
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Writer Portal
          </h1>
          <p className="text-gray-500 mt-2 transition-all duration-300">
            {isLogin ? 'Sign in to manage your blogs' : 'Create your writer account'}
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="glass bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 p-8 space-y-5 border border-white/20"
        >
          {/* Toggle Tabs */}
          <div className="flex bg-gray-100/80 rounded-xl p-1.5">
            <button
              type="button"
              onClick={() => !isLogin && toggleMode()}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                isLogin
                  ? 'bg-white text-primary-600 shadow-md transform scale-[1.02]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => isLogin && toggleMode()}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                !isLogin
                  ? 'bg-white text-primary-600 shadow-md transform scale-[1.02]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="group w-full flex items-center justify-center gap-3 py-3.5 px-4 border-2 border-gray-200 rounded-xl bg-white hover:bg-gray-50 hover:border-gray-300 disabled:opacity-60 transition-all duration-300 hover:shadow-lg hover:shadow-gray-100"
          >
            {googleLoading ? (
              <svg className="animate-spin h-5 w-5 text-gray-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            <span className="font-medium text-gray-700">
              {googleLoading ? 'Connecting...' : 'Continue with Google'}
            </span>
          </button>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-gray-400 font-medium">or continue with email</span>
            </div>
          </div>

          {error && (
            <div className="animate-fade-in-up bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              {error}
            </div>
          )}

          {/* Name field (signup only) */}
          {!isLogin && (
            <div className="space-y-2 animate-fade-in-up">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <div className={`relative group rounded-xl transition-all duration-300 ${focusedInput === 'name' ? 'ring-2 ring-primary-400 ring-offset-2' : ''}`}>
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedInput === 'name' ? 'text-primary-500' : 'text-gray-400'}`} />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onFocus={() => setFocusedInput('name')}
                  onBlur={() => setFocusedInput('')}
                  required={!isLogin}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl outline-none focus:border-primary-400 transition-all duration-300 bg-gray-50/50 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div className={`relative group rounded-xl transition-all duration-300 ${focusedInput === 'email' ? 'ring-2 ring-primary-400 ring-offset-2' : ''}`}>
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedInput === 'email' ? 'text-primary-500' : 'text-gray-400'}`} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput('')}
                required
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl outline-none focus:border-primary-400 transition-all duration-300 bg-gray-50/50 focus:bg-white"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className={`relative group rounded-xl transition-all duration-300 ${focusedInput === 'password' ? 'ring-2 ring-primary-400 ring-offset-2' : ''}`}>
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedInput === 'password' ? 'text-primary-500' : 'text-gray-400'}`} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput('')}
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl outline-none focus:border-primary-400 transition-all duration-300 bg-gray-50/50 focus:bg-white"
              />
            </div>
          </div>

          {/* Confirm Password (signup only) */}
          {!isLogin && (
            <div className="space-y-2 animate-fade-in-up">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <div className={`relative group rounded-xl transition-all duration-300 ${focusedInput === 'confirmPassword' ? 'ring-2 ring-primary-400 ring-offset-2' : ''}`}>
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedInput === 'confirmPassword' ? 'text-primary-500' : 'text-gray-400'}`} />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedInput('confirmPassword')}
                  onBlur={() => setFocusedInput('')}
                  required={!isLogin}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl outline-none focus:border-primary-400 transition-all duration-300 bg-gray-50/50 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 disabled:opacity-60 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-200 active:scale-[0.98]"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                {isLogin ? 'Sign In' : 'Create Account'}
                <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            )}
          </button>

          {/* Footer text */}
          <p className="text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary-600 font-semibold hover:text-primary-700 hover:underline underline-offset-4 transition-all"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </form>

        {/* Additional info */}
        <p className="text-center text-xs text-gray-400 mt-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
