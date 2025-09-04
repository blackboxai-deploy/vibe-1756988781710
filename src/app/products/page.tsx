"use client"

import Layout from '@/components/Layout';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/data/products';

export default function ProductsPage() {
  return (
    <Layout>
      <ProductGrid products={products} />
    </Layout>
  );
}