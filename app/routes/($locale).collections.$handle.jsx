import {redirect, useLoaderData, Link} from 'react-router';
import {useState} from 'react';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ProductItem} from '~/components/ProductItem';

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

  const [{collection, collections}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
    }),
    storefront.query(ALL_COLLECTIONS_QUERY, {
      variables: {first: 50}, // Fetch all collections for sidebar
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {
    collection,
    collections: collections?.nodes || [],
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
  const {collection, collections} = useLoaderData();
  const [sortBy, setSortBy] = useState('featured');
  const [gridLayout, setGridLayout] = useState(3);
  const [priceRange, setPriceRange] = useState({min: '', max: ''});
  const [inStockOnly, setInStockOnly] = useState(false);

  const productCount = collection.products?.nodes?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-pink-500 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Shop All Cutest Plushies
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Lovingly Crafted Plush Friends Designed To Bring Comfort, Joy, And Endless Hugs.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              {/* Shop By Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shop By Categories</h3>
                <div className="space-y-2">
                  {collections.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/collections/${cat.handle}`}
                      className={`flex items-center justify-between py-2 px-3 rounded-md transition-colors ${
                        cat.handle === collection.handle
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">{cat.title}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Filter by */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by</h3>
                
                {/* Availability */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Availability</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">In stock ({productCount})</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Out of stock (0)</span>
                    </label>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="$ Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="$ Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                {/* Grid Layout Options */}
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4].map((cols) => (
                    <button
                      key={cols}
                      onClick={() => setGridLayout(cols)}
                      className={`p-2 rounded-md transition-colors ${
                        gridLayout === cols
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`grid gap-1 ${
                        cols === 1 ? 'grid-cols-1' :
                        cols === 2 ? 'grid-cols-2' :
                        cols === 3 ? 'grid-cols-3' : 'grid-cols-4'
                      }`}>
                        {Array.from({length: cols}).map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-current rounded-sm"></div>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Product Count */}
                <div className="text-sm text-gray-600">
                  Showing {productCount} of {productCount} products
                </div>

                {/* Sort By */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
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

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              gridLayout === 1 ? 'grid-cols-1' :
              gridLayout === 2 ? 'grid-cols-1 md:grid-cols-2' :
              gridLayout === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              <PaginatedResourceSection
                connection={collection.products}
                resourcesClassName=""
              >
                {({node: product, index}) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <ProductItem
                      product={product}
                      loading={index < 8 ? 'eager' : undefined}
                    />
                  </div>
                )}
              </PaginatedResourceSection>
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
