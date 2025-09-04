"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  address?: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  phone?: string;
  preferences?: {
    favoriteDrinks: string[];
    sizePreference: 'small' | 'medium' | 'large';
  };
}

interface Order {
  id: string;
  date: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'completed' | 'pending';
}

interface AuthState {
  user: User | null;
  orders: Order[];
  isLoggedIn: boolean;
}

// Context
const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
} | null>(null);

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    orders: [],
    isLoggedIn: false,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedOrders = localStorage.getItem('orders');

    if (savedUser) {
      const user = JSON.parse(savedUser);
      const orders = savedOrders ? JSON.parse(savedOrders) : [];
      setState({
        user,
        orders,
        isLoggedIn: true,
      });
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
    localStorage.setItem('orders', JSON.stringify(state.orders));
  }, [state.user, state.orders]);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock valid credentials
    if (email === 'demo@example.com' && password === 'password') {
      const user: User = {
        id: 'user1',
        email: 'demo@example.com',
        name: 'Demo User',
        address: {
          street: '123 Coffee St',
          city: 'Coffeeville',
          zip: '12345',
          country: 'USA',
        },
        preferences: {
          favoriteDrinks: ['latte', 'cappuccino'],
          sizePreference: 'medium',
        },
      };

      const orders: Order[] = [
        {
          id: 'order1',
          date: '2024-01-15',
          items: [
            { productId: 'latte', name: 'Classic Latte', quantity: 2, price: 4.50 },
            { productId: 'cappuccino', name: 'Perfect Cappuccino', quantity: 1, price: 4.75 },
          ],
          total: 13.75,
          status: 'completed',
        },
      ];

      setState({
        user,
        orders,
        isLoggedIn: true,
      });

      return true;
    }

    return false;
  };

  // Mock signup function
  const signup = async (name: string, email: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      return false;
    }

    const user: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      preferences: {
        favoriteDrinks: [],
        sizePreference: 'medium',
      },
    };

    setState({
      user,
      orders: [],
      isLoggedIn: true,
    });

    return true;
  };

  // Logout function
  const logout = () => {
    setState({
      user: null,
      orders: [],
      isLoggedIn: false,
    });
  };

  // Update profile function
  const updateProfile = (updates: Partial<User>) => {
    if (state.user) {
      setState(prev => ({
        ...prev,
        user: { ...prev.user!, ...updates },
      }));
    }
  };

  // Add order function
  const addOrder = (newOrder: Omit<Order, 'id' | 'date'>) => {
    const order: Order = {
      ...newOrder,
      id: `order_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };

    setState(prev => ({
      ...prev,
      orders: [...prev.orders, order],
    }));
  };

  return (
    <AuthContext.Provider value={{ state, login, signup, logout, updateProfile, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};