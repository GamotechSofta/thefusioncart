import React from 'react';
import HeroSlider from '../components/HeroSlider';
import BuyNestSections from '../components/TickNTrackSections';
import ScrollToTop from '../components/ScrollToTop';

const Home = () => {
  return (
    <div className="min-h-screen pt-0 mt-0 bg-canvas">
      <HeroSlider />
      <BuyNestSections />
      <ScrollToTop />
    </div>
  );
};

export default Home;
