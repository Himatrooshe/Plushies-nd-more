import {useLoaderData, Link} from 'react-router';
import {useRef, useState, useEffect} from 'react';
import {useRevealAnimations} from '~/components/useRevealAnimations';
import {getPaginationVariables, Image} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductItem} from '~/components/ProductItem';
import heroBg from '~/assets/hero-bg.svg?url';

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context, request}) {
  const productPagination = getPaginationVariables(request, {
    pageBy: 24, // Show 24 products per page
  });

  const [collectionsResult, productsResult] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: {first: 50}, // Fetch all collections for sidebar
    }),
    context.storefront.query(PRODUCTS_QUERY, {
      variables: productPagination,
    }),
  ]);

  return {
    collections: collectionsResult?.collections || {nodes: []},
    products: productsResult?.products || {nodes: [], pageInfo: {hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null}},
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({context}) {
  return {};
}

export default function CollectionsAll() {
  /** @type {LoaderReturnData} */
  const {collections, products} = useLoaderData();
  const [sortBy, setSortBy] = useState('featured');
  const [gridLayout, setGridLayout] = useState(3);
  const [priceRange, setPriceRange] = useState({min: '', max: ''});
  const [inStockOnly, setInStockOnly] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const pageRef = useRef(null);
  useRevealAnimations(pageRef);

  const rawProducts = products?.nodes || [];
  const filteredAndSorted = (() => {
    let items = [...rawProducts];

    if (inStockOnly || outOfStock) {
      items = items.filter((p) => {
        const firstVariant = p?.variants?.nodes?.[0];
        const available = p?.availableForSale && firstVariant?.availableForSale;
        if (inStockOnly && !available) return false;
        if (outOfStock && available) return false;
        return true;
      });
    }

    const min = priceRange.min ? parseFloat(String(priceRange.min)) : null;
    const max = priceRange.max ? parseFloat(String(priceRange.max)) : null;
    if (min != null || max != null) {
      items = items.filter((p) => {
        const amount = parseFloat(p?.priceRange?.minVariantPrice?.amount ?? '0');
        if (min != null && amount < min) return false;
        if (max != null && amount > max) return false;
        return true;
      });
    }

    if (sortBy === 'price-low') {
      items.sort((a, b) => parseFloat(a?.priceRange?.minVariantPrice?.amount ?? '0') - parseFloat(b?.priceRange?.minVariantPrice?.amount ?? '0'));
    } else if (sortBy === 'price-high') {
      items.sort((a, b) => parseFloat(b?.priceRange?.minVariantPrice?.amount ?? '0') - parseFloat(a?.priceRange?.minVariantPrice?.amount ?? '0'));
    }

    return items;
  })();

  const productCount = filteredAndSorted.length;
  const collectionsList = collections?.nodes || [];
  const productsGridRef = useRef(null);

  // Count in-stock products (simplified - you might need to filter based on actual availability)
  
  // Responsive product card scaling for mobile
  useEffect(() => {
    const updateCardScale = () => {
      if (!productsGridRef.current || typeof window === 'undefined') return;
      
      const cards = productsGridRef.current.querySelectorAll('.collections-all-product-inner');
      if (cards.length === 0) return;
      
      const gridContainer = productsGridRef.current;
      const containerWidth = gridContainer.offsetWidth;
      if (containerWidth === 0) return;
      
      if (window.innerWidth < 640) {
        // Mobile: calculate scale based on available width (2 columns)
        const gap = 12; // gap-3 = 12px
        const availableWidthPerCard = (containerWidth - gap) / 2;
        const scale = Math.min(1, availableWidthPerCard / 280);
        const scaledHeight = 440 * scale;
        
        cards.forEach((card) => {
          // Scale the card visually
          card.style.transform = `scale(${scale})`;
          card.style.transformOrigin = 'top center';
          card.style.width = '280px';
          card.style.height = '440px';
          
          // Adjust parent wrapper to clip at scaled size
          const parent = card.closest('.collections-all-product-wrapper');
          if (parent) {
            // Parent is the grid item, get its actual width
            const gridItemWidth = parent.offsetWidth;
            const scaledWidth = 280 * scale;
            
            // Set wrapper width to scaled size to prevent overflow
            if (scaledWidth <= gridItemWidth) {
              parent.style.width = `${scaledWidth}px`;
              parent.style.maxWidth = `${scaledWidth}px`;
            }
            parent.style.height = `${scaledHeight}px`;
            parent.style.minWidth = '0';
            parent.style.overflow = 'hidden';
            parent.style.display = 'flex';
            parent.style.justifyContent = 'center';
            parent.style.alignItems = 'flex-start';
          }
        });
      } else if (window.innerWidth < 1240) {
        // Tablet/Medium Desktop (640-1239px): 2 columns, full size
        cards.forEach((card) => {
          card.style.transform = 'none';
          card.style.height = '440px';
          card.style.width = '280px';
          const parent = card.closest('.collections-all-product-wrapper');
          if (parent) {
            parent.style.height = 'auto';
            parent.style.minWidth = 'auto';
            parent.style.width = '100%';
            parent.style.maxWidth = 'none';
            parent.style.overflow = 'visible';
          }
        });
      } else {
        // Reset scale on larger screens
        cards.forEach((card) => {
          card.style.transform = 'none';
          card.style.height = '440px';
          card.style.width = '280px';
          const parent = card.closest('.collections-all-product-wrapper');
          if (parent) {
            parent.style.height = 'auto';
            parent.style.minWidth = 'auto';
            parent.style.width = '100%';
            parent.style.maxWidth = 'none';
            parent.style.overflow = 'visible';
          }
        });
      }
    };

    const timeoutId = setTimeout(updateCardScale, 50);
    window.addEventListener('resize', updateCardScale);
    
    const observer = new ResizeObserver(() => {
      updateCardScale();
    });
    
    if (productsGridRef.current) {
      observer.observe(productsGridRef.current);
    }
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateCardScale);
      observer.disconnect();
    };
  }, [filteredAndSorted.length]);
  const inStockCount = productCount; // Placeholder - should filter actual stock status

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50">
      {/* Hero Section - Contact Page Style */}
      <div className="relative bg-pink-300 py-20 sm:py-24 md:py-32 overflow-hidden">
        {/* Background with SVG */}
        <div className="absolute inset-0 pointer-events-none w-full h-full">
          <img
            src={heroBg}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4">
            Choose Your Collection
          </h1>
          <p className="text-xl sm:text-2xl text-white/90">
            Browse through our amazing collections and find the perfect plushies for you!
          </p>
        </div>
      </div>

      {/* Main Content with Sidebar and Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Right Main Content - Shows first on mobile/tablet */}
          <div className="lg:col-span-3 order-1">
            {/* Toolbar */}
            <div className="rounded-2xl p-4 sm:p-5 shadow-lg bg-linear-to-br from-rose-50 to-pink-50 border border-rose-100 mb-6" style={{overflow: 'visible'}}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-xs sm:text-sm font-semibold text-gray-700">
                  Showing {productCount} products
                </div>
                <div className="flex items-center gap-2 relative" style={{overflow: 'visible'}}>
                  <span className="text-xs text-gray-700">Sort by:</span>
                  <div style={{position: 'relative', overflow: 'visible', zIndex: 1000}}>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white/90 border border-rose-200 rounded-xl px-3 py-2 text-sm focus:ring-[#c0424e] focus:border-[#c0424e]"
                      style={{appearance: 'auto'}}
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest</option>
                      <option value="best-selling">Best Selling</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid - Responsive */}
            <style>{`
              @media (max-width: 639px) {
                .collections-all-product-grid {
                  display: grid !important;
                  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                  gap: 12px !important;
                }
                .collections-all-product-wrapper {
                  width: 100% !important;
                  max-width: 100% !important;
                }
              }
              @media (min-width: 640px) and (max-width: 1239px) {
                .collections-all-product-grid {
                  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                }
              }
              @media (min-width: 1240px) {
                .collections-all-product-grid {
                  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
                }
              }
            `}</style>
            <div 
              ref={productsGridRef}
              className="collections-all-product-grid grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6"
            >
              {filteredAndSorted.map((product, index) => (
                <div 
                  key={product.id} 
                  className="flex justify-center items-start collections-all-product-wrapper"
                  style={{
                    minWidth: 0,
                    width: '100%'
                  }}
                >
                  <div 
                    className="collections-all-product-inner"
                    style={{
                      width: '280px',
                      height: '440px',
                      margin: '0 auto',
                      transformOrigin: 'center top',
                      flexShrink: 0
                    }}
                  >
                    <div className="bg-[#FFDDDD] rounded-[24px] shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-rose-200 reveal-card">
                      <ProductItem
                        product={product}
                        loading={index < 8 ? 'eager' : undefined}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Sidebar - Shows below on mobile/tablet */}
          <div className="lg:col-span-1 order-2">
            <div className="space-y-6 pr-2">
              {/* Shop By Categories */}
              <div className="rounded-2xl p-5 shadow-lg bg-linear-to-br from-rose-50 to-pink-50 border border-rose-100 reveal-panel">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#c0424e] uppercase tracking-widest">Shop By Categories</h3>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-white/70 text-[#c0424e] border border-rose-100">{collectionsList.length}</span>
                </div>
                <div className="space-y-2">
                  {collectionsList.map((collection) => (
                    <Link
                      key={collection.id}
                      to={`/collections/${encodeURIComponent(collection.handle)}`}
                      prefetch="intent"
                      className="flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors border text-gray-700 bg-white/60 hover:bg-white border-transparent"
                    >
                      <span className="font-medium truncate">{collection.title}</span>
                      <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Filter by */}
              <div className="rounded-2xl p-5 shadow-lg bg-linear-to-br from-rose-50 to-pink-50 border border-rose-100 reveal-panel">
                <h3 className="text-sm font-bold text-[#c0424e] uppercase tracking-widest mb-4">Filter by</h3>
                {/* Availability */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-700 mb-3">Availability</h4>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="rounded-md border-rose-300 text-[#c0424e] focus:ring-[#c0424e]"
                      />
                      <span className="ml-2 text-sm text-gray-600">In stock ({inStockCount})</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={outOfStock}
                        onChange={(e) => setOutOfStock(e.target.checked)}
                        className="rounded-md border-rose-300 text-[#c0424e] focus:ring-[#c0424e]"
                      />
                      <span className="ml-2 text-sm text-gray-600">Out of stock (0)</span>
                    </label>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 mb-3">Price Range</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="$ Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                      className="px-3 py-2 border border-rose-200 rounded-lg text-sm bg-white/80 focus:ring-[#c0424e] focus:border-[#c0424e]"
                    />
                    <input
                      type="number"
                      placeholder="$ Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                      className="px-3 py-2 border border-rose-200 rounded-lg text-sm bg-white/80 focus:ring-[#c0424e] focus:border-[#c0424e]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    availableForSale
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
      }
    }
  }
`;

const PRODUCTS_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Products(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    products(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...ProductItem
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    description
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollectionsAll(
    $country: CountryCode
    $first: Int!
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: $first) {
      nodes {
        ...Collection
      }
    }
  }
`;

/** @typedef {import('./+types/collections.all').Route} Route */
/** @typedef {import('storefrontapi.generated').CollectionFragment} CollectionFragment */
/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */