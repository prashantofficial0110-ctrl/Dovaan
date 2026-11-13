import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
  Compass,
  Clock,
  Car,
  Plane,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const LocationMapSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-[#d4af37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9e7d23] font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Google Maps Location &amp; Adampool Destination</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#062117] mb-4">
            Visit DOVAAN at Adampool, Sikkim
          </h2>
          <p className="text-sm sm:text-base text-[#2d4b3b] leading-relaxed">
            Conveniently nestled along the serene riverbanks of Adampool, near Lower Lingdum and Ranipool in Gangtok. Easily accessible from Pakyong Airport and Bagdogra.
          </p>
        </div>

        {/* Map & Official Contact Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          {/* Left: Contact & Location Info Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#062117] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#d4af37]/20">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#d4af37]/60 shrink-0 bg-[#020e08] p-1 shadow-gold">
                  <img
                    src="/assets/logo/dovaan_logo.jpg"
                    alt="Dovaan Homestay and Resort"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-white leading-tight">
                    DOVAAN HOMESTAY AND RESORT
                  </h3>
                  <span className="text-[10px] text-[#d4af37] tracking-wider uppercase font-semibold block mt-0.5">
                    NEW EXPERIENCE. · SIKKIM
                  </span>
                  <span className="text-[11px] text-[#cad5cf] block">
                    Adampool · New Road Gangtok
                  </span>
                </div>
              </div>

              {/* Verified Details */}
              <div className="space-y-4 text-xs sm:text-sm">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0b3323] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8ea89a] block font-semibold">
                      Exact Google Maps Address
                    </span>
                    <p className="text-white font-medium mt-0.5 leading-snug">
                      Adam Pool, New Road, Lower Lingdum, Ranipool, Gangtok, Sikkim — 737135, India
                    </p>
                    <span className="text-[11px] text-[#d6c28f] mt-1 block">
                      Landmark: Near Lingdum (Ranka) Monastery &amp; Rani Khola riverbanks
                    </span>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0b3323] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8ea89a] block font-semibold">
                      Direct Resort &amp; WhatsApp Booking
                    </span>
                    <div className="space-y-1 mt-0.5">
                      <a
                        href="tel:+919883116936"
                        className="text-[#fcedc2] hover:text-white font-semibold block text-sm"
                      >
                        +91 98831 16936 (Front Desk &amp; WhatsApp)
                      </a>
                      <a
                        href="tel:+918370960362"
                        className="text-[#d6c28f] hover:text-white block text-xs"
                      >
                        +91 83709 60362
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0b3323] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8ea89a] block font-semibold">
                      Official Inquiries &amp; Reservations
                    </span>
                    <a
                      href="mailto:dovaanresort.adampool@gmail.com"
                      className="text-[#fcedc2] hover:text-white font-medium block mt-0.5"
                    >
                      dovaanresort.adampool@gmail.com
                    </a>
                    <span className="text-[11px] text-[#8ea89a]">
                      reservations@dovaanresort.in
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0b3323] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8ea89a] block font-semibold">
                      Check-In &amp; Service Hours
                    </span>
                    <span className="text-white block">
                      Check-In: 12:00 PM · Check-Out: 11:00 AM
                    </span>
                    <span className="text-[11px] text-[#8ea89a]">
                      Front Desk Concierge: 24/7 Available
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Action Button */}
            <div className="mt-8 pt-6 border-t border-[#d4af37]/20 flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Dovaan+Homestay+and+Resort+Adampool+Ranipool+Sikkim"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gold-gradient text-[#04160d] font-bold text-xs py-3 px-4 rounded-xl shadow-gold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://wa.me/919883116936?text=Hello%20Dovaan%20Resort%20Adampool,%20I%20would%20like%20to%20inquire%20about%20booking"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#03140c] border border-[#d4af37]/40 text-[#fcedc2] hover:border-[#d4af37] text-xs font-semibold px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Right: Interactive Google Maps Embed (7 cols) */}
          <div className="lg:col-span-7 bg-[#062117] border border-[#d4af37]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-3 bg-[#03140c] border-b border-[#d4af37]/25 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-white font-medium">
                  Google Maps Pin: Adampool, Lower Lingdum, Ranipool, Sikkim
                </span>
              </div>
              <span className="text-[#d4af37] font-mono text-[11px]">27.2917° N, 88.5867° E</span>
            </div>

            {/* Embedded Google Maps View centered on Adampool/Ranipool Sikkim */}
            <div className="relative flex-1 min-h-[360px] sm:min-h-[420px] w-full bg-[#0a1f15]">
              <iframe
                title="Google Maps Location - Dovaan Homestay and Resort Adampool Sikkim"
                src="https://maps.google.com/maps?q=Dovaan+Homestay+Adampool+Ranipool+Sikkim&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 absolute inset-0"
                loading="lazy"
                allowFullScreen
              />

              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#04160d]/95 backdrop-blur-md border border-[#d4af37]/60 p-3 rounded-xl shadow-2xl flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#d4af37] shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-[#fcedc2] block">
                    Dovaan Homestay &amp; Resort
                  </span>
                  <span className="text-[11px] text-[#cad9d1]">
                    Adampool, Ranipool (Gangtok), Sikkim 737135
                  </span>
                </div>
              </div>
            </div>

            {/* Travel Transit Distances */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#d4af37]/20 p-4 bg-[#03140c] text-xs">
              <div className="p-2">
                <div className="flex items-center gap-1.5 text-[#d4af37] font-semibold mb-1">
                  <Car className="w-3.5 h-3.5" />
                  <span>From Gangtok Mall Rd</span>
                </div>
                <div className="text-white font-bold">12 km · ~35 mins</div>
                <span className="text-[10px] text-[#8ea89a]">Scenic drive via Ranipool</span>
              </div>

              <div className="p-2">
                <div className="flex items-center gap-1.5 text-[#d4af37] font-semibold mb-1">
                  <Plane className="w-3.5 h-3.5" />
                  <span>From Pakyong Airport</span>
                </div>
                <div className="text-white font-bold">24 km · ~50 mins</div>
                <span className="text-[10px] text-[#8ea89a]">Nearest airport to resort</span>
              </div>

              <div className="p-2">
                <div className="flex items-center gap-1.5 text-[#d4af37] font-semibold mb-1">
                  <Plane className="w-3.5 h-3.5" />
                  <span>Bagdogra / NJP</span>
                </div>
                <div className="text-white font-bold">115 km · ~3.5 hrs</div>
                <span className="text-[10px] text-[#8ea89a]">Direct NH10 corridor route</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
