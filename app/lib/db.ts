import { createClient } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
import { Product, products as fallbackProducts } from '../data/products';

const isDbMode = () => !!(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING);

// Helper to run query with a temporary client connection (compatible with pooled & direct connection strings)
async function runQuery<T>(callback: (client: any) => Promise<T>): Promise<T> {
  let connectionString = process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;
  if (connectionString) {
    connectionString = connectionString.trim().replace(/^["']|["']$/g, '');
  }
  const client = createClient({ connectionString });
  await client.connect();
  try {
    return await callback(client);
  } finally {
    try {
      await client.end();
    } catch (err) {
      console.error('Failed to close client:', err);
    }
  }
}

// Helper to write changes to local products.ts for local development fallback
function writeLocalProductsFile(productsList: Product[]) {
  const filePath = path.join(process.cwd(), 'app', 'data', 'products.ts');
  const cleanPath = path.resolve(filePath);
  const fileContent = `export interface Product {
  id: string;
  name: string;
  category: 'Bed' | 'Sofa' | 'Wardrobe' | 'Showcase' | 'Center Table' | 'Dresser' | 'Dining Table' | 'Mattress' | 'Office Chair' | 'Drawer' | 'Table';
  price: number;
  description: string;
  image: string;
  images?: string[];
  section: 'home' | 'office';
  isHouseManufactured: boolean;
  features: string[];
  specifications: {
    material: string;
    dimensions: string;
    warranty: string;
    assembly: string;
  };
  rating: number;
  reviewsCount: number;
}

export const products: Product[] = ${JSON.stringify(productsList, null, 2)};
`;
  fs.writeFileSync(cleanPath, fileContent, 'utf8');
}

// Map database row to Frontend Product Interface
function mapRowToProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    description: row.description || '',
    image: row.image || '',
    images: typeof row.images === 'string' ? JSON.parse(row.images) : (row.images || []),
    section: row.section || 'home',
    isHouseManufactured: !!row.is_house_manufactured,
    features: typeof row.features === 'string' ? JSON.parse(row.features) : (row.features || []),
    specifications: typeof row.specifications === 'string' ? JSON.parse(row.specifications) : (row.specifications || {
      material: '',
      dimensions: '',
      warranty: '',
      assembly: ''
    }),
    rating: Number(row.rating || 5.0),
    reviewsCount: Number(row.reviews_count || 0)
  };
}

// Initialize database table
export async function initDatabase() {
  if (!isDbMode()) return;
  
  try {
    await runQuery(async (client) => {
      await client.sql`
        CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          category VARCHAR(255) NOT NULL,
          price NUMERIC NOT NULL DEFAULT 0,
          description TEXT,
          image TEXT,
          images JSONB,
          section VARCHAR(255),
          is_house_manufactured BOOLEAN,
          features JSONB,
          specifications JSONB,
          rating NUMERIC DEFAULT 5.0,
          reviews_count INT DEFAULT 0
        );
      `;
    });
  } catch (error) {
    console.error('Failed to initialize database table:', error);
  }
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  if (!isDbMode()) {
    return fallbackProducts;
  }

  try {
    await initDatabase();
    return await runQuery(async (client) => {
      const { rows } = await client.sql`SELECT * FROM products ORDER BY name ASC;`;
      return rows.map(mapRowToProduct);
    });
  } catch (error) {
    console.error('Error fetching products from DB, falling back to local:', error);
    return fallbackProducts;
  }
}

// Fetch a single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  if (!isDbMode()) {
    return fallbackProducts.find(p => p.id === id) || null;
  }

  try {
    await initDatabase();
    return await runQuery(async (client) => {
      const { rows } = await client.sql`SELECT * FROM products WHERE id = ${id};`;
      if (rows.length === 0) return null;
      return mapRowToProduct(rows[0]);
    });
  } catch (error) {
    console.error(`Error fetching product ${id} from DB:`, error);
    return fallbackProducts.find(p => p.id === id) || null;
  }
}

// Save or Update a product
export async function upsertProduct(product: Product) {
  if (!isDbMode()) {
    const list = [...fallbackProducts];
    const index = list.findIndex(p => p.id === product.id);
    if (index !== -1) {
      list[index] = product;
    } else {
      list.push(product);
    }
    writeLocalProductsFile(list);
    return;
  }

  try {
    await initDatabase();
    const imagesJson = JSON.stringify(product.images || []);
    const featuresJson = JSON.stringify(product.features || []);
    const specsJson = JSON.stringify(product.specifications);

    await runQuery(async (client) => {
      await client.sql`
        INSERT INTO products (
          id, name, category, price, description, image, images, section, is_house_manufactured, features, specifications, rating, reviews_count
        ) VALUES (
          ${product.id}, 
          ${product.name}, 
          ${product.category}, 
          ${product.price}, 
          ${product.description}, 
          ${product.image}, 
          ${imagesJson}, 
          ${product.section}, 
          ${product.isHouseManufactured}, 
          ${featuresJson}, 
          ${specsJson}, 
          ${product.rating}, 
          ${product.reviewsCount}
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          category = EXCLUDED.category,
          price = EXCLUDED.price,
          description = EXCLUDED.description,
          image = EXCLUDED.image,
          images = EXCLUDED.images,
          section = EXCLUDED.section,
          is_house_manufactured = EXCLUDED.is_house_manufactured,
          features = EXCLUDED.features,
          specifications = EXCLUDED.specifications;
      `;
    });
  } catch (error) {
    console.error(`Error saving product ${product.id} to DB:`, error);
    throw error;
  }
}

// Delete a product
export async function deleteProduct(id: string) {
  if (!isDbMode()) {
    const list = fallbackProducts.filter(p => p.id !== id);
    writeLocalProductsFile(list);
    return;
  }

  try {
    await initDatabase();
    await runQuery(async (client) => {
      await client.sql`DELETE FROM products WHERE id = ${id};`;
    });
  } catch (error) {
    console.error(`Error deleting product ${id} from DB:`, error);
    throw error;
  }
}
