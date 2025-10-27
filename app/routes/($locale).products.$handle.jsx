import {useLoaderData} from 'react-router';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
import {ProductForm} from '~/components/ProductForm';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  return [
    {title: `Hydrogen | ${data?.product.title ?? ''}`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
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

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({context, params}) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const {product} = useLoaderData();

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const {title, descriptionHtml} = product;

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white pt-24 sm:pt-28 md:pt-32">
      {/* Decorative Top Elements */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      {/* Product Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <div className="product-image-wrapper relative group">
            {/* Floating badges */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-linear-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 animate-bounce">
                <span>✨</span>
                <span>New Arrival</span>
              </div>
            </div>
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-white text-pink-600 px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 border-2 border-pink-200">
                <span>💝</span>
                <span>Best Seller</span>
              </div>
            </div>
            
            {/* Image with cute border */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-linear-to-br from-pink-100 to-purple-100 p-2">
              <ProductImage image={selectedVariant?.image} />
            </div>
          </div>

          {/* Product Info */}
          <div className="product-main flex flex-col">
            {/* Cute Emoji Title */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl sm:text-5xl">🎀</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
                {title}
              </h1>
            </div>

            {/* Product Price with cute styling */}
            <div className="mb-6 bg-linear-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border-2 border-pink-200">
              <ProductPrice
                price={selectedVariant?.price}
                compareAtPrice={selectedVariant?.compareAtPrice}
              />
            </div>

            {/* Product Form (Variants & Add to Cart) */}
            <div className="mb-8">
              <ProductForm
                productOptions={productOptions}
                selectedVariant={selectedVariant}
              />
            </div>

            {/* Cute Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-1 bg-linear-to-r from-pink-300 to-purple-300 rounded-full"></div>
              <span className="text-2xl">💕</span>
              <div className="flex-1 h-1 bg-linear-to-r from-purple-300 to-pink-300 rounded-full"></div>
            </div>

            {/* Product Description with cute styling */}
            <div className="product-description bg-white rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-pink-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📝</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Description
                </h2>
              </div>
              <div 
                className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{__html: descriptionHtml}} 
              />
            </div>

            {/* Cute Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-linear-to-br from-pink-50 to-rose-50 rounded-2xl p-4 border-2 border-pink-200 text-center">
                <div className="text-3xl mb-2">🚚</div>
                <div className="text-xs font-bold text-gray-700">Free Shipping</div>
                <div className="text-[10px] text-gray-500">Over $35</div>
              </div>
                                <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200 text-center">
                <div className="text-3xl mb-2">💝</div>
                <div className="text-xs font-bold text-gray-700">Easy Returns</div>
                <div className="text-[10px] text-gray-500">30 Days</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

/** @typedef {import('./+types/products.$handle').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
