import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsVisible(false);
  }, [location.pathname, location.search, location.hash]);

  React.useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 bg-ink hover:bg-accent text-white rounded-full p-3 transition-colors duration-200"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-sm" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
