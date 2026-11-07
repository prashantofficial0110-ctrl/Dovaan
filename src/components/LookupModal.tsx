import React, { useState } from 'react';
import { Booking } from '../types';
import { DovaanDatabase } from '../services/db';
import {
  X,
  Search,
  CheckCircle,
  Calendar,
  Users,
  AlertCircle,
  Printer,
  Ban,
} from 'lucide-react';

interface LookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LookupModal: React.FC<LookupModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [foundBookings, setFoundBookings] = useState<Booking[] | null>(null);
  const [searched, setSearched] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const clean = query.trim();
    if (!clean) return;

    if (clean.includes('@')) {
      const results = DovaanDatabase.getBookingsByEmail(clean);
      setFoundBookings(results.length > 0 ? results : null);
    } else {
      const single = DovaanDatabase.getBookingById(clean);
      setFoundBookings(single ? [single] : null);
    }
  };

  const handleCancelBooking = (id: string) => {
    DovaanDatabase.cancelBooking(id, cancelReason || 'Guest cancellation request via portal.');
    setCancellingId(null);
    setCancelReason('');
    // refresh search
    const updated = DovaanDatabase.getBookingById(id);
    if (updated) {
      setFoundBookings([updated]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#051c11] border border-[#d4af37]/50 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col my-4">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#d4af37]/25 flex items-center justify-between bg-[#03140c]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block">
              Reservation Management Portal
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              Lookup Your Dovaan Homestay and Resort Reservation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#d4af37] hover:text-white rounded-lg hover:bg-[#08291b] cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs text-[#d6c28f]">
              Enter your Booking Reference (e.g. <span className="font-mono text-[#fcedc2]">DVN-2026-8942</span>) or Email address:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. DVN-2026-8942 or vikram.sengupta@kolkata.in"
                  className="w-full bg-[#03140c] border border-[#d4af37]/40 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <button
                type="submit"
                className="bg-gold-gradient text-[#04160d] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-gold hover:brightness-110 cursor-pointer flex items-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Results */}
          {searched && (
            <div className="space-y-4">
              {foundBookings && foundBookings.length > 0 ? (
                foundBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-5 rounded-xl bg-[#03140c] border border-[#d4af37]/30 space-y-4 shadow-lg"
                  >
                    <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3">
                      <div>
                        <span className="font-mono text-sm font-bold text-[#fcedc2]">
                          {booking.id}
                        </span>
                        <div className="text-[11px] text-[#8ea89a]">
                          Booked on {booking.createdAt.slice(0, 10)}
                        </div>
                      </div>

                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                          booking.status === 'confirmed'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                            : booking.status === 'checked-in'
                            ? 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                            : booking.status === 'cancelled'
                            ? 'bg-red-950/80 text-red-300 border-red-500/40'
                            : 'bg-stone-900 text-stone-300 border-stone-600'
                        }`}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[#8ea89a] block">Guest Name</span>
                        <span className="font-semibold text-white">{booking.customer.fullName}</span>
                      </div>
                      <div>
                        <span className="text-[#8ea89a] block">Stay / Experience</span>
                        <span className="font-semibold text-[#fcedc2]">{booking.roomName}</span>
                      </div>
                      <div>
                        <span className="text-[#8ea89a] block">Dates</span>
                        <span className="font-semibold text-white">
                          {booking.checkInDate} to {booking.checkOutDate} ({booking.nights}N)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#d4af37]/15 text-xs">
                      <div>
                        <span className="text-[#8ea89a]">Total: </span>
                        <span className="font-cinzel text-base font-bold text-gold-gradient">
                          ₹{booking.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.print()}
                          className="px-3 py-1.5 rounded-lg bg-[#051c11] border border-[#d4af37]/40 text-[#fcedc2] text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print</span>
                        </button>

                        {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                          <button
                            onClick={() => setCancellingId(booking.id)}
                            className="px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/30 text-red-200 text-xs flex items-center gap-1 cursor-pointer hover:bg-red-900/60"
                          >
                            <Ban className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Cancellation prompt */}
                    {cancellingId === booking.id && (
                      <div className="p-3 bg-red-950/40 border border-red-500/50 rounded-lg space-y-2 text-xs">
                        <div className="font-semibold text-red-200">
                          Confirm Cancellation for {booking.id}?
                        </div>
                        <input
                          type="text"
                          placeholder="Reason for cancellation (optional)"
                          value={cancelReason}
                          onChange={(e) => setCancelReason(e.target.value)}
                          className="w-full bg-[#03140c] border border-red-500/40 rounded p-1.5 text-white text-xs"
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => setCancellingId(null)}
                            className="px-3 py-1 rounded bg-[#03140c] text-stone-300 text-xs cursor-pointer"
                          >
                            Keep Booking
                          </button>
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="px-3 py-1 rounded bg-red-600 text-white font-bold text-xs cursor-pointer"
                          >
                            Yes, Cancel Reservation
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center p-8 bg-[#03140c] rounded-xl border border-[#d4af37]/20">
                  <AlertCircle className="w-10 h-10 text-[#d4af37] mx-auto mb-2" />
                  <div className="font-cinzel text-base font-bold text-[#fcedc2]">
                    No Booking Found
                  </div>
                  <p className="text-xs text-[#cad5cf] mt-1">
                    No active record matched “{query}”. Try checking your confirmation reference or book a new stay.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
