import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const headerWrapRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const hideFooter =
    location.pathname.startsWith('/category/') ||
    location.pathname.startsWith('/product/');
  const showMobileNav = !location.pathname.includes('/product/');

  useEffect(() => {
    const updateHeight = () => {
      if (headerWrapRef.current) {
        setHeaderHeight(headerWrapRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    const observer = new MutationObserver(updateHeight);
    if (headerWrapRef.current) {
      observer.observe(headerWrapRef.current, { childList: true, subtree: true, attributes: true });
    }
    return () => {
      window.removeEventListener('resize', updateHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen bg-canvas ${
        showMobileNav ? 'pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0' : ''
      }`}
      style={{ '--app-header-height': `${headerHeight}px` }}
    >
      <div ref={headerWrapRef} className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md">
        <Navbar />
      </div>

      <div aria-hidden="true" style={{ height: headerHeight }} className="bg-white" />

      <main className="flex-grow bg-canvas" style={{ position: 'relative' }}>
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
