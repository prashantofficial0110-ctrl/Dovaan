export type PageTab =
  | 'home'
  | 'stay'
  | 'adventure'
  | 'dining'
  | 'events'
  | 'nightlife'
  | 'location'
  | 'booking'
  | 'lookup'
  | 'admin';

export interface Room {
  id: string;
  name: string;
  category: 'tower' | 'cottage';
  tagline: string;
  description: string;
  pricePerNight: number;
  originalPrice?: number;
  capacity: { adults: number; children: number };
  bedType: string;
  view: string;
  sizeSqFt: number;
  balcony: boolean;
  riverView: boolean;
  amenities: string[];
  features: string[];
  image: string;
  gallery: string[];
  totalUnits: number;
  availableUnits: number;
}

export interface Experience {
  id: string;
  title: string;
  category: 'adventure' | 'dining' | 'nightlife' | 'events';
  subtitle: string;
  description: string;
  highlight: string;
  price: number;
  priceUnit: string;
  duration: string;
  timing: string;
  minAge?: number;
  safetyBrief?: string;
  image: string;
  included: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'local-sikkim' | 'seafood' | 'international' | 'beverage' | 'dessert';
  description: string;
  price: number;
  isChefSpecial?: boolean;
  isVeg?: boolean;
  isSeafood?: boolean;
  spiceLevel?: 'Mild' | 'Medium' | 'Signature Hot';
  image?: string;
}

export interface BookingAddon {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  selected?: boolean;
  qty?: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  specialRequests?: string;
}

export interface Booking {
  id: string; // e.g. DVN-2026-7842
  createdAt: string;
  customer: CustomerDetails;
  bookingType: 'stay' | 'adventure' | 'skydining' | 'event';
  roomId?: string;
  roomName?: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
  };
  addons: {
    id: string;
    name: string;
    price: number;
    qty: number;
  }[];
  baseAmount: number;
  addonsAmount: number;
  taxes: number; // 12% GST
  totalAmount: number;
  status: 'confirmed' | 'checked-in' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'pay_at_resort' | 'advance_paid';
  paymentMethod: 'upi' | 'card' | 'net_banking' | 'pay_on_arrival';
  cancellationReason?: string;
  notes?: string;
}

export interface EventInquiry {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: 'wedding' | 'corporate' | 'celebration' | 'photoshoot';
  preferredVenue: 'grand-banquet' | 'open-air-lawn' | 'exclusive-garden' | 'wedding-in-water' | 'conference-hall' | 'all-inclusive';
  tentativeDate: string;
  estimatedGuests: number;
  budgetRange: string;
  message: string;
  status: 'new' | 'contacted' | 'booked' | 'archived';
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  review: string;
  stayedAt: string;
  verifiedBooking: boolean;
}

export interface StaffAccount {
  id: string;
  loginId: string;
  fullName: string;
  role: 'superadmin' | 'manager' | 'frontdesk' | 'event_coordinator';
  passwordHash: string; // password stored for local auth validation
  lastLogin?: string;
  createdAt: string;
}

export interface ResortRates {
  rooms: {
    [roomId: string]: {
      pricePerNight: number;
      originalPrice?: number;
    };
  };
  experiences: {
    [experienceId: string]: {
      price: number;
    };
  };
  addons: {
    [addonId: string]: {
      price: number;
    };
  };
  menuItems: {
    [dishId: string]: {
      price: number;
    };
  };
  taxPercentage: number;
  lastUpdated?: string;
  updatedBy?: string;
}

