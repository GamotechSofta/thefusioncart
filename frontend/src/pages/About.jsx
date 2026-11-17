import React from 'react';
import ScrollToTop from '../components/ScrollToTop';
import { ShieldCheck, HeartHandshake, Truck, CheckCircle2, Building, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../config/companyInfo';

const About = () => {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="relative overflow-hidden bg-ink text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative max-w-4xl mx-auto">
          <p className="section-kicker text-white/60 mb-4">About us</p>
          <h1 className="section-title text-4xl sm:text-5xl md:text-6xl tracking-tight mb-5 text-white">
            Welcome to {COMPANY_INFO.brandName}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Based in Mohali, Punjab, <strong className="text-white font-semibold">{COMPANY_INFO.legalName}</strong> is an online destination for everyday shopping—bringing quality products, fair prices, and a smooth checkout experience to customers across India.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            We curate a growing catalogue of trusted brands and everyday essentials so you can discover, compare, and order from home. From product discovery to delivery updates, our focus is simple: reliable quality, clear pricing, and a shopping experience that feels easy on any device.
          </p>
        </div>

        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Why shop with us</h2>
            <p className="text-gray-500 text-sm sm:text-base mt-2">What we stand for as an e-commerce brand</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
              <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Customer First</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Helpful support and a shopping journey designed around clarity and convenience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Secure Shopping</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Protected checkout and careful handling of your account and order details.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Reliable Delivery</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Orders packed with care and shipped through trusted logistics partners.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Curated Catalogue</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Handpicked products with clear details so you know exactly what you are buying.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 sm:p-10 shadow-lg">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
            <Building className="w-6 h-6 text-rose-400" />
            <h2 className="text-xl sm:text-2xl font-bold">Company Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-sm sm:text-base">
            <div>
              <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider mb-1">Company Name</p>
              <p className="text-white font-semibold text-lg">{COMPANY_INFO.legalName}</p>
              
              <div className="mt-5">
                <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                  Registered Address
                </p>
                <p className="text-gray-200 leading-relaxed">
                  {COMPANY_INFO.registeredAddress}
                </p>
              </div>

              <div className="mt-5 space-y-1">
                <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider">GSTIN</p>
                <p className="text-gray-200 font-mono">{COMPANY_INFO.gstin}</p>
                <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider mt-3">CIN</p>
                <p className="text-gray-200 font-mono">{COMPANY_INFO.cin}</p>
                <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider mt-3">Country of Origin</p>
                <p className="text-gray-200">India</p>
              </div>
            </div>

            <div className="space-y-4 md:border-l md:border-gray-700 md:pl-8">
              {COMPANY_INFO.email && (
                <div>
                  <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider mb-1 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                    Email
                  </p>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-rose-300 hover:text-rose-200 underline font-medium">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              )}

              {COMPANY_INFO.phone && (
                <div>
                  <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider mb-1 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                    Mobile
                  </p>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-white hover:text-rose-200 font-medium">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              )}

              <div>
                <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider mb-1">Contact Person</p>
                <p className="text-white font-medium">{COMPANY_INFO.contactPerson}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider mb-1">Website</p>
                <a href={COMPANY_INFO.website} className="text-rose-300 hover:text-rose-200 underline font-medium" target="_blank" rel="noopener noreferrer">
                  {COMPANY_INFO.website}
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
      <ScrollToTop />
    </div>
  );
};

export default About;
