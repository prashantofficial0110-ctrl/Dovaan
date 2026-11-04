/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageTab, Booking } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { StaySection } from './components/StaySection';
import { AdventureSection } from './components/AdventureSection';
import { DiningSection } from './components/DiningSection';
import { EventsSection } from './components/EventsSection';
import { NightlifeSection } from './components/NightlifeSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationMapSection } from './components/LocationMapSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { LookupModal } from './components/LookupModal';
import { AdminDatabaseModal } from './components/AdminDatabaseModal';
import {
  Calendar,
  Search,
  LogIn,
  Phone,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    roomId?: string;
    bookingType?: 'stay' | 'adventure' | 'skydining' | 'event';
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }>({});
  const [notification, setNotification] = useState<string | null>(null);

  const handleOpenBooking = (prefillData?: {
    roomId?: string;
    bookingType?: 'stay' | 'adventure' | 'skydining' | 'event';
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }) => {
    if (prefillData) {
      setBookingPrefill(prefillData);
    } else {
      setBookingPrefill({});
    }
    setIsBookingOpen(true);
  };

  const handleBookingCreated = (booking: Booking) => {
    setNotification(`Reservation ${booking.id} created and confirmed successfully!`);
    setTimeout(() => {
      setNotification(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-fade-green text-[#eef4f1] flex flex-col selection:bg-[#d4af37] selection:text-[#04160d]">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-4 z-50 bg-[#062117] border-2 border-[#d4af37] text-[#fcedc2] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle className="w-5 h-5 text-[#d4af37]" />
          <span className="text-xs sm:text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
        onOpenLookup={() => setIsLookupOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              onOpenBooking={handleOpenBooking}
              setActiveTab={setActiveTab}
            />
            <AboutSection
              onExploreServices={() => setActiveTab('stay')}
              onOpenBooking={() => handleOpenBooking()}
            />
            <StaySection
              onSelectRoomForBooking={(roomId) =>
                handleOpenBooking({ roomId, bookingType: 'stay' })
              }
            />
            <AdventureSection
              onBookExperience={(category) =>
                handleOpenBooking({ bookingType: category })
              }
            />
            <DiningSection
              onReserveSkyDining={() =>
                handleOpenBooking({ bookingType: 'skydining' })
              }
            />
            <EventsSection />
            <NightlifeSection
              onBookNightlife={() =>
                handleOpenBooking({ bookingType: 'adventure' })
              }
            />
            <ReviewsSection />
            <LocationMapSection />
          </>
        )}

        {activeTab === 'stay' && (
          <div className="py-6">
            <StaySection
              onSelectRoomForBooking={(roomId) =>
                handleOpenBooking({ roomId, bookingType: 'stay' })
              }
            />
            <ReviewsSection />
          </div>
        )}

        {activeTab === 'adventure' && (
          <div className="py-6">
            <AdventureSection
              onBookExperience={(category) =>
                handleOpenBooking({ bookingType: category })
              }
            />
            <NightlifeSection
              onBookNightlife={() =>
                handleOpenBooking({ bookingType: 'adventure' })
              }
            />
          </div>
        )}

        {activeTab === 'dining' && (
          <div className="py-6">
            <DiningSection
              onReserveSkyDining={() =>
                handleOpenBooking({ bookingType: 'skydining' })
              }
            />
          </div>
        )}

        {activeTab === 'events' && (
          <div className="py-6">
            <EventsSection />
          </div>
        )}

        {activeTab === 'nightlife' && (
          <div className="py-6">
            <NightlifeSection
              onBookNightlife={() =>
                handleOpenBooking({ bookingType: 'adventure' })
              }
            />
          </div>
        )}

        {activeTab === 'location' && (
          <div className="py-6">
            <LocationMapSection />
          </div>
        )}
      </main>

      {/* Floating Action Quick Access */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="bg-[#03140c] border border-[#d4af37]/60 text-[#fcedc2] hover:border-[#d4af37] px-3.5 py-2 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          title="Staff & Management Sign In"
        >
          <LogIn className="w-4 h-4 text-[#d4af37]" />
          <span className="hidden sm:inline">Sign In / Login</span>
        </button>

        <button
          onClick={() => handleOpenBooking()}
          className="bg-gold-gradient text-[#04160d] font-cinzel font-bold text-xs sm:text-sm px-5 py-3 rounded-full shadow-gold hover:shadow-gold-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Now</span>
        </button>
      </div>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
        onOpenLookup={() => setIsLookupOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Booking System Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefill={bookingPrefill}
        onBookingCreated={handleBookingCreated}
      />

      {/* Lookup Reservation Modal */}
      <LookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
      />

      {/* Database Management Console Modal */}
      <AdminDatabaseModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
