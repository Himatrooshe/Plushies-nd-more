import {useEffect, useRef} from 'react';
import {ProductItem} from './ProductItem';
import Button from './Button';

export default function NewArrivalsSection({products = []}) {
  const gridRef = useRef(null);

  useEffect(() => {
    const updateCardScale = () => {
      if (!gridRef.current) return;
      
      const cards = gridRef.current.querySelectorAll('.responsive-product-card > div');
      if (cards.length === 0) return;
      
      const gridContainer = gridRef.current;
      const containerWidth = gridContainer.offsetWidth;
      if (containerWidth === 0) return; // Not yet rendered
      
      if (window.innerWidth < 640) {
        // Mobile: calculate scale based on available width (2 columns)
        const gap = 12; // gap-x-3 = 12px
        const availableWidthPerCard = (containerWidth - gap) / 2;
        const scale = Math.min(1, availableWidthPerCard / 280);
        
        cards.forEach((card) => {
          const scaledHeight = 440 * scale;
          card.style.transform = `scale(${scale})`;
          card.style.height = `${scaledHeight}px`;
          // Update parent grid item height to match scaled card
          const parent = card.closest('.responsive-product-card');
          if (parent) {
            parent.style.height = `${scaledHeight}px`;
            parent.style.minHeight = `${scaledHeight}px`;
          }
        });
      } else if (window.innerWidth < 1024) {
        // Tablet (640-1023px): 2 columns, scale if needed
        const gap = 16; // gap-x-4 = 16px  
        const availableWidthPerCard = (containerWidth - gap) / 2;
        const scale = Math.min(1, availableWidthPerCard / 280);
        
        cards.forEach((card) => {
          if (scale < 1) {
            const scaledHeight = 440 * scale;
            card.style.transform = `scale(${scale})`;
            card.style.height = `${scaledHeight}px`;
            const parent = card.closest('.responsive-product-card');
            if (parent) {
              parent.style.height = `${scaledHeight}px`;
            }
          } else {
            card.style.transform = 'none';
            card.style.height = '440px';
            const parent = card.closest('.responsive-product-card');
            if (parent) {
              parent.style.height = 'auto';
            }
          }
        });
      } else if (window.innerWidth < 1240) {
        // Medium Desktop (1024-1239px): 3 columns, full size - no scaling needed
        cards.forEach((card) => {
          card.style.transform = 'none';
          card.style.height = '440px';
          const parent = card.closest('.responsive-product-card');
          if (parent) {
            parent.style.height = 'auto';
            parent.style.minHeight = '0';
          }
        });
      } else {
        // Large Desktop (>= 1240px): 4 columns, full size - no scaling needed
        cards.forEach((card) => {
          card.style.transform = 'none';
          card.style.height = '440px';
          const parent = card.closest('.responsive-product-card');
          if (parent) {
            parent.style.height = 'auto';
            parent.style.minHeight = '0';
          }
        });
      }
    };

    // Initial calculation with small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateCardScale, 50);
    
    // Update on resize
    window.addEventListener('resize', updateCardScale);
    
    // Also update when products change or after a brief delay
    const observer = new ResizeObserver(() => {
      updateCardScale();
    });
    
    if (gridRef.current) {
      observer.observe(gridRef.current);
    }
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateCardScale);
      observer.disconnect();
    };
  }, [products]);
  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* New Arrivals Badge */}
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="bg-[#ff7380] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
            New Arrivals
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 px-4">
            Fresh & Cuddly Arrivals
          </h2>
        </div>

        {/* Description */}
        <div className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto px-4">
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
            Say Hello To The Latest Cuteness! From Disney Tsundere Plushies To
            Adorable Mini Flopsies, Our New Arrivals Are Perfect Gifts Or Sweet
            Treats For Yourself. Don't Miss Out - Our New Cuties Sell Fast!
          </p>
        </div>

        {/* Product Grid */}
        <style>{`
          @media (min-width: 1024px) and (max-width: 1239px) {
            .product-grid-responsive {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              gap: 2.5rem !important; /* 40px gap */
            }
          }
          @media (min-width: 1240px) {
            .product-grid-responsive {
              grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
              gap: 2.5rem !important; /* 40px gap */
            }
          }
        `}</style>
        <div 
          ref={gridRef}
          className="product-grid-responsive grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-10 gap-y-4 sm:gap-y-4 md:gap-y-6 lg:gap-y-10 mb-8 sm:mb-12"
        >
          {products && products.length > 0 ? (
            products.map((product) => (
              <div 
                key={product.id} 
                className="flex justify-center items-start responsive-product-card"
              >
                <div 
                  style={{
                    width: '280px',
                    height: '440px',
                    margin: '0 auto',
                    transformOrigin: 'center top',
                    flexShrink: 0
                  }}
                >
                  <ProductItem product={product} loading="lazy" />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 text-sm sm:text-base">No products available at the moment.</p>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button href="/collections/all" variant="primary" size="medium">
            See What's New
          </Button>
        </div>
      </div>
    </section>
  );
}
