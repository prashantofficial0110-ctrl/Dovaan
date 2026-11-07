import React, { useState, useEffect } from 'react';
import { DovaanDatabase } from '../services/db';
import { Experience } from '../types';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  Flame,
  CheckCircle,
  Maximize2,
  X,
} from 'lucide-react';

interface AdventureSectionProps {
  onBookExperience: (category: 'adventure' | 'skydining') => void;
}

export const AdventureSection: React.FC<AdventureSectionProps> = ({ onBookExperience }) => {
  const [experiences, setExperiences] = useState<Experience[]>(() => DovaanDatabase.getAllExperiences());

  useEffect(() => {
    const handleRatesUpdate = () => {
      setExperiences(DovaanDatabase.getAllExperiences());
    };
    window.addEventListener('dovaan_rates_updated', handleRatesUpdate);
    return () => window.removeEventListener('dovaan_rates_updated', handleRatesUpdate);
  }, []);

  const [previewAdv, setPreviewAdv] = useState<Experience | null>(null);

  const adventures = experiences.filter(
    (exp) => exp.category === 'adventure' || exp.category === 'dining'
  );


  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9e7d23] font-semibold mb-2">
            <span>High-Altitude Thrills</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#062117] mb-4">
            The Sikkim Swing &amp; Sky Experiences
          </h2>
          <p className="text-sm sm:text-base text-[#2d4b3b] leading-relaxed">
            From the heart-pounding rush of the iconic Sikkim Swing to transparent glass sky walks and awe-inspiring sky dining suspended between heaven and water—every adventure at Dovaan Homestay and Resort is engineered for wonder, certified safety, and indelible memories.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {adventures.map((adv) => (
            <div
              key={adv.id}
              className="bg-[#062117] border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row group hover:border-[#d4af37] transition-all duration-300"
            >
              {/* Image side */}
              <div
                onClick={() => setPreviewAdv(adv)}
                className="md:w-1/2 relative h-72 md:h-auto min-h-[280px] overflow-hidden bg-black/40 cursor-pointer group/img"
              >
                <img
                  src={adv.image}
                  alt={adv.title}
                  className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 bg-[#03140c]/90 border border-[#d4af37]/40 text-[#fcedc2] px-2.5 py-1 rounded text-xs font-cinzel">
                  {adv.highlight}
                </div>
                <div className="absolute top-3 right-3 bg-[#03140c]/85 text-[#fcedc2] p-1.5 rounded-lg border border-[#d4af37]/40 opacity-0 group-hover/img:opacity-100 transition-opacity backdrop-blur-sm shadow-md">
                  <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
                </div>
                <div className="absolute bottom-2 left-3 text-[10px] text-[#fcedc2]/80 opacity-0 group-hover/img:opacity-100 transition-opacity">
                  Click to view full photo
                </div>
              </div>

              {/* Text side */}
              <div className="md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-white mb-1 group-hover:text-[#fceec5] transition-colors">
                    {adv.title}
                  </h3>
                  <p className="text-xs text-[#d4af37] font-medium mb-3">
                    {adv.subtitle}
                  </p>
                  <p className="text-xs text-[#cad5cf] leading-relaxed mb-4">
                    {adv.description}
                  </p>

                  <div className="space-y-1.5 mb-4 text-xs text-[#cad9d1]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{adv.timing} · {adv.duration}</span>
                    </div>
                    {adv.safetyBrief && (
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span className="text-[11px] text-[#8ea89a]">{adv.safetyBrief}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 mb-4 border-t border-[#d4af37]/15 pt-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#8ea89a] block">
                      Includes
                    </span>
                    {adv.included.slice(0, 2).map((inc, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-[#fceec5]">
                        <CheckCircle className="w-3 h-3 text-[#d4af37]" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#d4af37]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8ea89a] block">Pass Price</span>
                    <span className="font-cinzel text-lg font-bold text-gold-gradient">
                      ₹{adv.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#8ea89a] ml-1">{adv.priceUnit}</span>
                  </div>

                  <button
                    onClick={() =>
                      onBookExperience(adv.category === 'dining' ? 'skydining' : 'adventure')
                    }
                    className="bg-gold-gradient text-[#04160d] font-bold text-xs px-3.5 py-2 rounded-lg shadow-gold hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Reserve Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {previewAdv && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-[#03140c] border-2 border-[#d4af37] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            <div className="p-4 border-b border-[#d4af37]/30 flex items-center justify-between bg-[#020e08]">
              <div>
                <h4 className="font-cinzel text-base sm:text-lg font-bold text-white">
                  {previewAdv.title}
                </h4>
                <span className="text-xs text-[#d4af37] font-medium">
                  {previewAdv.subtitle}
                </span>
              </div>
              <button
                onClick={() => setPreviewAdv(null)}
                className="w-8 h-8 rounded-full bg-[#051c11] border border-[#d4af37]/40 text-[#8ea89a] hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/50">
              <img
                src={previewAdv.image}
                alt={previewAdv.title}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl border border-[#d4af37]/30 shadow-2xl"
              />
            </div>

            <div className="p-4 border-t border-[#d4af37]/30 bg-[#020e08] flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-xs text-[#cad9d1]">
                {previewAdv.safetyBrief || previewAdv.highlight}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const cat = previewAdv.category === 'dining' ? 'skydining' : 'adventure';
                    setPreviewAdv(null);
                    onBookExperience(cat);
                  }}
                  className="bg-gold-gradient text-[#04160d] font-bold text-xs px-4 py-2 rounded-lg shadow-gold hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Reserve Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewAdv(null)}
                  className="bg-[#051c11] border border-[#d4af37]/40 text-[#cad5cf] hover:text-white px-3 py-2 rounded-lg text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
