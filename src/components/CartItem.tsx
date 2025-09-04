"use client"

import Image from 'next/image';
import Link from 'next/link';

interface CartItemProps {
  item: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  };
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      onUpdateQuantity(item.productId, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-nude-secondary rounded-lg shadow-sm">
      <Link href={`/products/${item.productId}`}>
        <div className="w-16 h-16 rounded-md overflow-hidden bg-nude-primary">
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.productId}`}>
          <h4 className="text-lg font-semibold text-nude-text hover:text-nude-accent transition-colors truncate">
            {item.name}
          </h4>
        </Link>
        <p className="text-nude-accent font-bold">
          ${item.price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(-1)}
          className="w-8 h-8 bg-nude-accent text-nude-secondary hover:bg-nude-text transition-colors flex items-center justify-center"
        >
          -
        </button>
        <span className="w-8 text-center font-medium text-nude-text">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(1)}
          className="w-8 h-8 bg-nude-accent text-nude-secondary hover:bg-nude-text transition-colors flex items-center justify-center"
        >
          +
        </button>
      </div>

      <div className="text-right mr-4">
        <p className="text-xl font-bold text-nude-accent">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => onRemove(item.productId)}
        className="text-nude-muted hover:text-nude-accent transition-colors"
      >
        ✕
      </button>
    </div>
  );
}