import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../config/companyInfo';
import favIcon from '../assets/favIcon.png';

const IconLinkedIn = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const IconInstagram = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const IconYouTube = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);
const IconX = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();


  const companyLinks = [
    { name: 'About', path: '/about' },
    { name: 'Home', path: '/' },
    { name: 'Wishlist', path: '/wishlist' },
    { name: 'My Account', path: '/profile' },
    { name: 'Contact', path: '/contact' },
  ];

  const shopLinks = [
    { name: 'Skin Essentials', path: '/category/beauty-and-hygiene/skin-care' },
    { name: 'Hair Essentials', path: '/category/beauty-and-hygiene/hair-care' },
    { name: 'Colour & Makeup', path: '/category/beauty-and-hygiene/makeup' },
    { name: 'Bath & Hands', path: '/category/beauty-and-hygiene/bath-and-hand-wash' },
    { name: 'Dental Care', path: '/category/beauty-and-hygiene/oral-care' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Use', path: '/terms' },
    { name: 'Shipping Policy', path: '/shipping' },
    { name: 'Refund & Cancellation', path: '/refund-cancellation' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: IconLinkedIn, url: 'https://linkedin.com' },
    { name: 'Instagram', icon: IconInstagram, url: 'https://instagram.com' },
    { name: 'YouTube', icon: IconYouTube, url: 'https://youtube.com' },
    { name: 'X', icon: IconX, url: 'https://x.com' },
  ];

  const linkClass =
    'text-[15px] text-white/90 hover:text-[#c39662] transition-colors duration-200';

  return (
    <footer className="relative w-full bg-[#0a0b10] text-white overflow-hidden mt-16">
        <div className="relative z-10 max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 pt-16 sm:pt-20 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            <div className="space-y-5">
              <Link to="/" className="inline-flex items-center gap-2.5 group">
                <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[6px] bg-black shadow-[0_0_18px_rgba(195,150,98,0.45)]">
                  <img src={favIcon} alt="" className="h-full w-full scale-125 object-cover" />
                </span>
                <span className="text-[22px] font-semibold tracking-tight text-white">
                  TheFusionCart<span className="text-[#c39662]">.</span>
                </span>
              </Link>
              <p className="text-[13px] leading-relaxed text-white/55 max-w-[240px]">
                A considered destination for everyday essentials, beauty, and wellness.
              </p>
              {/* <div className="flex items-center gap-2.5 pt-1">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-[5px] border border-white/20 text-white/80 flex items-center justify-center hover:border-[#c39662] hover:text-[#c39662] transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div> */}
              <div className="space-y-2 pt-1 text-[13px] text-white/70">
                {COMPANY_INFO.email && (
                  <div>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="inline-flex items-center gap-2 hover:text-[#c39662] transition-colors"
                    >
                      <Mail className="w-4 h-4 shrink-0 text-[#c39662]" strokeWidth={1.75} />
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                )}
                {COMPANY_INFO.phone && (
                  <div>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="inline-flex items-center gap-2 hover:text-[#c39662] transition-colors"
                    >
                      <Phone className="w-4 h-4 shrink-0 text-[#c39662]" strokeWidth={1.75} />
                      +91 {COMPANY_INFO.phone}
                    </a>
                  </div>
                )}
                {COMPANY_INFO.contactPerson && (
                  <p className="text-[12px] text-white/60">
                    <span className="text-white/40">Contact:</span> {COMPANY_INFO.contactPerson}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/35 mb-5">
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={linkClass}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/35 mb-5">
                Shop
              </h4>
              <ul className="space-y-3">
                {shopLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={linkClass}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/35 mb-5">
                Legal
              </h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={linkClass}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative z-10 mt-14 sm:mt-16 p-4 rounded-xl bg-white/[0.03] border border-white/10 max-w-3xl mx-auto text-center text-[12px] leading-relaxed text-white/60 space-y-1.5">
            <p className="font-semibold text-white/90">{COMPANY_INFO.legalName}</p>
            <p className="text-white/50">{COMPANY_INFO.registeredAddress}</p>
            <p className="text-white/70">
              <span className="text-[#c39662] font-semibold">GSTIN:</span> {COMPANY_INFO.gstin} &nbsp;|&nbsp; <span className="text-[#c39662] font-semibold">CIN:</span> {COMPANY_INFO.cin} &nbsp;|&nbsp; <span className="text-[#c39662] font-semibold">Contact Person:</span> {COMPANY_INFO.contactPerson}
            </p>
          </div>

          <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/40">
            <p>
              © {currentYear} {COMPANY_INFO.legalName}. All Rights Reserved.
            </p>
            <p>GSTIN: {COMPANY_INFO.gstin} | CIN: {COMPANY_INFO.cin}</p>
          </div>
        </div>

        <div
          className="pointer-events-none select-none absolute inset-x-0 bottom-[-0.15em] z-0 flex justify-center overflow-hidden"
          aria-hidden="true"
        >
          <span className="font-bold text-[clamp(2.4rem,9.5vw,7.5rem)] leading-[0.82] tracking-[-0.04em] text-white/[0.045]">
            TheFusionCart
          </span>
        </div>
      </footer>
    );
  };

export default Footer;
