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
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: (prefill?: {
    roomId?: string;
    bookingType?: 'stay' | 'adventure' | 'skydining' | 'event';
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }) => void;
  setActiveTab: (tab: PageTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, setActiveTab }) => {
  const [checkIn, setCheckIn] = useState('2026-11-12');
  const [checkOut, setCheckOut] = useState('2026-11-15');
  const [experienceType, setExperienceType] = useState<'stay' | 'adventure' | 'skydining'>('stay');
  const [guests, setGuests] = useState(2);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
    <section className="relative overflow-hidden bg-fade-green-radial pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#d4af37]/20">
      {/* Decorative Golden Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#d4af37]/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0e4830]/30 blur-[90px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#0e4830]/30 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Kicker & Emblem */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          {/* Official Dovaan Logo Showcase */}
          <div className="inline-block relative mb-6">
            <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_0_35px_rgba(212,175,55,0.35)] p-1 bg-[#021009] transition-transform duration-500 hover:scale-105">
              <img
                src="/assets/aistudio/IMG-20261101-WA0003_6ab79521.jpg"
                alt="Dovaan Homestay & Resort Logo"
                className="w-full h-full object-cover object-center rounded-xl"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#021009] border border-[#d4af37]/50 rounded-full px-3 py-0.5 text-[10px] sm:text-xs text-[#fceec5] tracking-widest uppercase font-semibold whitespace-nowrap shadow-md">
              Sikkim · India
            </div>
          </div>

          {/* Subtitle / Philosophy */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#d6c28f] uppercase tracking-[0.3em] font-light mb-3">
            <span>Where Nature, Luxury, and Adventure Meet</span>
          </div>

          {/* Majestic Heading */}
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
            DOVAAN RESORT, <br className="hidden sm:inline" />
            <span className="text-gold-gradient">A NEW EXPERIENCE</span>
          </h1>

          {/* Evocative Client Text Summary */}
          <p className="text-sm sm:text-base lg:text-lg text-[#d8e6de] font-normal leading-relaxed max-w-3xl mx-auto text-balance">
            Named from the sacred Sikkimese word <strong className="text-[#fceec5] font-semibold">“Dovaan”</strong>—the meeting point of two rivers—this enchanting Himalayan destination weaves natural splendor with unforgettable thrills. From the soaring rush of the <strong className="text-[#fceec5]">Sikkim Swing</strong> and <strong className="text-[#fceec5]">Sky Dining</strong> to river-view tower suites, nature-immersed cottages, and starlit barbecue nights, every moment is crafted to feel extraordinary.
          </p>

          {/* Feature Badges / Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 mt-6 text-xs sm:text-sm text-[#e0cfab]">
            <span className="inline-flex items-center gap-1.5 bg-[#0b3323]/80 border border-[#d4af37]/30 px-3 py-1 rounded-full">
              <Waves className="w-3.5 h-3.5 text-[#d4af37]" /> Two Merging Rivers
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#0b3323]/80 border border-[#d4af37]/30 px-3 py-1 rounded-full">
              <Mountain className="w-3.5 h-3.5 text-[#d4af37]" /> Riverview Tower &amp; Cottages
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#0b3323]/80 border border-[#d4af37]/30 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Sikkim Swing &amp; Sky Walks
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#0b3323]/80 border border-[#d4af37]/30 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Suspended Sky Dining
            </span>
          </div>
        </div>

        {/* Featured Hero Resort Photo Showcase */}
        <div className="max-w-5xl mx-auto mb-10 sm:mb-12">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#d4af37]/50 shadow-[0_15px_60px_rgba(0,0,0,0.85)] group bg-[#021009]">
            <div className="relative aspect-[16/10] sm:aspect-[21/9] max-h-[460px] w-full overflow-hidden">
              <img
                src="/assets/hero/hero_top_banner.jpg"
                alt="Dovaan Homestay & Resort - Authentic Evening View of Tower, Pool and Riverside Terraces"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              />
              {/* Subtle vignette for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#021009] via-transparent to-black/20 pointer-events-none" />

              {/* Bottom Caption & Expand Action */}
              <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 flex items-end justify-between gap-3">
                <div>
                  <span className="text-[10px] sm:text-xs text-[#d4af37] font-semibold uppercase tracking-wider block">
                    Authentic Property View
                  </span>
                  <h3 className="font-cinzel text-sm sm:text-lg font-bold text-white drop-shadow">
                    Dovaan Resort at the Two Rivers Confluence
                  </h3>
                  <p className="text-xs text-[#cad5cf] hidden sm:block mt-0.5">
                    Illuminated multi-story tower, swimming pool, riverside dining decks &amp; covered bridge over the rapids.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="bg-[#021009]/85 hover:bg-[#021009] text-[#fceec5] border border-[#d4af37]/60 hover:border-[#d4af37] text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer shrink-0"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span className="hidden sm:inline">View Full Photo</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Booking & Availability Bar */}
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-[#092c1e] to-[#04170f] border border-[#d4af37]/40 rounded-2xl p-4 sm:p-6 shadow-2xl relative">
          <div className="absolute -top-3 left-6 bg-[#04160d] border border-[#d4af37]/50 text-[#fcedc2] px-3 py-0.5 rounded text-xs font-cinzel font-semibold tracking-wider">
            Direct Resort Reservation
          </div>

          <form onSubmit={handleQuickBook} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
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

        {/* Quick Service Explorers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12 max-w-5xl mx-auto">
          <div
            onClick={() => setActiveTab('stay')}
            className="group p-4 rounded-xl bg-[#072418]/90 border border-[#d4af37]/25 hover:border-[#d4af37] cursor-pointer transition-all hover:-translate-y-1"
          >
            <div className="text-[#d4af37] font-cinzel text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Tower &amp; Cottages</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-[#cad5cf] line-clamp-2">
              Private balconies with cascading river vistas &amp; luxury suites.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('adventure')}
            className="group p-4 rounded-xl bg-[#072418]/90 border border-[#d4af37]/25 hover:border-[#d4af37] cursor-pointer transition-all hover:-translate-y-1"
          >
            <div className="text-[#d4af37] font-cinzel text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Sikkim Swing</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-[#cad5cf] line-clamp-2">
              Sky walks and thrilling canyon swings soaring above the meeting rivers.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('dining')}
            className="group p-4 rounded-xl bg-[#072418]/90 border border-[#d4af37]/25 hover:border-[#d4af37] cursor-pointer transition-all hover:-translate-y-1"
          >
            <div className="text-[#d4af37] font-cinzel text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Sky Dining &amp; Seafood</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-[#cad5cf] line-clamp-2">
              Multi-cuisine restaurant with local Sikkim dishes, fresh fish &amp; sky tables.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('nightlife')}
            className="group p-4 rounded-xl bg-[#072418]/90 border border-[#d4af37]/25 hover:border-[#d4af37] cursor-pointer transition-all hover:-translate-y-1"
          >
            <div className="text-[#d4af37] font-cinzel text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Riverside BBQ &amp; Nightlife</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-[#cad5cf] line-clamp-2">
              Live barbecue skewers, campfire circles, karaoke lounge &amp; music under the stars.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 sm:top-3 sm:right-3 z-10 bg-[#021008]/90 hover:bg-[#021008] border border-[#d4af37] text-white p-2 rounded-full cursor-pointer transition-colors shadow-lg"
              title="Close Fullscreen View"
            >
              <X className="w-5 h-5 text-[#d4af37]" />
            </button>
            <div className="w-full overflow-hidden rounded-2xl border-2 border-[#d4af37]/60 shadow-[0_0_50px_rgba(212,175,55,0.4)]">
              <img
                src="/assets/hero/hero_top_banner.jpg"
                alt="Dovaan Homestay & Resort - Full Resolution Night View"
                className="w-full max-h-[80vh] object-contain bg-black"
              />
            </div>
            <div className="mt-3 text-center text-xs sm:text-sm text-[#fcedc2]">
              <span className="font-semibold text-white">Dovaan Homestay &amp; Resort, Sikkim</span> — Authentic evening panorama featuring the tower, pool, dining terraces, and river confluence.
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
