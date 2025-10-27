import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import pluse1 from '~/assets/pluse-1.png?url';
import plush2 from '~/assets/plush-2.png?url';
import plush3 from '~/assets/plush-3.png?url';
import plush4 from '~/assets/plush-4.png?url';

const categories = [
  {
    id: 'plushies',
    title: 'Plushies & Stuffed Animals',
    image: pluse1,
    href: '/collections/plushies'
  },
  {
    id: 'kawaii',
    title: 'Kawaii Lifestyle',
    image: plush2,
    href: '/collections/kawaii'
  },
  {
    id: 'baby-kids',
    title: 'Baby & Kids',
    image: plush3,
    href: '/collections/baby-kids'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    image: plush4,
    href: '/collections/accessories'
  }
];

// Second row with different names and mixed up categories
const secondRowCategories = [
  {
    id: 'cozy-home',
    title: 'Cozy Home',
    image: plush2,
    href: '/collections/cozy-home'
  },
  {
    id: 'toys-games',
    title: 'Toys & Games',
    image: pluse1,
    href: '/collections/toys-games'
  },
  {
    id: 'fashion-style',
    title: 'Fashion & Style',
    image: plush4,
    href: '/collections/fashion-style'
  },
  {
    id: 'nursery-kids',
    title: 'Nursery & Kids',
    image: plush3,
    href: '/collections/nursery-kids'
  }
];

// Category Card Component
const CategoryCard = ({ category }) => (
  <Link
    key={category.id}
    to={category.href}
    className="group flex flex-col items-center cursor-pointer"
  >
    {/* Category Image Container */}
    <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 mb-3 sm:mb-4">
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
    <h3 className="text-center text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900 group-hover:text-[#c0424e] transition-colors duration-300 leading-tight px-2">
      {category.title}
    </h3>
  </Link>
);

export default function CategoriesSection() {
  return (
    <section className="w-full min-h-screen bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 flex flex-col justify-center">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 md:px-8">
        {/* Categories Tag */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-[#c0424e] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium">
            Categories
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 px-4">
            Find Your Favorite Cuteness
          </h2>
        </div>

        {/* All Categories in 2 Rows - 2 columns mobile, 4 columns desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
          {secondRowCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
