import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SLIDES = [
  {
    title: "Shop the latest deals",
    text: "Find products from trusted sellers. Fast checkout and secure payments.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1400&auto=format&fit=crop",
    cta: "Browse products",
    link: "/products",
  },
  {
    title: "Tech & gadgets",
    text: "Laptops, phones, and accessories at competitive prices.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop",
    cta: "Shop electronics",
    link: "/products",
  },
  {
    title: "Limited-time events",
    text: "Special offers on selected items. Grab them before they sell out.",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1400&auto=format&fit=crop",
    cta: "View events",
    link: "/events",
  },
];

const AUTOPLAY_MS = 6000;

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const goTo = useCallback((i) => {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  const slide = SLIDES[index];

  return (
    <section
      className="relative bg-white border-b border-gray-200 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Ambient background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-teal-100 blur-3xl opacity-60"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 items-center">
          {/* Text column */}
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs sm:text-sm font-medium text-teal-700 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
              Welcome to Crown Market
            </span>

            <h1
              key={index}
              aria-live="polite"
              className="animate-hero-fade text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4"
            >
              {slide.title}
            </h1>
            <p
              key={`text-${index}`}
              className="animate-hero-fade text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md"
            >
              {slide.text}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                to={slide.link}
                className="rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-800 transition text-center"
              >
                {slide.cta}
              </Link>
              <Link
                to="/sign-up"
                className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition text-center"
              >
                Create account
              </Link>
            </div>

            {/* Dots + arrows */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => goTo(i)}
                    className="p-1.5 -m-1.5"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-300 ${
                        i === index ? "w-8 bg-teal-700" : "w-2 bg-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-2 ml-2">
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={prev}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                >
                  <IoIosArrowBack size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={next}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                >
                  <IoIosArrowForward size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Image column */}
          <div
            className="order-1 md:order-2 relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm aspect-[16/10] sm:aspect-[4/3] md:aspect-[4/3] touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              key={`img-${index}`}
              src={slide.image}
              alt={slide.title}
              loading={index === 0 ? "eager" : "lazy"}
              className="animate-hero-fade w-full h-full object-cover"
            />

            {/* Mobile arrows overlay on image */}
            <div className="sm:hidden absolute inset-0 flex items-center justify-between px-2">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={prev}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-gray-700 shadow-sm"
              >
                <IoIosArrowBack size={18} />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={next}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-gray-700 shadow-sm"
              >
                <IoIosArrowForward size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-hero-fade {
          animation: heroFade 0.5s ease both;
        }
      `}</style>
    </section>
  );
};

export default Hero;