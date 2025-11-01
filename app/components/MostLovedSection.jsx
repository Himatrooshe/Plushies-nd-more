import {useState, useRef, useEffect} from 'react';
import Button from './Button';
import {ProductItem} from './ProductItem';
import mostLovedBg from '~/assets/most-loved-bg.svg?url';
import starIcon from '~/assets/Star 1.svg?url';

export default function MostLovedSection({products = []}) {
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);

  // Calculate how many products to show per page
  const getProductsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile: 1 product
      if (window.innerWidth < 1024) return 2; // Tablet: 2 products
      return 4; // Desktop: 4 products
    }
    return 4; // Default for SSR
  };

  // Group products into pages based on current productsPerPage
  const pages = [];
  for (let i = 0; i < products.length; i += productsPerPage) {
    pages.push(products.slice(i, i + productsPerPage));
  }

  useEffect(() => {
    const updateProductsPerPage = () => {
      const perPage = getProductsPerPage();
      setProductsPerPage(perPage);
      const newTotal = Math.ceil(products.length / perPage);
      setTotal(newTotal);
    };
    
    updateProductsPerPage();
    window.addEventListener('resize', updateProductsPerPage);
    return () => window.removeEventListener('resize', updateProductsPerPage);
  }, [products.length]);

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
    <>
      <section className="relative w-full min-h-screen py-8 sm:py-12 md:py-16 px-4 overflow-hidden" style={{background: 'linear-gradient(to bottom, transparent, #ffe8eb 30%, white)'}}>
        {/* Background SVG */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: `url(${mostLovedBg})`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col">
          {/* Header Section - Title and Description */}
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 mb-8 sm:mb-12 md:mb-16">
            {/* Left side - Title */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                  Our Most{' '}
                  <span className="relative inline-flex items-center">
                    Loved
                    <img
                      src={starIcon}
                      alt="Star"
                      width={24}
                      height={24}
                      className="ml-1 sm:ml-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8"
                    />
                  </span>{' '}
                  Cuties
                </h2>
              </div>
            </div>

            {/* Right side - Description and Button */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6 text-center lg:text-left px-4 sm:px-0">
                Meet The Plushies Everyone Is Obsessed With! From The Viral
                Crawling Crab To The Snuggly Support Chicken Nuggets, Our
                Bestsellers Are Guaranteed To Melt Hearts.
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
            <div 
              className="relative overflow-hidden mx-auto"
              style={{
                width: `${(280 * productsPerPage) + (24 * (productsPerPage - 1))}px`,
                maxWidth: '100%'
              }}
            >
              <div
                ref={trackRef}
                className="product-slider flex gap-6 overflow-x-auto snap-x snap-mandatory"
                style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
              >
                {pages.map((pageProducts, pageIndex) => {
                  // Calculate exact page width: (280px card * perPage) + (24px gap * (perPage - 1))
                  const cardWidth = 280;
                  const gap = 24;
                  const pageWidth = (cardWidth * productsPerPage) + (gap * (productsPerPage - 1));
                  
                  return (
                    <div
                      key={pageIndex}
                      className="flex-none snap-start flex gap-6"
                      style={{
                        width: `${pageWidth}px`,
                        minWidth: `${pageWidth}px`,
                        maxWidth: `${pageWidth}px`
                      }}
                    >
                      {pageProducts.map((product, index) => (
                        <div 
                          key={product.id} 
                          className="product-card flex-none flex justify-center"
                          style={{
                            width: '280px',
                            minWidth: '280px',
                            maxWidth: '280px',
                            flexShrink: 0
                          }}
                        >
                          <ProductItem
                            product={product}
                            loading={pageIndex === 0 && index < 4 ? 'eager' : 'lazy'}
                          />
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dot Navigation */}
            <div className="flex justify-center gap-2 mt-8">
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
          </div>
        </div>
      </section>

      {/* Curved Separator with gradient background */}
      <div className="relative w-full bg-white overflow-hidden">
        <div className="relative">
          {/* Curved top edge - Made more visible on large screens */}
          <svg
            className="w-full h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 block"
            viewBox="0 0 1200 150"
            preserveAspectRatio="none"
            style={{display: 'block', background: 'linear-gradient(to bottom, #FFE8EB, white)'}}
          >
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffe8eb" stopOpacity="1" />
                <stop offset="30%" stopColor="#fff0f0" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#fff8f8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="white" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M0,150 L0,80 C150,30 300,10 600,50 C900,90 1050,120 1200,100 L1200,150 Z"
              fill="url(#curveGradient)"
            />
          </svg>
        </div>
      </div>
    </>
  );
}