"use client"

import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    ingredients: string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-nude-secondary rounded-lg shadow-sm border border-nude-accent hover:shadow-md transition-all duration-300 overflow-hidden group">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-nude-text mb-2 group-hover:text-nude-accent transition-colors">
            {product.name}
          </h3>
          <p className="text-nude-muted text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex flex-wrap gap-1 mb-4">
            {product.ingredients.slice(0, 3).map((ingredient, index) => (
              <span
                key={index}
                className="text-xs bg-nude-primary text-nude-text px-2 py-1 rounded"
              >
                {ingredient}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-nude-accent">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
      <div className="px-6 pb-6">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}