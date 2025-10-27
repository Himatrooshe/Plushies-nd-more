import {Suspense, useState, useEffect, useRef} from 'react';
import {Link, NavLink, useAsyncValue, useNavigate} from 'react-router';
import {Await, useFetcher} from 'react-router';
import {Image} from '@shopify/hydrogen';
import gsap from 'gsap';
import {useAside} from './Aside';
import {SEARCH_ENDPOINT} from './SearchFormPredictive';
import {SearchFormPredictive} from './SearchFormPredictive';
import {SearchResultsPredictive} from './SearchResultsPredictive';
import mainLogoUrl from '~/assets/main-logo.svg?url';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  // Header scroll animation with GSAP
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            // Scrolling down - hide header
            gsap.to(headerRef.current, {
              y: -100,
              duration: 0.3,
              ease: 'power2.out',
            });
          } else {
            // Scrolling up - show header
            gsap.to(headerRef.current, {
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);


  return (
    <header
      ref={headerRef}
      className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-[1600px]"
    >
      <div className="bg-white rounded-[16px] sm:rounded-[23px] px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 shadow-lg">
        <div className="relative flex items-center h-[40px] sm:h-[45px] md:h-[51px]">
          {/* Mobile: Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 mr-2"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {/* Left Section - Shop & Navigation (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 flex-1">
            {/* Shop Button */}
            <Link
              to="/collections/all"
              className="flex items-center gap-1.5 bg-[rgba(192,66,78,0.24)] border border-[rgba(192,66,78,0.1)] rounded-[8px] sm:rounded-[11px] px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-3 hover:bg-[rgba(192,66,78,0.35)] transition-colors"
            >
              <span className="text-[#c0424e] font-bold text-xs sm:text-sm md:text-[16px] tracking-tight">
                Shop
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#c0424e] hidden sm:block"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Navigation Links - Hidden on tablet */}
            <nav className="hidden lg:flex items-center gap-12 xl:gap-16">
              <NavLink
                to="/pages/about"
                className={({isActive}) =>
                  `text-black font-bold text-xs xl:text-[15px] uppercase tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#c0424e]'
                      : 'hover:text-[#c0424e]'
                  }`
                }
              >
                OUR STORY
              </NavLink>
              <NavLink
                to="/pages/contact"
                className={({isActive}) =>
                  `text-black font-bold text-xs xl:text-[15px] uppercase tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#c0424e]'
                      : 'hover:text-[#c0424e]'
                  }`
                }
              >
                CONTACT
      </NavLink>
            </nav>
          </div>

          {/* Center - Logo (Absolutely Centered) */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link to="/">
              <img
                src={mainLogoUrl}
                alt="Plushies Logo"
                className="w-[60px] sm:w-[80px] md:w-[104px] h-auto object-contain"
              />
            </Link>
          </div>

          {/* Right Section - Search, Cart, User */}
          <div className="flex items-center gap-3 sm:gap-5 md:gap-7 flex-1 justify-end">
            {/* Search with Dropdown */}
            <div ref={searchRef} className="relative">
              {!isSearchOpen ? (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Search products"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="sm:w-[24px] sm:h-[24px]"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="8"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 21L16.65 16.65"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <HeaderSearchInput onClose={() => setIsSearchOpen(false)} />
              )}
            </div>

            {/* Cart Button */}
            <CartButton cart={cart} />

            {/* User Icon */}
            <NavLink to="/account" className="hover:opacity-70 transition-opacity">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="sm:w-[24px] sm:h-[24px]"
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavLink>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col gap-4">
              <NavLink
                to="/collections/all"
                className="text-black font-bold text-base uppercase tracking-wide transition-colors hover:text-[#c0424e]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </NavLink>
              <NavLink
                to="/pages/about"
                className="text-black font-bold text-base uppercase tracking-wide transition-colors hover:text-[#c0424e]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Story
              </NavLink>
              <NavLink
                to="/pages/contact"
                className="text-black font-bold text-base uppercase tracking-wide transition-colors hover:text-[#c0424e]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

/**
 * Cart button with quantity badge
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartButton({cart}) {
  const {open} = useAside();

  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBadgeWrapper open={open} />
      </Await>
    </Suspense>
  );
}

/**
 * Cart badge wrapper
 */
function CartBadgeWrapper({open}) {
  const originalCart = /** @type {any} */ (useAsyncValue());
  
  // Using context data directly without problematic hooks
  const count = originalCart?.totalQuantity ?? 0;

  return (
    <button
      onClick={() => open('cart')}
      className="flex items-center gap-1 sm:gap-2 bg-[#ff7380] rounded-[8px] sm:rounded-[11px] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 hover:bg-[#ff5c6c] transition-colors"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        className="sm:w-5 sm:h-5"
      >
        <path
          d="M2.5 2.5H4.16667L6.66667 13.3333H15.8333L18.3333 5.83333H5.83333"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7.5" cy="17.5" r="1.25" fill="white" />
        <circle cx="15" cy="17.5" r="1.25" fill="white" />
      </svg>
      <span className="text-white font-bold text-xs sm:text-sm md:text-[16px] lowercase tracking-tight">
        {count}
      </span>
    </button>
  );
}

/**
 * Cart badge component
 */
function CartBadge({count}) {
  return (
    <button className="flex items-center gap-1 sm:gap-2 bg-[#ff7380] rounded-[8px] sm:rounded-[11px] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 hover:bg-[#ff5c6c] transition-colors">
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5">
        <path
          d="M2.5 2.5H4.16667L6.66667 13.3333H15.8333L18.3333 5.83333H5.83333"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7.5" cy="17.5" r="1.25" fill="white" />
        <circle cx="15" cy="17.5" r="1.25" fill="white" />
      </svg>
      <span className="text-white font-bold text-xs sm:text-sm md:text-[16px] lowercase tracking-tight">
        {count ?? 0}
      </span>
    </button>
  );
}

/**
 * HeaderMenu component for mobile navigation
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: 'desktop' | 'mobile';
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/**
 * Header search input component
 */
function HeaderSearchInput({onClose}) {
  const fetcher = useFetcher({key: 'search'});
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);

  // Debounce search
  useEffect(() => {
    if (searchValue.trim().length < 2) return;

    const timeoutId = setTimeout(() => {
      fetcher.submit(
        {q: searchValue, limit: 10, predictive: true},
        {method: 'GET', action: SEARCH_ENDPOINT},
      );
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue, fetcher]);

  const results = fetcher?.data?.result;

  return (
    <>
      {/* Search Input */}
      <div className="relative">
        <svg
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search products..."
          className="w-[200px] sm:w-[250px] md:w-[300px] pl-8 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border-2 border-gray-300 rounded-lg focus:border-[#ff7380] focus:outline-none transition-colors text-gray-900 placeholder:text-gray-400"
        />
        {searchValue && (
          <button
            onClick={() => {
              setSearchValue('');
              onClose();
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Dropdown Results */}
      {searchValue.trim().length >= 2 && results && (
        <div className="absolute top-full right-0 mt-2 w-[calc(100vw-2rem)] sm:w-[400px] bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[400px] sm:max-h-[500px] overflow-y-auto z-50">
          {fetcher.state === 'loading' && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-3 sm:border-4 border-[#ff7380] border-t-transparent"></div>
            </div>
          )}

          {fetcher.state !== 'loading' && results.total === 0 && (
            <div className="p-4 sm:p-6 text-center">
              <p className="text-gray-500 text-sm sm:text-base">
                No products found for "{searchValue}"
              </p>
            </div>
          )}

          {fetcher.state !== 'loading' && results.products?.length > 0 && (
            <div className="py-2">
              {results.products.map((product) => {
                const image = product?.selectedOrFirstAvailableVariant?.image;
                const price = product?.selectedOrFirstAvailableVariant?.price;

                return (
                  <Link
                    key={product.id}
                    to={`/products/${product.handle}`}
                    onClick={onClose}
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-50 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-100 rounded-lg overflow-hidden">
                      {image ? (
                        <Image
                          src={image.url}
                          alt={image.altText || product.title}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-xs sm:text-sm text-gray-900 truncate">
                        {product.title}
                      </h3>
                      {price && (
                        <p className="text-[#ff7380] font-bold text-xs sm:text-sm mt-0.5 sm:mt-1">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: price.currencyCode,
                          }).format(parseFloat(price.amount))}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}

/** @typedef {import('react-router').Awaited} Awaited */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
