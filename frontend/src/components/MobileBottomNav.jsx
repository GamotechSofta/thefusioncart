import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const tabs = [
  { to: '/', label: 'Home', icon: Home, match: (path) => path === '/' },
  { to: '/wishlist', label: 'Wishlist', icon: Heart, match: (path) => path.startsWith('/wishlist') },
  { to: '/cart', label: 'Cart', icon: ShoppingBag, match: (path) => path.startsWith('/cart') },
  { to: '/profile', label: 'Account', icon: User, match: (path) => path.startsWith('/profile') },
];

const MobileBottomNav = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 lg:hidden z-50 pointer-events-none"
      style={{ paddingBottom: 'max(10px, env(safe-area-inset-bottom))' }}
    >
      <div className="pointer-events-auto mx-4 mb-1 grid grid-cols-4 items-center rounded-full border border-white/80 bg-white/90 p-1.5 shadow-[0_12px_40px_rgba(16,32,48,0.16),0_2px_10px_rgba(16,32,48,0.06)] backdrop-blur-2xl">
        {tabs.map(({ to, label, icon: Icon, match }) => {
          const active = match(location.pathname);
          const count = to === '/cart' ? cartCount : to === '/wishlist' ? wishlistCount : 0;

          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              onClick={() => {
                if (to === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex h-11 items-center justify-center"
            >
              <span
                className={`relative inline-flex h-11 items-center justify-center rounded-full transition-colors duration-300 ${
                  active
                    ? 'gap-1.5 bg-accent px-3 text-white'
                    : 'w-11 text-[#8a8580] active:text-ink'
                }`}
              >
                <span className="relative shrink-0">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.15 : 1.7} />
                  {count > 0 && (
                    <span
                      className={`absolute -right-2 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full px-0.5 text-[8px] font-semibold leading-none ${
                        active ? 'bg-white text-accent' : 'bg-accent text-white'
                      }`}
                    >
                      {count > 9 ? '9+' : count}
                    </span>
                  )}
                </span>
                {active && (
                  <span className="max-w-[4.5rem] truncate text-[12px] font-medium tracking-[0.04em]">
                    {label}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
