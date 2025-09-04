"use client"

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-nude-primary">
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
}