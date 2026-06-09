import { NextResponse } from 'next/server';
import { getProducts } from '../../lib/db';

export async function GET() {
  try {
    const data = await getProducts();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch products' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
