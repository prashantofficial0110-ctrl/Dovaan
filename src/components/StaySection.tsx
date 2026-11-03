import React, { useState, useEffect } from 'react';
import { Room } from '../types';
import { DovaanDatabase } from '../services/db';
import {
  Users,
  Maximize2,
  Check,
  Calendar,
  Sparkles,
  Eye,
  X,
  Compass,
  ArrowRight,
} from 'lucide-react';

interface StaySectionProps {
  onSelectRoomForBooking: (roomId: string) => void;
}

export const StaySection: React.FC<StaySectionProps> = ({ onSelectRoomForBooking }) => {
  const [filter, setFilter] = useState<'all' | 'tower' | 'cottage'>('all');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>(() => DovaanDatabase.getAllRooms());

  useEffect(() => {
    const handleRatesUpdate = () => {
      setRooms(DovaanDatabase.getAllRooms());
    };
    window.addEventListener('dovaan_rates_updated', handleRatesUpdate);
    return () => window.removeEventListener('dovaan_rates_updated', handleRatesUpdate);
  }, []);

  const filteredRooms = rooms.filter((room) => {
    if (filter === 'all') return true;
    return room.category === filter;
  });


  return (
    <section className="py-16 sm:py-24 bg-fade-green relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
            <span>Luxurious Sanctuaries</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Tower Rooms &amp; Riverview Cottages
          </h2>
          <p className="text-sm sm:text-base text-[#cad9d1] leading-relaxed">
            Every room and cottage at Dovaan is architecturally positioned to celebrate our defining marvel—the meeting point of two mountain rivers. Featuring private handcrafted balconies, panoramic glass expanses, and the gentle roar of rushing waters to soothe your soul.
          </p>

          {/* Interactive Filter Control */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#03140c] border border-[#d4af37]/30 rounded-xl mt-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-gold-gradient text-[#04160d] font-bold shadow-gold'
                  : 'text-[#d6c28f] hover:text-white'
              }`}
            >
              All Accommodations ({rooms.length})
            </button>
            <button
              onClick={() => setFilter('tower')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'tower'
                  ? 'bg-gold-gradient text-[#04160d] font-bold shadow-gold'
                  : 'text-[#d6c28f] hover:text-white'
              }`}
            >
              Tower Rooms
            </button>
            <button
              onClick={() => setFilter('cottage')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'cottage'
                  ? 'bg-gold-gradient text-[#04160d] font-bold shadow-gold'
                  : 'text-[#d6c28f] hover:text-white'
              }`}
            >
              River Cottages
            </button>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-[#062117] border border-[#d4af37]/25 rounded-2xl overflow-hidden shadow-xl hover:border-[#d4af37] transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
            >
              {/* Image & Badges */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062117] via-transparent to-black/30" />

                {/* River View & Balcony badge */}
                <div className="absolute top-3 left-3 bg-[#03140c]/90 border border-[#d4af37]/40 text-[#fcedc2] px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide">
                  Balcony &amp; River View
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-[#fcedc2]">
                    {room.category === 'tower'
                      ? 'Elevated Tower'
                      : room.category === 'cottage'
                      ? 'Private Cottage'
                      : 'Riverside Glamping'}
                  </span>
                  <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-[#d6c28f]">
                    {room.sizeSqFt} sq.ft
                  </span>
                </div>
              </div>

              {/* Room Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-[#fceec5] transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs text-[#a3c2b3] italic mb-3">
                    {room.tagline}
                  </p>

                  <p className="text-xs text-[#cad5cf] line-clamp-2 leading-relaxed mb-4">
                    {room.description}
                  </p>

                  {/* Amenities highlights */}
                  <div className="space-y-1.5 mb-5 border-t border-[#d4af37]/15 pt-3">
                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#d6c28f]">
                        <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                        <span className="truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-4 border-t border-[#d4af37]/20 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-[#8ea89a] uppercase tracking-wider">Starting from</div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-cinzel text-xl sm:text-2xl font-bold text-gold-gradient">
                        ₹{room.pricePerNight.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-[#a3c2b3]">/ night</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedRoom(room)}
                      className="p-2 rounded-lg bg-[#03140c] border border-[#d4af37]/40 text-[#fcedc2] hover:border-[#d4af37] transition-all cursor-pointer"
                      title="View details & photos"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectRoomForBooking(room.id)}
                      className="bg-gold-gradient text-[#04160d] font-bold text-xs px-3.5 py-2.5 rounded-lg shadow-gold hover:shadow-gold-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#051c11] border border-[#d4af37]/50 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col my-8">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#d4af37]/25 flex items-center justify-between bg-[#03140c]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  Accommodation Specification
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  {selectedRoom.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRoom(null)}
                className="p-2 text-[#d4af37] hover:text-white rounded-lg hover:bg-[#09291b]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
              {/* Photo Showcase */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.name}
                  className="w-full h-52 object-cover rounded-xl border border-[#d4af37]/30"
                />
                <div className="grid grid-rows-2 gap-3">
                  {selectedRoom.gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${selectedRoom.name} gallery ${idx}`}
                      className="w-full h-24 object-cover rounded-xl border border-[#d4af37]/30"
                    />
                  ))}
                </div>
              </div>

              {/* Specs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-[#03140c] rounded-xl border border-[#d4af37]/20 text-xs">
                <div>
                  <span className="text-[#8ea89a] block">Floor Area</span>
                  <span className="font-semibold text-[#fcedc2]">{selectedRoom.sizeSqFt} sq.ft</span>
                </div>
                <div>
                  <span className="text-[#8ea89a] block">Bed Setup</span>
                  <span className="font-semibold text-[#fcedc2]">{selectedRoom.bedType}</span>
                </div>
                <div>
                  <span className="text-[#8ea89a] block">Capacity</span>
                  <span className="font-semibold text-[#fcedc2]">
                    {selectedRoom.capacity.adults} Adults, {selectedRoom.capacity.children} Child
                  </span>
                </div>
                <div>
                  <span className="text-[#8ea89a] block">Balcony &amp; View</span>
                  <span className="font-semibold text-[#fcedc2]">River Confluence</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-cinzel text-sm font-bold text-[#fcedc2] mb-1">
                  The Experience
                </h4>
                <p className="text-xs sm:text-sm text-[#cad9d1] leading-relaxed">
                  {selectedRoom.description}
                </p>
              </div>

              {/* Amenities list */}
              <div>
                <h4 className="font-cinzel text-sm font-bold text-[#fcedc2] mb-2">
                  Included Amenities &amp; Privileges
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#cad5cf]">
                  {selectedRoom.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-[#03140c] border-t border-[#d4af37]/25 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8ea89a] block">Nightly Rate</span>
                <span className="font-cinzel text-2xl font-bold text-gold-gradient">
                  ₹{selectedRoom.pricePerNight.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={() => {
                  const id = selectedRoom.id;
                  setSelectedRoom(null);
                  onSelectRoomForBooking(id);
                }}
                className="bg-gold-gradient text-[#04160d] font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-gold hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Reserve This Suite</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
