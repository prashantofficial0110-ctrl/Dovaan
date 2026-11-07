import React, { useState } from 'react';
import {
  Waves,
  Mountain,
  Sparkles,
  Heart,
  ShieldCheck,
  Compass,
  ArrowRight,
  Eye,
  Maximize2,
  X,
  MapPin,
  Phone,
  Camera,
  CheckCircle,
  Calendar,
} from 'lucide-react';

interface AboutSectionProps {
  onExploreServices: () => void;
  onOpenBooking: () => void;
}

interface ConfluencePhoto {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  badge: string;
  isOfficial?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreServices, onOpenBooking }) => {
  // Photo for The Sacred Confluence gallery
  const photos: ConfluencePhoto[] = [
    {
      id: 'dovaan-authentic-confluence',
      title: 'Dovaan Homestay and Resort at the Confluence',
      subtitle: 'Authentic daytime view of the resort property, towers, riverside terraces, and the sacred river confluence in Adampool',
      url: '/assets/hero/dovaan_authentic_brochure_view.png',
      badge: 'Official Property Photo',
      isOfficial: true,
    },
  ];

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activePhoto = photos[activePhotoIndex];

  // Authentic 8 experiences featured on the official brochure
  const flyerExperiences = [
    {
      title: 'Sikkim Swing',
      tagline: 'Swing into Nature’s Embrace',
      category: 'Adventure',
      icon: '🏔️',
    },
    {
      title: 'Sky Walk & View Point',
      tagline: 'Elevate Your Views, Elevate Your Spirit',
      category: 'Panoramic',
      icon: '✨',
    },
    {
      title: 'Rain Dance',
      tagline: 'Feel the Rain, Feel Alive',
      category: 'Aqua Fun',
      icon: '🌧️',
    },
    {
      title: 'Water Slides',
      tagline: 'Slide into endless water fun.',
      category: 'Aqua Fun',
      icon: '🌊',
    },
    {
      title: 'Cozy Rooms',
      tagline: 'Rest in Comfort, Wake to Nature',
      category: 'Stay',
      icon: '🛏️',
    },
    {
      title: 'Wedding Venue',
      tagline: 'The perfect open-air venue for weddings and grand celebrations',
      category: 'Celebration',
      icon: '💍',
    },
    {
      title: 'VR Experience',
      tagline: 'Step Into Another World with Immersive Virtual Reality Fun!',
      category: 'Entertainment',
      icon: '🥽',
    },
    {
      title: 'Banquet Hall',
      tagline: 'Celebrate Every Moment in Our Elegant Banquet Hall',
      category: 'Events',
      icon: '🏛️',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Story & Interactive Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Visual Column: The Sacred Confluence Gallery */}
          <div className="relative">
            {/* Primary Display with Gold Frame */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="group relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 p-1.5 bg-[#020e08] shadow-[0_0_35px_rgba(212,175,55,0.3)] cursor-pointer"
            >
              <div className="relative h-80 sm:h-[430px] rounded-xl overflow-hidden">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020e08] via-black/20 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-[#03140c]/90 border border-[#d4af37] text-[#fcedc2] px-3 py-1 rounded-full text-xs font-cinzel font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                  <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{activePhoto.badge}</span>
                </div>

                {/* Expand Overlay Button */}
                <div className="absolute top-4 right-4 bg-[#03140c]/80 hover:bg-[#d4af37] text-white hover:text-[#04160d] p-2 rounded-xl border border-[#d4af37]/50 transition-all shadow-lg backdrop-blur-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Caption on Photo */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <h4 className="font-cinzel text-base sm:text-lg font-bold text-white drop-shadow-md">
                    {activePhoto.title}
                  </h4>
                  <p className="text-xs text-[#d8e6de] drop-shadow-sm mt-0.5 line-clamp-2">
                    {activePhoto.subtitle}
                  </p>
                  <span className="text-[11px] text-[#d4af37] font-semibold mt-1 inline-flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to view full high-resolution brochure
                  </span>
                </div>
              </div>
            </div>

            {/* Photo Selector Thumbnail Row (only when multiple photos exist) */}
            {photos.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-4">
                {photos.map((item, idx) => {
                  const isSelected = activePhotoIndex === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative rounded-xl overflow-hidden border transition-all p-0.5 bg-[#020e08] cursor-pointer ${
                        isSelected
                          ? 'border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105'
                          : 'border-[#d4af37]/30 opacity-70 hover:opacity-100 hover:border-[#d4af37]/60'
                      }`}
                    >
                      <div className="h-14 sm:h-16 rounded-lg overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {item.isOfficial && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 border border-black shadow" title="Official Uploaded Image" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Overlapping Badge with Logo */}
            <div className="mt-4 bg-[#04160d] border border-[#d4af37] rounded-xl p-3 sm:p-4 shadow-2xl flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#d4af37]/60 shrink-0 bg-[#020e08] p-1">
                <img
                  src="/assets/logo/dovaan_logo.jpg"
                  alt="Dovaan Homestay and Resort"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <span className="font-cinzel text-xs sm:text-sm font-bold text-[#fcedc2] block">
                  DOVAAN HOMESTAY AND RESORT
                </span>
                <span className="text-[10px] text-[#d6c28f] uppercase tracking-wider block font-semibold">
                  NEW EXPERIENCE. · SIKKIM
                </span>
                <span className="text-[11px] text-[#cad9d1] leading-tight block mt-0.5">
                  Where two mountain rivers merge into one sacred current.
                </span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-[#0b3323] border border-[#d4af37]/60 text-[#fcedc2] hover:border-[#d4af37] text-xs font-semibold shrink-0 cursor-pointer flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="hidden sm:inline">Enlarge</span>
              </button>
            </div>
          </div>

          {/* Right Text Column: The Story & Philosophy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9e7d23] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>The Story of Dovaan Homestay and Resort</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#062117] leading-tight">
              From Peaceful Stays to Thrilling Adventures, Every Moment Brings a New Experience.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#2d4b3b] leading-relaxed">
              <p>
                Nestled along New Road in Adampool, Gangtok, <strong className="text-[#062117] font-bold">DOVAAN HOMESTAY AND RESORT</strong> draws its name and essence from the revered junction where two pristine mountain rivers merge into one sacred current. Surrounded by verdant alpine ridges and cascading river sprays, this resort is envisioned as Sikkim’s foremost sanctuary for dining, rest, recreation, and celebration.
              </p>
              <p>
                Whether you seek the adrenaline surge of the iconic Sikkim Swing, panoramic perspectives on the glass sky walk, refreshing thrills at the water slides and rain dance pavilion, or family adventures in our VR experience zone—DOVAAN brings every dimension of fun together in one extraordinary property.
              </p>
              <p>
                Guests wake to birdsong in handcrafted balcony suites facing the waters, savor authentic Sikkimese multi-cuisine delicacies and fresh seafood at our riverside dining terrace, and celebrate life’s grandest occasions across our pillarless banquet halls and open-air riverside lawns.
              </p>
            </div>

            {/* Signature Quotes */}
            <div className="p-4 bg-[#051c11] border-l-4 border-[#d4af37] rounded-r-xl text-xs sm:text-sm text-[#fcedc2] italic">
              “At DOVAAN HOMESTAY AND RESORT, every moment is designed, every view is a masterpiece, and every visit becomes a cherished memory. Discover the extraordinary and EXPERIENCE DOVAAN—one destination, endless experiences &amp; unforgettable memories.”
            </div>

            {/* Quick Contact & Location Info from Official Flyer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#04160d] border border-[#d4af37]/30 p-3 rounded-xl">
              <div className="flex items-center gap-2 text-[#cad5cf]">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Adampool, New Road Gangtok Sikkim</span>
              </div>
              <div className="flex items-center gap-2 text-[#cad5cf]">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="tel:+918370960362" className="hover:text-white text-[#fcedc2] font-semibold">
                  +91 83709 60362
                </a>
                <span className="text-[10px] text-[#8ea89a]">(@dovaan_resort)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="bg-gold-gradient text-[#04160d] font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-gold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Experience Dovaan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="bg-[#051c11] border border-[#d4af37]/40 text-[#fcedc2] hover:border-[#d4af37] text-xs sm:text-sm px-5 py-3 rounded-lg transition-all cursor-pointer"
              >
                Explore Services &amp; Packages
              </button>
            </div>
          </div>
        </div>

        {/* 8 Featured Experiences directly from the Official Flyer */}
        <div className="mt-16 sm:mt-20 pt-12 border-t border-[#d4af37]/20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9e7d23] font-semibold block mb-1">
              Endless Experiences
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#062117]">
              Sikkim’s Ultimate Fun &amp; Adventure Destination
            </h3>
            <p className="text-xs sm:text-sm text-[#2d4b3b] mt-1">
              Perfect getaway for families, couples, adventurers, friends, and corporate outings.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {flyerExperiences.map((exp, i) => (
              <div
                key={i}
                className="bg-[#04160d] border border-[#d4af37]/30 hover:border-[#d4af37] p-3.5 sm:p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{exp.icon}</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#0b3323] text-[#d4af37] border border-[#d4af37]/30">
                      {exp.category}
                    </span>
                  </div>
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-white group-hover:text-[#fcedc2] transition-colors">
                    {exp.title}
                  </h4>
                  <p className="text-xs text-[#8ea89a] mt-1 line-clamp-2">
                    {exp.tagline}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#d4af37]/15 flex items-center justify-between text-[11px] text-[#d4af37]">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High-Resolution Lightbox Modal for the Official Photo */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-[#03140c] border-2 border-[#d4af37] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="p-4 border-b border-[#d4af37]/30 flex items-center justify-between bg-[#020e08]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#d4af37]/60 p-0.5 bg-[#020e08]">
                  <img
                    src="/assets/logo/dovaan_logo.jpg"
                    alt="DOVAAN HOMESTAY & RESORT - NEW EXPERIENCE."
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-white">
                    DOVAAN HOMESTAY AND RESORT
                  </h4>
                  <span className="text-[11px] text-[#d4af37] font-medium block">
                    NEW EXPERIENCE. · Adampool, Gangtok Sikkim · +91 83709 60362
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-8 h-8 rounded-full bg-[#051c11] border border-[#d4af37]/40 text-[#8ea89a] hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image Viewer */}
            <div className="flex-1 overflow-auto p-2 sm:p-4 flex items-center justify-center bg-black/40">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl border border-[#d4af37]/30 shadow-2xl"
              />
            </div>

            {/* Footer */}
            <div className="p-3 sm:p-4 border-t border-[#d4af37]/30 bg-[#020e08] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-white font-semibold block">{activePhoto.title}</span>
                <span className="text-[#8ea89a] text-[11px]">{activePhoto.subtitle}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsLightboxOpen(false);
                    onOpenBooking();
                  }}
                  className="bg-gold-gradient text-[#04160d] font-bold px-4 py-2 rounded-lg text-xs shadow-gold hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Experience Now</span>
                </button>
                <button
                  onClick={() => setIsLightboxOpen(false)}
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
