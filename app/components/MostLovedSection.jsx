import Button from './Button';
import ProductCard from './ProductCard';

export default function MostLovedSection({ products = [] }) {

  return (
    <>
      <section className="relative w-full min-h-screen py-16 px-4 overflow-hidden">
        {/* Background SVG */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/most-loved-bg.svg)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col">
          {/* Header Section - Title and Description */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
            {/* Left side - Title */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-nunito">
                  Our Most{' '}
                  <span className="relative inline-flex items-center">
                    Loved
                    <img
                      src="/Star 1.svg"
                      alt="Star"
                      width={32}
                      height={32}
                      className="ml-2"
                    />
                  </span>
                  {' '}Cuties
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

          {/* Pagination pills */}
          <div className="flex justify-center mt-8 gap-2">
            {products.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === 0 ? 'w-8 bg-gray-900' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* White Curved Separator */}
      <div className="relative w-full bg-white overflow-hidden">
        <div className="relative">
          {/* Curved top edge */}
          <svg
            className="w-full h-20 block"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ display: 'block' }}
          >
            <path
              d="M0,120 L0,60 C200,40 400,20 600,40 C800,60 1000,100 1200,80 L1200,120 Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </>
  );
}