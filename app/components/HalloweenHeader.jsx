import {Suspense, useState, useEffect, useRef} from 'react';
import {Link, NavLink, useAsyncValue, useNavigate} from 'react-router';
import {Await, useFetcher} from 'react-router';
import {Image} from '@shopify/hydrogen';
import gsap from 'gsap';
import {useAside} from './Aside';
import {SEARCH_ENDPOINT} from './SearchFormPredictive';
import {SearchFormPredictive} from './SearchFormPredictive';
import {SearchResultsPredictive} from './SearchResultsPredictive';
import hollowLogoUrl from '~/assets/hollow-logo.png?url';

/**
 * @param {HeaderProps}
 */
export function HalloweenHeader({header, isLoggedIn, cart, publicStoreDomain}) {
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
      <div className="bg-white rounded-[16px] sm:rounded-[23px] px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 shadow-lg border border-gray-200">
        <div className="relative flex items-center h-[40px] sm:h-[45px] md:h-[51px]">
          {/* Mobile: Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 mr-2 text-black"
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
              className="flex items-center gap-1.5 bg-[rgba(83,53,122,0.24)] border border-[rgba(83,53,122,0.1)] rounded-[8px] sm:rounded-[11px] px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-3 hover:bg-[rgba(83,53,122,0.35)] transition-colors"
            >
              <span className="text-[#53357A] font-bold text-xs sm:text-sm md:text-[16px] tracking-tight">
                Shop
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#53357A] hidden sm:block"
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
                      ? 'text-[#53357A]'
                      : 'hover:text-[#53357A]'
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
                      ? 'text-[#53357A]'
                      : 'hover:text-[#53357A]'
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
                src={hollowLogoUrl}
                alt="Halloween Plushies Logo"
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
                    className="sm:w-[24px] sm:h-[24px] text-[#53357A]"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 21L16.65 16.65"
                      stroke="currentColor"
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
                className="sm:w-[24px] sm:h-[24px] text-[#53357A]"
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="currentColor"
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
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link
                to="/collections/all"
                className="text-black font-bold text-sm uppercase tracking-wide hover:text-[#53357A] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <NavLink
                to="/pages/about"
                className={({isActive}) =>
                  `text-black font-bold text-sm uppercase tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#53357A]'
                      : 'hover:text-[#53357A]'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Story
              </NavLink>
              <NavLink
                to="/pages/contact"
                className={({isActive}) =>
                  `text-black font-bold text-sm uppercase tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#53357A]'
                      : 'hover:text-[#53357A]'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/**
 * Cart Button Component
 */
function CartButton({cart}) {
  const {open} = useAside();
  const cartCount = cart?.totalQuantity || 0;

  return (
    <button
      onClick={() => open('cart')}
      className="relative hover:opacity-70 transition-opacity"
      aria-label="Shopping cart"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="sm:w-[24px] sm:h-[24px] text-[#53357A]"
      >
        <path
          d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#53357A] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-lg">
          {cartCount}
        </span>
      )}
    </button>
  );
}

/**
 * Header Search Input Component
 */
function HeaderSearchInput({onClose}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetcher = useFetcher();

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim().length < 2) {
      setResults(null);
      return;
    }

    setIsLoading(true);
    fetcher.load(`${SEARCH_ENDPOINT}?q=${encodeURIComponent(searchQuery)}`);
  };

  useEffect(() => {
    if (fetcher.data) {
      setResults(fetcher.data);
      setIsLoading(false);
    }
  }, [fetcher.data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[300px]">
      <div className="flex items-center gap-2 mb-3">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="text-gray-400"
        >
          <circle
            cx="11"
            cy="11"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21L16.65 16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 outline-none text-sm"
          autoFocus
        />
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {isLoading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#c0424e]"></div>
        </div>
      )}

      {results && !isLoading && (
        <SearchResultsPredictive results={results} />
      )}
    </div>
  );
}

/** @typedef {import('./+types/Header').HeaderProps} HeaderProps */
