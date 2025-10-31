import {useLoaderData} from 'react-router';
import {useEffect, useRef, useState} from 'react';
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
import {useRevealAnimations} from '~/components/useRevealAnimations';
import detailsImg from '~/assets/detials-1.png?url';

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
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  // Fetch related products (recommendations)
  let relatedProducts = {nodes: []};
  try {
    if (product?.id) {
      const rec = await storefront.query(RELATED_PRODUCTS_QUERY, {
        variables: {productId: product.id},
      });
      relatedProducts = rec?.productRecommendations
        ? {nodes: rec.productRecommendations}
        : rec?.relatedProducts || {nodes: []};
    }
  } catch (_) {}

  return {
    product,
    relatedProducts,
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

/** Related products carousel component */
function RelatedCarousel({cards}) {
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const updateTotals = () => {
      const pages = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
      setTotal(pages);
      setPage(Math.round(el.scrollLeft / el.clientWidth));
    };
    updateTotals();
    const onScroll = () => setPage(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', updateTotals);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateTotals);
    };
  }, []);

  const scrollByPage = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({left: dir * el.clientWidth, behavior: 'smooth'});
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-1"
        style={{scrollbarWidth: 'none'}}
      >
        {cards.map((p) => {
          const image = p?.featuredImage;
          const price = p?.priceRange?.minVariantPrice;
          const priceText = price ? new Intl.NumberFormat('en-US', {style: 'currency', currency: price.currencyCode}).format(parseFloat(price.amount)) : '';
          return (
            <div key={p.id} className="w-[260px] sm:w-[280px] lg:w-[300px] flex-none snap-start">
              <div className="rounded-[20px] border border-rose-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="relative">
                  <div className="aspect-square bg-rose-50 flex items-center justify-center overflow-hidden">
                    {image ? (
                      <img src={image.url} alt={image.altText || p.title} className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-gray-400 text-sm">{p.title}</span>
                    )}
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] px-2 py-1 rounded-full bg-white/90 border border-rose-200 text-[#c0424e] font-semibold shadow">Hot Selling ❤️</span>
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-rose-200 flex items-center justify-center text-[#c0424e] hover:bg-white">❤</button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">{p.title}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-[#ff7380]">{priceText}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <a href={`/products/${p.handle}`} className="flex-1 bg-[#ff7380] hover:bg-[#ff5c6c] text-white px-4 py-2 rounded-full text-sm font-medium text-center transition-colors">Learn More</a>
                    <button className="ml-2 w-8 h-8 rounded-full bg-white border border-rose-200 text-[#c0424e]">▾</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <button onClick={() => scrollByPage(-1)} aria-label="Previous" className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-rose-200 shadow items-center justify-center text-[#c0424e]">‹</button>
      <button onClick={() => scrollByPage(1)} aria-label="Next" className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-rose-200 shadow items-center justify-center text-[#c0424e]">›</button>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({length: total}).map((_, i) => (
          <span key={i} className={`h-2 rounded-full transition-all ${i === page ? 'w-6 bg-[#ff7380]' : 'w-2 bg-gray-300'}`}></span>
        ))}
      </div>
    </div>
  );
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

  const {title, descriptionHtml, images} = product;
  const [activeTab, setActiveTab] = useState('description');
  const pageRef = useRef(null);
  useRevealAnimations(pageRef);
  
  // Extract images from Shopify GraphQL response
  const productImages = images?.edges?.map(edge => edge.node) || [];
  const cuteFeatures = [
    { key: 'quality', emoji: '🧸', title: 'Super soft, premium', desc: 'Plush fabric and cloud-like stuffing for extra cuddles', gradient: 'from-rose-50 to-pink-50' },
    { key: 'handmade', emoji: '🧵', title: 'Lovingly handcrafted', desc: 'Carefully stitched details that last beyond 1,000 hugs', gradient: 'from-amber-50 to-yellow-50' },
    { key: 'safe', emoji: '🛡️', title: 'Safe for all ages', desc: 'Non-toxic materials and secure seams for peace of mind', gradient: 'from-blue-50 to-cyan-50' },
    { key: 'wash', emoji: '🫧', title: 'Easy care', desc: 'Machine washable on gentle—ready for more adventures', gradient: 'from-purple-50 to-violet-50' },
  ];
  const suggested = (/** @type {any} */ (useLoaderData())).relatedProducts?.nodes || [];
  
  // State for selected image
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // If user clicks a thumbnail, we store the exact image here to override
  const [manualImage, setManualImage] = useState(null);

  // Prefer user-selected image, otherwise the variant image, then the selected thumbnail
  const mainImage = manualImage || selectedVariant?.image || productImages[selectedImageIndex];
  
  // When the selected variant has a specific image, sync the thumbnail selection to it
  useEffect(() => {
    const variantImgId = selectedVariant?.image?.id;
    if (!variantImgId) return;
    const idx = productImages.findIndex((img) => img.id === variantImgId);
    if (idx >= 0 && idx !== selectedImageIndex) {
      setSelectedImageIndex(idx);
    }
    // When variant changes, reset manual image to allow variant image to take precedence
    setManualImage(null);
  }, [selectedVariant?.image?.id]);

  // Heuristic: if variant has no specific image, try match by selected color name in image alt/url
  useEffect(() => {
    if (selectedVariant?.image) return; // handled by previous effect
    const color = (selectedVariant?.selectedOptions || [])
      .find((o) => o.name?.toLowerCase() === 'color')?.value?.toLowerCase();
    if (!color) return;
    const normalize = (s) => s?.toLowerCase()?.replace(/[^a-z0-9]+/g, '') || '';
    const target = normalize(color);
    const idx = productImages.findIndex((img) => {
      const alt = normalize(img.altText);
      const url = normalize(img.url);
      return alt.includes(target) || url.includes(target);
    });
    if (idx >= 0 && idx !== selectedImageIndex) {
      setSelectedImageIndex(idx);
    }
  }, [selectedVariant?.selectedOptions, productImages]);

  // Function to handle image selection
  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
    setManualImage(productImages[index] || null);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-rose-50/40 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <a href="/" className="hover:text-gray-700">Home</a>
            <span>/</span>
            <a href="/collections/all" className="hover:text-gray-700">Products</a>
            <span>/</span>
            <span className="text-gray-900">{title}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4 reveal-panel">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl shadow-lg border border-rose-100 overflow-hidden">
              {mainImage ? (
                <ProductImage image={mainImage} />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
              </div>
              )}
            </div>
            
            {/* Thumbnail Images - Dynamic Grid */}
            {productImages.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {productImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white rounded-xl border overflow-hidden cursor-pointer transition-all duration-200 shrink-0 ${
                      index === selectedImageIndex ? 'border-rose-300 ring-2 ring-rose-200 scale-105' : 'border-rose-100 hover:border-rose-200 hover:scale-102'
                    }`}
                    onClick={() => handleImageSelect(index)}
                  >
                    <div className="w-full h-full">
                      <ProductImage image={image} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6 reveal-panel bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
            {/* Product Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#c0424e] mb-2 tracking-tight">
                {title}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">(4.8) • 127 reviews</span>
                </div>
                <div className="text-sm text-gray-500">SKU: {selectedVariant?.sku || 'N/A'}</div>
              </div>
            </div>

            {/* Price */}
            <div className="py-2">
              <ProductPrice
                price={selectedVariant?.price}
                compareAtPrice={selectedVariant?.compareAtPrice}
                className=""
              />
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              <ProductForm
                productOptions={productOptions}
                selectedVariant={selectedVariant}
              />
            </div>

            {/* Product Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-[#c0424e]">Key Features</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cuteFeatures.map((f) => (
                  <div key={f.key} className={`rounded-2xl border border-rose-100 bg-linear-to-br ${f.gradient} p-4 flex items-start gap-3 hover:shadow-md transition-shadow`}>
                    <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center text-lg">
                      <span aria-hidden>{f.emoji}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{f.title}</div>
                      <div className="text-xs text-gray-600 mt-1">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

        {/* Trust Badges - card style */}
        <div className="pt-6 border-t border-rose-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-rose-100 bg-white p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Quality Guaranteed</div>
                <div className="text-xs text-gray-600">We hand-check every plush</div>
              </div>
            </div>
            <div className="rounded-2xl border border-rose-100 bg-white p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 2c-3.866 0-7 2.015-7 4.5V19h14v-1.5c0-2.485-3.134-4.5-7-4.5z"/></svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Friendly Support</div>
                <div className="text-xs text-gray-600">Real humans, speedy replies</div>
              </div>
            </div>
            <div className="rounded-2xl border border-rose-100 bg-white p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 1l3 5 6 .9-4.5 4.2 1.1 6-5.6-2.9-5.6 2.9 1.1-6L3 6.9 9 6l3-5z"/></svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Secure Checkout</div>
                <div className="text-xs text-gray-600">Encrypted payments, safe & easy</div>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 reveal-panel rounded-2xl border border-rose-100 bg-white/90 p-4 sm:p-6 shadow-sm">
          <div className="">
            <nav className="flex flex-wrap gap-2">
              {[
                {id: 'description', label: 'Description'},
                {id: 'specs', label: 'Specifications'},
                {id: 'reviews', label: 'Reviews (127)'},
                {id: 'shipping', label: 'Shipping & Returns'},
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all border ${
                    activeTab === t.id
                      ? 'bg-[#ffedf0] text-[#c0424e] border-rose-200 shadow-sm'
                      : 'text-gray-600 border-transparent hover:bg-rose-50 hover:text-[#c0424e]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-5 sm:p-6 leading-7 text-gray-800">
                  <div className="space-y-3">
                    <div className="whitespace-pre-line" dangerouslySetInnerHTML={{__html: descriptionHtml}} />
                  </div>
                </div>
                {/* Why You'll Love It */}
                <section className="rounded-2xl border border-rose-100 bg-white p-5 sm:p-6">
                  <div className="mb-4">
                    <span className="px-2 py-0.5 rounded-full bg-[#ffedf0] border border-rose-200 text-[#c0424e] text-xs font-semibold">Features</span>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">Why You’ll Love It</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left list */}
                    <ul className="space-y-3">
                      <li className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                        <div className="text-sm font-semibold text-gray-900">Material</div>
                        <div className="text-xs text-gray-600">Premium ultra-soft cotton + PP cotton stuffing</div>
                      </li>
                      <li className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                        <div className="text-sm font-semibold text-gray-900">Size Options</div>
                      </li>
                      <li className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                        <div className="text-sm font-semibold text-gray-900">Age</div>
                        <div className="text-xs text-gray-600">Suitable for 3+ years</div>
                      </li>
                      <li className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                        <div className="text-sm font-semibold text-gray-900">Care</div>
                        <div className="text-xs text-gray-600">Hand washable, air dry</div>
                      </li>
                      <li className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                        <div className="text-sm font-semibold text-gray-900">Perfect For</div>
                        <div className="text-xs text-gray-600">Gifting, snuggling, décor</div>
                      </li>
                    </ul>
                    {/* Right image */}
                    <div className="rounded-2xl overflow-hidden border border-rose-100">
                      <img src={detailsImg} alt="Plush fabric details" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </section>
              </div>
            )}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-4">
                  <div className="text-xs text-gray-500 mb-1">Brand</div>
                  <div className="text-sm font-medium text-gray-800">{product.vendor || 'Plushies & More'}</div>
                </div>
                <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-4">
                  <div className="text-xs text-gray-500 mb-1">SKU</div>
                  <div className="text-sm font-medium text-gray-800">{selectedVariant?.sku || 'N/A'}</div>
                </div>
                <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-4">
                  <div className="text-xs text-gray-500 mb-1">Material</div>
                  <div className="text-sm font-medium text-gray-800">Plush, PP Cotton</div>
                </div>
                <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-4">
                  <div className="text-xs text-gray-500 mb-1">Care</div>
                  <div className="text-sm font-medium text-gray-800">Machine washable (gentle)</div>
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left side - Reviews List */}
                <div className="rounded-2xl border border-rose-100 bg-white/80 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900">Reviews</h4>
                    <button className="flex items-center gap-1 px-3 py-1 rounded-full border border-rose-200 text-sm text-gray-700 hover:bg-rose-50">
                      Recent
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {[
                      {name: 'Jenny Osborn', avatar: '👤', time: '5 days ago', stars: 5, text: 'I recently purchased the SkyLuxe Wireless Headphones and am absolutely blown away by the experience! From the moment I unboxed them, I could tell they were built with top-notch quality.'},
                      {name: 'Sarah Chen', avatar: '👤', time: '2 weeks ago', stars: 5, text: 'Best plushies ever! My daughter absolutely loves them. The quality is amazing and they\'re so cuddly.'},
                      {name: 'Mike Johnson', avatar: '👤', time: '1 month ago', stars: 4, text: 'Great product, fast shipping. Only gave 4 stars because I wish there were more color options.'},
                    ].map((r, i) => (
                      <div key={i} className="pb-4 border-b border-rose-100 last:border-0">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-lg">{r.avatar}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-900">{r.name}</span>
                              <span className="text-xs text-gray-500">{r.time}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {Array.from({length: 5}).map((_, idx) => (
                                <svg key={idx} className="w-4 h-4 fill-red-500" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                              ))}
                            </div>
                            <p className="text-sm text-gray-700">{r.text}</p>
                            <div className="flex items-center gap-4 mt-3">
                              <button className="text-gray-400 hover:text-gray-600 text-xs flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg> Like</button>
                              <button className="text-gray-400 hover:text-gray-600 text-xs flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg> Reply</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side - Rating breakdown + Write review */}
                <div className="space-y-6">
                  {/* Rating breakdown */}
                  <div className="rounded-2xl border border-rose-100 bg-white/80 p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Rating & Reviews</h4>
                    <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center mb-2">
                      <span className="text-xs text-gray-600">5</span>
                      <div className="h-2 rounded-full bg-gray-200 overflow-hidden"><div className="h-full bg-red-500 w-full"></div></div>
                      <span className="text-xs text-gray-600">400</span>
                    </div>
                    <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center mb-2">
                      <span className="text-xs text-gray-600">4</span>
                      <div className="h-2 rounded-full bg-gray-200 overflow-hidden"><div className="h-full bg-red-400 w-3/4"></div></div>
                      <span className="text-xs text-gray-600">60</span>
                    </div>
                    <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center mb-2">
                      <span className="text-xs text-gray-600">3</span>
                      <div className="h-2 rounded-full bg-gray-200 overflow-hidden"><div className="h-full bg-orange-400 w-1/2"></div></div>
                      <span className="text-xs text-gray-600">25</span>
                    </div>
                    <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center mb-2">
                      <span className="text-xs text-gray-600">2</span>
                      <div className="h-2 rounded-full bg-gray-200 overflow-hidden"><div className="h-full bg-yellow-400 w-1/4"></div></div>
                      <span className="text-xs text-gray-600">10</span>
                    </div>
                    <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center mb-4">
                      <span className="text-xs text-gray-600">1</span>
                      <div className="h-2 rounded-full bg-gray-200 overflow-hidden"><div className="h-full bg-gray-400 w-[10%]"></div></div>
                      <span className="text-xs text-gray-600">5</span>
                    </div>
                    <div className="border-t border-rose-100 pt-4">
                      <div className="text-center">
                        <div className="text-4xl font-black text-gray-900 mb-1">5.0</div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {Array.from({length: 5}).map((_, idx) => (
                            <svg key={idx} className="w-5 h-5 fill-red-500" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">500 reviews</span>
                      </div>
                    </div>
                  </div>

                  {/* Write a review */}
                  <div className="rounded-2xl border border-rose-100 bg-white/80 p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Write a Review</h4>
                    <p className="text-xs text-gray-600 mb-4">Tell us your experience</p>
                    <textarea className="w-full h-24 rounded-xl border border-rose-200 p-3 text-sm bg-rose-50/50 focus:outline-none focus:ring-2 focus:ring-rose-300" placeholder="Tell us your experience"></textarea>
                    <div className="mt-4 flex justify-end">
                      <button className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold flex items-center gap-2 hover:bg-red-600 transition-colors">
                        Post it <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="text-sm text-gray-700 space-y-2">
                <p>Orders ship within 1–3 business days. Tracking provided.</p>
                <p>Hassle-free returns within 30 days for unused items.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 reveal-panel">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">More Adorable Friends You’ll Love</h2>
            <p className="mt-2 text-sm text-gray-500 max-w-3xl mx-auto">
              Say hello to the latest cuteness! Perfect gifts or sweet treats for yourself. Don’t miss out—our new cuties sell fast!
            </p>
          </div>
          {/* Carousel */}
          <RelatedCarousel cards={suggested} />
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
    images(first: 10) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
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

const RELATED_PRODUCTS_QUERY = `#graphql
  fragment RelatedProductImage on Image {
    id
    url
    altText
    width
    height
  }
  query RelatedProducts($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      featuredImage { ...RelatedProductImage }
      priceRange {
        minVariantPrice { amount currencyCode }
      }
    }
  }
`;

/** @typedef {import('./+types/products.$handle').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
