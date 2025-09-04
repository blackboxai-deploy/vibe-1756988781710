"use client"

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });

    // Simulate brief loading state
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="w-full bg-nude-accent text-nude-secondary py-3 px-6 font-semibold transition-colors hover:bg-nude-text disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}