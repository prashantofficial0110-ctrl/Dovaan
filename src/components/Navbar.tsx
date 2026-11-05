import React, { useState } from 'react';
import { PageTab } from '../types';
import {
  Calendar,
  Compass,
  Utensils,
  Waves,
  Sparkles,
  Search,
  LogIn,
  Menu,
  X,
  Phone,
  Mountain,
  Music,
} from 'lucide-react';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenBooking: () => void;
  onOpenLookup: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenLookup,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageTab; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Overview' },
    { id: 'stay', label: 'Rooms & Cottages' },
    { id: 'adventure', label: 'Adventures & Swing' },
    { id: 'dining', label: 'Dining & Seafood' },
    { id: 'events', label: 'Banquets & Events' },
    { id: 'nightlife', label: 'BBQ & Nightlife' },
    { id: 'location', label: 'Adampool Map' },
  ];

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#04160d]/95 backdrop-blur-md border-b border-[#d4af37]/25 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#020e08] via-[#0b3323] to-[#020e08] py-1.5 px-4 text-xs text-center border-b border-[#d4af37]/15">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[#d6c28f]">
          <span className="hidden sm:inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
            Adampool, Lower Lingdum, Ranipool, Sikkim 737135 · Where Two Rivers Meet
          </span>
          <div className="flex items-center gap-4 mx-auto sm:mx-0">
            <a
              href="tel:+919883116936"
              className="inline-flex items-center gap-1.5 hover:text-[#fcedc2] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#d4af37]" />
              <span>Adampool Desk: +91 98831 16936 / +91 83709 60362</span>
            </a>
            <span className="text-[#d4af37]/40">|</span>
            <button
              onClick={onOpenLookup}
              className="inline-flex items-center gap-1 hover:text-[#fcedc2] underline underline-offset-2 transition-colors cursor-pointer"
            >
              <Search className="w-3 h-3 text-[#d4af37]" />
              <span>My Booking</span>
            </button>
            <span className="text-[#d4af37]/40">|</span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 hover:text-[#fcedc2] text-[#fcedc2] transition-colors cursor-pointer"
              title="Staff & Management Login"
            >
              <LogIn className="w-3 h-3 text-[#d4af37]" />
              <span className="font-medium">Sign In</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Title */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* User Uploaded Logo Image */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-[#d4af37]/60 p-1 bg-[#020e08] shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:border-[#d4af37] transition-all shrink-0">
              <img
                src="/assets/logo/dovaan_logo.jpg"
                alt="Dovvan Restaurant &amp; Homestay &amp; Resort - New Experience"
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-gold-gradient leading-tight">
                DOVVAN
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.14em] text-[#fcedc2] uppercase font-semibold leading-tight mt-0.5">
                Restaurant &amp; Homestay &amp; Resort
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#d6c28f] uppercase font-medium leading-tight">
                NEW EXPERIENCE.
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 text-xs xl:text-sm font-medium tracking-wide transition-all relative cursor-pointer ${
                    isActive
                      ? 'text-[#fcedc2] font-semibold'
                      : 'text-[#d6c28f]/80 hover:text-[#fcedc2]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_8px_#d4af37]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenAdmin}
              className="bg-[#0b3323] border border-[#d4af37]/60 text-[#fcedc2] hover:border-[#d4af37] hover:bg-[#0f442e] font-medium text-xs xl:text-sm px-3.5 py-2.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
              title="Staff & Management Sign In"
            >
              <LogIn className="w-4 h-4 text-[#d4af37]" />
              <span>Sign In</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="bg-gold-gradient text-[#051c11] font-semibold text-xs xl:text-sm px-5 py-2.5 rounded-md shadow-gold hover:shadow-gold-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#051c11]" />
              <span>Book Online</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="bg-gold-gradient text-[#051c11] font-semibold text-xs px-3 py-2 rounded shadow-gold"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#d4af37] hover:text-[#fcedc2] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#051a11] border-b border-[#d4af37]/30 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#0b3323] text-[#fcedc2] border-l-4 border-[#d4af37]'
                    : 'text-[#d6c28f] hover:bg-[#08291b]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#d4af37]/20 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLookup();
              }}
              className="w-full py-2.5 px-3 text-left text-sm text-[#d6c28f] hover:bg-[#08291b] rounded flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-[#d4af37]" />
              <span>Lookup Existing Reservation</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-3 text-left text-sm text-[#fcedc2] bg-[#08291b] rounded flex items-center gap-2"
            >
              <LogIn className="w-4 h-4 text-[#d4af37]" />
              <span>Staff Login &amp; Management</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
