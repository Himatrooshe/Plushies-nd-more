import aboutHeroBg from '~/assets/about-hero-bg.svg?url';
import {SmoothScrollProvider} from '~/components/SmoothScrollProvider';
import about2ndImg from '~/assets/about-2nd.svg?url';
import about3rdImg from '~/assets/about-3rd.png';
import about4thImg from '~/assets/about-4th.png';
import ctaBg from '~/assets/CTA-about.svg?url';

export const meta = () => [{title: 'About Us | Plushies & More'}];

export default function AboutPage() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="relative bg-pink-300 py-36 sm:py-48 md:py-64 overflow-hidden min-h-[520px] sm:min-h-[650px] md:min-h-[800px]">
          <div className="absolute inset-0 pointer-events-none w-full h-full">
            <img src={aboutHeroBg} alt="" className="object-cover w-full h-full" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4">
              About US
            </h1>
            <p className="text-xl sm:text-2xl text-white/90">
              Bringing Cuddles, Comfort, And Joy To Every Heart.
            </p>
          </div>
        </div>

        {/* Section 2: Image left, text right (full width) */}
        <section className="w-full px-4 sm:px-8 lg:px-16 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="w-full flex items-center justify-center">
            <img src={about2ndImg} alt="Plushie comfort" className="w-full max-w-[720px] rounded-xl shadow-lg object-cover" />
          </div>
          <div className="w-full flex flex-col items-start justify-start self-start pt-2 sm:pt-4 md:pt-8">
            <span className="inline-block bg-pink-100 text-pink-600 rounded-full px-4 py-1 text-xs font-bold mb-4">Our Story</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Bringing Cuddles and Joy to Your World</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Welcome to Plushie & More, your go-to destination for the most adorable and huggable plushies! Our journey began with a simple belief: everyone deserves a little extra comfort and joy in their lives. We envisioned a world filled with soft, lovable companions that not only bring smiles but also offer a sense of warmth and security.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From that vision, Plushie & More was born. A place where cuteness meets quality, and every plushie has a story to tell.
            </p>
          </div>
        </section>

        {/* Section 3: Mission list (left) + two stacked images (right) - full width */}
        <section className="w-full px-4 sm:px-8 lg:px-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Mission copy and bullets */}
          <div className="ml-0 md:ml-8 lg:ml-12 xl:ml-20 max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Our Mission: More
              <br />
              Than Just Plushies
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl">
              At Plushie & More, we’re dedicated to crafting more than just stuffed animals; we’re creating cherished companions. Our mission is to:
            </p>

            <div className="space-y-3">
              {[
                {
                  title: 'Spread Happiness',
                  desc: 'Every plushie brings smiles and comfort.',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white"><circle cx="12" cy="12" r="10" fill="currentColor" opacity=".25"/><path d="M8 14c1 1.5 2.667 2.25 4 2.25S15 15.5 16 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></svg>
                  ),
                },
                {
                  title: 'Prioritize Quality',
                  desc: 'Ultra‑soft, safe, and durable materials.',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white"><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity=".5"/></svg>
                  ),
                },
                {
                  title: 'Inspire Imagination',
                  desc: 'Whimsical designs spark creativity.',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white"><path d="M12 3v4M5 12h4M15 12h4M12 17v4M7.5 7.5l2.5 2.5M14 14l2.5 2.5M14 10l2.5-2.5M7.5 16.5L10 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  ),
                },
                {
                  title: 'Offer the Perfect Gift',
                  desc: 'A plushie for every heart and occasion.',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white"><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7h16ZM4 8h16v4H4V8Zm8 0v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8s-.5-4-3-4-3 2-3 3 1 1 2 1h4Zm0 0s.5-4 3-4 3 2 3 3-1 1-2 1h-4Z" stroke="currentColor" strokeWidth="1.2"/></svg>
                  ),
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#ff7d8a] flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{item.title}</div>
                    <div className="text-gray-600 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Two stacked images */}
          <div className="relative w-full flex justify-center">
            <img src={about3rdImg} alt="Sleeping kid with plushies" className="w-full max-w-[520px] rounded-2xl shadow-xl object-cover" />
            <div className="absolute -bottom-16 -right-[26px] bg-white rounded-3xl p-3 shadow-xl">
              <img src={about4thImg} alt="Dad and kid playing with plushie" className="w-[320px] sm:w-[380px] rounded-2xl object-cover" />
            </div>
          </div>
        </section>
         {/* Section 4: What Makes Us Special */}
         <section className="w-full px-4 sm:px-8 lg:px-16 pb-24">
          <div className="text-center mb-8">
            <span className="inline-block bg-pink-100 text-pink-600 rounded-full px-4 py-1 text-xs font-bold">Speciality</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900">What Makes Us Special?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 */}
            <div className="rounded-2xl bg-rose-50/70 p-6 shadow-sm border border-rose-100">
              <div className="w-12 h-12 rounded-2xl bg-[#ff7d8a] flex items-center justify-center text-white mb-4">
                <svg viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 21s-7-4.438-7-10a4 4 0 1 1 8 0 4 4 0 1 1 8 0c0 5.562-9 10-9 10Z" fill="currentColor"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Crafted with Care</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Every Plushie & More plushie is made with meticulous attention to detail and a whole lot of love. From the stitching to the stuffing, we ensure that each product meets our high standards for quality and comfort.</p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-rose-50/70 p-6 shadow-sm border border-rose-100">
              <div className="w-12 h-12 rounded-2xl bg-[#ff7d8a] flex items-center justify-center text-white mb-4">
                <svg viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.88L18.18 22 12 18.56 5.82 22 7 14.15l-5-4.88 6.91-1.01L12 2Z" fill="currentColor"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">A World of Cuteness</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Our collection features a wide array of designs, from classic animals to unique and whimsical characters. We’re constantly expanding our range to bring you the freshest and most adorable plushies on the market.</p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-rose-50/70 p-6 shadow-sm border border-rose-100">
              <div className="w-12 h-12 rounded-2xl bg-[#ff7d8a] flex items-center justify-center text-white mb-4">
                <svg viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 21c4.418 0 8-3.134 8-7 0-2.334-1.5-4.333-3.667-5.5C15.5 6.333 13.833 6 12 6s-3.5.333-4.333 1.5C5.5 9.667 4 11.666 4 14c0 3.866 3.582 7 8 7Z" fill="currentColor"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Happiness</h3>
              <p className="text-gray-600 text-sm leading-relaxed">We are committed to providing an exceptional shopping experience. Our friendly customer service team is always here to help you find the perfect plushie and answer any questions you may have.</p>
            </div>
          </div>
        </section>
                {/* Section 5: CTA */}
                <section className="w-full px-4 sm:px-8 lg:px-16 pb-28">
          <div
            className="rounded-2xl sm:rounded-3xl overflow-hidden px-6 sm:px-10 md:px-16 py-10 sm:py-14 md:py-16 text-center shadow-sm"
            style={{
              backgroundImage: `url(${ctaBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
              Join Our Cuddle Crew
            </h2>
            <p className="text-white/90 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed mb-6">
              We invite you to explore our enchanting collection and discover your new best friend. Whether you’re searching for a cozy companion, a thoughtful gift, or a sprinkle of cuteness for your home, Plushie & More has something for everyone.
            </p>
            <a
              href="/collections/all"
              className="inline-flex items-center gap-2 bg-white text-[#ff7380] font-semibold text-xs sm:text-sm rounded-full px-4 sm:px-5 py-2 shadow hover:opacity-90 transition"
            >
              Join The Cute Club
              <span className="inline-block w-4 h-4 rounded-full bg-[#ff7380]"></span>
            </a>
          </div>
        </section>
      </div>
    </SmoothScrollProvider>
  );
}

/** @typedef {import('./+types/pages.about').Route} Route */

