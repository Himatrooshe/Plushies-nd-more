import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';

export function ProductItem({product, loading = 'lazy'}) {
  if (!product) return null;

  const image = product.featuredImage;
  const price = product.priceRange?.minVariantPrice;
  const isAvailable = product.availableForSale;
  
  // Debug logging
  console.log('ProductItem - Product data:', {
    id: product.id,
    title: product.title,
    availableForSale: product.availableForSale,
    price: price
  });

  return (
    <Link
      to={`/products/${product.handle}`}
      className="product-item group block"
      prefetch="intent"
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
        {image ? (
          <Image
            data={image}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading={loading}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#ff7380] transition-colors">
          {product.title}
        </h3>
        
        {price && (
          <p className="text-[#ff7380] font-bold text-lg mt-1">
            {price.amount} {price.currencyCode}
          </p>
        )}
      </div>
    </Link>
  );
}
