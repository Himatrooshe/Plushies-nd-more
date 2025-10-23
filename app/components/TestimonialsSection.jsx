import { useState, useEffect, useRef } from 'react';
import {Image} from '@shopify/hydrogen';
import Button from './Button';

export default function TestimonialsSection() {
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Sample testimonial data - 8 reviews for infinite loop
  const testimonials = [
    {
      id: 1,
      name: "Marie Jane",
      title: "CFO at Movix",
      text: "Ship X has completely changed the way we manage logistics. The platform is easy to use, and their tracking system keeps us updated at every step.",
      avatar: "/chakka.png",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Kim",
      title: "Product Manager",
      text: "The quality of these plushies is absolutely amazing! My daughter loves them and they're so soft and well-made. Definitely ordering more!",
      avatar: "/chakka.png",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Chen",
      title: "Designer",
      text: "These plushies bring so much joy! The attention to detail is incredible and they make perfect gifts for anyone who loves kawaii culture.",
      avatar: "/chakka.png",
      rating: 5
    },
    {
      id: 4,
      name: "Jessica Martinez",
      title: "Marketing Director",
      text: "I'm obsessed with these adorable plushies! The craftsmanship is outstanding and they make the perfect addition to any collection.",
      avatar: "/chakka.png",
      rating: 5
    },
    {
      id: 5,
      name: "Alex Thompson",
      title: "UX Designer",
      text: "The cuteness factor is off the charts! These plushies have become the highlight of my home decor. Everyone who visits falls in love with them.",
      avatar: "/chakka.png",
      rating: 5
    },
    {
      id: 6,
      name: "Lisa Wang",
      title: "Art Director",
      text: "Perfect quality and absolutely adorable! These plushies bring so much happiness into my life. Highly recommend to anyone who loves kawaii!",
      avatar: "/chakka.png",
      rating: 5
    },
    {
      id: 7,
      name: "Michael Davis",
      title: "Creative Lead",
      text: "Amazing attention to detail and softest material ever! These plushies exceeded all my expectations. Will definitely be ordering more.",
      avatar: "/chakka.png",
      rating: 5
    },
    {
      id: 8,
      name: "Grace Lee",
      title: "Brand Manager",
      text: "These plushies are simply magical! The quality is incredible and they bring so much joy. Perfect for gifting or keeping for yourself.",
      avatar: "/chakka.png",
      rating: 5
    }
  ];

  // Continuous smooth scrolling effect - like a train
  useEffect(() => {
    if (isPaused) return;

    const scrollSpeed = 0.5; // Adjust this for faster/slower scroll
    let animationFrameId;

    const animate = () => {
      setOffset((prevOffset) => {
        const newOffset = prevOffset + scrollSpeed;
        // Reset when we've scrolled past one full set of testimonials
        // Each card is approximately 400px (380px + padding)
        const cardWidth = 400;
        const totalWidth = testimonials.length * cardWidth;
        
        if (newOffset >= totalWidth) {
          return 0;
        }
        return newOffset;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused, testimonials.length]);

  const StarRating = ({ rating = 5 }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative w-4 h-4 shrink-0">
            <img
              src="/red-love.svg"
              alt="Star"
              width={16}
              height={16}
              className="w-full h-full opacity-100"
            />
          </div>
        ))}
      </div>
    );
  };

  // Triple the testimonials for seamless infinite loop
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="relative w-full min-h-screen py-16 px-4 overflow-hidden flex items-center">
      {/* Background SVG */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/review-bg.svg)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Title with decorative sparkles */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src="/Star 1.svg"
              alt="Sparkle"
              width={24}
              height={24}
              className="opacity-70"
            />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-nunito">
              Our Testimonials
            </h2>
            <img
              src="/Star 1.svg"
              alt="Sparkle"
              width={24}
              height={24}
              className="opacity-70"
            />
          </div>

          {/* Subtitle */}
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
            Join the growing family of kawaii lovers! See why customers rave about our giant cat plushie and adorable collection.
          </p>
        </div>

        {/* Testimonials Carousel - Continuous Scrolling */}
        <div 
          className="relative mb-12 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Testimonial Cards Container */}
          <div className="relative w-full overflow-hidden">
            <div 
              className="flex gap-6"
              style={{
                transform: `translateX(-${offset}px)`,
                transition: 'none', // No transition for smooth animation
                willChange: 'transform'
              }}
            >
              {infiniteTestimonials.map((testimonial, index) => (
                <div 
                  key={`${testimonial.id}-${index}`}
                  className="shrink-0 w-[380px]"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 relative h-full">
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 text-[#ff7380] text-3xl font-serif">
                      "
                    </div>

                    {/* Customer Info and Content */}
                    <div className="flex gap-4 mb-4">
                      {/* Customer Avatar */}
                      <div className="shrink-0">
                        <div className="relative w-12 h-12 rounded-full bg-red-500 p-1">
                          <div className="w-full h-full rounded-full bg-white overflow-hidden">
                            <Image
                              data={{url: testimonial.avatar, altText: testimonial.name, width: 48, height: 48}}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Review Text */}
                      <div className="flex-1">
                        <p className="text-gray-700 text-xs leading-relaxed mb-3">
                          {testimonial.text}
                        </p>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex justify-center mb-3">
                      <StarRating rating={testimonial.rating} />
                    </div>

                    {/* Customer Name and Title */}
                    <div className="text-center">
                      <h4 className="text-gray-900 font-semibold text-sm mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-xs">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button 
            href="/reviews"
            variant="primary"
            size="medium"
          >
            See Customer Reviews
          </Button>
        </div>
      </div>
    </section>
  );
}
