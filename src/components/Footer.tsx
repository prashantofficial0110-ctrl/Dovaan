import React from 'react';
import { PageTab } from '../types';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  Search,
  Database,
  ArrowUp,
  Waves,
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenBooking: () => void;
  onOpenLookup: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenBooking,
  onOpenLookup,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020e08] border-t border-[#d4af37]/30 text-[#cad5cf] pt-16 pb-12 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-[#d4af37]/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#d4af37]/60 bg-[#03140c] p-0.5 shadow-gold shrink-0">
                <img
                  src="/assets/aistudio/IMG-20261101-WA0003_6ab79521.jpg"
                  alt="Dovaan Resort Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-cinzel text-2xl font-bold tracking-wider text-gold-gradient block">
                  DOVAAN
                </span>
                <span className="text-xs tracking-[0.2em] text-[#d6c28f] uppercase block">
                  Homestay &amp; Resort · New Experience
                </span>
              </div>
            </div>

            <p className="text-xs text-[#a3b8ad] leading-relaxed max-w-sm">
              Named from the word “Dovaan”—the sacred meeting point of two rivers in Sikkim. Where nature, luxury, and adventure meet to craft memories you will cherish forever.
            </p>

            <div className="pt-2 text-xs text-[#d6c28f] italic border-l-2 border-[#d4af37]/60 pl-3">
              “One destination, endless experiences &amp; unforgettable memories.”
            </div>
          </div>

          {/* Services Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#fcedc2] uppercase tracking-widest">
              Signature Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('stay');
                    scrollToTop();
                  }}
                  className="hover:text-[#fcedc2] hover:underline transition-colors cursor-pointer"
                >
                  Tower Rooms &amp; Cottages
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('adventure');
                    scrollToTop();
                  }}
                  className="hover:text-[#fcedc2] hover:underline transition-colors cursor-pointer"
                >
                  The Sikkim Swing
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('adventure');
                    scrollToTop();
                  }}
                  className="hover:text-[#fcedc2] hover:underline transition-colors cursor-pointer"
                >
                  Sky Walks &amp; Glass Bridge
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('dining');
                    scrollToTop();
                  }}
                  className="hover:text-[#fcedc2] hover:underline transition-colors cursor-pointer"
                >
                  Suspended Sky Dining
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('nightlife');
                    scrollToTop();
                  }}
                  className="hover:text-[#fcedc2] hover:underline transition-colors cursor-pointer"
                >
                  Riverside BBQ &amp; Nightlife
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('events');
                    scrollToTop();
                  }}
                  className="hover:text-[#fcedc2] hover:underline transition-colors cursor-pointer"
                >
                  Grand Banquet &amp; Weddings
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Actions & Database */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#fcedc2] uppercase tracking-widest">
              Guest Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-[#d4af37] font-semibold hover:underline transition-colors cursor-pointer"
                >
                  Direct Booking Engine
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLookup}
                  className="hover:text-[#fcedc2] hover:underline transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>My Booking Lookup</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-[#fcedc2] hover:underline transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Database className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Resort Database Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('nightlife');
                    scrollToTop();
                  }}
                  className="hover:text-[#fcedc2] hover:underline transition-colors cursor-pointer"
                >
                  Riverside BBQ &amp; Karaoke
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('dining');
                    scrollToTop();
                  }}
                  className="hover:text-[#fcedc2] hover:underline transition-colors cursor-pointer"
                >
                  Multi-Cuisine Menu &amp; Seafood
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#fcedc2] uppercase tracking-widest">
              Google Maps Location
            </h4>
            <div className="space-y-2.5 text-xs text-[#a3b8ad]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">DOVAAN Homestay &amp; Resort</span>
                  <span>Adam Pool, New Road, Lower Lingdum, Ranipool, Gangtok, Sikkim — 737135</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Dovaan+Homestay+and+Resort+Adampool+Ranipool+Sikkim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d4af37] hover:text-white underline block mt-1"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <div className="space-y-0.5">
                  <a href="tel:+919883116936" className="text-white hover:text-[#d4af37] block">
                    +91 98831 16936 (WhatsApp &amp; Booking)
                  </a>
                  <a href="tel:+918370960362" className="text-[#a3b8ad] hover:text-[#d4af37] block text-[11px]">
                    +91 83709 60362 / +91 78729 67822
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <div>
                  <a href="mailto:dovaanresort.adampool@gmail.com" className="text-white hover:text-[#d4af37] block">
                    dovaanresort.adampool@gmail.com
                  </a>
                  <span className="text-[11px] text-[#8ea89a]">reservations@dovaanresort.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#d4af37]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8ea89a]">
          <div>
            © {new Date().getFullYear()} DOVAAN HOMESTAY &amp; RESORT. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-[#d6c28f] hover:text-[#fcedc2] transition-colors cursor-pointer"
            >
              Database Console
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#051c11] border border-[#d4af37]/30 text-[#d4af37] hover:text-white transition-all cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
