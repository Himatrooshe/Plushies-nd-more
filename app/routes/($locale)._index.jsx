import {Await, useLoaderData, Link} from 'react-router';
import {Suspense, useRef} from 'react';
import {Image} from '@shopify/hydrogen';
import {ProductItem} from '~/components/ProductItem';
import HeroSection from '~/components/HeroSection';
import HalloweenHeroSection from '~/components/HalloweenHeroSection';
import CategoriesSection from '~/components/CategoriesSection';
import MostLovedSection from '~/components/MostLovedSection';
import HalloweenMostLovedSection from '~/components/HalloweenMostLovedSection';
import NewArrivalsSection from '~/components/NewArrivalsSection';
import SpecialPricesSection from '~/components/SpecialPricesSection';
import AboutSection from '~/components/AboutSection';
import TestimonialsSection from '~/components/TestimonialsSection';
import CTASection from '~/components/CTASection';
import {useRevealAnimations} from '~/components/useRevealAnimations';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Plushies & More | Home'}];
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
async function loadCriticalData({context}) {
  const [
    {collections},
    {products: mostLovedProducts},
    {products: newArrivalsProducts},
    {products: specialPricesProducts},
  ] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    context.storefront.query(MOST_LOVED_QUERY),
    context.storefront.query(NEW_ARRIVALS_QUERY),
    context.storefront.query(SPECIAL_PRICES_QUERY),
  ]);

  return {
    featuredCollection: collections.nodes[0],
    mostLovedProducts: mostLovedProducts.nodes,
    newArrivalsProducts: newArrivalsProducts.nodes,
    specialPricesProducts: specialPricesProducts.nodes,
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

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  const pageRef = useRef(null);
  useRevealAnimations(pageRef);
  return (
    <div ref={pageRef} className="home">
      {/* Keep hero unanimated per request */}
      <HeroSection />
      <div className="reveal-panel"><CategoriesSection /></div>
      <div className="reveal-panel"><MostLovedSection products={data.mostLovedProducts} /></div>
      <div className="reveal-panel"><NewArrivalsSection products={data.newArrivalsProducts} /></div>
      <div className="reveal-panel"><SpecialPricesSection products={data.specialPricesProducts} /></div>
      <div className="reveal-panel"><AboutSection /></div>
      <div className="reveal-panel"><TestimonialsSection /></div>
      <div className="reveal-panel"><CTASection /></div>
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const MOST_LOVED_QUERY = `#graphql
  fragment MostLovedProduct on Product {
    id
    title
    handle
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
      }
    }
  }
  query MostLovedProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...MostLovedProduct
      }
    }
  }
`;

const NEW_ARRIVALS_QUERY = `#graphql
  fragment NewArrivalsProduct on Product {
    id
    title
    handle
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
      }
    }
  }
  query NewArrivalsProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: CREATED_AT, reverse: true) {
      nodes {
        ...NewArrivalsProduct
      }
    }
  }
`;

const SPECIAL_PRICES_QUERY = `#graphql
  fragment SpecialPricesProduct on Product {
    id
    title
    handle
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
      }
    }
  }
  query SpecialPricesProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: TITLE) {
      nodes {
        ...SpecialPricesProduct
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
