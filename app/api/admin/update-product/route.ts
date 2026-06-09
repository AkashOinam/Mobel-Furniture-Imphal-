import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const {
      productId,
      imageUrl,
      galleryUrls, // List of final gallery URLs
      name,
      description,
      material,
      dimensions,
      warranty,
      assembly,
      isNewProduct,
      category,
      section,
      price,
      isHouseManufactured,
      features
    } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'app', 'data', 'products.ts');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Products file not found' }, { status: 500 });
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Handle New Product Creation
    if (isNewProduct) {
      const duplicatePattern = new RegExp(`id:\\s*["']${productId}["']`);
      if (duplicatePattern.test(content)) {
        return NextResponse.json({ error: `Product ID "${productId}" already exists. Please choose a unique ID.` }, { status: 400 });
      }

      const lastBracketIdx = content.lastIndexOf('];');
      if (lastBracketIdx === -1) {
        return NextResponse.json({ error: 'Could not locate the end of products array' }, { status: 500 });
      }

      const defaultImg = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80";
      const finalImg = imageUrl || defaultImg;
      const finalGallery = galleryUrls && galleryUrls.length > 0 ? galleryUrls : [finalImg];

      const newProductBlock = `  {\n    id: "${productId}",\n    name: "${name || 'New Product'}",\n    category: "${category || 'Bed'}",\n    price: ${Number(price) || 0},\n    description: "${description || ''}",\n    image: "${finalImg}",\n    images: ${JSON.stringify(finalGallery, null, 6).replace(/\n/g, '\n    ')},\n    section: "${section || 'home'}",\n    isHouseManufactured: ${Boolean(isHouseManufactured)},\n    features: [],\n    specifications: {\n      material: "${material || ''}",\n      dimensions: "${dimensions || ''}",\n      warranty: "${warranty || ''}",\n      assembly: "${assembly || ''}"\n    },\n    rating: 5.0,\n    reviewsCount: 0\n  },\n`;

      content = content.slice(0, lastBracketIdx) + newProductBlock + content.slice(lastBracketIdx);
      fs.writeFileSync(filePath, content, 'utf8');
      return NextResponse.json({ success: true });
    }

    // 2. Handle Existing Product Editing
    const idPattern = new RegExp(`id:\\s*["']${productId}["']`);
    const idMatch = content.match(idPattern);

    if (!idMatch || idMatch.index === undefined) {
      return NextResponse.json({ error: `Product with ID "${productId}" not found in data file.` }, { status: 404 });
    }

    const startIdx = idMatch.index;
    const nextProductIdx = content.slice(startIdx + 1).search(/id:\s*["']/);
    const limitIdx = nextProductIdx !== -1 ? startIdx + 1 + nextProductIdx : content.length;

    const getFreshLimitIdx = (currentContent: string, start: number) => {
      const nextIdx = currentContent.slice(start + 1).search(/id:\s*["']/);
      return nextIdx !== -1 ? start + 1 + nextIdx : currentContent.length;
    };

    // Helper to update a string field
    const updateStringProperty = (key: string, newValue: string, currentContent: string, searchStart: number, searchLimit: number) => {
      const keywordIdx = currentContent.indexOf(`${key}:`, searchStart);
      if (keywordIdx === -1 || keywordIdx > searchLimit) {
        return currentContent;
      }

      const sliceAfterKeyword = currentContent.slice(keywordIdx);
      const quoteCharMatch = sliceAfterKeyword.match(/["']/);
      if (!quoteCharMatch || quoteCharMatch.index === undefined) {
        return currentContent;
      }

      const quoteChar = quoteCharMatch[0];
      const startQuoteIdx = keywordIdx + quoteCharMatch.index;
      const endQuoteIdx = currentContent.indexOf(quoteChar, startQuoteIdx + 1);

      if (endQuoteIdx === -1 || endQuoteIdx > searchLimit) {
        return currentContent;
      }

      return currentContent.slice(0, startQuoteIdx + 1) + newValue + currentContent.slice(endQuoteIdx);
    };

    // Update Text Fields
    if (name !== undefined) {
      content = updateStringProperty('name', name, content, startIdx, getFreshLimitIdx(content, startIdx));
    }
    if (description !== undefined) {
      content = updateStringProperty('description', description, content, startIdx, getFreshLimitIdx(content, startIdx));
    }
    if (category !== undefined) {
      content = updateStringProperty('category', category, content, startIdx, getFreshLimitIdx(content, startIdx));
    }
    if (section !== undefined) {
      content = updateStringProperty('section', section, content, startIdx, getFreshLimitIdx(content, startIdx));
    }

    // Update Boolean for isHouseManufactured
    const updateBooleanProperty = (key: string, newValue: boolean, currentContent: string, searchStart: number, searchLimit: number) => {
      const keywordIdx = currentContent.indexOf(`${key}:`, searchStart);
      if (keywordIdx === -1 || keywordIdx > searchLimit) {
        return currentContent;
      }
      const sliceAfterKeyword = currentContent.slice(keywordIdx);
      const match = sliceAfterKeyword.match(/(true|false)/);
      if (!match || match.index === undefined) {
        return currentContent;
      }
      const startValueIdx = keywordIdx + match.index;
      const endValueIdx = startValueIdx + match[0].length;
      return currentContent.slice(0, startValueIdx) + String(newValue) + currentContent.slice(endValueIdx);
    };

    if (isHouseManufactured !== undefined) {
      content = updateBooleanProperty('isHouseManufactured', isHouseManufactured, content, startIdx, getFreshLimitIdx(content, startIdx));
    }

    // Update Features Array
    if (features !== undefined && Array.isArray(features)) {
      const featuresKeywordIdx = content.indexOf('features:', startIdx);
      const limit = getFreshLimitIdx(content, startIdx);
      if (featuresKeywordIdx !== -1 && featuresKeywordIdx < limit) {
        const openingBracketIdx = content.indexOf('[', featuresKeywordIdx);
        const closingBracketIdx = content.indexOf(']', openingBracketIdx);
        if (openingBracketIdx !== -1 && closingBracketIdx !== -1 && closingBracketIdx < limit) {
          const newArrayStr = `[\n      ${features.map((f: string) => `"${f.trim()}"`).join(',\n      ')}\n    ]`;
          content = content.slice(0, openingBracketIdx) + newArrayStr + content.slice(closingBracketIdx + 1);
        }
      } else {
        // Fallback: Inject features right after main image field
        const mainImageIdx = content.indexOf('image:', startIdx);
        if (mainImageIdx !== -1 && mainImageIdx < limit) {
          const endOfLineIdx = content.indexOf('\n', mainImageIdx);
          const injectStr = `,\n    features: [\n      ${features.map((f: string) => `"${f.trim()}"`).join(',\n      ')}\n    ]`;
          content = content.slice(0, endOfLineIdx) + injectStr + content.slice(endOfLineIdx);
        }
      }
    }

    // Update Specifications
    const specsKeywordIdx = content.indexOf('specifications:', startIdx);
    if (specsKeywordIdx !== -1 && specsKeywordIdx < getFreshLimitIdx(content, startIdx)) {
      const getSpecsBounds = (c: string) => {
        const start = c.indexOf('{', specsKeywordIdx);
        const end = c.indexOf('}', start);
        return { start, end };
      };

      if (material !== undefined) {
        const bounds = getSpecsBounds(content);
        if (bounds.start !== -1 && bounds.end !== -1) {
          content = updateStringProperty('material', material, content, bounds.start, bounds.end);
        }
      }
      if (dimensions !== undefined) {
        const bounds = getSpecsBounds(content);
        if (bounds.start !== -1 && bounds.end !== -1) {
          content = updateStringProperty('dimensions', dimensions, content, bounds.start, bounds.end);
        }
      }
      if (warranty !== undefined) {
        const bounds = getSpecsBounds(content);
        if (bounds.start !== -1 && bounds.end !== -1) {
          content = updateStringProperty('warranty', warranty, content, bounds.start, bounds.end);
        }
      }
      if (assembly !== undefined) {
        const bounds = getSpecsBounds(content);
        if (bounds.start !== -1 && bounds.end !== -1) {
          content = updateStringProperty('assembly', assembly, content, bounds.start, bounds.end);
        }
      }
    }

    // Update Main Image
    if (imageUrl) {
      content = updateStringProperty('image', imageUrl, content, startIdx, getFreshLimitIdx(content, startIdx));
    }

    // Update Gallery Array
    if (galleryUrls !== undefined && Array.isArray(galleryUrls)) {
      const imagesKeywordIdx = content.indexOf('images:', startIdx);
      if (imagesKeywordIdx !== -1 && imagesKeywordIdx < limitIdx) {
        const openingBracketIdx = content.indexOf('[', imagesKeywordIdx);
        const closingBracketIdx = content.indexOf(']', openingBracketIdx);

        if (openingBracketIdx !== -1 && closingBracketIdx !== -1 && closingBracketIdx < limitIdx) {
          const newArrayStr = `[\n      ${galleryUrls.map((u: string) => `"${u}"`).join(',\n      ')}\n    ]`;
          content = content.slice(0, openingBracketIdx) + newArrayStr + content.slice(closingBracketIdx + 1);
        }
      } else {
        // Fallback: Inject images right after main image field
        const mainImageIdx = content.indexOf('image:', startIdx);
        if (mainImageIdx !== -1 && mainImageIdx < limitIdx) {
          const endOfLineIdx = content.indexOf('\n', mainImageIdx);
          const injectStr = `,\n    images: [\n      ${galleryUrls.map((u: string) => `"${u}"`).join(',\n      ')}\n    ]`;
          content = content.slice(0, endOfLineIdx) + injectStr + content.slice(endOfLineIdx);
        }
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update product file' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'app', 'data', 'products.ts');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Products file not found' }, { status: 500 });
    }

    let content = fs.readFileSync(filePath, 'utf8');

    const idPattern = new RegExp(`id:\\s*["']${productId}["']`);
    const idMatch = content.match(idPattern);

    if (!idMatch || idMatch.index === undefined) {
      return NextResponse.json({ error: `Product with ID "${productId}" not found.` }, { status: 404 });
    }

    const startIdx = idMatch.index;
    const sliceBefore = content.slice(0, startIdx);
    const blockStart = sliceBefore.lastIndexOf('{');
    if (blockStart === -1) {
      return NextResponse.json({ error: 'Could not find product block start' }, { status: 500 });
    }

    const nextProductIdx = content.slice(startIdx + 1).search(/id:\s*["']/);
    let blockEnd = -1;

    if (nextProductIdx !== -1) {
      const nextProductStartAbsolute = startIdx + 1 + nextProductIdx;
      const braceBeforeNext = content.slice(0, nextProductStartAbsolute).lastIndexOf('{');
      blockEnd = braceBeforeNext;
    } else {
      blockEnd = content.lastIndexOf('];');
    }

    if (blockEnd === -1) {
      return NextResponse.json({ error: 'Could not find product block end' }, { status: 500 });
    }

    let newContent = content.slice(0, blockStart) + content.slice(blockEnd);
    newContent = newContent.replace(/,\s*,\s*/g, ',\n');
    newContent = newContent.replace(/,\s*\];/g, '\n];');

    fs.writeFileSync(filePath, newContent, 'utf8');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 });
  }
}
