import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, Loader2, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { placeholders, getProductImage } from '../utils/imagePlaceholder';

const parseMoney = (value) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (!value) return 0;
  const parsed = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

const getProductPrice = (p) =>
  parseMoney(p?.price ?? p?.finalPrice ?? p?.mrp ?? p?.originalPrice);

const getProductMrp = (p) => parseMoney(p?.mrp ?? p?.originalPrice ?? p?.['MRP']);

const getProductBrand = (p) =>
  p?.product_info?.brand ||
  p?.brand ||
  p?.product_info?.manufacturer ||
  p?.manufacturer ||
  p?.product_info?.brandName ||
  'Shopzen';

const hasAuthToken = () => {
  try {
    return Boolean(localStorage.getItem('auth_token'));
  } catch {
    return false;
  }
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, addToCart, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist, isTogglingWishlist } = useWishlist();
  const [adding, setAdding] = useState(false);

  const productId = product?._id || product?.id;
  const title = product?.title || product?.name || 'Untitled Product';
  const brand = getProductBrand(product);
  const price = getProductPrice(product);
  const mrp = getProductMrp(product);
  const showMrp = mrp > price && price > 0;
  const offPercent = showMrp ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const wishlisted = isInWishlist(productId);
  const togglingWish = isTogglingWishlist(productId);
  const cartItem = cart.find(
    (item) => String(item.id) === String(productId) || String(item._id) === String(productId)
  );
  const quantity = cartItem?.quantity || 0;

  const goToProduct = () => {
    if (!productId) return;
    navigate(`/product/${productId}`);
  };

  const requireLogin = () => {
    if (hasAuthToken()) return true;
    navigate('/signin', { state: { from: location } });
    return false;
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!productId || togglingWish) return;
    if (!requireLogin()) return;
    try {
      await toggleWishlist(product);
    } catch {
      /* context surfaces errors */
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!productId || adding) return;
    if (!requireLogin()) return;
    setAdding(true);
    try {
      await addToCart(productId, 1);
    } catch {
      /* cart context handles auth errors */
    } finally {
      setAdding(false);
    }
  };

  const handleQty = async (e, nextQty) => {
    e.preventDefault();
    e.stopPropagation();
    if (!productId || adding) return;
    setAdding(true);
    try {
      await updateQuantity(productId, nextQty);
    } catch {
      /* cart context handles auth errors */
    } finally {
      setAdding(false);
    }
  };

  return (
    <article className="product-card relative flex h-full flex-col bg-white">
      <div className="relative mx-1.5 mt-1.5 aspect-square overflow-hidden rounded-[0.75rem] bg-white">
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.9),transparent_58%)]" />
        <button type="button" onClick={goToProduct} className="absolute inset-0" aria-label={title}>
          <img
            src={getProductImage(product, 'image1') || product.image || placeholders.productList}
            alt={title}
            className="relative z-[1] h-full w-full object-contain p-3 sm:p-4"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholders.productList;
            }}
            loading="lazy"
          />
        </button>

        {offPercent >= 5 && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-gold px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink">
            {offPercent}% off
          </span>
        )}

        <button
          type="button"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={handleWishlist}
          className={`absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-colors ${
            wishlisted
              ? 'border-accent/15 bg-accent text-white'
              : 'border-white/80 bg-white/90 text-muted hover:border-accent/20 hover:text-accent'
          }`}
        >
          {togglingWish ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Heart className="h-3.5 w-3.5" fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={1.8} />
          )}
        </button>

        <div className="absolute bottom-2 right-2 z-10">
          {quantity > 0 ? (
            <div className="flex h-8 items-center overflow-hidden rounded-full border border-accent bg-white ">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={(e) => handleQty(e, quantity - 1)}
                disabled={adding}
                className="flex h-8 w-8 items-center justify-center text-accent disabled:opacity-50"
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={2.2} />
              </button>
              <span className="min-w-[1.15rem] text-center text-xs font-semibold text-accent">
                {adding ? <Loader2 className="mx-auto h-3 w-3 animate-spin" /> : quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={(e) => handleQty(e, quantity + 1)}
                disabled={adding}
                className="flex h-8 w-8 items-center justify-center text-accent disabled:opacity-50"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2.2} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              disabled={adding}
              className="inline-flex h-8 min-w-[3.6rem] items-center justify-center rounded-full bg-accent px-3 text-[10px] font-semibold tracking-[0.14em] text-white transition-colors duration-200 hover:bg-accent-dark disabled:opacity-60"
            >
              {adding ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'ADD'}
            </button>
          )}
        </div>
      </div>

      <button type="button" onClick={goToProduct} className="flex flex-1 flex-col px-3 pb-3.5 pt-2.5 text-left">
        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold line-clamp-1">
          {brand}
        </p>
        <h3 className="mb-2 min-h-[2.35rem] text-[13px] font-medium leading-snug text-ink line-clamp-2">
          {title}
        </h3>
        <p className="mt-auto flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="text-[15px] font-semibold tracking-tight text-ink">
            ₹{Math.round(price).toLocaleString('en-IN')}
          </span>
          {showMrp && (
            <span className="text-[11px] text-muted line-through">
              ₹{Math.round(mrp).toLocaleString('en-IN')}
            </span>
          )}
        </p>
      </button>
    </article>
  );
};

export default ProductCard;
