import { NextResponse } from 'next/server';
import { upsertProduct, deleteProduct } from '../../../lib/db';
import { Product } from '../../../data/products';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    if (!authHeader || authHeader !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { 
      productId, 
      imageUrl, 
      galleryUrls,
      name, 
      description, 
      material,
      dimensions,
      warranty,
      assembly,
      category,
      section,
      price,
      isHouseManufactured,
      features
    } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
    }

    const defaultImg = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80";
    const finalImg = imageUrl || defaultImg;
    const finalGallery = galleryUrls && galleryUrls.length > 0 ? galleryUrls : [finalImg];

    const productToSave: Product = {
      id: productId,
      name: name || 'New Product',
      category: category || 'Bed',
      price: Number(price) || 0,
      description: description || '',
      image: finalImg,
      images: finalGallery,
      section: section || 'home',
      isHouseManufactured: Boolean(isHouseManufactured),
      features: Array.isArray(features) ? features : [],
      specifications: {
        material: material || '',
        dimensions: dimensions || '',
        warranty: warranty || '',
        assembly: assembly || ''
      },
      rating: 5.0,
      reviewsCount: 0
    };

    await upsertProduct(productToSave);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    if (!authHeader || authHeader !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
    }

    await deleteProduct(productId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 });
  }
}
