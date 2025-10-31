import {redirect, useLoaderData, Link} from 'react-router';
import {useRef, useState} from 'react';
import {useRevealAnimations} from '~/components/useRevealAnimations';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ProductItem} from '~/components/ProductItem';
import heroBg from '~/assets/hero-bg.svg?url';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.collection.title ?? ''} Collection`}];
};

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
async function loadCriticalData({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [collectionResult, allCollectionsResult] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
    }),
    storefront.query(ALL_COLLECTIONS_QUERY, {
      variables: {first: 50}, // Fetch all collections for sidebar
    }),
  ]);

  const collection = collectionResult?.collection;
  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {
    collection,
    allCollections: allCollectionsResult?.collections?.nodes || [],
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

export default function Collection() {
  /** @type {LoaderReturnData} */
  const {collection, allCollections} = useLoaderData();
  const [sortBy, setSortBy] = useState('featured');
  const [gridLayout, setGridLayout] = useState(3);
  const [priceRange, setPriceRange] = useState({min: '', max: ''});
  const [inStockOnly, setInStockOnly] = useState(false);
  const pageRef = useRef(null);
  useRevealAnimations(pageRef);

  const rawProducts = collection.products?.nodes || [];

  const filteredAndSorted = (() => {
    let items = [...rawProducts];

    if (inStockOnly) {
      items = items.filter((p) => {
        const firstVariant = p?.variants?.nodes?.[0];
        return p?.availableForSale && firstVariant?.availableForSale;
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
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-xl sm:text-2xl text-white/90">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 pr-2">
              {/* Shop By Categories */}
              <div className="rounded-2xl p-5 shadow-lg bg-linear-to-br from-rose-50 to-pink-50 border border-rose-100 reveal-panel">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#c0424e] uppercase tracking-widest">Shop By Categories</h3>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-white/70 text-[#c0424e] border border-rose-100">{allCollections.length}</span>
                </div>
                <div className="space-y-2">
                  {allCollections.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/collections/${encodeURIComponent(cat.handle)}`}
                      className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors border ${
                        cat.handle === collection.handle
                          ? 'bg-white text-[#c0424e] border-rose-200 shadow-sm'
                          : 'text-gray-700 bg-white/60 hover:bg-white border-transparent'
                      }`}
                    >
                      <span className="font-medium truncate">{cat.title}</span>
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
                      <span className="ml-2 text-sm text-gray-600">In stock ({productCount})</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
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
                      className="px-3 py-2 border border-rose-200 rounded-lg text-sm focus:ring-[#c0424e] focus:border-[#c0424e] bg-white/80"
                    />
                    <input
                      type="number"
                      placeholder="$ Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                      className="px-3 py-2 border border-rose-200 rounded-lg text-sm focus:ring-[#c0424e] focus:border-[#c0424e] bg-white/80"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="rounded-2xl p-4 sm:p-5 shadow-lg bg-linear-to-br from-rose-50 to-pink-50 border border-rose-100 mb-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="text-xs sm:text-sm font-semibold text-gray-700">
                  Showing {productCount} products
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white/90 border border-rose-200 rounded-xl px-3 py-2 text-sm focus:ring-[#c0424e] focus:border-[#c0424e]"
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

        {/* Products Grid (3 per row on md and up) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredAndSorted.map((product, index) => (
              <div key={product.id} className="bg-[#FFDDDD] rounded-[24px] shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-rose-200 reveal-card">
                <ProductItem
                  product={product}
                  loading={index < 8 ? 'eager' : undefined}
                />
              </div>
            ))}
          </div>
          
          </div>
        </div>
        </div>

        {/* Analytics */}
        <Analytics.CollectionView
          data={{
            collection: {
              id: collection.id,
              handle: collection.handle,
            },
          }}
        />
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

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
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
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;

const ALL_COLLECTIONS_QUERY = `#graphql
  fragment CollectionListItem on Collection {
    id
    title
    handle
  }
  query AllCollections(
    $first: Int!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: $first) {
      nodes {
        ...CollectionListItem
      }
    }
  }
`;

/** @typedef {import('./+types/collections.$handle').Route} Route */
/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
