import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const DESKTOP_HERO = encodeURI('/Home Page Banner.png');
const MOBILE_HERO = encodeURI('/mobile home page banner.png');

const HeroSlider = () => {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('bannerChanged', { detail: { index: 0, total: 1 } }));
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Mobile hero */}
      <div className="md:hidden relative w-full">
        <img
          src={MOBILE_HERO}
          alt="Shopzen grooming and wellness collection"
          width={1024}
          height={1536}
          className="block w-full h-auto"
          loading="eager"
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.62) 22%, rgba(255, 255, 255, 0.12) 42%, rgba(255, 255, 255, 0) 58%)',
          }}
        />

        <div className="absolute inset-x-0 top-0 z-10 px-6 pt-8 pb-6 text-center">
          <p className="section-kicker mb-3">Beauty &amp; wellness</p>
          <h1 className="section-title text-[2.35rem] leading-[1.05] text-ink mb-3">
            Rituals for
            <br />
            everyday glow.
          </h1>
          <p className="text-[13px] text-ink/70 leading-relaxed max-w-[16.5rem] mx-auto mb-6">
            Authentic essentials for skin, hair, and daily care — chosen with care.
          </p>
          <Link
            to="/category/beauty-and-hygiene"
            className="btn-primary min-w-[10.5rem] inline-flex"
          >
            Shop the collection
          </Link>
        </div>
      </div>

      {/* Desktop hero */}
      <div className="hidden md:block relative w-full">
        <img
          src={DESKTOP_HERO}
          alt="Shopzen beauty and wellness collection"
          width={2084}
          height={754}
          className="block w-full h-auto"
          loading="eager"
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, #ffffff 0%, #ffffff 32%, rgba(255, 255, 255, 0.72) 44%, rgba(255, 255, 255, 0.28) 56%, rgba(255, 255, 255, 0) 70%)',
          }}
        />

        <div className="absolute inset-0 z-10 max-w-[1440px] mx-auto px-8 lg:px-12 flex items-center">
          <div className="w-full max-w-[34rem]">
            <p className="section-kicker mb-4">Beauty &amp; wellness</p>
            <h1 className="section-title text-4xl lg:text-[3.5rem] text-ink leading-[1.08] mb-4">
              Everyday care,
              <br />
              considered.
            </h1>
            <p className="text-sm sm:text-base text-ink/75 leading-relaxed max-w-md mb-6 lg:mb-8">
              Thoughtfully chosen essentials for skin, hair, and daily rituals — authentic brands, fair prices, delivered across India.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/category/beauty-and-hygiene" className="btn-primary min-w-[10.5rem]">
                Shop collection
              </Link>
              <Link to="/category/beauty-and-hygiene/skin-care" className="btn-secondary min-w-[10.5rem]">
                Explore skin care
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
