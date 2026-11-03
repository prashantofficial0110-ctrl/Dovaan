import React, { useState, useEffect } from 'react';
import { Booking, Room, BookingAddon, ResortRates } from '../types';
import { DovaanDatabase } from '../services/db';
import {
  X,
  Calendar,
  Users,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  CreditCard,
  Printer,
  Compass,
  ArrowRight,
  ArrowLeft,
  Flame,
  Check,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    roomId?: string;
    bookingType?: 'stay' | 'adventure' | 'skydining' | 'event';
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  };
  onBookingCreated?: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefill,
  onBookingCreated,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Dynamic inventory and rates (Synced with owner modifications)
  const [rooms, setRooms] = useState<Room[]>(() => DovaanDatabase.getAllRooms());
  const [addonsList, setAddonsList] = useState<BookingAddon[]>(() => DovaanDatabase.getAllAddons());
  const [rates, setRates] = useState<ResortRates>(() => DovaanDatabase.getRates());

  useEffect(() => {
    const handleRatesUpdate = () => {
      setRooms(DovaanDatabase.getAllRooms());
      setAddonsList(DovaanDatabase.getAllAddons());
      setRates(DovaanDatabase.getRates());
    };
    window.addEventListener('dovaan_rates_updated', handleRatesUpdate);
    return () => window.removeEventListener('dovaan_rates_updated', handleRatesUpdate);
  }, []);

  // Form State
  const [bookingType, setBookingType] = useState<'stay' | 'adventure' | 'skydining' | 'event'>('stay');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('room-tower-deluxe');
  const [checkInDate, setCheckInDate] = useState<string>('2026-11-12');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-11-15');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  // Addons
  const [selectedAddons, setSelectedAddons] = useState<{ [id: string]: number }>({});

  // Customer Info
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [stateName, setStateName] = useState<string>('Sikkim');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Confirmation result
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Sync prefill
  useEffect(() => {
    if (prefill) {
      if (prefill.bookingType) setBookingType(prefill.bookingType);
      if (prefill.roomId) setSelectedRoomId(prefill.roomId);
      if (prefill.checkIn) setCheckInDate(prefill.checkIn);
      if (prefill.checkOut) setCheckOutDate(prefill.checkOut);
      if (prefill.guests) setAdults(prefill.guests);
    }
  }, [prefill]);

  if (!isOpen) return null;

  // Calculations
  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  const calculateNights = () => {
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diffTime = d2.getTime() - d1.getTime();
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 1;
    } catch {
      return 1;
    }
  };

  const nights = calculateNights();

  let baseAmount = 0;
  if (bookingType === 'stay') {
    baseAmount = (selectedRoom?.pricePerNight || 0) * nights;
  } else if (bookingType === 'adventure') {
    const swingPrice = rates.experiences['exp-sikkim-swing']?.price ?? 1499;
    baseAmount = swingPrice * adults;
  } else if (bookingType === 'skydining') {
    const diningPrice = rates.experiences['exp-sky-dining']?.price ?? 3499;
    baseAmount = diningPrice * adults;
  } else {
    baseAmount = 5000;
  }

  const addonsAmount = Object.entries(selectedAddons).reduce((sum, [addonId, qty]) => {
    const item = addonsList.find((a) => a.id === addonId);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const subtotal = baseAmount + addonsAmount;
  const taxPercentage = rates.taxPercentage ?? 12;
  const taxes = Math.round(subtotal * (taxPercentage / 100));
  const grandTotal = subtotal + taxes;

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => {
      const current = prev[addonId] || 0;
      if (current > 0) {
        const copy = { ...prev };
        delete copy[addonId];
        return copy;
      } else {
        return { ...prev, [addonId]: adults || 1 };
      }
    });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedAddons = Object.entries(selectedAddons).map(([id, qty]) => {
      const addon = addonsList.find((a) => a.id === id);
      return {
        id,
        name: addon?.name || 'Addon',
        price: addon?.price || 0,
        qty,
      };
    });


    const newBooking = DovaanDatabase.createBooking({
      customer: {
        fullName,
        email,
        phone,
        city,
        state: stateName,
        specialRequests,
      },
      bookingType,
      roomId: bookingType === 'stay' ? selectedRoom.id : undefined,
      roomName: bookingType === 'stay' ? selectedRoom.name : `${bookingType.toUpperCase()} Package`,
      checkInDate,
      checkOutDate,
      nights,
      guests: { adults, children },
      addons: formattedAddons,
      baseAmount,
      addonsAmount,
      taxes,
      totalAmount: grandTotal,
      status: 'confirmed',
      paymentStatus: 'pay_at_resort',
      paymentMethod: 'pay_on_arrival',
      notes: specialRequests,
    });

    setConfirmedBooking(newBooking);
    setStep(4);
    if (onBookingCreated) {
      onBookingCreated(newBooking);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#051c11] border border-[#d4af37]/50 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col my-4">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#d4af37]/25 flex items-center justify-between bg-[#03140c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#d4af37]/50 bg-[#020e08] shrink-0">
              <img
                src="/assets/aistudio/IMG-20261101-WA0003_6ab79521.jpg"
                alt="Dovaan Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d4af37] font-semibold block">
                Direct Database Booking System
              </span>
              <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-white">
                Reserve Your Experience at DOVAAN
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#d4af37] hover:text-white rounded-lg hover:bg-[#08291b] cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Wizard Step Indicator */}
        {step < 4 && (
          <div className="bg-[#03140c]/70 px-4 sm:px-6 py-2.5 border-b border-[#d4af37]/15 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 sm:gap-6">
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-1.5 ${
                  step === 1 ? 'text-[#fcedc2] font-bold' : 'text-[#8ea89a]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#0b3323] border border-[#d4af37] flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>Select Stay &amp; Dates</span>
              </button>

              <span className="text-[#d4af37]/30">›</span>

              <button
                onClick={() => setStep(2)}
                className={`flex items-center gap-1.5 ${
                  step === 2 ? 'text-[#fcedc2] font-bold' : 'text-[#8ea89a]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#0b3323] border border-[#d4af37] flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>Add-on Experiences</span>
              </button>

              <span className="text-[#d4af37]/30">›</span>

              <button
                onClick={() => setStep(3)}
                className={`flex items-center gap-1.5 ${
                  step === 3 ? 'text-[#fcedc2] font-bold' : 'text-[#8ea89a]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#0b3323] border border-[#d4af37] flex items-center justify-center text-[10px]">
                  3
                </span>
                <span>Guest Details &amp; Review</span>
              </button>
            </div>

            <div className="hidden sm:block text-[#d4af37] text-xs font-cinzel">
              Est. Total: ₹{grandTotal.toLocaleString('en-IN')}
            </div>
          </div>
        )}

        {/* Modal Body / Steps */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* STEP 1: Select Stay & Dates */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Type Switcher */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d6c28f] mb-2 font-medium">
                  Select Booking Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'stay', label: 'Tower & Cottages' },
                    { id: 'adventure', label: 'Sikkim Swing Pass' },
                    { id: 'skydining', label: 'Sky Dining Table' },
                    { id: 'event', label: 'Events & Banquets' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setBookingType(cat.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer ${
                        bookingType === cat.id
                          ? 'bg-[#0b3423] border-[#d4af37] text-[#fcedc2] shadow-gold'
                          : 'bg-[#03140c] border-[#d4af37]/25 text-[#cad5cf] hover:border-[#d4af37]/60'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates & Headcount */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-[#03140c] rounded-xl border border-[#d4af37]/20">
                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Check-In</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-[#051c11] border border-[#d4af37]/30 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Check-Out</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-[#051c11] border border-[#d4af37]/30 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Adults (12+ yrs)</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-[#051c11] border border-[#d4af37]/30 rounded-lg p-2 text-xs text-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} Adult{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Children (0-11 yrs)</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full bg-[#051c11] border border-[#d4af37]/30 rounded-lg p-2 text-xs text-white"
                  >
                    {[0, 1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {n} Child{n !== 1 ? 'ren' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Room Cards if Stay */}
              {bookingType === 'stay' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d6c28f] mb-3 font-medium">
                    Choose Your Riverfront Sanctuary ({nights} night{nights > 1 ? 's' : ''})
                  </label>
                  <div className="space-y-3">
                    {rooms.map((room) => {
                      const isSelected = selectedRoomId === room.id;
                      return (
                        <div
                          key={room.id}
                          onClick={() => setSelectedRoomId(room.id)}
                          className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                            isSelected
                              ? 'bg-[#093221] border-[#d4af37] shadow-gold'
                              : 'bg-[#03140c] border-[#d4af37]/25 hover:border-[#d4af37]/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={room.image}
                              alt={room.name}
                              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-[#d4af37]/30 shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-cinzel text-sm sm:text-base font-bold text-white">
                                  {room.name}
                                </h4>
                                <span className="text-[10px] bg-[#03140c] text-[#fcedc2] px-2 py-0.5 rounded border border-[#d4af37]/30">
                                  {room.view}
                                </span>
                              </div>
                              <p className="text-xs text-[#cad5cf] mt-1 line-clamp-1">
                                {room.tagline}
                              </p>
                              <div className="text-[11px] text-[#8ea89a] mt-1">
                                Balcony included · {room.bedType} · {room.sizeSqFt} sq.ft
                              </div>
                            </div>
                          </div>

                          <div className="sm:text-right shrink-0">
                            <div className="font-cinzel text-base sm:text-lg font-bold text-gold-gradient">
                              ₹{(room.pricePerNight * nights).toLocaleString('en-IN')}
                            </div>
                            <div className="text-[10px] text-[#8ea89a]">
                              ₹{room.pricePerNight.toLocaleString('en-IN')} / night
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Add-On Experiences */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-cinzel text-lg font-bold text-white mb-1">
                  Elevate Your Stay with Signature Experiences
                </h4>
                <p className="text-xs text-[#cad9d1]">
                  Add thrill passes, VIP dining tables, or airport transfers to your reservation with guaranteed schedule slots.
                </p>
              </div>

              <div className="space-y-3">
                {addonsList.map((addon) => {
                  const isChecked = Boolean(selectedAddons[addon.id]);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isChecked
                          ? 'bg-[#093221] border-[#d4af37] shadow-gold'
                          : 'bg-[#03140c] border-[#d4af37]/25 hover:border-[#d4af37]/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border ${
                            isChecked
                              ? 'bg-[#d4af37] border-[#d4af37] text-[#04160d]'
                              : 'border-[#d4af37]/40 bg-[#051c11]'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="text-[10px] text-[#d4af37] uppercase tracking-wider block font-semibold">
                            {addon.category}
                          </span>
                          <h5 className="font-cinzel text-sm font-bold text-white">
                            {addon.name}
                          </h5>
                          <p className="text-xs text-[#cad5cf] mt-0.5">
                            {addon.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-cinzel text-sm sm:text-base font-bold text-gold-gradient block">
                          +₹{addon.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Guest Info & Payment Details */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div>
                <h4 className="font-cinzel text-lg font-bold text-white mb-1">
                  Guest Information &amp; Preferences
                </h4>
                <p className="text-xs text-[#cad9d1]">
                  Your booking record will be permanently saved into the Dovaan Database and accessible anytime.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Lead Guest Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vikram Sengupta"
                    className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Email Address (for voucher) *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikram@example.com"
                    className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">Mobile Phone (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98301 XXXXX"
                    className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Kolkata / Delhi / Mumbai"
                    className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#d6c28f] mb-1">State</label>
                  <input
                    type="text"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    placeholder="West Bengal"
                    className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#d6c28f] mb-1">
                  Special Requests (River View Balcony / Honeymoon / Dietary)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Need quiet upper tower room, ground floor cottage, vegetarian breakfast, anniversary cake..."
                  className="w-full bg-[#03140c] border border-[#d4af37]/30 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Price Breakdown Card */}
              <div className="p-4 bg-[#03140c] rounded-xl border border-[#d4af37]/30 space-y-2 text-xs">
                <div className="flex justify-between text-[#cad5cf]">
                  <span>Base Accommodation / Experience ({nights} nights)</span>
                  <span>₹{baseAmount.toLocaleString('en-IN')}</span>
                </div>
                {addonsAmount > 0 && (
                  <div className="flex justify-between text-[#cad5cf]">
                    <span>Add-ons ({Object.keys(selectedAddons).length} selected)</span>
                    <span>₹{addonsAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#8ea89a]">
                  <span>Government Goods &amp; Services Tax (12% GST)</span>
                  <span>₹{taxes.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-[#d4af37]/20 flex justify-between font-cinzel text-base font-bold text-gold-gradient">
                  <span>Grand Total Payable</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gold-gradient text-[#04160d] font-bold text-sm py-3.5 rounded-lg shadow-gold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm &amp; Record in Dovaan Database</span>
              </button>
            </form>
          )}

          {/* STEP 4: Official Booking Pass / Voucher */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#0b3323] border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37] mb-3">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-[#fcedc2]">
                  Booking Confirmed &amp; Logged in Database!
                </h3>
                <p className="text-xs sm:text-sm text-[#cad9d1] mt-1">
                  We look forward to welcoming you to the sacred confluence of two rivers in Sikkim.
                </p>
              </div>

              {/* Official Voucher Card */}
              <div
                id="dovaan-voucher"
                className="bg-gradient-to-b from-[#021109] to-[#08281b] border-2 border-[#d4af37] rounded-2xl p-6 shadow-2xl relative overflow-hidden"
              >
                {/* Gold Watermark / Seal */}
                <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/aistudio/IMG-20261101-WA0003_6ab79521.jpg"
                      alt="Dovaan Logo"
                      className="w-14 h-14 rounded-lg object-cover border border-[#d4af37]/50"
                    />
                    <div>
                      <div className="font-cinzel text-lg font-bold text-gold-gradient">
                        DOVAAN RESORT · SIKKIM
                      </div>
                      <div className="text-[10px] text-[#cad5cf] uppercase tracking-wider">
                        Official Guest Reservation Voucher
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-[#8ea89a]">Database Reference ID</div>
                    <div className="font-mono text-base sm:text-lg font-bold text-[#fcedc2] tracking-wider">
                      {confirmedBooking.id}
                    </div>
                    <span className="inline-block bg-[#0b3323] border border-[#d4af37]/40 text-[#d4af37] text-[10px] px-2 py-0.5 rounded font-semibold mt-0.5">
                      Status: {confirmedBooking.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mb-4">
                  <div>
                    <span className="text-[#8ea89a] block">Primary Guest</span>
                    <span className="font-semibold text-white">{confirmedBooking.customer.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[#8ea89a] block">Check-In Date</span>
                    <span className="font-semibold text-[#fcedc2]">{confirmedBooking.checkInDate}</span>
                  </div>
                  <div>
                    <span className="text-[#8ea89a] block">Check-Out Date</span>
                    <span className="font-semibold text-[#fcedc2]">{confirmedBooking.checkOutDate}</span>
                  </div>
                  <div>
                    <span className="text-[#8ea89a] block">Duration</span>
                    <span className="font-semibold text-white">
                      {confirmedBooking.nights} Night{confirmedBooking.nights > 1 ? 's' : ''} ({confirmedBooking.guests.adults} Adults)
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#03140c] rounded-xl border border-[#d4af37]/20 text-xs mb-4">
                  <div className="font-semibold text-[#fcedc2] mb-1">
                    {confirmedBooking.roomName}
                  </div>
                  <div className="text-[#cad5cf] text-[11px]">
                    Includes private river-view balcony, riverside trail access, mountain breakfast, and Wi-Fi.
                  </div>
                  {confirmedBooking.addons.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-[#d4af37]/15">
                      <span className="text-[10px] text-[#8ea89a] block">Included Add-ons:</span>
                      {confirmedBooking.addons.map((add, i) => (
                        <span key={i} className="inline-block text-[#d6c28f] text-[11px] mr-3">
                          • {add.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-[#d4af37]/30 pt-3 text-xs">
                  <div>
                    <span className="text-[#8ea89a] block">Reservation Status</span>
                    <span className="font-medium text-[#fcedc2]">
                      Confirmed in Database (Pay at Check-In)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#8ea89a] block">Total Amount</span>
                    <span className="font-cinzel text-xl font-bold text-gold-gradient">
                      ₹{confirmedBooking.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Property Desk & Navigation Info */}
                <div className="mt-3 pt-3 border-t border-[#d4af37]/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#a3b8ad] gap-2">
                  <div>
                    <span className="text-[#fcedc2] font-semibold">Dovaan Resort:</span> Adam Pool, Ranipool, Sikkim · <a href="tel:+919883116936" className="text-[#d4af37] underline">+91 98831 16936</a>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Dovaan+Homestay+and+Resort+Adampool+Ranipool+Sikkim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d4af37] hover:underline"
                  >
                    Open Google Maps Directions →
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-lg bg-[#03140c] border border-[#d4af37]/50 text-[#fcedc2] hover:border-[#d4af37] text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#d4af37]" />
                  <span>Print Guest Voucher</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-gold-gradient text-[#04160d] text-xs font-bold shadow-gold cursor-pointer"
                >
                  Close &amp; Return to Website
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer (Steps 1 & 2) */}
        {step < 3 && (
          <div className="p-4 sm:p-6 bg-[#03140c] border-t border-[#d4af37]/25 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="px-4 py-2 text-xs text-[#d6c28f] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={() => setStep((s) => (s + 1) as any)}
              className="bg-gold-gradient text-[#04160d] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-gold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Step {step + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
