"use client"

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { state: cartState } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-nude-secondary border-b border-nude-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-nude-text hover:text-nude-accent transition-colors">
            COFFEE
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-nude-text hover:text-nude-accent transition-colors font-medium">
              Home
            </Link>
            <Link href="/products" className="text-nude-text hover:text-nude-accent transition-colors font-medium">
              Products
            </Link>
            <Link href="/account" className="text-nude-text hover:text-nude-accent transition-colors font-medium">
              Account
            </Link>
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative flex items-center justify-center w-10 h-10 bg-nude-accent rounded-full hover:bg-nude-text transition-colors group">
            <span className="text-xl">🛒</span>
            {cartState.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-nude-text text-nude-secondary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartState.itemCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu (Hidden for now) */}
        <div className="md:hidden py-2 border-t border-nude-muted">
          <div className="flex space-x-4">
            <Link href="/" className="text-nude-text hover:text-nude-accent transition-colors text-sm font-medium">
              Home
            </Link>
            <Link href="/products" className="text-nude-text hover:text-nude-accent transition-colors text-sm font-medium">
              Products
            </Link>
            <Link href="/account" className="text-nude-text hover:text-nude-accent transition-colors text-sm font-medium">
              Account
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}