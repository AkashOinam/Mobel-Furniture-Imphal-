import { NextResponse } from 'next/server';

export async function GET() {
  const clean = (val?: string) => val?.trim().replace(/^["']|["']$/g, '') || '';

  return NextResponse.json({
    hasCloudName: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    cloudNameLen: (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '').length,
    cloudNameCleanedLen: clean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME).length,
    
    hasApiKey: !!process.env.CLOUDINARY_API_KEY,
    apiKeyLen: (process.env.CLOUDINARY_API_KEY || '').length,
    apiKeyCleanedLen: clean(process.env.CLOUDINARY_API_KEY).length,

    hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
    apiSecretLen: (process.env.CLOUDINARY_API_SECRET || '').length,
    apiSecretCleanedLen: clean(process.env.CLOUDINARY_API_SECRET).length,

    postgresUrl: !!process.env.POSTGRES_URL,
    postgresNonPooling: !!process.env.POSTGRES_URL_NON_POOLING,
  });
}
export const dynamic = 'force-dynamic';
