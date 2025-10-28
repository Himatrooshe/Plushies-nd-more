import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {useAside} from './Aside';
import {AddToCartButton} from './AddToCartButton';
import purpleLoveIcon from '~/assets/prpl-love.svg?url';
import hollowCardBg from '~/assets/hollow-card-bg.svg?url';

/**
 * @param {{
 *   product:
 *     | CollectionItemFragment
 *     | ProductItemFragment
 *     | RecommendedProductFragment;
 *   loading?: 'eager' | 'lazy';
 * }}
 */
export function ProductItem({product, loading}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  const price = product.priceRange?.minVariantPrice;
  const firstVariant = product.variants?.nodes?.[0];
  const isAvailable = product.availableForSale && firstVariant?.availableForSale;
  const {open} = useAside();

  if (!product || !product.handle) {
    return null;
  }

  const handleAddToCart = () => {
    open('cart');
  };

  return (
    <div className="h-[420px] w-[280px] relative rounded-[20px] overflow-hidden">
      {/* Background SVG */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${hollowCardBg})`,
        }}
      />
      
      {/* Product Image - Clickable */}
        <Link to={variantUrl} className="absolute h-[240px] left-1/2 top-[20px] -translate-x-1/2 w-[220px] cursor-pointer z-10">
          <div className="relative w-full h-full overflow-hidden">
            {image ? (
              <Image
                alt={image.altText || product.title}
                data={image}
                loading={loading}
                sizes="(min-width: 768px) 25vw, 50vw"
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
        <div className="absolute left-1/2 top-[275px] -translate-x-1/2 w-[245px] flex items-center justify-between z-20">
          <div className="w-[140px]">
            <Link to={variantUrl} className="block">
              <h3 className="text-black text-[16px] font-bold leading-[22px] tracking-[-1.1px] capitalize hover:text-[#c0424e] transition-colors cursor-pointer">
                {product.title}
              </h3>
            </Link>
            {/* Love Icons */}
            <div className="flex items-center gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <LoveIcon key={i} />
              ))}
            </div>
          </div>
          <div className="text-[#53357A] text-[16px] font-normal tracking-[2px] whitespace-nowrap font-cute">
            {price && <Money data={price} />}
          </div>
        </div>


        {/* Add to Cart and Heart Button */}
        <div
          className="absolute left-[10px] top-[350px] w-[260px] flex items-center justify-center gap-3 z-30"
          onClick={(e) => e.stopPropagation()}
        >
          {isAvailable && firstVariant?.id ? (
            <AddToCartButton
              lines={[
                {
                  merchandiseId: firstVariant.id,
                  quantity: 1,
                },
              ]}
              disabled={!isAvailable}
              onClick={handleAddToCart}
              analytics={{
                products: [
                  {
                    product_gid: product.id,
                    variant_gid: firstVariant.id,
                    variant_title: firstVariant.title,
                    product_title: product.title,
                    price: price?.amount,
                    currencyCode: price?.currencyCode,
                  },
                ],
              }}
            >
              {(fetcher) => (
                <div
                  className={`bg-[#53357A] flex items-center justify-center px-6 py-[9px] rounded-[118px] h-[45px] min-w-[180px] transition-colors whitespace-nowrap ${
                    isAvailable
                      ? 'hover:bg-[#4a2f6b]'
                      : 'bg-gray-300 cursor-not-allowed'
                  } ${
                    fetcher.state !== 'idle' ? 'pointer-events-none opacity-70' : ''
                  }`}
                >
                  <span className="text-white text-[15px] font-normal tracking-[0.24px]">
                    {fetcher.state !== 'idle' ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Adding...
                      </span>
                    ) : (
                      'Add to cart'
                    )}
                  </span>
                </div>
              )}
            </AddToCartButton>
          ) : (
            <button
              disabled
              className="bg-gray-300 flex items-center justify-center px-6 py-[9px] rounded-[118px] h-[45px] min-w-[180px] cursor-not-allowed whitespace-nowrap"
            >
              <span className="text-gray-600 text-[15px] font-normal tracking-[0.24px]">
                Sold out
              </span>
            </button>
          )}

        </div>

        {/* Out of Stock Overlay */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-[20px] pointer-events-none">
            <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold pointer-events-auto">
              Sold Out
            </div>
          </div>
        )}
    </div>
  );
}

/**
 * Love Icon Component
 */
function LoveIcon() {
  return (
    <img
      src={purpleLoveIcon}
      alt="Love icon"
      width={12}
      height={12}
      className="w-3 h-3"
    />
  );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductFragment} RecommendedProductFragment */
