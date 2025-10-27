import {useState, useRef} from 'react';
import Button from './Button';
import {ProductItem} from './ProductItem';
import cuteBg from '~/assets/cute-bg.svg?url';
import redLoveIcon from '~/assets/red-love.svg?url';

export default function SpecialPricesSection({products = []}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardWidth = 320; // Approximate card width with gap

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!products || products.length === 0) {
    return null;
  }

  const slidesToShow = Math.min(products.length, 4);
  const totalSlides = Math.ceil(products.length / slidesToShow);

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

        {/* Product Cards Section - Manual Slides */}
        <div className="flex flex-col items-center">
          <div
            ref={scrollRef}
            className="relative overflow-hidden w-full"
          >
            <div
              className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * cardWidth * slidesToShow}px)`,
                willChange: 'transform',
              }}
            >
              {products.map((product, index) => (
                <div key={product.id} className="shrink-0">
                  <ProductItem product={product} loading={index < 4 ? 'eager' : 'lazy'} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({length: totalSlides}).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-pink-500 w-8'
                    : 'bg-pink-200 hover:bg-pink-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}