import {Image} from '@shopify/hydrogen';
import Button from './Button';

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-16 px-4">
  
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="lg:col-span-6 space-y-8">
            {/* About Us Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="bg-[#ff7380] text-white px-4 py-2 rounded-full text-sm font-medium">
                About Us
              </div>
            </div>

            {/* Main Question */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-nunito leading-tight">
                Why Shop With
                <br />
                Us?
              </h2>
            </div>

            {/* Description */}
            <div className="text-center lg:text-left">
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
                We Believe Happiness Comes In The Form Of A Plush Hug. Our Curated Collection Of Kawaii Plushies, Baby Toys, And Lifestyle Goodies Is Designed To Bring Comfort And Smiles. With Fast Shipping, Quality You Can Trust, And A Community Of Plush Lovers Worldwide—We're More Than A Shop, We're Your Happy Place.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <Button 
                href="/about"
                variant="primary"
                size="medium"
              >
                Read Our Story
              </Button>
            </div>
          </div>

          {/* Right side - Image content */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Main image */}
              <div className="relative bg-[#FFF0F2] rounded-2xl overflow-hidden">
                <Image
                  data={{url: "/grinding.png", altText: "Plush toys collection", width: 600, height: 400}}
                  className="w-full h-auto object-cover rounded-2xl"
                />
                
                {/* Circular overlay in top right corner */}
                <div className="absolute top-4 right-4">
                  <Image
                    data={{url: "/chakka.png", altText: "Join Now", width: 120, height: 120}}
                    className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
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
