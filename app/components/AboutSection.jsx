import Button from './Button';
import grinding from '~/assets/grinding.png?url';
import chakka from '~/assets/chakka.png?url';

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* About Us Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="bg-[#ff7380] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                About Us
              </div>
            </div>

            {/* Main Question */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight px-4 lg:px-0">
                Why Shop With
                <br />
                Us?
              </h2>
            </div>

            {/* Description test*/}
            <div className="text-center lg:text-left px-4 lg:px-0">
              <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
                We Believe Happiness Comes In The Form Of A Plush Hug. Our
                Curated Collection Of Kawaii Plushies, Baby Toys, And Lifestyle
                Goodies Is Designed To Bring Comfort And Smiles. With Fast
                Shipping, Quality You Can Trust, And A Community Of Plush
                Lovers Worldwide—We're More Than A Shop, We're Your Happy
                Place.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <Button href="/about" variant="primary" size="medium">
                Read Our Story
              </Button>
            </div>
          </div>

          {/* Right side - Image content */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Main image */}
              <div className="relative bg-[#FFF0F2] rounded-xl sm:rounded-2xl overflow-hidden">
                <img
                  src={grinding}
                  alt="Plush toys collection"
                  className="w-full h-auto object-cover rounded-xl sm:rounded-2xl"
                />

                {/* Circular overlay in top right corner */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                  <img
                    src={chakka}
                    alt="Join Now"
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
