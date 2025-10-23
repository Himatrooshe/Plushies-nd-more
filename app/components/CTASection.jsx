import {Image} from '@shopify/hydrogen';
import Button from './Button';

export default function CTASection() {
  return (
    <section className="relative w-full py-16 px-4 overflow-hidden bg-white">
      {/* Content Container with 200px padding on each side */}
      <div className="relative w-full px-[200px]">
        {/* CTA Image Container */}
        <div className="relative w-full">
          <Image
            data={{url: "/CTA.svg", altText: "Cute Plushies", width: 1400, height: 300}}
            className="w-full h-auto rounded-2xl"
          />
          
          {/* Text content overlay - positioned on the right side inside the image */}
          <div className="absolute inset-0 flex items-center justify-end">
            <div className="w-1/2 pl-8 pr-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-nunito mb-4 leading-tight">
                Get Exclusive Plush Perks!
              </h2>
              
              <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed mb-6">
                Sign up to unlock exclusive offers, early access to new arrivals, and surprise discounts on your favorite plushies and kawaii goodies. Stay cute, stay updated!
              </p>
              
              {/* CTA Button */}
              <div className="flex justify-start">
                <Button 
                  href="/join"
                  variant="secondary"
                  size="medium"
                >
                  Join The Cute Club
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

