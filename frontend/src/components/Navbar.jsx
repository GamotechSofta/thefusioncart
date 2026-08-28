import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { searchProducts } from '../services/api';
import { placeholders, getProductImage } from '../utils/imagePlaceholder';
import { navbarCategories } from '../data/categoryTree';
import { api } from '../utils/api';
import brandLogo from '../assets/logo.jpeg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchExpanded, setMobileSearchExpanded] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const searchWrapRefDesktop = useRef(null);
  const searchWrapRefMobile = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const categoryRef = useRef(null);
  const hoverCloseTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [userInitial, setUserInitial] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [avatarError, setAvatarError] = useState(false);
  const [headerLogo, setHeaderLogo] = useState({
    url: brandLogo,
    alt: 'Shopzen',
    width: 'auto',
    height: 'auto',
  });

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const { api } = await import('../utils/api');
        const logo = await api.getLogo('header').catch(() => null);
        const isLegacy = /buynest|untitled_1500_x_500|shopzen-logo/i.test(`${logo?.url || ''} ${logo?.alt || ''}`);
        if (logo && logo.url && !isLegacy) {
          setHeaderLogo({
            url: brandLogo,
            alt: logo.alt || 'Shopzen',
            width: logo.width || 'auto',
            height: logo.height || 'auto',
          });
        }
      } catch (err) {
        console.error('Failed to load header logo:', err);
      }
    };
    loadLogo();

    // Listen for logo updates
    const handleLogoUpdate = (event) => {
      if (event.detail.type === 'header') {
        loadLogo();
      }
    };
    window.addEventListener('logo:updated', handleLogoUpdate);
    return () => window.removeEventListener('logo:updated', handleLogoUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadWishlistCount = async () => {
      try {
        const { getWishlistCount } = await import('../services/api');
        const data = await getWishlistCount();
        setWishlistCount(data.count || 0);
      } catch {
        setWishlistCount(0);
      }
    };
    
    loadWishlistCount();
    
    // Listen for wishlist updates (from custom event)
    const onWishlistUpdated = () => {
      loadWishlistCount();
    };
    
    window.addEventListener('wishlist:updated', onWishlistUpdated);
    return () => {
      window.removeEventListener('wishlist:updated', onWishlistUpdated);
    };
  }, []);

  // Check authentication status and get user initial
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const authenticated = Boolean(token);
        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          // Try to get user data from localStorage or API
          try {
            const userData = localStorage.getItem('user_data');
            if (userData) {
              const parsed = JSON.parse(userData);
              const name = parsed.name || parsed.user?.name || '';
              const email = parsed.email || parsed.user?.email || '';
              const avatar = parsed.avatar || parsed.user?.avatar || '';
              const initial = name ? name.charAt(0).toUpperCase() : (email ? email.charAt(0).toUpperCase() : 'U');
              setUserInitial(initial);
              setUserAvatar(avatar);
              setAvatarError(false);
            } else {
              // Try to fetch from API
              try {
                const { api } = await import('../utils/api');
                const data = await api.me();
                const userName = data?.user?.name || '';
                const userEmail = data?.user?.email || '';
                const userAvatar = data?.user?.avatar || '';
                const initial = userName ? userName.charAt(0).toUpperCase() : (userEmail ? userEmail.charAt(0).toUpperCase() : 'U');
                setUserInitial(initial);
                setUserAvatar(userAvatar);
                setAvatarError(false);
              } catch {
                setUserInitial('U');
                setUserAvatar('');
                setAvatarError(false);
              }
            }
          } catch {
            setUserInitial('U');
            setUserAvatar('');
            setAvatarError(false);
          }
        } else {
          setUserInitial('');
          setUserAvatar('');
          setAvatarError(false);
        }
      } catch {
        setIsAuthenticated(false);
        setUserInitial('');
      }
    };

    checkAuth();
    
    // Listen for storage events (from other tabs/windows)
    const onStorage = (e) => {
      if (!e || e.key === 'auth_token' || e.key === 'user_data') {
        checkAuth();
      }
    };
    
    // Listen for custom auth state change events (from same window)
    const onAuthStateChanged = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', onStorage);
    window.addEventListener('authStateChanged', onAuthStateChanged);
    
    // Listen for profile picture updates
    const onProfilePictureUpdated = () => {
      checkAuth();
    };
    window.addEventListener('profilePictureUpdated', onProfilePictureUpdated);
    
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('authStateChanged', onAuthStateChanged);
      window.removeEventListener('profilePictureUpdated', onProfilePictureUpdated);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Call backend logout endpoint to clear cookies
      const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5000';
      try {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          credentials: 'include', // Include cookies
        });
      } catch (err) {
        console.error('Logout API error:', err);
        // Continue with local logout even if API fails
      }
      
      // Clear localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_is_admin');
      localStorage.removeItem('user_data');
      
      // Update state
      setIsAuthenticated(false);
      setUserInitial('');
      setUserAvatar('');
      setAvatarError(false);
      
      // Dispatch events to notify other components
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { authenticated: false } }));
      
      // Navigate to sign in
      navigate('/signin');
    } catch (err) {
      console.error('Logout error:', err);
      // Fallback: clear local storage and navigate
      try {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_is_admin');
        localStorage.removeItem('user_data');
      } catch {
        // Ignore localStorage cleanup errors
      }
      setIsAuthenticated(false);
      setUserInitial('');
      setUserAvatar('');
      setAvatarError(false);
      navigate('/signin');
    }
  };

  const handleLogin = () => {
    navigate('/signin', { state: { backgroundLocation: location } });
  };

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    setSearchOpen(false);
    setMobileSearchExpanded(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const closeMobileSearch = () => {
    setSearchOpen(false);
    setMobileSearchExpanded(false);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === 'Escape') {
      closeMobileSearch();
    }
  };

  // Debounced fetch for inline search results
  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < 2) {
      setSearchResults([]);
      setSearchLoading(false);
      // Don't close the dropdown if it's already open - let user continue typing
      return;
    }
    setSearchLoading(true);
    setSearchOpen(true);
    const t = setTimeout(async () => {
      try {
        const data = await searchProducts(q);
        const items = data?.results || [];
        setSearchResults(items);
      } catch {
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e) => {
      const inDesktop = searchWrapRefDesktop.current && searchWrapRefDesktop.current.contains(e.target);
      const inMobile = searchWrapRefMobile.current && searchWrapRefMobile.current.contains(e.target);
      if (!inDesktop && !inMobile) {
        setSearchOpen(false);
        setMobileSearchExpanded(false);
      }
    };
    const onEscape = (e) => {
      if (e.key === 'Escape') closeMobileSearch();
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('touchstart', onClick);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('touchstart', onClick);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  const categories = navbarCategories;
  const isCategoryRoute = location.pathname.startsWith('/category/');

  const CATEGORY_MENU_CLOSE_MS = 160;

  const cancelCategoryMenuClose = () => {
    if (hoverCloseTimeoutRef.current) {
      clearTimeout(hoverCloseTimeoutRef.current);
      hoverCloseTimeoutRef.current = null;
    }
  };

  const scheduleCategoryMenuClose = (categoryName) => {
    cancelCategoryMenuClose();
    hoverCloseTimeoutRef.current = setTimeout(() => {
      setActiveCategory((prev) => (prev === categoryName ? null : prev));
      hoverCloseTimeoutRef.current = null;
    }, CATEGORY_MENU_CLOSE_MS);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on a link
      if (event.target.tagName === 'A' || event.target.closest('a')) {
        return;
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setActiveCategory(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileSearchExpanded(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!mobileSearchExpanded) return;
    const t = setTimeout(() => mobileSearchInputRef.current?.focus(), 220);
    return () => clearTimeout(t);
  }, [mobileSearchExpanded]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={`sticky top-0 z-[70] w-full bg-white/95 backdrop-blur-md border-b transition-all duration-200 ${isScrolled ? 'border-line shadow-[0_8px_24px_rgba(23,23,23,0.04)]' : 'border-line/70 shadow-none'}`}>
      <div className="w-full">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[72px] lg:h-14 gap-3 lg:gap-4 min-w-0">
            {/* Logo/Brand - Left */}
            <Link to="/" className="flex-shrink-0 flex items-center py-1">
              <img 
                src={headerLogo.url || brandLogo}
                alt={headerLogo.alt || 'Shopzen'}
                className="h-10 sm:h-11 md:h-12 lg:h-8 xl:h-9 w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[160px] xl:max-w-[180px] object-contain object-left"
                onError={(e) => {
                  e.target.src = brandLogo;
                }}
              />
            </Link>

            {/* Navigation Menu - Center (Desktop & Laptop >= 1024px) */}
            <div className="hidden lg:flex items-center justify-center shrink-0 px-1" ref={categoryRef}>
              <div className="flex items-center gap-1 xl:gap-2">
                <Link
                  to="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`font-display text-[15px] xl:text-base font-medium tracking-[-0.02em] whitespace-nowrap px-2.5 py-1.5 border-b-2 transition-colors ${
                    location.pathname === '/'
                      ? 'border-ink text-ink'
                      : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  Home
                </Link>

                <div
                  className="relative"
                  onMouseEnter={() => {
                    cancelCategoryMenuClose();
                    setActiveCategory('shop');
                  }}
                  onMouseLeave={() => scheduleCategoryMenuClose('shop')}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 font-display text-[15px] xl:text-base font-medium tracking-[-0.02em] transition-colors duration-200 cursor-pointer whitespace-nowrap px-2.5 py-1.5 border-b-2 ${
                      isCategoryRoute || activeCategory === 'shop'
                        ? 'border-ink text-ink'
                        : 'border-transparent text-muted hover:text-ink'
                    }`}
                    aria-expanded={activeCategory === 'shop'}
                    aria-haspopup="true"
                  >
                    <span>Categories</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${activeCategory === 'shop' ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {activeCategory === 'shop' && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-[80]">
                      <div className="bg-white border border-line rounded-lg shadow-[0_16px_40px_rgba(23,23,23,0.1)] min-w-[420px] p-3">
                        <p className="section-kicker px-3 pt-1 pb-2">Shop by category</p>
                        <div className="grid grid-cols-2 gap-0.5">
                          {categories.map((category) => {
                            const isActive = location.pathname === category.path;
                            return (
                              <button
                                key={category.name}
                                type="button"
                                className={`text-left px-3 py-2.5 rounded-md text-sm transition-colors ${
                                  isActive
                                    ? 'bg-canvas text-ink font-medium'
                                    : 'text-ink/80 hover:bg-canvas hover:text-ink'
                                }`}
                                onClick={() => {
                                  setActiveCategory(null);
                                  navigate(category.path);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                              >
                                {category.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  to="/about"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`font-display text-[15px] xl:text-base font-medium tracking-[-0.02em] whitespace-nowrap px-2.5 py-1.5 border-b-2 transition-colors ${
                    location.pathname === '/about'
                      ? 'border-ink text-ink'
                      : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  About Us
                </Link>

                <Link
                  to="/contact"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`font-display text-[15px] xl:text-base font-medium tracking-[-0.02em] whitespace-nowrap px-2.5 py-1.5 border-b-2 transition-colors ${
                    location.pathname === '/contact'
                      ? 'border-ink text-ink'
                      : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Desktop search bar */}
            <div className="hidden lg:block relative flex-1 max-w-[320px] xl:max-w-[380px] mx-3 xl:mx-4" ref={searchWrapRefDesktop}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="flex items-center h-8 xl:h-9 w-full rounded-full border border-line bg-canvas pl-3 pr-1 gap-2 focus-within:border-ink focus-within:bg-white transition-colors"
              >
                <Search className="w-4 h-4 text-muted shrink-0" strokeWidth={1.75} />
                <input
                  type="text"
                  placeholder="Search products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.trim().length >= 2) setSearchOpen(true);
                  }}
                  onKeyDown={handleSearchKeyPress}
                  className="flex-1 min-w-0 bg-transparent text-sm text-ink placeholder-muted outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 h-6 xl:h-7 px-3 rounded-full bg-ink text-white text-[10px] tracking-[0.12em] uppercase font-medium hover:bg-accent transition-colors"
                >
                  Search
                </button>
              </form>
              {searchOpen && searchQuery.trim().length >= 2 && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white border border-line rounded-lg shadow-[0_16px_40px_rgba(23,23,23,0.1)] z-[80] overflow-hidden">
                  {searchLoading && (
                    <div className="px-4 py-3 text-sm text-muted">Searching…</div>
                  )}
                  {!searchLoading && searchResults.length === 0 && (
                    <div className="px-4 py-3 text-sm text-muted">No products found</div>
                  )}
                  {!searchLoading && searchResults.length > 0 && (
                    <ul className="max-h-80 overflow-auto divide-y divide-line">
                      {searchResults.slice(0, 8).map((p) => (
                        <li key={p._id || p.id || p.slug}>
                          <button
                            type="button"
                            onClick={() => {
                              setSearchOpen(false);
                              navigate(`/product/${p._id || p.id || ''}`);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-canvas text-left"
                          >
                            <img
                              src={getProductImage(p, 'image1') || p.image || placeholders.thumbnail}
                              alt={p.title || p.name || 'Product'}
                              className="w-11 h-14 object-cover rounded-md border border-line flex-shrink-0 bg-canvas"
                              onError={(e) => { e.target.onerror = null; e.target.src = placeholders.thumbnail; }}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-ink truncate">{p.title || p.name || 'Product'}</p>
                              {p.price && (
                                <p className="text-xs text-muted mt-0.5">₹{Number(p.price).toLocaleString()}</p>
                              )}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <div
              ref={searchWrapRefMobile}
              className={`lg:hidden relative min-w-0 overflow-visible transition-[max-width,opacity,margin] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                mobileSearchExpanded
                  ? 'flex-1 max-w-[100%] opacity-100 ml-2'
                  : 'max-w-0 opacity-0 ml-0 pointer-events-none'
              }`}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="flex items-center h-10 w-full rounded-full border border-line bg-canvas pl-3 pr-2 gap-2 overflow-hidden"
              >
                <Search className="w-4 h-4 text-muted shrink-0" strokeWidth={1.75} />
                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyPress}
                  tabIndex={mobileSearchExpanded ? 0 : -1}
                  className="flex-1 min-w-0 bg-transparent text-sm text-ink placeholder-muted outline-none"
                />
                <button
                  type="button"
                  onClick={closeMobileSearch}
                  className="p-1 rounded-full text-muted hover:text-ink"
                  aria-label="Close search"
                  tabIndex={mobileSearchExpanded ? 0 : -1}
                >
                  <X className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </form>
              <div
                className={`absolute left-0 right-0 top-[calc(100%+8px)] bg-white border border-line rounded-lg shadow-[0_16px_40px_rgba(23,23,23,0.1)] z-[80] overflow-hidden origin-top transition-all duration-300 ease-out ${
                  mobileSearchExpanded && searchOpen && searchQuery.trim().length >= 2
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-1 invisible pointer-events-none'
                }`}
              >
                {searchLoading && (
                  <div className="px-4 py-3 text-sm text-muted">Searching…</div>
                )}
                {!searchLoading && searchResults.length === 0 && (
                  <div className="px-4 py-3 text-sm text-muted">No products found</div>
                )}
                {!searchLoading && searchResults.length > 0 && (
                  <ul className="max-h-80 overflow-auto divide-y divide-line">
                    {searchResults.slice(0, 8).map((p) => (
                      <li key={p._id || p.id || p.slug}>
                        <button
                          type="button"
                          onClick={() => {
                            closeMobileSearch();
                            navigate(`/product/${p._id || p.id || ''}`);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-canvas text-left"
                        >
                          <img
                            src={getProductImage(p, 'image1') || p.image || placeholders.thumbnail}
                            alt={p.title || p.name || 'Product'}
                            className="w-10 h-12 object-cover rounded-md border border-line flex-shrink-0"
                            onError={(e) => { e.target.onerror = null; e.target.src = placeholders.thumbnail; }}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-ink truncate">{p.title || p.name || 'Product'}</p>
                            {p.price && (
                              <p className="text-xs text-muted">₹{Number(p.price).toLocaleString()}</p>
                            )}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div
              className={`flex items-center gap-0.5 sm:gap-1 flex-shrink-0 ml-auto lg:ml-0 overflow-hidden transition-[opacity,transform,max-width,margin] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                mobileSearchExpanded
                  ? 'max-lg:opacity-0 max-lg:translate-x-3 max-lg:max-w-0 max-lg:ml-0 max-lg:pointer-events-none'
                  : 'opacity-100 translate-x-0'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  setMobileSearchExpanded(true);
                  setSearchOpen(true);
                }}
                className="lg:hidden p-2 rounded-full text-ink hover:bg-canvas transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.6} />
              </button>

              <Link
                to="/wishlist"
                className="hidden md:flex p-1.5 lg:p-1.5 rounded-full text-ink hover:bg-canvas relative transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" strokeWidth={1.6} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-accent text-white text-[9px] rounded-full h-4 min-w-4 px-0.5 flex items-center justify-center font-medium">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="p-1.5 lg:p-1.5 rounded-full text-ink hover:bg-canvas relative transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.6} />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-accent text-white text-[9px] rounded-full h-4 min-w-4 px-0.5 flex items-center justify-center font-medium">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {isAuthenticated && userInitial ? (
                <Link
                  to="/profile"
                  className="hidden md:flex w-8 h-8 rounded-full bg-canvas text-ink items-center justify-center hover:bg-line transition-colors overflow-hidden border border-line"
                  title="My Profile"
                >
                  {userAvatar && !avatarError ? (
                    <img
                      src={userAvatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <User className="w-5 h-5" strokeWidth={1.6} />
                  )}
                </Link>
              ) : (
                <button
                  onClick={handleLogin}
                  className="hidden md:flex p-2 rounded-full text-ink hover:bg-canvas transition-colors items-center justify-center"
                  aria-label="Sign In"
                >
                  <User className="w-5 h-5" strokeWidth={1.6} />
                </button>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-full text-ink hover:bg-canvas focus:outline-none touch-manipulation"
                aria-expanded={isMobileMenuOpen}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <div className="lg:hidden">
            <div
              className={`fixed inset-0 z-[90] bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 ${
                isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <aside
              className={`fixed top-0 right-0 z-[100] h-dvh w-[min(88vw,360px)] bg-white shadow-[-16px_0_40px_rgba(23,23,23,0.12)] flex flex-col transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
              }`}
              aria-hidden={!isMobileMenuOpen}
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-line shrink-0">
                <img
                  src={headerLogo.url || brandLogo}
                  alt={headerLogo.alt || 'Shopzen'}
                  className="h-10 w-auto max-w-[200px] object-contain object-left"
                  onError={(e) => {
                    e.target.src = brandLogo;
                  }}
                />
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="p-2 rounded-full text-ink hover:bg-canvas"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5">
                <nav className="space-y-1">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'About Us', path: '/about' },
                    { name: 'Contact Us', path: '/contact' },
                  ].map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => {
                          closeMobileMenu();
                          window.scrollTo(0, 0);
                        }}
                        className={`flex items-center justify-between py-3 text-sm tracking-[0.08em] uppercase border-b border-line ${
                          isActive ? 'text-ink font-semibold' : 'text-muted'
                        }`}
                      >
                        {item.name}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-7">
                  <p className="section-kicker mb-3">Categories</p>
                  <div className="space-y-1">
                    {categories.map((cat) => {
                      const isActive = location.pathname === cat.path;
                      return (
                        <button
                          key={cat.name}
                          type="button"
                          className={`w-full flex items-center justify-between py-3 text-left text-sm border-b border-line ${
                            isActive ? 'text-ink font-medium' : 'text-ink/80'
                          }`}
                          onClick={() => {
                            closeMobileMenu();
                            navigate(cat.path);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          {cat.name}
                          <ChevronRight className="w-4 h-4 text-muted" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-2">
                  <Link
                    to="/wishlist"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center gap-2 py-3 rounded-md border border-line text-sm text-ink hover:bg-canvas"
                  >
                    <Heart className="w-4 h-4" strokeWidth={1.6} />
                    Wishlist
                    {wishlistCount > 0 && (
                      <span className="bg-accent text-white text-[10px] rounded-full h-5 min-w-5 px-1 flex items-center justify-center">
                        {wishlistCount > 9 ? '9+' : wishlistCount}
                      </span>
                    )}
                  </Link>
                  {isAuthenticated && userInitial ? (
                    <Link
                      to="/profile"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center gap-2 py-3 rounded-md border border-line text-sm text-ink hover:bg-canvas"
                    >
                      <User className="w-4 h-4" strokeWidth={1.6} />
                      Profile
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        closeMobileMenu();
                        handleLogin();
                      }}
                      className="flex items-center justify-center gap-2 py-3 rounded-md border border-line text-sm text-ink hover:bg-canvas"
                    >
                      <User className="w-4 h-4" strokeWidth={1.6} />
                      Sign In
                    </button>
                  )}
                </div>

                {isAuthenticated && (
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      handleLogout();
                    }}
                    className="mt-4 w-full py-3 rounded-md bg-ink text-white text-sm tracking-[0.08em] uppercase"
                  >
                    Logout
                  </button>
                )}
              </div>
            </aside>
          </div>,
          document.body
        )}

      {/* Custom Styles for Dropdown */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: fade-in 0.2s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .border-l-3 {
          border-left-width: 3px;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;