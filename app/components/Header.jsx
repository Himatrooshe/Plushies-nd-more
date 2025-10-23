'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { formatPrice } from '@/lib/shopify';
import { useCart } from '@/contexts/CartContext';
import gsap from 'gsap';

export default function Header() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const headerRef = useRef(null);
  const { totalQuantity } = useCart();
  const lastScrollY = useRef(0);

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
              ease: 'power2.out'
            });
          } else {
            // Scrolling up - show header
            gsap.to(headerRef.current, {
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
          
          lastScrollY.current = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Live search with debounce
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) throw new Error('Search failed');
        
        const data = await response.json();
        setSearchResults(data.products || []);
      } catch (err) {
        console.error('Search error:', err);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <header 
      ref={headerRef}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[1600px]"
    >
      <div className="bg-white rounded-[23px] px-6 py-4 shadow-lg">
        <div className="relative flex items-center h-[51px]">
          {/* Left Section - Shop & Navigation */}
          <div className="flex items-center gap-10 flex-1">
            {/* Shop Button */}
            <button
              onClick={() => setIsShopOpen(!isShopOpen)}
              className="flex items-center gap-2 bg-[rgba(192,66,78,0.24)] border border-[rgba(192,66,78,0.1)] rounded-[11px] px-5 py-3 hover:bg-[rgba(192,66,78,0.35)] transition-colors"
            >
              <span className="text-[#c0424e] font-bold text-[16px] tracking-tight">
                Shop
              </span>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-[#c0424e]"
              >
                <path 
                  d="M12 5V19M5 12H19" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Navigation Links */}
            <nav className="flex items-center gap-16">
              <Link 
                href="/about" 
                className="text-black font-bold text-[15px] uppercase tracking-wide hover:text-[#c0424e] transition-colors"
              >
                OUR STORY
              </Link>
              <Link 
                href="/contact" 
                className="text-black font-bold text-[15px] uppercase tracking-wide hover:text-[#c0424e] transition-colors"
              >
                CONTACT
              </Link>
            </nav>
          </div>

          {/* Center - Logo (Absolutely Centered) */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link href="/">
              <Image 
                src="/main-logo.svg" 
                alt="Plushies Logo" 
                width={104} 
                height={62}
                priority
              />
            </Link>
          </div>

          {/* Right Section - Search, Cart, User */}
          <div className="flex items-center gap-7 flex-1 justify-end">
            {/* Search with Dropdown */}
            <div ref={searchRef} className="relative">
              {!isSearchOpen ? (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Search products"
                >
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none"
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
                <>
                  {/* Search Input */}
                  <div className="relative">
                    <svg 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none"
                    >
                      <circle 
                        cx="11" 
                        cy="11" 
                        r="8" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      />
                      <path 
                        d="M21 21L16.65 16.65" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      />
                    </svg>
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-[300px] pl-10 pr-10 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-[#ff7380] focus:outline-none transition-colors text-[#ff7380] placeholder:text-gray-400"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSearchResults([]);
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Search Dropdown Results */}
                  {(searchQuery.trim().length >= 2 || isLoading) && (
                    <div className="absolute top-full right-0 mt-2 w-[400px] bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[500px] overflow-y-auto z-50">
                      {isLoading && (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#ff7380] border-t-transparent"></div>
                        </div>
                      )}

                      {!isLoading && searchResults.length === 0 && (
                        <div className="p-6 text-center">
                          <p className="text-gray-500">No products found for "{searchQuery}"</p>
                          <p className="text-gray-400 text-sm mt-1">Try different keywords</p>
                        </div>
                      )}

                      {!isLoading && searchResults.length > 0 && (
                        <div className="py-2">
                          {searchResults.map((product) => {
                            const image = product.images?.edges?.[0]?.node;
                            const price = product.priceRange?.minVariantPrice;

                            return (
                              <Link
                                key={product.id}
                                href={`/products/${product.handle}`}
                                onClick={() => {
                                  setIsSearchOpen(false);
                                  setSearchQuery('');
                                  setSearchResults([]);
                                }}
                                className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                              >
                                {/* Product Image */}
                                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
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
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                                      </svg>
                                    </div>
                                  )}
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-sm text-gray-900 truncate">
                                    {product.title}
                                  </h3>
                                  {price && (
                                    <p className="text-[#ff7380] font-bold text-sm mt-1">
                                      {formatPrice(price.amount, price.currencyCode)}
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
              )}
            </div>

            {/* Cart Button */}
            <Link 
              href="/cart"
              className="flex items-center gap-2 bg-[#ff7380] rounded-[11px] px-4 py-3 hover:bg-[#ff5c6c] transition-colors"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
              >
                <path 
                  d="M2.5 2.5H4.16667L6.66667 13.3333H15.8333L18.3333 5.83333H5.83333" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <circle cx="7.5" cy="17.5" r="1.25" fill="white"/>
                <circle cx="15" cy="17.5" r="1.25" fill="white"/>
              </svg>
              <span className="text-white font-bold text-[16px] lowercase tracking-tight">
                {totalQuantity}
              </span>
            </Link>

            {/* User Icon */}
            <button className="hover:opacity-70 transition-opacity">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
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
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

