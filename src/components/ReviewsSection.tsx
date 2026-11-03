import React from 'react';
import { REVIEWS } from '../services/db';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-fade-green relative border-b border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
            <span>Verified Guest Experiences</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">
            Cherished Memories at the Confluence
          </h2>
          <p className="text-sm sm:text-base text-[#cad9d1]">
            Read what guests from across India and around the globe have felt during their stay at DOVAAN.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#062117] border border-[#d4af37]/25 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-[#d4af37] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#d4af37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8ea89a]">{rev.date}</span>
                </div>

                <Quote className="w-8 h-8 text-[#d4af37]/30 mb-2" />
                <p className="text-xs sm:text-sm text-[#cad5cf] leading-relaxed italic mb-4">
                  “{rev.review}”
                </p>
              </div>

              <div className="pt-4 border-t border-[#d4af37]/15 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">{rev.author}</div>
                  <div className="text-[11px] text-[#8ea89a]">{rev.location}</div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#d4af37] block font-mono">
                    {rev.stayedAt}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                    <ShieldCheck className="w-3 h-3" /> Verified Guest
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
