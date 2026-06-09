'use client';

import React, { useState, useEffect } from 'react';
import { products as initialProducts, Product } from '@/app/data/products';
import { Upload, ArrowLeft, Image as ImageIcon, Sparkles, CheckCircle, AlertCircle, Eye, Save, Settings, PlusCircle, Trash2, Filter, X, Plus } from 'lucide-react';
import Link from 'next/link';

const HOME_CATEGORIES = [
  'Bed', 'Sofa', 'Wardrobe', 'Showcase', 'Center Table', 'Dresser',
  'Dining Table', 'Mattress', 'Table'
];

const OFFICE_CATEGORIES = [
  'Office Chair', 'Drawer', 'Table'
];

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState<string>(initialProducts[0]?.id || 'new');

  // Section filter for the product selector list
  const [spaceFilter, setSpaceFilter] = useState<'all' | 'home' | 'office'>('all');

  // Is this a new product creation flow
  const isNewProduct = selectedProductId === 'new';

  // Editable fields states
  const [newId, setNewId] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('Bed');
  const [section, setSection] = useState<'home' | 'office'>('home');
  const [isHouseManufactured, setIsHouseManufactured] = useState<boolean>(false);

  // Specifications
  const [featuresInput, setFeaturesInput] = useState<string>('');

  // Specifications
  const [material, setMaterial] = useState<string>('');
  const [dimensions, setDimensions] = useState<string>('');
  const [warranty, setWarranty] = useState<string>('');
  const [assembly, setAssembly] = useState<string>('');

  // Image upload states
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string>('');

  const [galleryFiles, setGalleryFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(['', '', '', '']);

  const [saving, setSaving] = useState<boolean>(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  // Custom delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  // Filter products list based on active spaceFilter
  const filteredProducts = products.filter(p => {
    if (spaceFilter === 'all') return true;
    return p.section === spaceFilter;
  });

  // Sync inputs when selected product changes
  useEffect(() => {
    if (isNewProduct) {
      // Reset text fields
      setNewId('');
      setProductName('');
      setProductDescription('');
      setCategory(section === 'home' ? 'Bed' : 'Office Chair');
      setIsHouseManufactured(false);
      setMaterial('');
      setDimensions('');
      setWarranty('');
      setAssembly('');
      setFeaturesInput('');

      // Reset image previews
      setMainFile(null);
      setMainPreview('');
      setGalleryFiles([null, null, null, null]);
      setGalleryPreviews(['', '', '', '']);
    } else if (selectedProduct) {
      setProductName(selectedProduct.name);
      setProductDescription(selectedProduct.description);
      setCategory(selectedProduct.category);
      setSection(selectedProduct.section);
      setIsHouseManufactured(selectedProduct.isHouseManufactured);
      setMaterial(selectedProduct.specifications?.material || '');
      setDimensions(selectedProduct.specifications?.dimensions || '');
      setWarranty(selectedProduct.specifications?.warranty || '');
      setAssembly(selectedProduct.specifications?.assembly || '');
      setFeaturesInput(selectedProduct.features?.join('\n') || '');

      // Load current product images
      setMainFile(null);
      setMainPreview(selectedProduct.image || '');

      const imgs = selectedProduct.images || [];
      setGalleryFiles([null, null, null, null]);
      setGalleryPreviews([imgs[0] || '', imgs[1] || '', imgs[2] || '', imgs[3] || '']);
    }
  }, [selectedProductId, products]);

  // Sync category dropdown default when section toggle changes in new product creation
  useEffect(() => {
    if (isNewProduct) {
      setCategory(section === 'home' ? 'Bed' : 'Office Chair');
    }
  }, [section, isNewProduct]);

  // Auto-generate ID from Name for convenience
  useEffect(() => {
    if (isNewProduct && productName) {
      const generatedId = productName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setNewId(generatedId);
    }
  }, [productName, isNewProduct]);

  const handleMainFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setMainFile(selectedFile);
      setMainPreview(URL.createObjectURL(selectedFile));
      setStatus({ type: null, message: '' });
    }
  };

  const handleGalleryFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      const newFiles = [...galleryFiles];
      newFiles[index] = selectedFile;
      setGalleryFiles(newFiles);

      const newPreviews = [...galleryPreviews];
      newPreviews[index] = URL.createObjectURL(selectedFile);
      setGalleryPreviews(newPreviews);

      setStatus({ type: null, message: '' });
    }
  };

  const clearGallerySlot = (index: number) => {
    const newFiles = [...galleryFiles];
    newFiles[index] = null;
    setGalleryFiles(newFiles);

    const newPreviews = [...galleryPreviews];
    newPreviews[index] = '';
    setGalleryPreviews(newPreviews);
  };

  const handleSave = async () => {
    if (isNewProduct) {
      if (!newId || !productName) {
        setStatus({ type: 'error', message: 'Product ID and Name are required.' });
        return;
      }
    } else {
      if (!selectedProductId) return;
    }

    setSaving(true);
    setStatus({ type: null, message: '' });

    try {
      const activeId = isNewProduct ? newId : selectedProductId;
      const activeSection = section;
      const activeCategory = category;

      let uploadedMainUrl = mainPreview;

      // 1. Upload Main Image to Cloudinary if changed
      if (mainFile) {
        const formData = new FormData();
        formData.append('file', mainFile);
        formData.append('productId', activeId);
        formData.append('section', activeSection);
        formData.append('category', activeCategory);

        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          throw new Error(err.error || 'Failed to upload main image');
        }

        const data = await uploadRes.json();
        uploadedMainUrl = data.url;
      }

      // 2. Upload changed Gallery Images
      const finalGalleryUrls: string[] = [];
      for (let i = 0; i < 4; i++) {
        if (galleryFiles[i]) {
          const formData = new FormData();
          formData.append('file', galleryFiles[i]!);
          formData.append('productId', activeId);
          formData.append('section', activeSection);
          formData.append('category', activeCategory);

          const uploadRes = await fetch('/api/admin/upload', {
            method: 'POST',
            body: formData,
          });

          if (!uploadRes.ok) {
            const err = await uploadRes.json();
            throw new Error(err.error || `Failed to upload gallery image in slot ${i + 1}`);
          }

          const data = await uploadRes.json();
          finalGalleryUrls.push(data.url);
        } else if (galleryPreviews[i]) {
          // Keep existing image URL
          finalGalleryUrls.push(galleryPreviews[i]);
        }
      }

      // 3. Save/Update product details locally
      const updateRes = await fetch('/api/admin/update-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: activeId,
          imageUrl: uploadedMainUrl || undefined,
          galleryUrls: finalGalleryUrls,
          name: productName,
          description: productDescription,
          material,
          dimensions,
          warranty,
          assembly,
          isNewProduct,
          category: category,
          section: section,
          price: 0,
          isHouseManufactured: isHouseManufactured,
          features: featuresInput.split('\n').map(f => f.trim()).filter(Boolean)
        }),
      });

      if (!updateRes.ok) {
        const err = await updateRes.json();
        throw new Error(err.error || 'Failed to save product details');
      }

      // 4. Update local state representation
      if (isNewProduct) {
        const newProductItem: Product = {
          id: activeId,
          name: productName,
          category: category as any,
          price: 0,
          description: productDescription,
          image: uploadedMainUrl || 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
          images: finalGalleryUrls.length > 0 ? finalGalleryUrls : [uploadedMainUrl],
          section: section,
          isHouseManufactured,
          features: featuresInput.split('\n').map(f => f.trim()).filter(Boolean),
          specifications: {
            material,
            dimensions,
            warranty,
            assembly
          },
          rating: 5.0,
          reviewsCount: 0
        };

        const updatedProductsList = [...products, newProductItem];
        setProducts(updatedProductsList);
        setSelectedProductId(activeId);
        setStatus({ type: 'success', message: 'New product successfully added to catalogue!' });
      } else {
        setProducts(prevProducts =>
          prevProducts.map(p => {
            if (p.id === selectedProductId) {
              return {
                ...p,
                name: productName,
                description: productDescription,
                category: category as any,
                section: section,
                isHouseManufactured,
                features: featuresInput.split('\n').map(f => f.trim()).filter(Boolean),
                image: uploadedMainUrl,
                images: finalGalleryUrls,
                specifications: {
                  ...p.specifications,
                  material,
                  dimensions,
                  warranty,
                  assembly
                }
              };
            }
            return p;
          })
        );
        setStatus({ type: 'success', message: 'Product specifications and images saved successfully!' });
      }

      setMainFile(null);
      setGalleryFiles([null, null, null, null]);
    } catch (error: any) {
      console.error(error);
      setStatus({ type: 'error', message: error.message || 'An error occurred while saving.' });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    setSaving(true);
    setStatus({ type: null, message: '' });

    try {
      const deleteRes = await fetch('/api/admin/update-product', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: selectedProductId }),
      });

      if (!deleteRes.ok) {
        const err = await deleteRes.json();
        throw new Error(err.error || 'Failed to delete product');
      }

      const updatedProducts = products.filter(p => p.id !== selectedProductId);
      setProducts(updatedProducts);

      if (updatedProducts.length > 0) {
        setSelectedProductId(updatedProducts[0].id);
      } else {
        setSelectedProductId('new');
      }

      setStatus({ type: 'success', message: 'Product successfully removed from catalogue!' });
      setMainFile(null);
      setGalleryFiles([null, null, null, null]);
    } catch (error: any) {
      console.error(error);
      setStatus({ type: 'error', message: error.message || 'An error occurred during deletion.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-red" />
              Stupendous Interior Admin Panel
            </h1>
            <p className="text-xs text-slate-500">Real Product Photo & Text Content Editor</p>
          </div>
        </div>
        <Link
          href={selectedProduct ? `/product/${selectedProduct.id}` : '/'}
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-lg text-sm font-medium transition-colors bg-white shadow-2xs hover:bg-slate-50"
        >
          <Eye className="w-4 h-4 text-slate-500" />
          View Product Page
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column - Action Form */}
        <section className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              {isNewProduct ? (
                <>
                  <PlusCircle className="w-5 h-5 text-brand-red" />
                  Add New Product
                </>
              ) : (
                'Edit Product Details'
              )}
            </h2>
          </div>

          {/* Product Filter and Selector */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                Filter list by space:
              </label>
              <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                {['all', 'home', 'office'].map((space) => (
                  <button
                    key={space}
                    type="button"
                    onClick={() => setSpaceFilter(space as any)}
                    className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer capitalize ${spaceFilter === space ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                  >
                    {space}
                  </button>
                ))}
              </div>
            </div>

            <select
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value);
                setStatus({ type: null, message: '' });
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-brand-red focus:bg-white transition-all text-sm font-medium"
            >
              <option value="new">+ Add New Product --</option>
              {filteredProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  [{p.category}] {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Catalogue Configurations */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Catalogue Configurations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {isNewProduct && (
                <div className="flex flex-col gap-1.5 col-span-1 md:col-span-3">
                  <label className="text-xs font-semibold text-slate-600">Product Slug ID</label>
                  <input
                    type="text"
                    value={newId}
                    onChange={(e) => setNewId(e.target.value)}
                    placeholder="e.g. bed-luxury-canopy"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-red focus:bg-white focus:outline-hidden font-mono w-full"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5 md:col-span-1">
                <label className="text-xs font-semibold text-slate-600">Section Space</label>
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value as any)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-red focus:bg-white focus:outline-hidden w-full"
                >
                  <option value="home">Home Spaces</option>
                  <option value="office">Office Spaces</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-red focus:bg-white focus:outline-hidden w-full"
                >
                  {(section === 'home' ? HOME_CATEGORIES : OFFICE_CATEGORIES).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer mt-2 select-none">
              <input
                type="checkbox"
                checked={isHouseManufactured}
                onChange={(e) => setIsHouseManufactured(e.target.checked)}
                className="rounded-sm border-slate-300 text-brand-red focus:ring-brand-red"
              />
              <span className="text-xs font-semibold text-slate-600">Is In-house Manufactured?</span>
            </label>
          </div>

          {/* Editable Name Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-red focus:bg-white transition-all text-sm font-medium"
            />
          </div>

          {/* Editable Description Textarea */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Product Description
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter product description"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-red focus:bg-white transition-all text-sm font-medium leading-relaxed resize-y"
            />
          </div>

          {/* Product Features Textarea */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Product Features (One per line)
            </label>
            <textarea
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              placeholder="e.g. Handcrafted in Imphal, Manipur&#10;100% seasoned solid teak wood&#10;Includes 5 years warranty"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-red focus:bg-white transition-all text-sm font-medium leading-relaxed resize-y"
            />
          </div>

          {/* Specifications Group */}
          <div className="border-t border-slate-100 pt-4 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Settings className="w-4 h-4 text-slate-500" />
              Specifications
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Material</label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="e.g. Teak Wood"
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-red focus:outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Dimensions</label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="e.g. 78 W x 72 D x 42 H inches"
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-red focus:outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Warranty</label>
                <input
                  type="text"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                  placeholder="e.g. 5 Years Warranty"
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-red focus:outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Assembly</label>
                <input
                  type="text"
                  value={assembly}
                  onChange={(e) => setAssembly(e.target.value)}
                  placeholder="e.g. Assembly provided"
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-brand-red focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Unified Product Image Upload Section */}
          <div className="border-t border-slate-100 pt-4 flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-slate-500" />
                Product Images
              </h3>
              <p className="text-[11px] text-slate-400">Click on any box to upload or select a new photo.</p>
            </div>

            {/* Main Image upload */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Main Photo (Required)</label>
              <label className="relative aspect-video rounded-xl overflow-hidden bg-slate-50 hover:bg-slate-100/50 border-2 border-dashed border-slate-200 hover:border-brand-red flex flex-col items-center justify-center cursor-pointer transition-all group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainFileChange}
                  className="hidden"
                />
                {mainPreview ? (
                  <>
                    <img src={mainPreview} alt="Main Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-full flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" /> Replace Photo
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-4">
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-brand-red transition-all" />
                    <span className="text-xs font-semibold text-slate-500">Upload Main Photo</span>
                  </div>
                )}
              </label>
            </div>

            {/* Sub-images (Gallery) */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sub Gallery Photos (Optional)</label>
              <div className="grid grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="relative aspect-square">
                    <label className="w-full h-full rounded-xl overflow-hidden bg-slate-50 hover:bg-slate-100/50 border-2 border-dashed border-slate-200 hover:border-brand-red flex flex-col items-center justify-center cursor-pointer transition-all group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleGalleryFileChange(idx, e)}
                        className="hidden"
                      />
                      {galleryPreviews[idx] ? (
                        <>
                          <img src={galleryPreviews[idx]} alt={`Gallery Preview ${idx + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-[10px] font-semibold bg-black/60 px-2 py-1 rounded-md">
                              Replace
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <Plus className="w-4 h-4 text-slate-400 group-hover:text-brand-red transition-all" />
                          <span className="text-[9px] font-semibold text-slate-400">Slot {idx + 1}</span>
                        </div>
                      )}
                    </label>

                    {/* Delete button for slot */}
                    {galleryPreviews[idx] && (
                      <button
                        type="button"
                        onClick={() => clearGallerySlot(idx)}
                        className="absolute -top-1.5 -right-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
                        title="Clear Image Slot"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status Message */}
          {status.type && (
            <div className={`p-4 rounded-xl border flex items-start gap-3 text-sm font-medium ${status.type === 'success'
              ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
              : 'bg-rose-50 border-rose-100 text-rose-800'
              }`}>
              {status.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!isNewProduct && (
              <button
                type="button"
                disabled={saving}
                onClick={() => setShowDeleteModal(true)}
                className={`flex-1 py-4 rounded-xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${saving
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-rose-600 hover:bg-rose-700 text-white active:scale-98 cursor-pointer'
                  }`}
              >
                <Trash2 className="w-5 h-5" />
                Delete Product
              </button>
            )}

            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="flex-[2] py-4 rounded-xl font-semibold text-sm bg-brand-red hover:bg-brand-red-hover text-white active:scale-98 cursor-pointer transition-all shadow-md flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {isNewProduct ? 'Create New Product' : 'Save Product Details'}
                </>
              )}
            </button>
          </div>
        </section>

        {/* Right Column - Product Preview Card */}
        <section className="lg:col-span-6 flex flex-col gap-6">
          {!isNewProduct && selectedProduct ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-800 mt-2">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">ID: {selectedProduct.id}</p>
                </div>
              </div>

              {/* Main Image View */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" />
                  Main Product Image
                </label>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                  <img
                    src={mainPreview || selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-full">
                      Current Live Photo
                    </span>
                  </div>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Additional Gallery Images
                </label>
                {galleryPreviews.some(u => u !== '') ? (
                  <div className="grid grid-cols-4 gap-3">
                    {galleryPreviews.map((img, idx) => img ? (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-lg overflow-hidden bg-slate-50 border border-slate-200"
                      >
                        <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                          Slot {idx + 1}
                        </span>
                      </div>
                    ) : (
                      <div key={idx} className="aspect-square border border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-300 text-[10px]">
                        Slot {idx + 1} Empty
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 border border-dashed border-slate-200 rounded-xl text-center text-sm text-slate-400">
                    No secondary gallery images configured for this product.
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Description</span>
                <p className="text-slate-600 leading-relaxed">{selectedProduct.description}</p>
              </div>

              {/* Live Specifications Preview */}
              <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 text-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Live Specifications</span>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Material</p>
                    <p className="font-semibold text-slate-700 mt-0.5 text-xs truncate" title={selectedProduct.specifications?.material}>
                      {selectedProduct.specifications?.material || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Dimensions</p>
                    <p className="font-semibold text-slate-700 mt-0.5 text-xs truncate" title={selectedProduct.specifications?.dimensions}>
                      {selectedProduct.specifications?.dimensions || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Warranty</p>
                    <p className="font-semibold text-slate-700 mt-0.5 text-xs truncate" title={selectedProduct.specifications?.warranty}>
                      {selectedProduct.specifications?.warranty || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Assembly</p>
                    <p className="font-semibold text-slate-700 mt-0.5 text-xs truncate" title={selectedProduct.specifications?.assembly}>
                      {selectedProduct.specifications?.assembly || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ) : isNewProduct ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6 animate-fade-in">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="px-2.5 py-1 bg-amber-100 rounded-full text-xs font-semibold text-amber-700 uppercase tracking-wide">
                    New Product Preview
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-800 mt-2">
                    {productName || 'Unnamed Product'}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 font-mono">ID: {newId || 'auto-generating...'}</p>
                </div>
              </div>

              {/* Image Preview */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" />
                  Product Main Photo
                </label>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  {mainPreview ? (
                    <img src={mainPreview} alt="New Product Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                      <ImageIcon className="w-8 h-8 opacity-40" />
                      <span className="text-xs">Select a file on the left to preview</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sub-gallery images preview */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sub Gallery Preview</label>
                <div className="grid grid-cols-4 gap-3">
                  {galleryPreviews.map((img, idx) => img ? (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-slate-50 border border-slate-200">
                      <img src={img} alt={`New Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div key={idx} className="aspect-square border border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-300 text-[10px]">
                      Slot {idx + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1 text-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Description</span>
                <p className="text-slate-600 leading-relaxed min-h-[3rem]">
                  {productDescription || 'No description provided yet.'}
                </p>
              </div>

              {/* Specifications */}
              <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 text-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Product Specifications</span>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Material</p>
                    <p className="font-semibold text-slate-700 mt-0.5 text-xs truncate">
                      {material || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Dimensions</p>
                    <p className="font-semibold text-slate-700 mt-0.5 text-xs truncate">
                      {dimensions || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Warranty</p>
                    <p className="font-semibold text-slate-700 mt-0.5 text-xs truncate">
                      {warranty || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Assembly</p>
                    <p className="font-semibold text-slate-700 mt-0.5 text-xs truncate">
                      {assembly || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-96 border border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
              No product selected
            </div>
          )}
        </section>

      </main>

      {/* Custom Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setShowDeleteModal(false)}
          />

          {/* Modal Container */}
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-scale-in z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 flex-shrink-0 shadow-xs">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">Delete Product</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Are you sure you want to delete <strong className="text-slate-800">"{selectedProduct?.name}"</strong>?
                  This action is permanent and will remove it from the database catalogue.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 text-sm font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-slate-600 bg-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2.5 text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors cursor-pointer shadow-xs active:scale-98"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
