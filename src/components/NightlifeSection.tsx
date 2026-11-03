import React from 'react';
import {
  Flame,
  Music,
  Moon,
  Sparkles,
  Compass,
  ArrowRight,
  Coffee,
  CheckCircle,
} from 'lucide-react';

interface NightlifeSectionProps {
  onBookNightlife: () => void;
}

export const NightlifeSection: React.FC<NightlifeSectionProps> = ({ onBookNightlife }) => {
  return (
    <section className="py-16 sm:py-24 bg-fade-green relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
            <span>After Sunset Magic</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Riverside Barbecue, Karaoke &amp; Bonfires
          </h2>
          <p className="text-sm sm:text-base text-[#cad9d1] leading-relaxed">
            As twilight descends over Sikkim’s pine mountains, DOVAAN transforms into a starlit wonderland. From sizzling riverbank barbecue grills and joyful karaoke sing-alongs to tranquil strolls on the hanging bridge, every evening crafts cherished memories.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1: BBQ */}
          <div className="bg-[#062117] border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-2xl p-6 group hover:border-[#d4af37] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0b3323] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                Riverside Barbecue Nights
              </h3>
              <p className="text-xs text-[#cad5cf] leading-relaxed mb-4">
                Live charcoal grills set alongside the riverbank. Relish skewers of marinated meats, fresh local fish, and paneer charred with native herbs, paired with warm spiced drinks and campfire crackles.
              </p>
            </div>
            <div className="text-xs text-[#d6c28f] border-t border-[#d4af37]/15 pt-3">
              <span>Nightly from 07:00 PM · Live Pit Masters</span>
            </div>
          </div>

          {/* Card 2: Karaoke */}
          <div className="bg-[#062117] border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-2xl p-6 group hover:border-[#d4af37] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0b3323] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-4">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                Himalayan Karaoke Lounge
              </h3>
              <p className="text-xs text-[#cad5cf] leading-relaxed mb-4">
                Unleash your inner vocalist! Our open-air acoustic lounge features thousands of Bollywood, English, and Nepali tracks, high-fidelity wireless microphones, and infectious camaraderie.
              </p>
            </div>
            <div className="text-xs text-[#d6c28f] border-t border-[#d4af37]/15 pt-3">
              <span>Open Mic &amp; Family Sing-alongs</span>
            </div>
          </div>

          {/* Card 3: Bridge & Stargazing */}
          <div className="bg-[#062117] border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-2xl p-6 group hover:border-[#d4af37] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0b3323] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-4">
                <Moon className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                Illuminated Hanging Bridge
              </h3>
              <p className="text-xs text-[#cad5cf] leading-relaxed mb-4">
                Stroll across the suspension bridge softly illuminated by warm golden fairy lights, suspended high above the glistening night waters. Gaze up at the unpolluted Milky Way galaxy.
              </p>
            </div>
            <div className="text-xs text-[#d6c28f] border-t border-[#d4af37]/15 pt-3">
              <span>Clear Sky Telescope Available</span>
            </div>
          </div>
        </div>

        {/* Sunset Quote Banner */}
        <div className="bg-gradient-to-r from-[#03140c] via-[#093522] to-[#03140c] border border-[#d4af37]/50 rounded-2xl p-8 sm:p-12 text-center shadow-2xl max-w-4xl mx-auto">
          <p className="font-cinzel text-xl sm:text-2xl text-[#fcedc2] italic mb-4 leading-relaxed">
            “At DOVAAN, every moment is designed, every view is a masterpiece, and every visit becomes a cherished memory.”
          </p>
          <p className="text-xs sm:text-sm text-[#cad9d1] mb-6">
            Discover the extraordinary and <strong className="text-white">EXPERIENCE DOVAAN</strong>—one destination, endless experiences &amp; unforgettable memories.
          </p>
          <button
            onClick={onBookNightlife}
            className="bg-gold-gradient text-[#04160d] font-bold text-sm px-8 py-3 rounded-xl shadow-gold hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Reserve Nightlife &amp; BBQ Pass</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
