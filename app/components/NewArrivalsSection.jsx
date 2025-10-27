import {ProductItem} from './ProductItem';
import Button from './Button';

export default function NewArrivalsSection({products = []}) {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="flex justify-center">
                <ProductItem product={product} loading="lazy" />
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
