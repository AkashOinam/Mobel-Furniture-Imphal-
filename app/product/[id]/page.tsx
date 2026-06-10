import { getProducts, getProductById } from "../../lib/db";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  
  if (!product) {
    return {
      title: "Product Not Found | Stupendous Interior",
    };
  }

  return {
    title: `${product.name} | Stupendous Interior`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Stupendous Interior`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // Get related products from DB
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter(
      (p) =>
        (p.category === product.category || p.section === product.section) &&
        p.id !== product.id
    )
    .slice(0, 4);

  return (
    <ProductDetailClient 
      product={product} 
      relatedProducts={relatedProducts} 
    />
  );
}

export const dynamic = 'force-dynamic';
