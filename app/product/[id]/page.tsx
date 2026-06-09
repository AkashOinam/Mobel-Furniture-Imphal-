import { products } from "../../data/products";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found | Möbel Furniture Imphal",
    };
  }

  return {
    title: `${product.name} | Möbel Furniture Imphal`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Möbel Furniture Imphal`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Get up to 4 related products (same category or same section, excluding current product)
  const relatedProducts = products
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

// Generate static paths for Next.js to pre-render the pages at build time
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}
