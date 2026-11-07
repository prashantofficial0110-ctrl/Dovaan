import React, { useState } from 'react';
import { DovaanDatabase } from '../services/db';
import {
  Users,
  Calendar,
  Sparkles,
  CheckCircle,
  Building,
  Heart,
  Briefcase,
  PartyPopper,
  Send,
} from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: 'wedding' as 'wedding' | 'corporate' | 'celebration' | 'photoshoot',
    preferredVenue: 'exclusive-garden' as 'grand-banquet' | 'open-air-lawn' | 'exclusive-garden' | 'wedding-in-water' | 'conference-hall' | 'all-inclusive',
    tentativeDate: '2026-12-20',
    estimatedGuests: 150,
    budgetRange: '₹8,00,000 - ₹12,00,000',
    message: '',
  });

  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = DovaanDatabase.createInquiry(formData);
    setSubmittedInquiryId(created.id);
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9e7d23] font-semibold mb-2">
            <span>Celebrations by the River</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#062117] mb-4">
            Weddings, Banquets &amp; Corporate Summits
          </h2>
          <p className="text-sm sm:text-base text-[#2d4b3b] leading-relaxed">
            At Dovaan Homestay and Resort, we offer an elegant open-air venue, a grand banquet hall, and a modern conference hall—perfect for destination weddings, corporate gatherings, and celebratory milestones where nature’s majesty meets royal hospitality.
          </p>
        </div>

        {/* 3 Venue Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Venue 1: Himalayan Exclusive Garden */}
          <div className="bg-[#062117] border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#d4af37] transition-all">
            <div>
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/assets/events/himalayan_exclusive_garden.png"
                  alt="Himalayan Exclusive Garden - Dovaan Homestay and Resort"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062117] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#03140c]/90 border border-[#d4af37]/40 text-[#fcedc2] px-2.5 py-1 rounded text-xs font-cinzel">
                  Garden Pavilion
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                  Himalayan Exclusive Garden
                </h3>
                <p className="text-xs text-[#cad5cf] leading-relaxed mb-4">
                  Nestled amidst verdant alpine slopes and fresh mountain breezes, this exclusive glass-canopied garden terrace offers a private sanctuary with botanical ivy arches, patterned tiled promenades, and plush lounge seating overlooking the river valley.
                </p>
                <div className="space-y-1.5 text-xs text-[#d6c28f]">
                  <div>• Covered Glass Canopy &amp; Botanical Ivy Pergola</div>
                  <div>• Scenic Riverside Valley Vistas &amp; Alpine Mountain Air</div>
                  <div>• Elegant Lounge Banquettes, Cocktail Tables &amp; Private Bar Setup</div>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <span className="text-[11px] text-[#8ea89a]">Ideal for Intimate Receptions, Mehendi Celebrations &amp; Sundowner Soirées</span>
            </div>
          </div>

          {/* Venue 2: Grand Banquet Hall */}
          <div className="bg-[#062117] border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#d4af37] transition-all">
            <div>
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/assets/experiences/sky_dining_candlelight.jpg"
                  alt="Dovaan Elegant Banquet Hall"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062117] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#03140c]/90 border border-[#d4af37]/40 text-[#fcedc2] px-2.5 py-1 rounded text-xs font-cinzel">
                  Indoor Grandeur
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                  The Grand Banquet Hall
                </h3>
                <p className="text-xs text-[#cad5cf] leading-relaxed mb-4">
                  Opulent indoor ballroom featuring crystal chandeliers, acoustic wall panels, climate control, and a dedicated multi-cuisine catering kitchen for lavish celebratory feasts.
                </p>
                <div className="space-y-1.5 text-xs text-[#d6c28f]">
                  <div>• Capacity: Up to 350 Guests Banquet Style</div>
                  <div>• Grand Stage &amp; LED Video Wall</div>
                  <div>• Dedicated Bride &amp; Groom Suites</div>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <span className="text-[11px] text-[#8ea89a]">Ideal for Sangeet, Galas &amp; Milestone Anniversaries</span>
            </div>
          </div>

          {/* Venue 3: Wedding in Water */}
          <div className="bg-[#062117] border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#d4af37] transition-all">
            <div>
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/assets/events/wedding_in_water.jpg"
                  alt="Wedding in Water - Dovaan Homestay and Resort"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062117] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#03140c]/90 border border-[#d4af37]/40 text-[#fcedc2] px-2.5 py-1 rounded text-xs font-cinzel">
                  Floating Mandap
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                  Wedding in Water
                </h3>
                <p className="text-xs text-[#cad5cf] leading-relaxed mb-4">
                  Exchange eternal vows atop an illuminated floating floral aisle across the resort pool, surrounded by hundreds of floating candles, fresh rose petals, and the gentle whisper of the merging rivers under the starlit Himalayan night.
                </p>
                <div className="space-y-1.5 text-xs text-[#d6c28f]">
                  <div>• Floating Glass &amp; Flower Aisle over Turquoise Water</div>
                  <div>• 1,000+ Floating Tealights &amp; Rose Petal Carpets</div>
                  <div>• Dreamy Floral Arch &amp; Fairy-Lit Mountain Ambiance</div>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <span className="text-[11px] text-[#8ea89a]">Ideal for Romantic Proposals, Vow Ceremonies &amp; Fairytale Weddings</span>
            </div>
          </div>
        </div>

        {/* Interactive Event Inquiry Form connected to Database */}
        <div className="bg-gradient-to-b from-[#092b1d] to-[#04150d] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Bespoke Event Planning
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-1">
              Request Venue Proposal &amp; Date Lock
            </h3>
            <p className="text-xs sm:text-sm text-[#cad9d1] mt-2">
              Submit your vision. Our event curators will evaluate dates, customize floor plans, and respond within 24 hours.
            </p>
          </div>

          {submittedInquiryId ? (
            <div className="bg-[#03140c] border border-[#d4af37] rounded-xl p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#0b3323] border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-cinzel text-2xl font-bold text-[#fcedc2]">
                Inquiry Submitted Successfully!
              </h4>
              <p className="text-sm text-[#cad9d1] max-w-md mx-auto">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Your event proposal has been assigned reference ID <span className="font-mono text-[#d4af37] font-bold">{submittedInquiryId}</span>. Our banquet concierge will contact you at {formData.phone}.
              </p>
              <button
                onClick={() => setSubmittedInquiryId(null)}
                className="bg-gold-gradient text-[#04160d] font-bold text-xs px-6 py-2.5 rounded-lg shadow-gold cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Full Name / Organization</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Priya Mukherjee"
                    className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Event Type</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value as any })}
                    className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="wedding">Destination Wedding</option>
                    <option value="corporate">Corporate Summit / Retreat</option>
                    <option value="celebration">Birthday / Anniversary Gala</option>
                    <option value="photoshoot">Pre-Wedding / Film Shoot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Preferred Venue</label>
                  <select
                    value={formData.preferredVenue}
                    onChange={(e) => setFormData({ ...formData, preferredVenue: e.target.value as any })}
                    className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="exclusive-garden">Himalayan Exclusive Garden</option>
                    <option value="grand-banquet">The Grand Banquet Hall</option>
                    <option value="wedding-in-water">Wedding in Water (Floating Stage)</option>
                    <option value="all-inclusive">All-Inclusive Resort Buyout</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Tentative Date</label>
                  <input
                    type="date"
                    required
                    value={formData.tentativeDate}
                    onChange={(e) => setFormData({ ...formData, tentativeDate: e.target.value })}
                    className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Estimated Guests</label>
                  <input
                    type="number"
                    min={10}
                    max={1000}
                    value={formData.estimatedGuests}
                    onChange={(e) => setFormData({ ...formData, estimatedGuests: Number(e.target.value) })}
                    className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Budget Allocation</label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="₹3,00,000 - ₹5,00,000">₹3,00,000 - ₹5,00,000</option>
                    <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                    <option value="₹10,00,000 - ₹20,00,000">₹10,00,000 - ₹20,00,000</option>
                    <option value="₹20,00,000+">₹20,00,000+ (Luxury Buyout)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#d6c28f] mb-1">Special Requirements or Notes</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about decor preferences, catering choices, stay requirements for guests, or special rituals..."
                  className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold-gradient text-[#04160d] font-bold text-sm py-3.5 rounded-lg shadow-gold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Venue Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
