"use client"

import { use } from 'react';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import AddToCartButton from '@/components/AddToCartButton';
import { products } from '@/data/products';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-nude-primary rounded-lg overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-nude-text mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-nude-accent font-bold mb-6">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-nude-muted text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-semibold text-nude-text mb-3">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-nude-accent text-nude-secondary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="pt-6">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}