import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { getProductImage, placeholders } from '../utils/imagePlaceholder';
import ScrollToTop from './ScrollToTop';

function Cart() {
  const navigate = useNavigate();
  const { 
    cart = [], 
    updateQuantity, 
    removeFromCart, 
    cartTotal = 0, 
    cartCount = 0,
    clearCart 
  } = useCart();

  console.log('Cart component rendered with:', { cart, cartTotal, cartCount }); // Debug log
  
  // Debug: Log cart items structure
  useEffect(() => {
    if (cart.length > 0) {
      console.log('Cart items structure:', cart.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        images: item.images,
        hasImage: !!item.image,
        hasImages: !!item.images
      })));
    }
  }, [cart]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleQuantityChange = (itemId, newQuantity, size = null) => {
    if (newQuantity < 1) {
      removeFromCart(itemId, size);
    } else {
      updateQuantity(itemId, newQuantity, size);
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-6xl">
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center text-ink mb-8 transition-colors cursor-pointer border border-line rounded-md px-4 py-2 text-sm font-medium hover:border-ink bg-white"
        >
          <FaArrowLeft className="mr-2 w-3.5 h-3.5" /> Continue shopping
        </button>

        <h1 className="section-title text-3xl sm:text-4xl text-ink mb-8">
          Shopping cart <span className="text-muted text-xl font-sans font-normal">({cartCount})</span>
        </h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-line px-6">
          <FaShoppingCart className="mx-auto text-4xl text-muted mb-5" />
          <h2 className="section-title text-2xl text-ink mb-2">Your cart is empty</h2>
          <p className="text-muted mb-8">Looks like you haven't added anything yet.</p>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Continue shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-2.5 sm:space-y-3">
             {cart.map((item) => {
               // Get image URL - robust resolution
               let imageUrl = item.image;
               if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
                 imageUrl = getProductImage(item) || placeholders.productList;
               }
               
               const displayName = item.name || item.title || 'Product';
               const itemKey = `${item.id || item._id || 'item'}-${item.size || 'default'}`;

               return (
              <div key={itemKey} className="bg-white rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 border border-line">
                <div className="w-full sm:w-24 h-40 sm:h-24 flex items-center justify-center overflow-hidden rounded-md cursor-pointer border border-line self-center sm:self-start bg-canvas">
                  <img
                    src={imageUrl}
                    alt={displayName}
                    className="w-full h-full object-contain"
                    onClick={() => navigate(`/product/${item.id}`)}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = placeholders.productList;
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 w-full sm:w-auto">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="text-sm sm:text-base font-medium text-ink cursor-pointer hover:text-accent transition-colors mb-1 line-clamp-2"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        {displayName}
                      </h3>
                      {item.size && (
                        <p className="text-muted font-medium text-xs mb-1">Size: {item.size}</p>
                      )}
                      {(item.material || item.work) && (
                        <p className="text-gray-600 text-xs mb-1.5 line-clamp-1">
                          {item.material && item.work ? `${item.material} with ${item.work}` : item.material || item.work}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 text-[11px] text-gray-600 mb-2">
                        <span className="bg-gray-50 border border-gray-200 rounded px-2 py-0.5">Unit: ₹{item.price?.toLocaleString()}</span>
                        <span className="bg-gray-50 border border-gray-200 rounded px-2 py-0.5">Qty: {item.quantity || 1}</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 mt-1">
                        <div className="flex items-center border border-line rounded-md overflow-hidden">
                          <button 
                            onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1, item.size)}
                            className="px-3 py-1.5 bg-canvas text-ink hover:bg-line font-medium cursor-pointer transition-colors touch-manipulation"
                            aria-label="Decrease quantity"
                          >
                            <FaMinus className="w-3 h-3" />
                          </button>
                          <span className="px-4 py-1.5 border-x border-line bg-white text-ink font-medium text-sm min-w-[2.25rem] text-center">{item.quantity || 1}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1, item.size)}
                            className="px-3 py-1.5 bg-canvas text-ink hover:bg-line font-medium cursor-pointer transition-colors touch-manipulation"
                            aria-label="Increase quantity"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id, item.size || null)}
                          className="text-red-500 hover:text-red-700 flex items-center cursor-pointer font-medium transition-colors hover:bg-red-50 px-2 py-1.5 rounded-md text-xs touch-manipulation sm:ml-3"
                          aria-label="Remove item"
                        >
                          <FaTrash className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" /> <span className="sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-left sm:text-right w-full sm:w-auto flex sm:block items-center sm:items-end justify-between sm:justify-end gap-2">
                      <div>
                        <p className="text-base sm:text-lg font-semibold text-ink">₹{(item.price * (item.quantity || 1)).toLocaleString()}</p>
                        <p className="text-[11px] text-gray-500">Line total</p>
                      </div>
                    </div>
                  </div>
                 </div>
               </div>
             );
             })}
          </div>
          
          {/* Order Summary */}
          <div className="lg:sticky lg:top-4 h-fit">
            <div className="bg-white rounded-lg p-5 sm:p-6 border border-line">
              <h2 className="section-title text-2xl text-ink mb-6">
                Order summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted text-sm">Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                  <span className="font-medium text-ink text-sm">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted text-sm">Shipping</span>
                  <span className={`text-sm ${cartTotal >= 1000 ? "text-accent font-medium" : "text-ink"}`}>
                    {cartTotal >= 1000 ? 'Free' : '₹99'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted text-sm">Tax (5%)</span>
                  <span className="font-medium text-ink text-sm">₹{Math.round(cartTotal * 0.05).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-semibold bg-canvas p-4 rounded-md">
                  <span className="text-ink">Total</span>
                  <span className="text-ink">₹{(cartTotal + (cartTotal >= 1000 ? 0 : 99) + Math.round(cartTotal * 0.05)).toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/checkout/address')}
                className="w-full btn-primary"
              >
                Proceed to checkout
              </button>
              
              <button 
                onClick={clearCart}
                className="w-full mt-3 btn-secondary"
              >
                Clear cart
              </button>
              
              <p className="text-[10px] sm:text-xs text-gray-500 mt-4 sm:mt-6 text-center leading-relaxed px-1">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
            
          </div>
        </div>
      )}
      </div>
      <ScrollToTop />
    </div>
  );
}

export default Cart;
