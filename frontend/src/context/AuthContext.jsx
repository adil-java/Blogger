import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/api';
import { signInWithGoogle, firebaseSignOut } from '../config/firebase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('writerToken');
    const savedUser = localStorage.getItem('writerUser');
    if (token) {
      setIsAuthenticated(true);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error('Failed to parse saved user');
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.success && response.token) {
        localStorage.setItem('writerToken', response.token);
        if (response.user) {
          localStorage.setItem('writerUser', JSON.stringify(response.user));
          setUser(response.user);
        }
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await authAPI.signup(name, email, password);
      if (response.success && response.token) {
        localStorage.setItem('writerToken', response.token);
        if (response.user) {
          localStorage.setItem('writerUser', JSON.stringify(response.user));
          setUser(response.user);
        }
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: response.message || 'Signup failed' };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Signup failed' };
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Sign in with Firebase
      const firebaseResult = await signInWithGoogle();
      if (!firebaseResult.success) {
        return { success: false, message: firebaseResult.message || 'Google sign-in failed' };
      }

      // Send to backend
      const { googleId, email, name, avatar } = firebaseResult.user;
      const response = await authAPI.googleAuth(googleId, email, name, avatar);
      
      if (response.success && response.token) {
        localStorage.setItem('writerToken', response.token);
        if (response.user) {
          localStorage.setItem('writerUser', JSON.stringify(response.user));
          setUser(response.user);
        }
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: response.message || 'Google authentication failed' };
    } catch (error) {
      console.error('Google login error:', error);
      return { success: false, message: error.response?.data?.message || 'Google sign-in failed' };
    }
  };

  const logout = async () => {
    await firebaseSignOut();
    localStorage.removeItem('writerToken');
    localStorage.removeItem('writerUser');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
