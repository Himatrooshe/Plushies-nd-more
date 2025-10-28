import {useLoaderData, Link} from 'react-router';
import {getPaginationVariables, Image} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';

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

  return {collections};
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
  const {collections} = useLoaderData();

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

      {/* Collections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Our Collections</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collections of adorable plushies, each designed to bring joy and comfort to your life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
  query StoreCollections(
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

/** @typedef {import('./+types/collections._index').Route} Route */
/** @typedef {import('storefrontapi.generated').CollectionFragment} CollectionFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
