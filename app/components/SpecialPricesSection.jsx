import {useState, useRef, useEffect} from 'react';
import Button from './Button';
import {ProductItem} from './ProductItem';
import cuteBg from '~/assets/cute-bg.svg?url';
import redLoveIcon from '~/assets/red-love.svg?url';

export default function SpecialPricesSection({products = []}) {
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);
  const [isHydrated, setIsHydrated] = useState(false);

  // Calculate how many products to show per page - only called in useEffect
  const getProductsPerPage = () => {
    if (window.innerWidth < 640) return 2; // Mobile: 2 products
    if (window.innerWidth < 1024) return 2; // Tablet: 2 products
    return 4; // Desktop: 4 products
  };

  // Group products into pages based on current productsPerPage
  const pages = [];
  for (let i = 0; i < products.length; i += productsPerPage) {
    pages.push(products.slice(i, i + productsPerPage));
  }

  // Mark as hydrated after first render
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    
    const updateProductsPerPage = () => {
      const perPage = getProductsPerPage();
      setProductsPerPage(perPage);
      const newTotal = Math.ceil(products.length / perPage);
      setTotal(newTotal);
    };
    
    updateProductsPerPage();
    window.addEventListener('resize', updateProductsPerPage);
    return () => window.removeEventListener('resize', updateProductsPerPage);
  }, [products.length, isHydrated]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    
    const updateTotals = () => {
      const pageWidth = el.clientWidth; // Use clientWidth (visible container width)
      const pages = Math.max(1, Math.round(el.scrollWidth / pageWidth));
      setTotal(pages);
      setPage(Math.round(el.scrollLeft / pageWidth));
    };
    
    updateTotals();
    
    const onScroll = () => {
      const pageWidth = el.clientWidth;
      setPage(Math.round(el.scrollLeft / pageWidth));
    };
    
    el.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', updateTotals);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateTotals);
    };
  }, [productsPerPage]);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section
      className="relative w-full py-8 sm:py-12 md:py-16 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, white, #ffeff1 30%, white)',
      }}
    >
      {/* Background SVG */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url(${cuteBg})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header Section - Title and Description */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 mb-8 sm:mb-12 md:mb-16">
          {/* Left side - Title */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                Cuteness At Special{' '}
                <span className="relative inline-flex items-center">
                  Prices
                  <img
                    src={redLoveIcon}
                    alt="Special icon"
                    width={24}
                    height={24}
                    className="ml-1 sm:ml-2 w-4 h-4 sm:w-6 sm:h-6"
                  />
                </span>
              </h2>
            </div>
          </div>

          {/* Right side - Description and Button */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6 text-center lg:text-left px-4 sm:px-0">
              Discover Amazing Deals On Our Beloved Collection! From Limited
              Edition Discounts To Bundle Specials, Treat Yourself Or Your
              Loved Ones To These Irresistible Cuteness At Special Prices.
            </p>

            <div className="flex justify-center lg:justify-start px-4 sm:px-0">
              <Button href="/collections/all" variant="primary" size="medium">
                Shop Bestsellers
              </Button>
            </div>
          </div>
        </div>

        {/* Product Cards Section - Horizontal scrollable slider */}
        <div className="relative overflow-hidden">
          <style>{`
            .product-slider::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="relative overflow-hidden">
            <div 
              className="relative overflow-hidden mx-auto px-4 sm:px-0"
              style={{
                width: `${(280 * productsPerPage) + (24 * (productsPerPage - 1))}px`,
                maxWidth: '100%'
              }}
            >
              <div
                ref={trackRef}
                className="product-slider flex gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory"
                style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
              >
              {pages.map((pageProducts, pageIndex) => {
                // Calculate exact page width: (280px card * perPage) + (gap * (perPage - 1))
                const cardWidth = 280;
                const gap = 24;
                const pageWidth = (cardWidth * productsPerPage) + (gap * (productsPerPage - 1));
                
                return (
                  <div
                    key={pageIndex}
                    className="flex-none snap-start flex flex-nowrap"
                    style={{
                      width: `${pageWidth}px`,
                      minWidth: `${pageWidth}px`,
                      maxWidth: `${pageWidth}px`,
                      gap: `${gap}px`
                    }}
                  >
                    {pageProducts.map((product, index) => {
                      return (
                        <div 
                          key={product.id} 
                          className="product-card flex-none"
                          style={{
                            width: `${cardWidth}px`,
                            minWidth: `${cardWidth}px`,
                            maxWidth: `${cardWidth}px`,
                            flexShrink: 0
                          }}
                        >
                          <ProductItem
                            product={product}
                            loading={pageIndex === 0 && index < 4 ? 'eager' : 'lazy'}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Left Arrow */}
            <button
              onClick={() => {
                const el = trackRef.current;
                if (!el) return;
                const pageWidth = el.clientWidth;
                const newPage = Math.max(0, page - 1);
                el.scrollTo({left: newPage * pageWidth, behavior: 'smooth'});
              }}
              disabled={page === 0}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <svg className="w-5 h-5 text-[#c0424e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dot Navigation */}
            <div className="flex gap-2">
              {Array.from({length: total}).map((_, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      const el = trackRef.current;
                      if (!el) return;
                      const pageWidth = el.clientWidth;
                      el.scrollTo({left: index * pageWidth, behavior: 'smooth'});
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === page 
                        ? 'w-6 bg-pink-500' 
                        : 'w-2 bg-pink-200 hover:bg-pink-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              })}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => {
                const el = trackRef.current;
                if (!el) return;
                const pageWidth = el.clientWidth;
                const newPage = Math.min(total - 1, page + 1);
                el.scrollTo({left: newPage * pageWidth, behavior: 'smooth'});
              }}
              disabled={page === total - 1}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <svg className="w-5 h-5 text-[#c0424e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}