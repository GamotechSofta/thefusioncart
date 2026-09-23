import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const DESKTOP_HERO = '/hero.png';
const MOBILE_SLIDES = [
  '/mobileHero1.png',
  '/mobileHero2.png',
  '/mobileHero3.png'
];

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('bannerChanged', { detail: { index: 0, total: 1 } }));
  }, []);

  // Update active slide on scroll for mobile carousel
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const width = scrollContainerRef.current.offsetWidth;
        const index = Math.round(scrollLeft / width);
        setActiveSlide(index);
      }
    };
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden font-sans">
      
      {/* =======================
          DESKTOP VIEW (≥md)
      ======================= */}
      <div className="hidden md:block relative w-full">
        {/* Background Image */}
        <img
          src={DESKTOP_HERO}
          alt="Skincare hero"
          className="w-full h-auto block"
        />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center lg:justify-between max-w-[1800px] mx-auto px-6 py-4 md:px-12 md:py-8 w-full h-full pointer-events-none">
          
          {/* Main Content */}
          <div className="pt-24 lg:pt-32 max-w-[500px] lg:max-w-[700px] pointer-events-auto">
            <h1 className="text-[3.2rem] leading-[1] md:text-[4.5rem] lg:text-[5.5rem] font-medium tracking-tight text-[#1a1a1a] mb-6" style={{ letterSpacing: '-0.02em' }}>
              Skincare that<br/>
              brings out your<br/>
              natural glow
            </h1>
            <p className="text-sm md:text-base text-gray-800 max-w-md mb-8 md:mb-12 leading-relaxed font-medium">
              Gentle, effective formulas crafted with nature-inspired ingredients
              to restore balance and reveal your natural glow.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/category/beauty-and-hygiene/skin-care" className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/40 hover:bg-black/5 transition-colors text-sm font-medium text-black">
                Shop skincare <span className="text-lg leading-none">↗</span>
              </Link>
              <Link to="/category/beauty-and-hygiene/makeup" className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/40 hover:bg-black/5 transition-colors text-sm font-medium text-black">
                Shop makeup <span className="text-lg leading-none">↗</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Elements */}
        <div className="absolute bottom-0 left-0 right-0 z-20 max-w-[1800px] mx-auto px-6 md:px-12 pb-8 md:pb-12 w-full flex justify-end items-end pointer-events-none">
          {/* Slider Controls */}
          <div className="flex items-center gap-4 pointer-events-auto">
            <button className="w-11 h-11 rounded-full border border-black/30 flex items-center justify-center hover:bg-black/5 transition-colors text-black">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="flex items-center gap-3 text-sm font-medium">
              <span className="text-black">02</span>
              <div className="w-32 h-[1px] bg-black/30 relative">
                <div className="absolute left-0 top-0 h-[2px] -translate-y-[0.5px] bg-black w-1/3"></div>
              </div>
              <span className="text-black/40">06</span>
            </div>
            <button className="w-11 h-11 rounded-full border border-black/30 flex items-center justify-center hover:bg-black/5 transition-colors text-black">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* =======================
          MOBILE VIEW (<md)
      ======================= */}
      <div className="md:hidden relative w-full h-[85vh] min-h-[600px] bg-canvas">
        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory hide-scrollbar overscroll-x-contain"
          style={{ scrollBehavior: 'smooth' }}
        >
          {MOBILE_SLIDES.map((slide, index) => (
            <div key={index} className="w-full h-full shrink-0 snap-center relative">
              <img 
                src={slide} 
                alt={`Hero slide ${index + 1}`} 
                className="w-full h-full object-cover object-center block"
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* Subtle gradient overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Floating Content Overlay for Mobile */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-20 pointer-events-none">
          <div className="pointer-events-auto">
            <h1 className="text-[2.5rem] leading-[1.05] font-medium tracking-tight text-white mb-4 shadow-sm" style={{ letterSpacing: '-0.02em' }}>
              Skincare that<br/>
              brings out your<br/>
              natural glow
            </h1>
            <p className="text-sm text-white/90 max-w-sm mb-6 leading-relaxed font-medium">
              Gentle, effective formulas crafted with nature-inspired ingredients
              to restore balance and reveal your natural glow.
            </p>
            
            <div className="flex flex-row items-center gap-3">
              <Link to="/category/beauty-and-hygiene/skin-care" className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-ink text-sm font-semibold transition-transform active:scale-95 shadow-lg">
                Shop skincare
              </Link>
              <Link to="/category/beauty-and-hygiene/makeup" className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white text-white text-sm font-semibold hover:bg-white/10 transition-colors active:scale-95 backdrop-blur-sm">
                Shop makeup
              </Link>
            </div>
          </div>
        </div>

        {/* Modern Carousel Dots (Pill shape for active) */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2 z-20 pointer-events-auto">
          {MOBILE_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({
                    left: scrollContainerRef.current.offsetWidth * i,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`transition-all duration-300 rounded-full h-1.5 ${
                activeSlide === i ? 'bg-white w-6' : 'bg-white/40 w-1.5'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default HeroSlider;
