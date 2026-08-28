import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle, Clock } from 'lucide-react';
import { api } from '../utils/api';
import brandLogo from '../assets/logo.jpeg';
import { COMPANY_INFO } from '../config/companyInfo';

const CONTACT_INFO = {
  email: COMPANY_INFO.email,
  phone: COMPANY_INFO.phone,
  address: COMPANY_INFO.registeredAddress,
  companyName: COMPANY_INFO.legalName,
  gstin: COMPANY_INFO.gstin,
  cin: COMPANY_INFO.cin,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerLogo, setFooterLogo] = useState({
    url: brandLogo,
    alt: 'Shopzen',
    width: 'auto',
    height: 'auto',
  });

  useEffect(() => {
    loadLogo();
  }, []);

  const loadLogo = async () => {
    try {
      const logo = await api.getLogo('footer').catch(() => null);
      const isLegacy = /buynest|untitled_1500_x_500|shopzen-logo/i.test(`${logo?.url || ''} ${logo?.alt || ''}`);
      if (logo && logo.url && !isLegacy) {
        setFooterLogo({
          url: brandLogo,
          alt: logo.alt || 'Shopzen',
          width: logo.width || 'auto',
          height: logo.height || 'auto',
        });
      }
    } catch (err) {
      console.error('Failed to load footer logo:', err);
    }
  };

  useEffect(() => {
    const handleLogoUpdate = (event) => {
      if (event.detail.type === 'footer') {
        loadLogo();
      }
    };
    window.addEventListener('logo:updated', handleLogoUpdate);
    return () => window.removeEventListener('logo:updated', handleLogoUpdate);
  }, []);

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Wishlist', path: '/wishlist' },
    { name: 'My Account', path: '/profile' },
  ];

  const categories = [
    { name: 'Skin Essentials', path: '/category/beauty-and-hygiene/skin-care' },
    { name: 'Hair Essentials', path: '/category/beauty-and-hygiene/hair-care' },
    { name: 'Colour & Makeup', path: '/category/beauty-and-hygiene/makeup' },
    { name: 'Bath & Hands', path: '/category/beauty-and-hygiene/bath-and-hand-wash' },
    { name: 'Scents & Deos', path: '/category/beauty-and-hygiene/fragrances-and-deos' },
    { name: 'Dental Care', path: '/category/beauty-and-hygiene/oral-care' },
    { name: 'Feminine Care', path: '/category/beauty-and-hygiene/feminine-hygiene' },
    { name: 'Health & Wellness', path: '/category/beauty-and-hygiene/health-and-medicine' },
  ];

  const whatsappNumber = CONTACT_INFO.phone.replace(/[\s+\-]/g, '').replace(/^91/, '');

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-4 h-4" />,
      url: `https://wa.me/91${whatsappNumber}`,
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-4 h-4" />,
      url: 'https://instagram.com',
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4" />,
      url: 'https://facebook.com',
    },
  ];

  return (
    <footer className="w-full bg-white text-ink border-t border-line mt-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block">
              <img 
                src={footerLogo.url || brandLogo}
                alt={footerLogo.alt || CONTACT_INFO.companyName}
                className="h-12 sm:h-14 w-auto max-w-[240px] object-contain object-left"
                onError={(e) => {
                  e.target.src = brandLogo;
                }}
              />
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-sm">
              <strong className="font-medium text-ink">{COMPANY_INFO.legalName}</strong> — a considered destination for everyday essentials, beauty, and wellness. Quality products, fair prices, and reliable service across India.
            </p>
            <div className="pt-1">
              <p className="section-kicker mb-3">Connect</p>
              <div className="flex items-center gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-line text-ink flex items-center justify-center hover:bg-ink hover:text-white hover:border-ink transition-colors duration-200"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="section-kicker pb-2">Quick links</h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-muted hover:text-ink transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="section-kicker pb-2">Categories</h4>
            <ul className="grid grid-cols-1 gap-2.5 text-sm">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link to={category.path} className="text-muted hover:text-ink transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="section-kicker pb-2">Contact</h4>
            <div className="space-y-4 text-sm text-muted">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-ink hover:text-accent transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                  <p className="text-xs text-muted mt-0.5">Call / WhatsApp</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-ink hover:text-accent break-all transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                  <p className="text-xs text-muted mt-0.5">Email support</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">{CONTACT_INFO.address}</p>
              </div>
              <div className="flex items-start gap-3 pt-2 border-t border-line">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <p className="text-xs">
                  <strong className="text-ink font-medium">Mon – Sat:</strong> 9:00 AM – 6:00 PM IST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-canvas border-t border-line py-4 px-4">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs tracking-wide text-muted">
          <Link to="/privacy" className="hover:text-ink transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-ink transition-colors">Terms &amp; Conditions</Link>
          <Link to="/shipping" className="hover:text-ink transition-colors">Shipping Policy</Link>
          <Link to="/refund-cancellation" className="hover:text-ink transition-colors">Refund &amp; Cancellation</Link>
        </div>
      </div>

      <div className="w-full bg-ink text-white/70 py-4 px-4">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-center sm:text-left">
          <p>
            © {currentYear} <strong className="text-white font-medium">{CONTACT_INFO.companyName}</strong>. All rights reserved.
          </p>
          <p className="text-white/50 text-center sm:text-right">
            GSTIN: {CONTACT_INFO.gstin} &nbsp;|&nbsp; CIN: {CONTACT_INFO.cin}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
