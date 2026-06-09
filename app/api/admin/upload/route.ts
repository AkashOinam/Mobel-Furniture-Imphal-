import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
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

    // Upload to Cloudinary using a stream
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: targetFolder,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as { secure_url: string });
          }
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
