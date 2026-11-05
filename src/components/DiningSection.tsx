import React, { useState, useEffect } from 'react';
import { DovaanDatabase } from '../services/db';
import { MenuItem } from '../types';
import {
  Utensils,
  Sparkles,
  Flame,
  Fish,
  Wine,
  Calendar,
  CheckCircle,
  ArrowRight,
  Maximize2,
  X,
} from 'lucide-react';

interface DiningSectionProps {
  onReserveSkyDining: () => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({ onReserveSkyDining }) => {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'chef-special' | 'local-sikkim' | 'seafood' | 'international'>('all');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => DovaanDatabase.getAllMenuItems());
  const [previewDish, setPreviewDish] = useState<MenuItem | null>(null);

  useEffect(() => {
    const handleRatesUpdate = () => {
      setMenuItems(DovaanDatabase.getAllMenuItems());
    };
    window.addEventListener('dovaan_rates_updated', handleRatesUpdate);
    return () => window.removeEventListener('dovaan_rates_updated', handleRatesUpdate);
  }, []);

  const filteredMenu = menuItems.filter((item) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'chef-special') return item.isChefSpecial;
    return item.category === categoryFilter;
  });


  return (
    <section className="py-16 sm:py-24 bg-fade-green relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
            <span>Culinary Symphony in Sikkim</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            DOVAAN Multi-Cuisine Restaurant
          </h2>
          <p className="text-sm sm:text-base text-[#cad9d1] leading-relaxed max-w-3xl mx-auto">
            Discover an exceptional culinary journey at DOVAAN’s multi-cuisine restaurant, where an extensive selection of delicious dishes awaits. From authentic Sikkim local delicacies and popular international cuisines to an exquisite variety of fresh seafood, every dish is thoughtfully prepared with high-grade ingredients, warm hospitality, and unforgettable riverfront ambiance.
          </p>

          {/* Interactive Menu Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#03140c] border border-[#d4af37]/30 rounded-xl mt-8 max-w-2xl mx-auto">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                categoryFilter === 'all'
                  ? 'bg-gold-gradient text-[#04160d] font-bold shadow-gold'
                  : 'text-[#d6c28f] hover:text-white'
              }`}
            >
              All Delights
            </button>
            <button
              onClick={() => setCategoryFilter('chef-special')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                categoryFilter === 'chef-special'
                  ? 'bg-gold-gradient text-[#04160d] font-bold shadow-gold'
                  : 'text-[#d6c28f] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chef Specials</span>
            </button>
            <button
              onClick={() => setCategoryFilter('local-sikkim')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                categoryFilter === 'local-sikkim'
                  ? 'bg-gold-gradient text-[#04160d] font-bold shadow-gold'
                  : 'text-[#d6c28f] hover:text-white'
              }`}
            >
              Local Sikkim
            </button>
            <button
              onClick={() => setCategoryFilter('seafood')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                categoryFilter === 'seafood'
                  ? 'bg-gold-gradient text-[#04160d] font-bold shadow-gold'
                  : 'text-[#d6c28f] hover:text-white'
              }`}
            >
              Fresh River &amp; Seafood
            </button>
            <button
              onClick={() => setCategoryFilter('international')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                categoryFilter === 'international'
                  ? 'bg-gold-gradient text-[#04160d] font-bold shadow-gold'
                  : 'text-[#d6c28f] hover:text-white'
              }`}
            >
              International
            </button>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredMenu.map((dish) => (
            <div
              key={dish.id}
              className="bg-[#062117] border border-[#d4af37]/25 rounded-2xl overflow-hidden shadow-xl hover:border-[#d4af37] transition-all group flex flex-col justify-between"
            >
              {dish.image ? (
                <div
                  onClick={() => setPreviewDish(dish)}
                  className="relative h-48 overflow-hidden cursor-pointer"
                  title="Click to view full photo"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#062117] via-transparent to-transparent pointer-events-none" />

                  {dish.isChefSpecial && (
                    <span className="absolute top-2.5 left-2.5 bg-[#03140c]/90 border border-[#d4af37]/50 text-[#fcedc2] px-2 py-0.5 rounded text-[10px] font-cinzel font-semibold">
                      Chef Special
                    </span>
                  )}
                  {dish.spiceLevel && (
                    <span className="absolute top-2.5 right-2.5 bg-red-950/80 border border-red-500/40 text-red-200 px-2 py-0.5 rounded text-[10px]">
                      {dish.spiceLevel}
                    </span>
                  )}

                  <div className="absolute bottom-2.5 right-2.5 bg-[#03140c]/80 text-[#fcedc2] p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-[#d4af37]/40 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  </div>
                </div>
              ) : (
                <div className="relative h-44 bg-gradient-to-b from-[#0b3323] to-[#04160d] border-b border-[#d4af37]/20 flex flex-col items-center justify-center p-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#03140c] border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] shadow-gold mb-2">
                    <Utensils className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-[#d6c28f] font-cinzel">
                    Traditional Sikkim Delicacy
                  </span>

                  {dish.isChefSpecial && (
                    <span className="absolute top-2.5 left-2.5 bg-[#03140c]/90 border border-[#d4af37]/50 text-[#fcedc2] px-2 py-0.5 rounded text-[10px] font-cinzel font-semibold">
                      Chef Special
                    </span>
                  )}
                  {dish.spiceLevel && (
                    <span className="absolute top-2.5 right-2.5 bg-red-950/80 border border-red-500/40 text-red-200 px-2 py-0.5 rounded text-[10px]">
                      {dish.spiceLevel}
                    </span>
                  )}
                </div>
              )}

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-cinzel text-base font-bold text-white mb-1 group-hover:text-[#fceec5] transition-colors">
                    {dish.name}
                  </h4>
                  <p className="text-xs text-[#cad5cf] leading-relaxed mb-3 line-clamp-3">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#d4af37]/15 flex items-center justify-between">
                  <span className="font-cinzel text-lg font-bold text-gold-gradient">
                    ₹{dish.price}
                  </span>
                  <span className="text-[11px] text-[#8ea89a]">A la carte</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sky Dining Banner */}
        <div className="bg-gradient-to-r from-[#04170f] via-[#0b3323] to-[#04170f] border border-[#d4af37]/50 rounded-2xl p-6 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Culinary Wonder</span>
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-3">
              Suspended Sky Dining Over the Two Rivers
            </h3>
            <p className="text-xs sm:text-sm text-[#cad9d1] leading-relaxed mb-4">
              Indulge in a multi-course culinary masterpiece suspended directly above the roaring river gorge. Enjoy fresh catch of the morning, rare local herbs, fine mocktails, and romantic starlit ambiance hundreds of feet above the earth.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#fceec5]">
              <span>✓ 5-Course Chef Tasting Menu</span>
              <span>✓ Acoustic Violin Accompaniment</span>
              <span>✓ Sunset &amp; Starlight Slots</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center">
            <button
              onClick={onReserveSkyDining}
              className="bg-gold-gradient text-[#04160d] font-bold text-sm px-8 py-3.5 rounded-xl shadow-gold hover:shadow-gold-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Sky Dining Table</span>
            </button>
            <span className="text-[11px] text-[#a3c2b3] mt-2">
              Pre-booking strongly advised · Limited 12 seats per flight
            </span>
          </div>
        </div>
      </div>

      {/* Dish Photo Lightbox Modal */}
      {previewDish && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewDish(null)}
        >
          <div
            className="bg-[#051c11] border-2 border-[#d4af37]/60 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/2] max-h-[60vh] w-full overflow-hidden bg-black">
              {previewDish.image && (
                <img
                  src={previewDish.image}
                  alt={previewDish.name}
                  className="w-full h-full object-contain"
                />
              )}
              <button
                onClick={() => setPreviewDish(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/70 hover:bg-black text-[#d4af37] hover:text-white border border-[#d4af37]/40 transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 bg-[#03140c] border-t border-[#d4af37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold bg-[#0b3323] px-2 py-0.5 rounded border border-[#d4af37]/30">
                    {previewDish.category.replace('-', ' ')}
                  </span>
                  {previewDish.isChefSpecial && (
                    <span className="text-[10px] text-[#fcedc2] bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded">
                      Chef Special
                    </span>
                  )}
                  {previewDish.spiceLevel && (
                    <span className="text-[10px] text-red-200 bg-red-950/70 border border-red-500/40 px-2 py-0.5 rounded">
                      {previewDish.spiceLevel}
                    </span>
                  )}
                </div>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                  {previewDish.name}
                </h3>
                <p className="text-xs text-[#cad5cf] mt-1 max-w-xl leading-relaxed">
                  {previewDish.description}
                </p>
              </div>

              <div className="shrink-0 text-right sm:pl-4 border-t sm:border-t-0 sm:border-l border-[#d4af37]/20 pt-3 sm:pt-0 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                <span className="text-[11px] text-[#8ea89a]">A la carte</span>
                <span className="font-cinzel text-2xl font-bold text-gold-gradient">
                  ₹{previewDish.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
