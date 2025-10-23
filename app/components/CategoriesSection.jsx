import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';

const categories = [
  {
    id: 'plushies',
    title: 'Plushies & Stuffed Animals',
    image: '/pluse-1.png',
    href: '/collections/plushies'
  },
  {
    id: 'kawaii',
    title: 'Kawaii Lifestyle',
    image: '/plush-2.png',
    href: '/collections/kawaii'
  },
  {
    id: 'baby-kids',
    title: 'Baby & Kids',
    image: '/plush-3.png',
    href: '/collections/baby-kids'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    image: '/plush-4.png',
    href: '/collections/accessories'
  }
];

// Second row with different names and mixed up categories
const secondRowCategories = [
  {
    id: 'cozy-home',
    title: 'Cozy Home',
    image: '/plush-2.png', // Using kawaii image for cozy home
    href: '/collections/cozy-home'
  },
  {
    id: 'toys-games',
    title: 'Toys & Games',
    image: '/pluse-1.png', // Using plushies image for toys
    href: '/collections/toys-games'
  },
  {
    id: 'fashion-style',
    title: 'Fashion & Style',
    image: '/plush-4.png', // Using accessories image for fashion
    href: '/collections/fashion-style'
  },
  {
    id: 'nursery-kids',
    title: 'Nursery & Kids',
    image: '/plush-3.png', // Using baby-kids image for nursery
    href: '/collections/nursery-kids'
  }
];

// Category Card Component
const CategoryCard = ({ category }) => (
  <Link
    key={category.id}
    href={category.href}
    className="group flex flex-col items-center cursor-pointer"
  >
    {/* Category Image Container */}
    <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 mb-4">
      {/* Outer circle - very light pink/white border */}
      <div className="absolute inset-0 rounded-full bg-white border-4 border-gray-50 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        {/* Inner circle - light pink background */}
        <div className="absolute inset-2 rounded-full bg-linear-to-br from-[#FFF0F2] to-[#FFE8EB] flex items-center justify-center overflow-hidden">
          <Image
            data={{url: category.image, altText: category.title, width: 160, height: 160}}
            className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
    </div>

    {/* Category Title */}
    <h3 className="text-center text-sm md:text-lg font-medium text-gray-900 group-hover:text-[#ff7380] transition-colors duration-300 leading-tight">
      {category.title}
    </h3>
  </Link>
);

export default function CategoriesSection() {
  return (
    <section className="w-full min-h-screen bg-white py-16 px-4 flex flex-col justify-center">
      <div className="w-full max-w-none mx-auto px-8">
        {/* Categories Tag */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#ff7380] text-white px-6 py-3 rounded-full text-base font-medium">
            Categories
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 font-nunito">
            Find Your Favorite Cuteness
          </h2>
        </div>

        {/* First Row - Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 lg:gap-20 mb-16">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Second Row - Cloned Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 lg:gap-20">
          {secondRowCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
