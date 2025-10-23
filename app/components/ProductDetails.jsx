import React, { useState, useEffect } from 'react';
import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';

export default function ProductDetails({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Initialize selected variant to the first available variant
  useEffect(() => {
    if (product.variants?.nodes?.length > 0 && !selectedVariant) {
      const firstVariant = product.variants.nodes.find((node) => node.availableForSale);
      if (firstVariant) {
        setSelectedVariant(firstVariant);
        // Also set initial selected options
        if (firstVariant.selectedOptions) {
          const initialOptions = {};
          firstVariant.selectedOptions.forEach(({ name, value }) => {
            initialOptions[name] = value;
          });
          setSelectedOptions(initialOptions);
        }
      } else {
        // Fallback to first variant even if not available
        setSelectedVariant(product.variants.nodes[0]);
      }
    }
  }, [product.variants, selectedVariant]);

  const images = product.images?.nodes || [];
  const variants = product.variants?.nodes || [];
  const options = product.options || [];

  // Get current price from selected variant or fallback to product price range
  const currentPrice = selectedVariant?.priceV2 || product.priceRange?.minVariantPrice;
  const compareAtPrice = selectedVariant?.compareAtPriceV2 || product.compareAtPriceRange?.maxVariantPrice;
  const isAvailable = selectedVariant?.availableForSale ?? variants[0]?.availableForSale ?? false;

  // Handle option selection
  const handleOptionChange = (optionName, value) => {
    const newSelectedOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newSelectedOptions);

    // Find matching variant based on selected options
    const matchingVariant = variants.find((node) => {
      return node.selectedOptions?.every(({ name, value: optionValue }) => {
        return newSelectedOptions[name] === undefined || newSelectedOptions[name] === optionValue;
      });
    });

    if (matchingVariant && matchingVariant.availableForSale) {
      setSelectedVariant(matchingVariant);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!isAvailable || !selectedVariant?.id) return;
    
    setIsAddingToCart(true);
    try {
      // TODO: Implement cart functionality with Shopify Hydrogen
      console.log('Adding to cart:', selectedVariant.id, quantity);
      
      // Show success message
      alert(`Added ${quantity} ${product.title} to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-700">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.title}</span>
        </div>
      </nav>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              {images.length > 0 ? (
                <Image
                  data={images[selectedImageIndex]?.node}
                  className="object-cover transition-transform duration-300 hover:scale-105 w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(0, 8).map((node, index) => (
                  <button
                    key={node.id || index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      data={node}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Title & Vendor */}
            <div>
              {product.vendor && (
                <p className="text-sm text-gray-500 mb-2">{product.vendor}</p>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  {currentPrice?.amount} {currentPrice?.currencyCode}
                </span>
                {compareAtPrice && compareAtPrice.amount && (
                  <span className="text-xl text-gray-500 line-through">
                    {compareAtPrice.amount} {compareAtPrice.currencyCode}
                  </span>
                )}
              </div>
              
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                isAvailable
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {isAvailable ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Product Options */}
            {options.map((option) => (
              <div key={option.id} className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">{option.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => (
                    <button
                      key={value}
                      onClick={() => handleOptionChange(option.name, value)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedOptions[option.name] === value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity Selector */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="text-lg font-medium px-4">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!isAvailable || isAddingToCart}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                  isAvailable && !isAddingToCart
                    ? 'bg-[#ff7380] text-white hover:bg-[#ff5c6c] active:bg-[#ff4a5a]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isAddingToCart ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Adding...
                  </div>
                ) : isAvailable ? (
                  `Add to Cart - ${(currentPrice?.amount || 0) * quantity} ${currentPrice?.currencyCode}`
                ) : (
                  'Out of Stock'
                )}
              </button>
              
              <div className="flex gap-3">
                <button className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                  Add to Wishlist
                </button>
                <button className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                  Share
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Product Details
              </h2>
              
              <dl className="space-y-3">
                {product.vendor && (
                  <>
                    <dt className="text-sm font-medium text-gray-700">Brand</dt>
                    <dd className="text-gray-900">{product.vendor}</dd>
                  </>
                )}
                {product.productType && (
                  <>
                    <dt className="text-sm font-medium text-gray-700">Type</dt>
                    <dd className="text-gray-900 capitalize">{product.productType}</dd>
                  </>
                )}
                {product.tags && product.tags.length > 0 && (
                  <>
                    <dt className="text-sm font-medium text-gray-700">Tags</dt>
                    <dd className="text-gray-900">
                      <div className="flex flex-wrap gap-2 mt-1">
                        {product.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      {product.description && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <div className="prose max-w-none">
            {product.descriptionHtml ? (
              <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
            ) : (
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl mb-3">🚚</div>
          <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
          <p className="text-gray-600 text-sm">Free shipping on orders over $50</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl mb-3">↩️</div>
          <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
          <p className="text-gray-600 text-sm">30-day return policy</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl mb-3">🛡️</div>
          <h3 className="font-semibold text-gray-900 mb-2">Warranty</h3>
          <p className="text-gray-600 text-sm">1-year manufacturer warranty</p>
        </div>
      </div>
    </div>
  );
}
