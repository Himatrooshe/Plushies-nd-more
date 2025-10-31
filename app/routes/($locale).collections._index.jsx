import {useLoaderData, Link} from 'react-router';
import {useState} from 'react';
import {getPaginationVariables, Image} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
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
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20, // Show more collections
  });

  const [{collections}] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  // Also fetch all collections for sidebar
  const allCollectionsResult = await context.storefront.query(ALL_COLLECTIONS_QUERY, {
    variables: {first: 50},
  });

  return {
    collections,
    allCollections: allCollectionsResult?.collections || {nodes: []},
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

export default function Collections() {
  /** @type {LoaderReturnData} */
  const {collections, allCollections} = useLoaderData();
  const [gridLayout, setGridLayout] = useState(3);

  const collectionsList = collections?.nodes || [];
  const collectionCount = collectionsList.length;
  const sidebarCollections = allCollections?.nodes || [];

  return (
    <div className="min-h-screen bg-gray-50">
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
            Shop All Cutest Plushies
          </h1>
          <p className="text-xl sm:text-2xl text-white/90">
            Lovingly Crafted Plush Friends Designed To Bring Comfort, Joy, And Endless Hugs.
          </p>
        </div>
      </div>

      {/* Main Content with Sidebar and Collections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              {/* Shop By Categories */}
              <div className="bg-[#ffe5e5] rounded-t-lg border-b border-[#ffcccc]">
                <h3 className="text-[#d63384] font-bold px-4 py-3 text-sm">Shop By Categories</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {sidebarCollections.map((collection) => (
                  <Link
                    key={collection.id}
                    to={`/collections/${collection.handle}`}
                    prefetch="intent"
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-sm text-gray-800 font-normal">
                      {collection.title}
                    </span>
                    <svg 
                      className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Main Content */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-[#ffe5e5] rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Grid Layout Options */}
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4].map((cols) => (
                    <button
                      key={cols}
                      onClick={() => setGridLayout(cols)}
                      className={`p-2 rounded-md transition-colors ${
                        gridLayout === cols
                          ? 'bg-pink-200 text-pink-700'
                          : 'text-gray-400 hover:text-gray-600 hover:bg-pink-50'
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

                {/* Collection Count */}
                <div className="text-sm text-gray-700 font-medium">
                  Showing {collectionCount} of {collectionCount} collections
                </div>
              </div>
            </div>

            {/* Collections Grid */}
            <div className={`grid gap-6 ${
              gridLayout === 1 ? 'grid-cols-1' :
              gridLayout === 2 ? 'grid-cols-1 md:grid-cols-2' :
              gridLayout === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              <PaginatedResourceSection
                connection={collections}
                resourcesClassName=""
              >
                {({node: collection, index}) => (
                  <CollectionCard
                    key={collection.id}
                    collection={collection}
                    index={index}
                  />
                )}
              </PaginatedResourceSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   collection: CollectionFragment;
 *   index: number;
 * }}
 */
function CollectionCard({collection, index}) {
  return (
    <Link
      to={`/collections/${collection.handle}`}
      prefetch="intent"
      className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
    >
      {/* Collection Image */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {collection?.image ? (
        <Image
          alt={collection.image.altText || collection.title}
          aspectRatio="1/1"
          data={collection.image}
            loading={index < 8 ? 'eager' : undefined}
          sizes="(min-width: 45em) 400px, 100vw"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-pink-100 to-purple-100">
            <div className="text-center">
              <div className="text-6xl mb-2">🧸</div>
              <div className="text-gray-500 text-sm">Collection</div>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
        
        {/* Collection Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-sm">
            Collection
          </div>
        </div>
      </div>

      {/* Collection Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {collection.title}
        </h3>
        
        {/* Collection Description */}
        {collection.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {collection.description}
          </p>
        )}
        
        {/* View Collection Button */}
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-medium text-sm group-hover:text-blue-700">
            View Collection →
          </span>
          <div className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            ))}
            <span className="ml-1 text-xs text-gray-500">(4.8)</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

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
  query StoreCollectionsIndex(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
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

/** @typedef {import('./+types/collections._index').Route} Route */
/** @typedef {import('storefrontapi.generated').CollectionFragment} CollectionFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
