import Button from './Button';
import ProductCard from './ProductCard';

export default function SpecialPricesSection({ products = [] }) {

  return (
    <section className="relative w-full py-16 px-4 overflow-hidden">
      {/* Background SVG */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/cute-bg.svg)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header Section - Title and Description */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          {/* Left side - Title */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-nunito">
                Cuteness At Special{' '}
                <span className="relative inline-flex items-center">
                  Prices
                  <img
                    src="/red-love.svg"
                    alt="Special icon"
                    width={24}
                    height={24}
                    className="ml-2"
                  />
                </span>
              </h2>
            </div>
          </div>

          {/* Right side - Description and Button */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 text-center lg:text-left">
              Meet The Plushies Everyone Is Obsessed With! From The Viral Crawling Crab To The Snuggly Support Chicken Nuggets, Our Bestsellers Are Guaranteed To Melt Hearts.
            </p>
            
            <div className="flex justify-center lg:justify-start">
              <Button 
                href="/products"
                variant="primary"
                size="medium"
              >
                Shop Bestsellers
              </Button>
            </div>
          </div>
        </div>

        {/* Product Cards Section */}
        <div className="flex justify-center">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {products.map((product) => (
              <div key={product.id} className="shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 gap-2">
          {products.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === 1 ? 'bg-gray-900 w-3' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
