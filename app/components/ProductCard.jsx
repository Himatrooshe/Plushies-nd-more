import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import { useState } from 'react';

// Star rating component using red-love.svg
const StarRating = ({ rating = 4.8, reviewCount = 135 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="relative w-[15px] h-[15px] shrink-0">
          <img
            src="/red-love.svg"
            alt="Rating icon"
            width={15}
            height={15}
            className={`w-full h-full ${
              i < Math.floor(rating) ? 'opacity-100' : 'opacity-30'
            }`}
          />
        </div>
      ))}
      <span className="text-[#c0424e] text-[15px] font-normal ml-1">
        ({reviewCount})
      </span>
    </div>
  );
};

// Heart icon component using red-love.svg
const HeartIcon = () => (
  <img
    src="/red-love.svg"
    alt="Heart icon"
    width={16}
    height={16}
    className="w-4 h-4 transition-all duration-200 group-hover:brightness-0 group-hover:invert"
  />
);

export default function ProductCard({ product }) {
  const image = product.featuredImage;
  const price = product.priceRange.minVariantPrice;
  const isAvailable = product.availableForSale;
  const firstVariant = product.variants?.nodes?.[0];
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Debug logging to see what data we're getting
  console.log('Product data:', {
    id: product.id,
    title: product.title,
    availableForSale: product.availableForSale,
    variantAvailable: firstVariant?.availableForSale,
    price: price
  });

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check both product and variant availability
    const productAvailable = product.availableForSale;
    const variantAvailable = firstVariant?.availableForSale;
    const actuallyAvailable = productAvailable && variantAvailable;
    
    if (!actuallyAvailable || !firstVariant?.id) {
      console.log('Product not available:', { productAvailable, variantAvailable, variantId: firstVariant?.id });
      return;
    }
    
    setIsAddingToCart(true);
    try {
      // TODO: Implement cart functionality with Shopify Hydrogen
      console.log('Adding to cart:', firstVariant.id);
      // You could also show a toast notification here
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div 
      className="h-[420px] w-[280px] relative rounded-[20px] p-px"
      style={{
        background: 'linear-gradient(to bottom, #FF929C, #C0424E)'
      }}
    >
      <div className="bg-[#ffdddd] h-full w-full rounded-[20px] overflow-hidden relative">
      {/* Hot Selling Badge */}
      <div className="absolute top-0 left-0 p-[8px] w-[140px] z-10">
        <div className="bg-white flex items-center justify-center px-5 py-2 rounded-[16px] w-full">
          <div className="flex items-center gap-2">
            <span className="text-black text-[10px] font-normal">
              Hot Selling
            </span>
            <HeartIcon />
          </div>
        </div>
      </div>

      {/* Product Image - Clickable */}
      <Link 
        href={`/products/${product.handle}`}
        className="absolute h-[240px] left-1/2 top-[20px] -translate-x-1/2 w-[220px] cursor-pointer"
      >
        <div className="relative w-full h-full overflow-hidden">
          {image ? (
            <Image
              data={image}
              className="object-cover hover:scale-105 transition-transform duration-300 w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
              No Image
            </div>
          )}
        </div>
      </Link>

      {/* Product Title and Price */}
      <div className="absolute left-1/2 top-[275px] -translate-x-1/2 w-[245px] flex items-center justify-between">
        <div className="w-[140px]">
          <Link href={`/products/${product.handle}`}>
            <h3 className="text-black text-[16px] font-bold leading-[22px] tracking-[-1.1px] capitalize font-nunito hover:text-[#c0424e] transition-colors cursor-pointer">
              {product.title}
            </h3>
          </Link>
        </div>
        <div className="text-[#c0424e] text-[20px] font-normal tracking-[2px] whitespace-nowrap font-caveat-brush">
          {price.amount} {price.currencyCode}
        </div>
      </div>

      {/* Star Rating */}
      <div className="absolute left-[12px] top-[305px] flex items-center gap-0.5">
        <StarRating />
      </div>

      {/* Add to Cart and Heart Button */}
      <div className="absolute left-[10px] top-[350px] w-[260px] flex items-center justify-between gap-3">
        <button
          onClick={handleAddToCart}
          disabled={!isAvailable || isAddingToCart}
          className={`bg-[#c0424e] flex items-center justify-center px-[11px] py-[9px] rounded-[118px] flex-1 h-[45px] transition-colors ${
            isAvailable && !isAddingToCart
              ? 'hover:bg-[#a0353f]'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {isAddingToCart ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          ) : (
            <span className="text-white text-[15px] font-normal tracking-[0.24px]">
              Add to cart
            </span>
          )}
        </button>
        
        <button className="group border border-[#c0424e] border-solid flex items-center justify-center p-4 rounded-[28px] w-[45px] h-[45px] hover:bg-[#c0424e] hover:text-white transition-colors">
          <HeartIcon />
        </button>
      </div>

      {/* Out of Stock Overlay - Only show if actually unavailable */}
      {!isAvailable && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-[20px]">
          <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Sold Out
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

