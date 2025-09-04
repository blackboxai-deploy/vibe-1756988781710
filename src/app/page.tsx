"use client"

import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/data/products';

export default function Home() {
  const featuredProducts = products.slice(0, 4); // Show first 4 products

  return (
    <Layout>
      <Hero />
      <ProductGrid products={featuredProducts} />
    </Layout>
  );
}