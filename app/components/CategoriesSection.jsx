import {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router';
import pluse1 from '~/assets/pluse-1.png?url';
import plush2 from '~/assets/pluse-2.png?url';
import plush3 from '~/assets/pluse-3.png?url';
import plush4 from '~/assets/pluse-4.png?url';
import plush5 from '~/assets/pluse-5.png?url';
import plush6 from '~/assets/pluse-6.png?url';
import plush7 from '~/assets/pluse-7.png?url';
import plush8 from '~/assets/pluse-8.png?url';


const categories = [
  {
    id: 'plush-stuffed',
    title: 'Plush & Stuffed Animals',
    image: pluse1,
    href: '/collections/plush-stuffed-animals'
  },
  {
    id: 'home-decor-gifts',
    title: 'Home Decor & Gifts',
    image: plush2,
    href: '/collections/home-decor-gifts'
  },
  {
    id: 'sensory-fidget',
    title: 'Sensory & Fidget',
    image: plush3,
    href: '/collections/sensory-fidget'
  },
  {
    id: 'interactive-toy',
    title: 'Interactive Toy',
    image: plush4,
    href: '/collections/interactive-toy'
  }
];

// Second row with different names and mixed up categories
const secondRowCategories = [
  {
    id: 'baby-nursery',
    title: 'Baby & Nursery',
    image: plush5,
    href: '/collections/baby-nursery'
  },
  {
    id: 'bath-bath-toys',
    title: 'Bath & Bath Toys',
    image: plush6,
    href: '/collections/bath-bath-toys'
  },
  {
    id: 'character-licensed',
    title: 'Character & Licensed',
    image: plush7,
    href: '/collections/character-licensed'
  },
  {
    id: 'bath-bath-toys-2',
    title: 'Bath & Bath Toys',
    image: plush8,
    href: '/collections/bath-bath-toys'
  }
];

// Combine all categories
const allCategories = [...categories, ...secondRowCategories];

// Category Card Component
const CategoryCard = ({ category, isMobile = false }) => (
  <Link
    key={category.id}
    to={category.href}
    className={`group flex flex-col items-center cursor-pointer w-full ${isMobile ? 'flex-shrink-0' : ''}`}
  >
    {/* Category Image Container */}
    <div className={`relative mb-2 sm:mb-3 md:mb-4 ${
      isMobile 
        ? 'w-32 h-32 sm:w-36 sm:h-36' 
        : 'w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56'
    }`}>
      {/* Outer circle - very light pink/white border */}
      <div className="absolute inset-0 rounded-full bg-white border-2 sm:border-4 border-gray-50 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        {/* Inner circle - light pink background */}
        <div className="absolute inset-2 rounded-full bg-linear-to-br from-[#FFF0F2] to-[#FFE8EB] flex items-center justify-center overflow-hidden">
          <img
            src={category.image}
            alt={category.title}
            className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
    </div>

    {/* Category Title */}
    <h3 className={`text-center font-medium text-gray-900 group-hover:text-[#c0424e] transition-colors duration-300 leading-tight px-2 ${
      isMobile 
        ? 'text-xs sm:text-sm' 
        : 'text-xs sm:text-sm md:text-base lg:text-lg'
    }`}>
      {category.title}
    </h3>
  </Link>
);

export default function CategoriesSection() {
  const sliderRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Calculate total pages (2 categories per page on mobile)
  const totalPages = Math.ceil(allCategories.length / 2);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || typeof window === 'undefined') return;

    const updatePage = () => {
      const containerWidth = slider.clientWidth;
      const scrollPosition = slider.scrollLeft;
      
      // Get the first card element to measure
      const firstCard = slider.querySelector('.category-card-mobile');
      if (!firstCard) return;
      
      const itemWidth = firstCard.offsetWidth;
      const gap = 12; // gap-3 = 12px
      const pageWidth = (itemWidth + gap) * 2; // 2 items per page
      
      // Calculate which page is most visible
      // Use floor with a threshold (30%) so the dot doesn't change too early
      const threshold = pageWidth * 0.3;
      let page = Math.floor((scrollPosition + threshold) / pageWidth);
      
      // Clamp page to valid range
      page = Math.max(0, Math.min(page, totalPages - 1));
      
      setCurrentPage(page);
    };

    const handleScroll = () => {
      requestAnimationFrame(updatePage);
    };

    slider.addEventListener('scroll', handleScroll, {passive: true});
    window.addEventListener('resize', updatePage);
    
    // Initial update
    updatePage();

    return () => {
      slider.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updatePage);
    };
  }, [totalPages]);

  return (
    <section className="w-full min-h-0 md:min-h-screen bg-white py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 flex flex-col justify-center">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 md:px-8">
        {/* Categories Tag */}
        <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
          <div className="bg-[#c0424e] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium">
            Categories
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-6 sm:mb-10 md:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 px-4">
            Find Your Favorite Cuteness
          </h2>
        </div>

        {/* Mobile: Horizontal Slider - Desktop: Grid */}
        {/* Mobile Slider Container */}
        <div className="md:hidden">
          <div 
            ref={sliderRef}
            className="overflow-x-auto scrollbar-hide -mx-4 px-4 snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .categories-slider-container {
                display: flex;
                gap: 0.75rem;
              }
              .category-card-mobile {
                flex-shrink: 0;
                width: calc(50vw - 1.5rem);
                min-width: calc(50vw - 1.5rem);
              }
            `}</style>
            <div className="categories-slider-container">
              {allCategories.map((category, index) => (
                <div 
                  key={category.id} 
                  className="category-card-mobile snap-start"
                  style={{scrollSnapAlign: 'start'}}
                >
                  <CategoryCard category={category} isMobile={true} />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              {Array.from({length: totalPages}).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const slider = sliderRef.current;
                    if (slider) {
                      const firstCard = slider.querySelector('.category-card-mobile');
                      if (!firstCard) return;
                      
                      const itemWidth = firstCard.offsetWidth;
                      const gap = 12;
                      const pageWidth = (itemWidth + gap) * 2; // 2 items per page
                      const targetScroll = index * pageWidth;
                      
                      slider.scrollTo({
                        left: targetScroll,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    currentPage === index
                      ? 'w-2.5 h-2.5 bg-[#c0424e]'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} isMobile={false} />
          ))}
          {secondRowCategories.map((category) => (
            <CategoryCard key={category.id} category={category} isMobile={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
