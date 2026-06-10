import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

const clean = (val?: string) => val?.trim().replace(/^["']|["']$/g, '') || '';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    if (!authHeader || authHeader !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cloudName = clean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    const apiKey = clean(process.env.CLOUDINARY_API_KEY);
    const apiSecret = clean(process.env.CLOUDINARY_API_SECRET);

    // Check if Cloudinary credentials are set
    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ 
        error: 'Cloudinary environment variables are missing on Vercel. Please add them in Vercel settings and Redeploy.' 
      }, { status: 500 });
    }

    // Configure Cloudinary dynamically inside the handler
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const productId = formData.get('productId') as string;
    const section = formData.get('section') as string || 'home';
    const category = formData.get('category') as string || 'General';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Format section and category to clean folder names (e.g. 'home-furniture' and 'bed')
    const sectionFolder = section === 'home' ? 'home-furniture' : 'office-furniture';
    const categoryFolder = category.toLowerCase().replace(/\s+/g, '-');

    // Create nested path: mobel-furniture-products/home-furniture/bed/bed-royal-teak
    const targetFolder = productId 
      ? `mobel-furniture-products/${sectionFolder}/${categoryFolder}/${productId}`
      : `mobel-furniture-products/${sectionFolder}/${categoryFolder}`;

    // Convert buffer to base64 data URL
    const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary using base64
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: targetFolder,
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
