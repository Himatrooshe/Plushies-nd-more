import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import Button from './Button';
import hollowHeroBg from '~/assets/hollow-hero-bg.png?url';
import heroDark from '~/assets/hero-dark.svg?url';


export default function HalloweenHeroSection() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden"
      style={{minHeight: '100vh', paddingTop: '140px'}}
    >
      {/* Background with PNG */}
      <div className="absolute inset-0 pointer-events-none w-full h-full">
        <img
          src={hollowHeroBg}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>

      {/* Halloween Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large spooky elements */}
        <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-float-bubble-1"></div>
        <div className="absolute top-[20%] right-[10%] w-40 h-40 bg-purple-500/15 rounded-full blur-xl animate-float-bubble-2"></div>
        <div className="absolute top-[50%] left-[15%] w-28 h-28 bg-red-500/25 rounded-full blur-xl animate-float-bubble-3"></div>
        <div className="absolute bottom-[20%] right-[20%] w-36 h-36 bg-orange-500/20 rounded-full blur-xl animate-float-bubble-4"></div>
        <div className="absolute bottom-[10%] left-[10%] w-24 h-24 bg-purple-500/25 rounded-full blur-xl animate-float-bubble-5"></div>
        
        {/* Medium spooky elements */}
        <div className="absolute top-[30%] left-[25%] w-20 h-20 bg-red-500/20 rounded-full blur-lg animate-float-bubble-6"></div>
        <div className="absolute top-[60%] right-[15%] w-24 h-24 bg-orange-500/15 rounded-full blur-lg animate-float-bubble-7"></div>
        <div className="absolute bottom-[30%] left-[30%] w-22 h-22 bg-purple-500/25 rounded-full blur-lg animate-float-bubble-8"></div>
        
        {/* Small spooky elements */}
        <div className="absolute top-[40%] right-[30%] w-16 h-16 bg-red-500/20 rounded-full blur-md animate-float-bubble-9"></div>
        <div className="absolute bottom-[40%] right-[5%] w-18 h-18 bg-orange-500/25 rounded-full blur-md animate-float-bubble-10"></div>
        <div className="absolute top-[15%] left-[50%] w-14 h-14 bg-purple-500/20 rounded-full blur-md animate-float-bubble-11"></div>
      </div>

      {/* Background Gradient Blur */}
      <div
        className="absolute hidden md:block top-[84px] right-[163px] w-[990px] h-[940px] opacity-60 mix-blend-overlay blur-[204px]"
        style={{
          background:
            'radial-gradient(circle, rgba(255,165,0,0.3) 0%, rgba(128,0,128,0.2) 50%, rgba(255,0,0,0.1) 100%)',
        }}
      />
      
      {/* Main Content Container */}
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-6 sm:py-8 min-h-[60vh] flex flex-col">
        {/* Top Section - Title */}
        <div className="text-center flex-1 flex flex-col justify-end pb-2">
          <h1 className="font-black text-white leading-tight tracking-tight font-cute">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2">
              <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-8xl">Discover</span>
              <img
                src={heroDark}
                alt="Halloween plushies"
                className="w-[120px] h-auto sm:w-[180px] md:w-[220px] lg:w-[280px] rounded-full"
              />
              <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-8xl">Spookiest</span>
            </div>
            <div className="text-center">
              <span className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl px-2">
                Halloween Plushies & Spooky Gifts
              </span>
            </div>
          </h1>
        </div>

        {/* Middle Section - Subtitle */}
        <div className="text-center flex-1 flex items-center justify-center px-4">
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-[21px] leading-relaxed font-sans max-w-[700px] mx-auto text-center">
            From Spooky Plush Toys To Halloween Decorations & Cozy Accessories - Bring The Halloween Spirit Home With Our Handpicked Collections.
          </p>
        </div>
      </div>


      {/* CTA Button - Below Slider */}
      <div className="flex justify-center py-4 sm:py-6 px-4">
        <Button href="/collections/all" variant="halloween" size="medium">
          Shop Halloween Collection
        </Button>
      </div>
    </section>
  );
}
