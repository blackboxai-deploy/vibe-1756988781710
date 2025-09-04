"use client"

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';

export default function Cart() {
  const { state: cartState, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-nude-text mb-8">
        Your Cart
      </h1>

      {cartState.items.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold text-nude-text mb-4">
            Your cart is empty
          </h2>
          <p className="text-nude-muted mb-8">
            Add some delicious coffee drinks to get started
          </p>
          <Link href="/products" className="bg-nude-accent text-nude-secondary px-8 py-3 font-semibold hover:bg-nude-text transition-colors">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cartState.items.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-nude-secondary p-6 rounded-lg shadow-sm border border-nude-accent">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-nude-text">
                Total ({cartState.itemCount} {cartState.itemCount === 1 ? 'item' : 'items'})
              </span>
              <span className="text-2xl font-bold text-nude-accent">
                ${cartState.total.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="flex-1 text-center border border-nude-accent text-nude-accent py-3 px-8 font-semibold hover:bg-nude-accent hover:text-nude-secondary transition-colors">
                Continue Shopping
              </Link>
              <Link href="/checkout" className="flex-1 text-center bg-nude-accent text-nude-secondary py-3 px-8 font-semibold hover:bg-nude-text transition-colors">
                Proceed to Checkout
              </Link>
            </div>

            <button
              onClick={clearCart}
              className="w-full mt-4 text-nude-muted hover:text-nude-accent transition-colors text-sm underline"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}