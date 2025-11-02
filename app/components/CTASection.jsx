import Button from './Button';
import ctaImage from '~/assets/CTA.svg?url';

export default function CTASection() {
  return (
    <section className="relative w-full py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 px-2 sm:px-4 overflow-hidden bg-white">
      {/* Content Container with responsive padding */}
      <div className="relative w-full px-2 sm:px-3 md:px-6 lg:px-12 xl:px-16 2xl:px-24">
        {/* CTA Image Container */}
        <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl">
          <img
            src={ctaImage}
            alt="Cute Plushies"
            className="w-full h-auto object-cover"
          />
          
          {/* Text content overlay - responsive positioning */}
          <div className="absolute inset-0 flex items-center justify-center md:justify-end px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[45%] lg:max-w-[40%] xl:max-w-[35%] text-center md:text-left">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 leading-tight drop-shadow-lg">
                Get Exclusive Plush Perks!
              </h2>
              
              <p className="text-white text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed mb-3 sm:mb-3.5 md:mb-4 lg:mb-5 drop-shadow-md line-clamp-3 sm:line-clamp-none">
                Sign up to unlock exclusive offers, early access to new arrivals, and surprise discounts on your favorite plushies and kawaii goodies.
              </p>
              
              {/* CTA Button - More responsive */}
              <div className="flex justify-center md:justify-start">
                <Button 
                  href="/join"
                  variant="secondary"
                  size="medium"
                  className="text-[11px] sm:text-xs md:text-sm px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 w-full sm:w-auto max-w-[280px] sm:max-w-none"
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
