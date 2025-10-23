'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
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
          backgroundImage: 'url(/Footer-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="relative">
        {/* White Overlay Layer - Only for Newsletter & Links */}
        <div className="mx-[80px] mt-[20px] bg-white/95 backdrop-blur-sm rounded-2xl">
          <div className="max-w-7xl mx-auto px-8 py-12">
            {/* Top Section - Newsletter & Links */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
              {/* Newsletter Section - Left Side */}
              <div className="lg:max-w-md flex-shrink-0">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Get 15% Off Your Order!
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Sign up for email and get 15% off your first new subscriber order + free shipping over $35*.
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  15% off is valid for new purchases & our first purchase only after signing up and clicking the link in the validation email from us. You must have valid email acknowledged our{' '}
                  <Link href="/privacy" className="underline">
                    privacy policy
                  </Link>
                  .
                </p>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#c0424e] text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#c0424e] text-white py-2 px-4 rounded-lg hover:bg-[#a0353f] transition-colors text-sm font-semibold"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Links Section - Right Side */}
              <div className="flex-1 grid grid-cols-3 gap-8 lg:ml-auto">
                {/* Company Links */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Company</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Shop Links */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Shop</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/products" className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm">
                        Product Page
                      </Link>
                    </li>
                    <li>
                      <Link href="/products" className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm">
                        Product Detail Page
                      </Link>
                    </li>
                    <li>
                      <Link href="/cart" className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm">
                        Checkout Page
                      </Link>
                    </li>
                    <li>
                      <Link href="/tracking" className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm">
                        Tracking Page
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Legal Links */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/terms" className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm">
                        Term of Use
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/refund" className="text-gray-600 hover:text-[#c0424e] transition-colors text-sm">
                        Refund Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Logo, Social Media & Copyright (Outside white layer, on background) */}
        <div className="relative py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Social Media Icons */}
              <div className="flex items-center gap-4 order-1 md:order-1">
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="/insta.png"
                    alt="Instagram"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </Link>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="/facebook.png"
                    alt="Facebook"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </Link>
                <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="/tiktok.png"
                    alt="TikTok"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </Link>
                <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="/youtube.png"
                    alt="YouTube"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </Link>
              </div>

              {/* Footer Logo */}
              <div className="order-2 md:order-2">
                <Image
                  src="/footer-logo.png"
                  alt="Plushies & More"
                  width={150}
                  height={60}
                  className="h-12 w-auto"
                />
              </div>

              {/* Copyright */}
              <div className="order-3 md:order-3">
                <p className="text-sm text-white">
                  © 2025 logo. all rights reserved.
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

