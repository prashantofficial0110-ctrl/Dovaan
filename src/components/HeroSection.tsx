import React, { useState } from 'react';
import { PageTab } from '../types';
import {
  Calendar,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  Mountain,
  Waves,
  ShieldCheck,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: (prefill?: {
    roomId?: string;
    bookingType?: 'stay' | 'adventure' | 'skydining' | 'event';
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }) => void;
  setActiveTab?: (tab: PageTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [checkIn, setCheckIn] = useState('2026-11-12');
  const [checkOut, setCheckOut] = useState('2026-11-15');
  const [experienceType, setExperienceType] = useState<'stay' | 'adventure' | 'skydining'>('stay');
  const [guests, setGuests] = useState(2);

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking({
      bookingType: experienceType,
      checkIn,
      checkOut,
      guests,
    });
  };

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#d4af37]/20">
      {/* Decorative Golden Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#d4af37]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Kicker & Emblem */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          {/* Official Dovaan Logo Showcase */}
          <div className="inline-block relative mb-6">
            <div className="w-48 h-48 sm:w-60 sm:h-60 mx-auto rounded-3xl overflow-hidden border-2 border-[#d4af37]/70 shadow-[0_0_45px_rgba(212,175,55,0.4)] p-1.5 bg-[#021009] transition-transform duration-500 hover:scale-105">
              <img
                src="/assets/logo/dovaan_logo.jpg"
                alt="Dovaan Homestay and Resort - New Experience"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="bg-[#021009] border border-[#d4af37]/60 rounded-full px-3.5 py-1 text-[11px] sm:text-xs text-[#fceec5] tracking-widest uppercase font-semibold shadow-md">
                Adampool · Gangtok · Sikkim
              </span>
            </div>
          </div>

          {/* Subtitle / Philosophy */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#9e7d23] uppercase tracking-[0.3em] font-semibold mb-3">
            <span>Where Nature, Luxury, and Adventure Meet</span>
          </div>

          {/* Majestic Heading */}
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#062117] mb-4 leading-tight">
            DOVAAN <br className="hidden sm:inline" />
            <span className="text-gold-gradient">HOMESTAY AND RESORT</span>
          </h1>

          {/* Evocative Client Text Summary */}
          <p className="text-sm sm:text-base lg:text-lg text-[#2d4b3b] font-normal leading-relaxed max-w-3xl mx-auto text-balance">
            Named from the sacred Sikkimese word <strong className="text-[#9e7d23] font-semibold">“Dovaan”</strong>—the meeting point of two rivers—<strong className="text-[#062117] font-semibold">Dovaan Homestay and Resort</strong> weaves natural splendor with unforgettable thrills. From the soaring rush of the <strong className="text-[#9e7d23] font-semibold">Sikkim Swing</strong> and <strong className="text-[#9e7d23] font-semibold">Sky Dining</strong> to river-view tower suites, nature-immersed cottages, and starlit barbecue nights, every moment is crafted to feel extraordinary.
          </p>

          {/* Feature Badges / Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 mt-6 text-xs sm:text-sm text-[#e0cfab]">
            <span className="inline-flex items-center gap-1.5 bg-[#0b3323]/80 border border-[#d4af37]/30 px-3 py-1 rounded-full">
              <Waves className="w-3.5 h-3.5 text-[#d4af37]" /> Exclusive Swimming Pool
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#0b3323]/80 border border-[#d4af37]/30 px-3 py-1 rounded-full">
              <Mountain className="w-3.5 h-3.5 text-[#d4af37]" /> Cottages
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#0b3323]/80 border border-[#d4af37]/30 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Sikkim Swing &amp; Sky Walks
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#0b3323]/80 border border-[#d4af37]/30 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Suspended Sky Dining
            </span>
          </div>
        </div>



        {/* Dynamic Booking & Availability Bar */}
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-[#092c1e] to-[#04170f] border border-[#d4af37]/40 rounded-2xl p-4 sm:p-6 shadow-2xl relative">
          <div className="absolute -top-3 left-6 bg-[#04160d] border border-[#d4af37]/50 text-[#fcedc2] px-3 py-0.5 rounded text-xs font-cinzel font-semibold tracking-wider">
            Direct Resort Reservation
          </div>

          <form onSubmit={handleQuickBook} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mt-2">
            {/* Experience Selection */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#d6c28f] mb-1.5">
                Experience
              </label>
              <select
                value={experienceType}
                onChange={(e) => setExperienceType(e.target.value as any)}
                className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
              >
                <option value="stay">Luxury Stay (Tower / Cottage)</option>
                <option value="adventure">Sikkim Swing &amp; Sky Walk</option>
                <option value="skydining">Sky Dining Suspended Table</option>
              </select>
            </div>

            {/* Check-In */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#d6c28f] mb-1.5">
                Check-In / Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Check-Out */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#d6c28f] mb-1.5">
                Check-Out
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#d6c28f] mb-1.5">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
              >
                <option value={1}>1 Guest (Solo Traveler)</option>
                <option value={2}>2 Guests (Couple / Deluxe)</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests (Family Suite)</option>
                <option value={6}>6+ Guests (Group Villa / Tent)</option>
              </select>
            </div>

            {/* Submit CTA */}
            <div>
              <button
                type="submit"
                className="w-full bg-gold-gradient text-[#04160d] font-bold text-xs sm:text-sm py-3 px-4 rounded-lg shadow-gold hover:shadow-gold-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Guarantee line */}
          <div className="mt-4 pt-3 border-t border-[#d4af37]/15 flex flex-wrap items-center justify-between text-[11px] text-[#c9b78a]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" /> Best Rate Guaranteed · Instant Confirmation Code
            </span>
            <span className="text-[#a89569]">
              Balcony &amp; River Views in Every Accommodation
            </span>
          </div>
        </div>

        {/* All Resort Highlights Ribbon with Rich Background Color */}
        <div className="mt-5 max-w-5xl mx-auto text-center px-4 py-3.5 bg-gradient-to-r from-[#03160e] via-[#093522] to-[#03160e] border-2 border-[#d4af37]/60 rounded-2xl shadow-xl">
          <p className="text-xs sm:text-[13px] text-[#fcedc2] font-semibold tracking-wide leading-relaxed flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
            <span className="bg-[#0b3323] border border-[#d4af37]/40 px-2.5 py-1 rounded-lg text-[#fceec5] shadow-sm">Multi-Cusine Restaurant</span>
            <span className="text-[#d4af37] font-bold">|</span>
            <span className="bg-[#0b3323] border border-[#d4af37]/40 px-2.5 py-1 rounded-lg text-[#fceec5] shadow-sm">Water Park</span>
            <span className="text-[#d4af37] font-bold">|</span>
            <span className="bg-[#0b3323] border border-[#d4af37]/40 px-2.5 py-1 rounded-lg text-[#fceec5] shadow-sm">Sky Walk</span>
            <span className="text-[#d4af37] font-bold">|</span>
            <span className="bg-[#0b3323] border border-[#d4af37]/40 px-2.5 py-1 rounded-lg text-[#fceec5] shadow-sm">Sky Dining</span>
            <span className="text-[#d4af37] font-bold">|</span>
            <span className="bg-[#0b3323] border border-[#d4af37]/40 px-2.5 py-1 rounded-lg text-[#fceec5] shadow-sm">Sikkim Swing</span>
            <span className="text-[#d4af37] font-bold">|</span>
            <span className="bg-[#0b3323] border border-[#d4af37]/40 px-2.5 py-1 rounded-lg text-[#fceec5] shadow-sm">Rooms</span>
            <span className="text-[#d4af37] font-bold">|</span>
            <span className="bg-[#0b3323] border border-[#d4af37]/40 px-2.5 py-1 rounded-lg text-[#fceec5] shadow-sm">Banquet Hall</span>
            <span className="text-[#d4af37] font-bold">|</span>
            <span className="bg-[#0b3323] border border-[#d4af37]/40 px-2.5 py-1 rounded-lg text-[#fceec5] shadow-sm">Open Air Venue</span>
            <span className="text-[#d4af37] font-bold">|</span>
            <span className="bg-[#0b3323] border border-[#d4af37]/40 px-2.5 py-1 rounded-lg text-[#fceec5] shadow-sm">Traditional Kitchen</span>
            <span className="text-[#d4af37] font-bold">|</span>
            <span className="bg-[#0b3323] border border-[#d4af37]/40 px-2.5 py-1 rounded-lg text-[#fceec5] shadow-sm">Sole pole Restaurant</span>
            <span className="text-[#d4af37] font-bold">|</span>
            <span className="bg-[#0b3323] border border-[#d4af37]/40 px-2.5 py-1 rounded-lg text-[#fceec5] shadow-sm">Hanging Bridge</span>
          </p>
        </div>
      </div>


    </section>
  );
};
