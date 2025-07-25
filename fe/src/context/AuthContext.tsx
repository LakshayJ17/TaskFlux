"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  created_at: string;
  is_active: boolean;
  is_premium: boolean;
  google_picture?: string;
  google_id?: string;
  auth_provider: string;
  manual_workflow_count: number;
  ai_workflow_count: number;
  total_integrations: number;
  active_workflow_count: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetchUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  const fetchUser = async (force = false) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setUser(null);
      setLoading(false);
      setInitialized(true);
      return;
    }

    if (initialized && !force) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('http://127.0.0.1:8000/api/v1/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUser(response.data);
      setInitialized(true);
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.response?.data?.detail || 'Authentication failed');
      setUser(null);
      localStorage.removeItem('token');
      setInitialized(true);
    } finally {
      setLoading(false);
    }
  };

  const refetchUser = async () => {
    await fetchUser(true); 
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setInitialized(false);
    setError(null);
    router.push('/');
  };

  useEffect(() => {
    fetchUser();
  }, []); 

  return (
    <AuthContext.Provider value={{ user, loading, error, refetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}