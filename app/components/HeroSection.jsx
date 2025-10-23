import {Image} from '@shopify/hydrogen';
import Button from './Button';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#ff99a2]">
      {/* Background with SVG */}
      <div className="absolute inset-0 pointer-events-none">
        <Image 
          data={{url: "/hero-bg.svg", altText: ""}}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Background Gradient Blur */}
      <div 
        className="absolute top-[84px] right-[163px] w-[990px] h-[940px] opacity-60 mix-blend-overlay blur-[204px]"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)'
        }}
      />
      {/* Main Content Container */}
      <div className="relative max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 pt-8 pb-16">
        {/* Reviews Badge */}
        <div className="flex items-center gap-1 mb-8">
          {/* Star Icons */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                width="18" 
                height="17" 
                viewBox="0 0 18 17" 
                fill="white"
              >
                <path d="M9 0L11.3511 6.21885H18L12.8244 10.0623L15.1756 16.2812L9 12.4377L2.82441 16.2812L5.17558 10.0623L0 6.21885H6.64886L9 0Z" />
              </svg>
            ))}
          </div>
          <p className="text-white font-bold text-[16px] tracking-tight lowercase ml-2">
            17,000+ 5 star reviews on
          </p>
          <div className="ml-1">
            <svg width="62" height="24" viewBox="0 0 62 24" fill="white">
              <text x="0" y="18" fontFamily="Arial" fontSize="16" fontWeight="bold">Amazon</text>
            </svg>
          </div>
        </div>

        {/* Main Heading - Centered */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="font-black text-white leading-tight text-[clamp(48px,8vw,86px)] tracking-tight font-nunito">
            <span className="inline-block">Discover</span>{' '}
            <span className="inline-flex items-center align-middle mx-2">
              <Image 
                data={{url: "/hero-cute.png", altText: "Cute plushies", width: 180, height: 80}}
                className="rounded-full w-[180px] h-[80px]"
              />
            </span>{' '}
            <span className="inline-block">Cutest</span>
            <br />
            <span className="inline-block">Plushies & Adorable Gifts</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-white text-[18px] md:text-[21px] leading-relaxed font-sans max-w-[700px] mx-auto">
            From Kawaii Plush Toys To Cozy Socks & Baby Mats - Bring Happiness Home With Our Handpicked Collections.
          </p>
        </div>
      </div>

      {/* Bottom Carousel Section */}
      <div className="relative mt-16 pb-20">
        {/* Scrolling Images Container */}
        <div className="relative w-full overflow-hidden">
          {/* Shadow Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#ff99a2] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#ff99a2] to-transparent z-10 pointer-events-none" />
          
          {/* Image Scroll Container */}
          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-8 px-24">
            {[...Array(7)].map((_, index) => (
              <div 
                key={index}
                className="shrink-0 w-[451px] h-[434px] bg-gray-200 rounded-2xl overflow-hidden"
              >
                {/* Placeholder for product images */}
                <div className="w-full h-full bg-linear-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Product {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ellipse Shadow at Bottom */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1728px] h-[112px] pointer-events-none">
          <div 
            className="w-full h-full rounded-full opacity-30"
            style={{
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)'
            }}
          />
        </div>
        {/* CTA Button - Centered */}
        <div className="flex justify-center">
          <Button 
            href="/products"
            variant="primary"
            size="medium"
          >
            Shop Bestsellers
          </Button>
        </div>
      </div>
    </section>
  );
}

