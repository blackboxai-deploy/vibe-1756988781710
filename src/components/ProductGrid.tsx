"use client"

import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    ingredients: string[];
  }>;
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nude-text mb-4">
            Our Coffee Collection
          </h2>
          <p className="text-nude-muted text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of premium coffee drinks, each made with the finest ingredients and a passion for perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-nude-muted text-lg">
              No coffee drinks available at the moment. Please check back later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}