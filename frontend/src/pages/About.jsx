import React from 'react';
import ScrollToTop from '../components/ScrollToTop';
import { Target, Eye, ShieldCheck, HeartHandshake, Lightbulb, CheckCircle2, Building, Mail, Phone, MapPin } from 'lucide-react';
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
            Based in Mohali, Punjab, <strong className="text-white font-semibold">{COMPANY_INFO.legalName}</strong> is India’s premier destination for both premium e-commerce and trusted assisted financial services.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Intro Highlight Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            Our mission is to empower every local shop and individual by providing accessible financial services (AEPS, money transfers, insurance, Micro ATMs) alongside our curated e-commerce offerings. We combine bank-grade security with retail-friendly tools to deliver trusted services to your community.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Vision */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              To bridge the gap in digital commerce and financial inclusion by turning every retail counter into a comprehensive service hub for Bharat.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              To deliver excellence in both digital commerce and assisted financial services, ensuring financial inclusion, instant settlements, and delightful customer experiences across India's small towns and villages.
            </p>
          </div>
        </div>

        {/* What We Stand For */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">The FusionCart Standard</h2>
            <p className="text-gray-500 text-sm sm:text-base mt-2">How we serve shops and customers across India</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
              <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Financial Inclusion</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Vernacular-first platforms designed for assisted use.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Bank-grade Security</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Audited infrastructure, biometric eKYC, and end-to-end encryption for every transaction.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Instant Settlement</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Real-time wallet credit on AEPS, DMT, and BBPS transactions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Curated E-commerce</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Handpicked products with direct-to-consumer luxury pricing.
              </p>
            </div>
          </div>
        </div>

        {/* Company Information */}
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
                <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Country of Origin</p>
                <p className="text-gray-200">India</p>
                <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider mt-3">Specialty</p>
                <p className="text-gray-200">Digital Commerce &amp; Assisted Financial Services (AEPS, DMT, Micro ATM)</p>
              </div>
            </div>

            <div className="space-y-4 md:border-l md:border-gray-700 md:pl-8">
              <div>
                <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider mb-1 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                  Email
                </p>
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-rose-300 hover:text-rose-200 underline font-medium">
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider mb-1 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                  Mobile
                </p>
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-white hover:text-rose-200 font-medium">
                  {COMPANY_INFO.phone}
                </a>
              </div>

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