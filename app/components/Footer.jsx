import {Suspense, useState} from 'react';
import {Await, Link} from 'react-router';
import footerBg from '~/assets/Footer-bg.png?url';
import footerLogo from '~/assets/footer-logo.png?url';
import insta from '~/assets/insta.png?url';
import facebook from '~/assets/facebook.png?url';
import tiktok from '~/assets/tiktok.png?url';
import youtube from '~/assets/youtube.png?url';

/**
 * @param {FooterProps}
 */
export function Footer({footer: footerPromise, header, publicStoreDomain}) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe email:', email);
    setEmail('');
  };

  return (
    <footer className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${footerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="relative">
        {/* White Overlay Layer - Only for Newsletter & Links */}
        <div className="mx-4 sm:mx-8 md:mx-[40px] lg:mx-[60px] xl:mx-[80px] mt-4 sm:mt-[15px] md:mt-[20px] bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
            {/* Top Section - Newsletter & Links */}
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16">
              {/* Newsletter Section - Left Side */}
              <div className="lg:max-w-md">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Get 15% Off Your Order!
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  Sign up for email and get 15% off your first new subscriber
                  order + free shipping over $35*.
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4">
                  15% off is valid for new purchases & our first purchase only
                  after signing up and clicking the link in the validation email
                  from us. You must have valid email acknowledged our{' '}
                  <Link to="/policies/privacy-policy" className="underline">
                    privacy policy
                  </Link>
                  .
                </p>
                <form onSubmit={handleSubscribe} className="space-y-2 sm:space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#c0424e]"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#c0424e] text-white py-2 px-4 rounded-lg hover:bg-[#a0353f] transition-colors text-xs sm:text-sm font-semibold"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Links Section - Right Side */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:ml-auto">
                {/* Company Links */}
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                    Company
                  </h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    <li>
                      <Link
                        to="/"
                        className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/pages/about"
                        className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/pages/contact"
                        className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Shop Links */}
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Shop</h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    <li>
                      <Link
                        to="/collections/all"
                        className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm"
                      >
                        All Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/collections"
                        className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm"
                      >
                        Collections
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cart"
                        className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm"
                      >
                        Cart
                      </Link>
                    </li>
                    <li>
                      <Suspense>
                        <Await resolve={footerPromise}>
                          {(footer) => (
                            <FooterPolicyLinks
                              menu={footer?.menu}
                              primaryDomainUrl={header.shop.primaryDomain?.url}
                              publicStoreDomain={publicStoreDomain}
                            />
                          )}
                        </Await>
                      </Suspense>
                    </li>
                  </ul>
                </div>

                {/* Legal Links */}
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Legal</h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {/* <li>
                      <Link
                        to="/policies/terms-of-service"
                        className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm"
                      >
                        Term of Use
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        to="/policies/privacy-policy"
                        className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/policies/refund-policy"
                        className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm"
                      >
                        Refund Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/pages/shipping-policy"
                        className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm"
                      >
                        Shipping Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/pages/return-policy"
                        className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm"
                      >
                        Return Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Logo, Social Media & Copyright (Outside white layer, on background) */}
        <div className="relative py-4 sm:py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              {/* Social Media Icons */}
              <div className="flex items-center gap-3 sm:gap-4 order-1 md:order-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={insta}
                    alt="Instagram"
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                  />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={facebook}
                    alt="Facebook"
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                  />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={tiktok}
                    alt="TikTok"
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                  />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={youtube}
                    alt="YouTube"
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                  />
                </a>
              </div>

              {/* Footer Logo */}
              <div className="order-2 md:order-2">
                <img
                  src={footerLogo}
                  alt="Plushies & More"
                  className="h-10 sm:h-11 md:h-12 w-auto"
                />
              </div>

              {/* Copyright */}
              <div className="order-3 md:order-3 text-center sm:text-left">
                <p className="text-xs sm:text-sm text-white">
                  © 2025 Plushies & More. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pink Bottom Bar */}
      <div className="bg-[#c0424e] py-1"></div>
    </footer>
  );
}

/**
 * Helper component for policy links
 */
function FooterPolicyLinks({menu, primaryDomainUrl, publicStoreDomain}) {
  if (!menu) return null;

  return (
    <>
      {menu.items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;

        return (
          <li key={item.id}>
            <Link
              to={url}
              className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm"
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </>
  );
}

/**
 * @typedef {Object} FooterProps
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
