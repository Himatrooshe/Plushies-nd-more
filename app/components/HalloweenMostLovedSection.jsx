import {useState, useRef} from 'react';
import Button from './Button';
import {ProductItem} from './ProductItem';
import lovedBg from '~/assets/loved-bg.svg?url';
import starIcon from '~/assets/Star 1.svg?url';

export default function HalloweenMostLovedSection({products = []}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardWidth = 296; // Card width (280px) + gap (16px) for better calculation

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!products || products.length === 0) {
    return null;
  }

  // Responsive slides to show
  const getSlidesToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile: 1 product
      if (window.innerWidth < 768) return 2; // Small tablet: 2 products
      if (window.innerWidth < 1024) return 3; // Tablet: 3 products
      return 4; // Desktop: 4 products
    }
    return 4; // Default for SSR
  };

  const slidesToShow = getSlidesToShow();
  const totalSlides = Math.ceil(products.length / slidesToShow);

  return (
    <>
      <section className="relative w-full min-h-screen py-8 sm:py-12 md:py-16 px-4 overflow-hidden" style={{background: 'linear-gradient(to bottom, transparent, #2a1f3a 30%, #36294A)'}}>
        {/* Background SVG */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: `url(${lovedBg})`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col">
          {/* Header Section - Title and Description */}
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 mb-8 sm:mb-12 md:mb-16">
            {/* Left side - Title */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  Our Most{' '}
                  <span className="relative inline-flex items-center">
                    Spooky
                    <img
                      src={starIcon}
                      alt="Star"
                      width={24}
                      height={24}
                      className="ml-1 sm:ml-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8"
                    />
                  </span>{' '}
                  Plushies
                </h2>
              </div>
            </div>

            {/* Right side - Description and Button */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6 text-center lg:text-left px-4 sm:px-0">
                Meet The Halloween Plushies Everyone Is Obsessed With! From The Spooky
                Ghosts To The Mysterious Black Cats, Our Halloween Bestsellers Are
                Guaranteed To Cast A Spell On Your Heart.
              </p>

              <div className="flex justify-center lg:justify-start px-4 sm:px-0">
                <Button href="/collections/all" variant="halloween" size="medium">
                  Shop Halloween Collection
                </Button>
              </div>
            </div>
          </div>

          {/* Product Cards Section - Manual Slides */}
          <div className="flex flex-col items-center">
            <div
              ref={scrollRef}
              className="relative overflow-hidden w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto"
            >
              <div
                className="flex gap-4 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * cardWidth * slidesToShow}px)`,
                  willChange: 'transform',
                }}
              >
                {products.map((product, index) => (
                  <div key={product.id} className="shrink-0 w-[280px]">
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
                      ? 'bg-[#6A449E] w-8'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
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
            style={{display: 'block', background: 'linear-gradient(to bottom, #36294A, white)'}}
          >
            <defs>
              <linearGradient id="halloweenCurveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#36294A" stopOpacity="1" />
                <stop offset="30%" stopColor="#4a3a5a" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#6a5a7a" stopOpacity="0.5" />
                <stop offset="100%" stopColor="white" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M0,150 L0,80 C150,30 300,10 600,50 C900,90 1050,120 1200,100 L1200,150 Z"
              fill="url(#halloweenCurveGradient)"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
