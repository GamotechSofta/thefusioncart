import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTruck, FaAward, FaShieldAlt, FaUndo } from 'react-icons/fa';
import { Sparkles, Truck, RotateCcw } from 'lucide-react';
import { fetchSarees } from '../services/api';
import { placeholders } from '../utils/imagePlaceholder';
import { slugifyCategory } from '../data/categoryTree';
import ProductCard from './ProductCard';

import bathAndHandwashImg from '../assets/bath and handwash.png';
import feminineHygieneImg from '../assets/Feminine Hygiene1.png';
import fragrancesDeosImg from '../assets/Fragrances & Deos1.png';
import haircareImg from '../assets/Hair Care1.png';
import makeupImg from '../assets/Makeup1.png';
import oralCareImg from '../assets/oral care1.png';
import skinCareImg from '../assets/skin care1.png';

import premiumSkinCareImg from '../assets/priminum skincare.png';
import premiumMakeupImg from '../assets/primiummakeup.png';
import premiumHairCareImg from '../assets/primium haircare.png';
import premiumFragrancesImg from '../assets/primiumfragerence.png';

const MAIN_CATEGORY_SLUG = slugifyCategory('Beauty & Hygiene');

const HOME_CATEGORIES = [
  {
    name: 'Skin Essentials',
    image: skinCareImg,
    path: '/category/beauty-and-hygiene/skin-care',
    slug: 'skin-care',
  },
  {
    name: 'Hair Essentials',
    image: haircareImg,
    path: '/category/beauty-and-hygiene/hair-care',
    slug: 'hair-care',
  },
  {
    name: 'Colour & Makeup',
    image: makeupImg,
    path: '/category/beauty-and-hygiene/makeup',
    slug: 'makeup',
  },
  {
    name: 'Bath & Hands',
    image: bathAndHandwashImg,
    path: '/category/beauty-and-hygiene/bath-and-hand-wash',
    slug: 'bath-and-hand-wash',
  },
  {
    name: 'Scents & Deos',
    image: fragrancesDeosImg,
    path: '/category/beauty-and-hygiene/fragrances-and-deos',
    slug: 'fragrances-and-deos',
  },
  {
    name: 'Dental Care',
    image: oralCareImg,
    path: '/category/beauty-and-hygiene/oral-care',
    slug: 'oral-care',
  },
  {
    name: 'Feminine Care',
    image: feminineHygieneImg,
    path: '/category/beauty-and-hygiene/feminine-hygiene',
    slug: 'feminine-hygiene',
  },
];

const shuffleProducts = (items) => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const BuyNestSections = () => {
  const navigate = useNavigate();

  // Click Handler Function
  const handleCategoryClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const OffersNews = () => {
    const headlines = [
      'Free shipping on orders above ₹500',
      'New Skin Essentials this week',
      '7-day easy returns on every order',
      '100% authentic beauty & wellness brands',
      'Hair Essentials now in store',
    ];
    const loop = [...headlines, ...headlines];

    const offers = [
      {
        label: 'Offer',
        title: 'Free shipping',
        text: 'On all orders above ₹500, packed with care and sent across India.',
        cta: 'Shop now',
        icon: Truck,
        path: '/category/beauty-and-hygiene',
        image: premiumSkinCareImg,
        tone: 'dark',
      },
      {
        label: 'New in',
        title: 'Fresh on the shelf',
        text: 'Just-arrived skin, hair and makeup for your daily ritual.',
        cta: 'See arrivals',
        icon: Sparkles,
        path: '/category/beauty-and-hygiene/skin-care',
        image: premiumMakeupImg,
        tone: 'cream',
      },
      {
        label: 'Promise',
        title: 'Easy 7-day returns',
        text: 'Not the one? Send it back — simple, no fuss.',
        cta: 'Learn more',
        icon: RotateCcw,
        path: '/category/beauty-and-hygiene',
        image: premiumHairCareImg,
        tone: 'light',
      },
    ];

    return (
      <section className="bg-white">
        <div className="overflow-hidden border-y border-line bg-accent">
          <div className="offers-marquee py-2.5">
            {loop.map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-6 px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-white/90">
                <span className="h-[3px] w-[3px] rounded-full bg-white/70" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mb-6 flex flex-col items-center text-center sm:mb-8">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.32em] text-gold">This week</p>
            <h2 className="font-display text-[1.65rem] font-medium tracking-[-0.02em] text-ink sm:text-3xl">
              News &amp; offers
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
            {offers.map((offer, index) => {
              const Icon = offer.icon;
              const isDark = offer.tone === 'dark';
              return (
                <button
                  key={offer.title}
                  type="button"
                  onClick={() => handleCategoryClick(offer.path)}
                  className={`group relative flex min-h-[132px] overflow-hidden rounded-2xl border text-left sm:min-h-[240px] ${
                    index === 2 ? 'hidden sm:flex' : ''
                  } ${
                    isDark
                      ? 'border-accent bg-accent text-white'
                      : offer.tone === 'cream'
                        ? 'border-line bg-canvas'
                        : 'border-line bg-white'
                  }`}
                >
                  <span className="relative z-10 flex min-w-0 flex-1 flex-col p-3.5 sm:p-6">
                    <span
                      className={`mb-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full sm:mb-4 sm:h-10 sm:w-10 ${
                        isDark ? 'bg-white/15 text-white' : 'bg-accent text-white'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.8} />
                    </span>
                    <span
                      className={`mb-1 text-[10px] font-medium uppercase tracking-[0.22em] sm:mb-1.5 ${
                        isDark ? 'text-white/70' : 'text-gold'
                      }`}
                    >
                      {offer.label}
                    </span>
                    <span className={`font-display mb-0 text-[1.05rem] font-medium leading-tight tracking-[-0.02em] sm:mb-2 sm:text-[1.5rem] ${isDark ? 'text-white' : 'text-ink'}`}>
                      {offer.title}
                    </span>
                    <span className={`hidden text-[13px] leading-relaxed sm:block ${isDark ? 'text-white/75' : 'text-muted'}`}>
                      {offer.text}
                    </span>
                    <span
                      className={`mt-auto inline-flex items-center gap-2 pt-3 text-[10px] font-medium uppercase tracking-[0.16em] transition-transform duration-300 group-hover:translate-x-1 sm:pt-5 sm:text-[11px] ${
                        isDark ? 'text-white' : 'text-ink'
                      }`}
                    >
                      {offer.cta}
                      <span aria-hidden="true">→</span>
                    </span>
                  </span>

                  <span className="relative w-[38%] shrink-0 self-stretch overflow-hidden sm:w-[42%]">
                    <img
                      src={offer.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span
                      className={`absolute inset-y-0 left-0 w-12 ${
                        isDark
                          ? 'bg-gradient-to-r from-accent to-transparent'
                          : offer.tone === 'cream'
                            ? 'bg-gradient-to-r from-canvas to-transparent'
                            : 'bg-gradient-to-r from-white to-transparent'
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  // Shop by Category Section
  const MainCategories = () => {
    return (
      <section className="relative overflow-hidden bg-white pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-20 lg:pb-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" />
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-14">
            <div className="flex flex-col items-center text-center">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.32em] text-gold">
                Collections
              </p>
              <h2 className="font-display text-[1.85rem] font-medium leading-none tracking-[-0.02em] text-ink sm:text-[2.15rem] md:text-[2.35rem]">
                Shop by category
              </h2>
              <span className="mt-4 mb-4 h-px w-8 bg-gold/70" aria-hidden="true" />
              <p className="max-w-sm text-[13px] leading-relaxed tracking-[0.01em] text-muted sm:text-sm">
                Find your everyday ritual — skin, hair, makeup and more.
              </p>
            </div>
          </div>

          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:gap-y-10 sm:overflow-visible sm:px-0 lg:grid-cols-7">
            {HOME_CATEGORIES.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => handleCategoryClick(category.path)}
                className="group flex w-[5.5rem] shrink-0 flex-col items-center sm:w-auto"
              >
                <span className="relative flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full bg-canvas ring-1 ring-line transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-gold/50 sm:h-[6.5rem] sm:w-[6.5rem] lg:h-28 lg:w-28">
                  <img
                    src={category.image}
                    alt=""
                    className="h-[70%] w-[70%] object-contain transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholders.productList;
                    }}
                  />
                </span>
                <span className="mt-3 text-center text-[12px] font-medium leading-snug text-ink sm:text-[13px]">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  };


  const CategoryProductShelves = () => {
    const [shelves, setShelves] = useState(
      HOME_CATEGORIES.map((category) => ({ ...category, products: [], loading: true }))
    );

    useEffect(() => {
      let cancelled = false;

      const load = async () => {
        const rows = await Promise.all(
          HOME_CATEGORIES.map(async (category) => {
            const data = await fetchSarees(category.slug, null, MAIN_CATEGORY_SLUG, 10, true);
            const products = shuffleProducts(Array.isArray(data) ? data : []).slice(0, 10);
            return { ...category, products, loading: false };
          })
        );

        if (!cancelled) setShelves(rows);
      };

      load();
      return () => {
        cancelled = true;
      };
    }, []);

    return (
      <div className="bg-canvas">
        {shelves.map((shelf, index) => (
          <section
            key={shelf.slug}
            className={`${index === 0 ? 'pt-6 pb-10 sm:pt-8 sm:pb-14' : 'py-10 sm:py-14'} ${index % 2 === 0 ? 'bg-canvas' : 'bg-white'}`}
          >
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
              <div className="mb-5 flex items-end justify-between gap-3 sm:mb-7">
                <div>
                  <p className="section-kicker mb-2">Shop</p>
                  <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">{shelf.name}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(shelf.path)}
                  className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-muted hover:text-ink"
                >
                  View all
                </button>
              </div>

              {shelf.loading ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
                  {Array.from({ length: 10 }).map((_, cardIndex) => (
                    <div key={cardIndex} className="product-card overflow-hidden bg-white">
                      <div className="aspect-square animate-pulse bg-line/60" />
                      <div className="space-y-2 p-3">
                        <div className="h-3 w-1/3 animate-pulse rounded bg-line" />
                        <div className="h-4 w-4/5 animate-pulse rounded bg-line" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : shelf.products.length === 0 ? (
                <p className="py-8 text-sm text-muted">Products for this category are coming soon.</p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
                  {shelf.products.map((product) => (
                    <ProductCard
                      key={product._id || product.id || product.title}
                      product={product}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    );
  };

  // Premium Collection Section
  const PremiumCollection = () => {
    const productData = [
      {
        image: premiumSkinCareImg,
        name: 'Skin Essentials',
        path: '/category/beauty-and-hygiene/skin-care',
        description: 'Moisturizers, cleansers, serums and daily skin essentials.',
        cta: 'Shop Skin',
        bgTint: 'bg-canvas'
      },
      {
        image: premiumMakeupImg,
        name: 'Colour & Makeup',
        path: '/category/beauty-and-hygiene/makeup',
        description: 'Lips, eyes, face, brushes and makeup kits.',
        cta: 'Shop Makeup',
        bgTint: 'bg-canvas'
      },
      {
        image: premiumHairCareImg,
        name: 'Hair Essentials',
        path: '/category/beauty-and-hygiene/hair-care',
        description: 'Shampoos, conditioners, hair oils and styling.',
        cta: 'Shop Hair',
        bgTint: 'bg-canvas'
      },
      {
        image: premiumFragrancesImg,
        name: 'Scents & Deos',
        path: '/category/beauty-and-hygiene/fragrances-and-deos',
        description: 'Body sprays, mists, deodorants and perfumes.',
        cta: 'Shop Scents',
        bgTint: 'bg-canvas'
      }
    ];

    return (
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 w-full bg-canvas">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <p className="section-kicker mb-3">Featured</p>
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl">Premium collection</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {productData.map((product, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(product.path)}
                className="group product-card cursor-pointer bg-white"
              >
                <div className="relative w-full aspect-square overflow-hidden bg-white p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/500x500/1F2937/FFFFFF?text=Product+Image';
                    }}
                  />
                </div>
                <div className="px-4 pb-5 text-center">
                  <h3 className="text-ink font-medium text-base sm:text-lg mb-1">{product.name}</h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2 mb-4 min-h-[32px]">
                    {product.description}
                  </p>
                  <button type="button" className="btn-secondary w-full py-2.5 text-[11px]">
                    {product.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Banner Section
  const BannerSection = () => {
    return (
      <section 
        className="py-8 sm:py-10 md:py-12 lg:py-16 px-2 sm:px-4 md:px-6 lg:px-8 w-full" 
        style={{ backgroundColor: '#fdfaf0' }}
      >
        <div className="w-full">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4">
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl text-ink mb-2 sm:mb-3">
              Shop by category
            </h2>
          </div>

          <div className="w-full px-2 sm:px-4">
            {/* Mobile Banner */}
            <div 
              onClick={() => handleCategoryClick('/category/kids-accessories')}
              className="relative overflow-hidden rounded-2xl shadow-xl md:hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="w-full">
                <img
                  src="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774591555/banner-fmcg-2_sidqv8.jpg"
                  alt="Special Collection Banner"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x800/FEF8DD/000000?text=Banner';
                  }}
                />
              </div>
            </div>
            {/* Desktop Banner */}
            <div 
              onClick={() => handleCategoryClick('/category/kids-accessories')}
              className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl hidden md:block cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01]"
            >
              <div className="w-full">
              <img 
                  src="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774591555/banner-fmcg-2_sidqv8.jpg"
                  alt="Special Collection Banner"
                className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/1200x400/FEF8DD/000000?text=Banner';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Why Choose Us Section
  const WhyChooseUs = () => {
    const features = [
      {
        id: 1,
        icon: FaTruck,
        title: 'Fast Delivery',
        description: 'Quick, reliable shipping across India with secure packaging.',
      },
      {
        id: 2,
        icon: FaAward,
        title: 'Premium Quality',
        description: 'Authentic products sourced with care and attention to detail.',
      },
      {
        id: 3,
        icon: FaShieldAlt,
        title: 'Safe & Certified',
        description: 'Products that meet quality and safety standards you can trust.',
      },
      {
        id: 4,
        icon: FaUndo,
        title: 'Easy Returns',
        description: 'Hassle-free returns within 7 days, with a full refund guarantee.',
      }
    ];

    return (
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 w-full bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-12">
            <p className="section-kicker mb-3">The Shopzen promise</p>
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl">Why shop with us</h2>
            <p className="text-muted text-sm sm:text-base max-w-xl mx-auto mt-4">
              Considered products, transparent prices, and support that stays with you after checkout.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="bg-canvas rounded-lg p-5 sm:p-7 border border-line text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white border border-line flex items-center justify-center text-gold">
                    <IconComponent className="text-lg" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-ink mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  // Promotional Banners Section
  const PromotionalBanners = () => {
    return (
      <section className="py-10 sm:py-12 md:py-16 px-2 sm:px-4 md:px-6 lg:px-8 w-full bg-white">
        <div className="w-full">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4">
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl text-ink mb-2 sm:mb-3">
              Client reviews
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Real feedback from our happy customers across India.
            </p>
          </div>

          {/* Mobile Only Banner */}
          <div className="mb-4 md:hidden px-2">
            <div
              onClick={() => handleCategoryClick('/category/toys')}
              className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
            >
              <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774591242/ca2e5e7b-927f-4410-ab84-d1cce994652f.png"
                  alt="Special Offers Mobile Banner"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x500/E6D9F2/000000?text=Banner';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Desktop Two Banners - Hidden on Mobile */}
          <div className="hidden md:grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-2 sm:px-4">
            <div
              onClick={() => handleCategoryClick('/category/toys')}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-[2/1] bg-gray-100 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774591277/94dae241-59e4-4948-8687-7e72c26a102f.png"
                  alt="Special Offers Desktop Banner 1"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/1200x500/E6D9F2/000000?text=Banner';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div
              onClick={() => handleCategoryClick('/category/toys')}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-[2/1] bg-gray-100 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774591242/ca2e5e7b-927f-4410-ab84-d1cce994652f.png"
                  alt="Special Offers Desktop Banner 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/1200x500/E6D9F2/000000?text=Banner';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="bg-canvas">
      <MainCategories />
      <CategoryProductShelves />
      <PremiumCollection />
      <WhyChooseUs />
    </div>
  );
};

export default BuyNestSections;
