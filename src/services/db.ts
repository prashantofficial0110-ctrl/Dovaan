import { Booking, Room, Experience, MenuItem, BookingAddon, EventInquiry, Review, StaffAccount, ResortRates } from '../types';

const STORAGE_KEYS = {
  BOOKINGS: 'dovaan_resort_bookings_v1',
  ROOMS: 'dovaan_resort_rooms_v1',
  INQUIRIES: 'dovaan_resort_inquiries_v1',
  STAFF: 'dovaan_resort_staff_v1',
  SESSION: 'dovaan_resort_session_v1',
  RATES: 'dovaan_resort_rates_v1',
};

export const DEFAULT_RATES: ResortRates = {
  rooms: {
    'room-tower-deluxe': { pricePerNight: 7499, originalPrice: 9499 },
    'room-tower-family': { pricePerNight: 11999, originalPrice: 14500 },
    'room-luxury-cottage': { pricePerNight: 8999, originalPrice: 10999 },
  },
  experiences: {
    'exp-sikkim-swing': { price: 1499 },
    'exp-sky-walk': { price: 799 },
    'exp-sky-dining': { price: 3499 },
    'exp-hanging-bridge': { price: 299 },
    'exp-bbq-karaoke': { price: 1299 },
  },
  addons: {
    'addon-swing': { price: 1499 },
    'addon-skydining': { price: 6998 },
    'addon-bbq-night': { price: 1299 },
    'addon-airport-transfer': { price: 3499 },
  },
  menuItems: {
    'dish-1': { price: 490 },
    'dish-2': { price: 850 },
    'dish-3': { price: 1100 },
    'dish-4': { price: 520 },
    'dish-5': { price: 680 },
    'dish-6': { price: 790 },
    'dish-7': { price: 360 },
    'dish-8': { price: 320 },
  },
  taxPercentage: 12,
  lastUpdated: '2026-11-01T00:00:00Z',
  updatedBy: 'Resort Owner',
};


export const INITIAL_STAFF_ACCOUNTS: StaffAccount[] = [
  {
    id: 'staff-admin-01',
    loginId: 'admin',
    fullName: 'Resort Administrator',
    role: 'superadmin',
    passwordHash: 'admin',
    lastLogin: '2026-11-02T04:30:00Z',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'staff-dovaan-02',
    loginId: 'dovaan',
    fullName: 'Dovaan Manager',
    role: 'manager',
    passwordHash: 'dovaan123',
    lastLogin: '2026-11-01T18:15:00Z',
    createdAt: '2026-02-15T00:00:00Z',
  },
  {
    id: 'staff-desk-03',
    loginId: 'frontdesk',
    fullName: 'Front Desk Concierge',
    role: 'frontdesk',
    passwordHash: '123456',
    lastLogin: '2026-10-30T11:00:00Z',
    createdAt: '2026-03-01T00:00:00Z',
  },
];

// Initial Room Inventory with Sikkim River & Mountain Views
export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-tower-deluxe',
    name: 'Sikkim Confluence Tower Suite',
    category: 'tower',
    tagline: 'Elevated luxury overlooking the meeting point of two sacred rivers',
    description:
      'Perched in our signature architectural tower, this master suite boasts expansive floor-to-ceiling glass, a handcrafted teakwood private balcony, and an unobstructed 270-degree vista of the two merging rivers rushing through the valley.',
    pricePerNight: 7499,
    originalPrice: 9499,
    capacity: { adults: 2, children: 1 },
    bedType: '1 King Bed with Luxury Ortho Mattress',
    view: 'Panoramic River Confluence & Misty Mountains',
    sizeSqFt: 580,
    balcony: true,
    riverView: true,
    amenities: [
      'Private River-Facing Balcony',
      'Complimentary High-Altitude Breakfast',
      'Free Access to Nature Trails & Riverside Observation Decks',
      'En-Suite Jacuzzi with Mountain View',
      'Fast Optical Fiber Wi-Fi',
      'Premium Tea & Sikkim Handpicked Coffee Station',
      'Smart 55" TV & Bose Bluetooth Speaker',
      '24/7 Room Service & Concierge',
    ],
    features: ['Soundproof Windows', 'River Breeze Deck', 'Artisanal Wooden Interiors', 'Heated Blanket'],
    image: '/assets/rooms/balcony_river_suite.jpg',
    gallery: [
      '/assets/rooms/balcony_river_suite.jpg',
      '/assets/aistudio/IMG-20261101-WA0011_92ba4db1.jpg',
      '/assets/hero/hero_top_banner.jpg',
    ],
    totalUnits: 8,
    availableUnits: 5,
  },
  {
    id: 'room-tower-family',
    name: 'Grand Tower Duplex Penthouse',
    category: 'tower',
    tagline: 'Two-tier vantage point for families seeking ultimate Himalayan grandeur',
    description:
      'An opulent dual-level tower penthouse featuring dual balconies on both levels, two luxury bedrooms, and a sweeping panoramic deck directly above the hanging bridge and river confluence.',
    pricePerNight: 11999,
    originalPrice: 14500,
    capacity: { adults: 4, children: 2 },
    bedType: '2 King Beds + Living Daybed',
    view: 'Dual River Confluence & Alpine Valley',
    sizeSqFt: 860,
    balcony: true,
    riverView: true,
    amenities: [
      'Dual River-View Balconies',
      'Complimentary Evening Bonfire & Riverside Gathering',
      'Personal Butler Assistance',
      'Gourmet Himalayan Breakfast Included',
      'Private Dining Bar & Mini Bar',
      'Luxury Rain Showers & Double Vanity',
      'Exclusive Priority Sky Dining Reservation',
    ],
    features: ['Upper Observation Loft', 'Family Lounge', 'Fireplace Ambiance', 'In-room Dining Table'],
    image: '/assets/rooms/grand_tower_penthouse.jpg',
    gallery: [
      '/assets/rooms/grand_tower_penthouse.jpg',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
    ],
    totalUnits: 4,
    availableUnits: 3,
  },
  {
    id: 'room-luxury-cottage',
    name: 'Dovaan Heritage River Cottage',
    category: 'cottage',
    tagline: 'Private wooden sanctuary tucked alongside the murmuring riverbank',
    description:
      'Built with sustainable cedar and local Sikkim river-stone, each standalone cottage offers serene seclusion. Step right onto your extended wooden balcony to feel the crisp river spray and hear the hypnotic rhythm of the confluence.',
    pricePerNight: 8999,
    originalPrice: 10999,
    capacity: { adults: 2, children: 2 },
    bedType: '1 Four-Poster King Bed',
    view: 'Direct Riverfront & Lush Pine Forest',
    sizeSqFt: 640,
    balcony: true,
    riverView: true,
    amenities: [
      'Direct Riverside Wooden Sun Deck',
      'Complimentary Evening Bonfire & Marshmallow Setup',
      'Priority Sikkim Swing & Sky Walk Passes for all guests',
      'Handcrafted Bath Amenities & Plush Robes',
      'Deep Soaking Riverstone Tub',
      'Organic Sikkim Tea Bar',
      'Daily Sunset Hi-Tea Platter on your balcony',
    ],
    features: ['Independent Privacy', 'Direct River Trail Access', 'Starlit Skylight', 'High Ceiling'],
    image: '/assets/rooms/dovaan_cottage_night.jpg',
    gallery: [
      '/assets/rooms/dovaan_cottage_night.jpg',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
    ],
    totalUnits: 6,
    availableUnits: 4,
  },
];

// Rich Experiences Catalogue
export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-sikkim-swing',
    title: 'The Legendary Sikkim Swing',
    category: 'adventure',
    subtitle: 'The thrill of soaring over the canyon and meeting rivers',
    description:
      'Fly into the crisp Himalayan air! Suspended on high-tensile alpine safety rigging above the valley, the Sikkim Swing launches you into a heart-racing arc directly over the roaring confluence of two crystal-clear rivers.',
    highlight: 'Highest Canyon River Swing in Sikkim',
    price: 1499,
    priceUnit: 'per tandem / solo flight',
    duration: '45 mins session',
    timing: '09:00 AM - 05:30 PM Daily',
    minAge: 12,
    safetyBrief: 'Certified European PETZL harnesses, triple-locking carabiners & certified master instructors.',
    image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=1000&q=80',
    included: ['Safety gear & helmet', 'GoPro HD flight video capture', 'Certificate of Thrill', 'Warm Sikkim herbal tea'],
  },
  {
    id: 'exp-sky-walk',
    title: 'Himalayan Sky Walk',
    category: 'adventure',
    subtitle: 'Glass bridge floating hundreds of feet above the river gorge',
    description:
      'Walk on pure air across our ultra-clear reinforced structural glass deck. Peer straight down through your feet into the sparkling emerald waters where two mountain rivers converge.',
    highlight: '360° Panorama of Snow-dusted Ridges & Waterfalls',
    price: 799,
    priceUnit: 'per guest',
    duration: '60 mins',
    timing: '08:00 AM - 06:00 PM',
    minAge: 5,
    safetyBrief: 'Slip-resistant protective shoe covers provided. Monitored wind speed sensors.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    included: ['Sky Walk Access Pass', 'Souvenir Photo Print', 'Complimentary Binoculars access'],
  },
  {
    id: 'exp-sky-dining',
    title: 'Breathtaking Sky Dining',
    category: 'dining',
    subtitle: 'An unprecedented gourmet dining experience suspended over the confluence',
    description:
      'Dine among the clouds! Our suspended open-air luxury table hovers dramatically in the sky, serving a 5-course chef curated feast as cool mountain breezes and river echoes surround your table.',
    highlight: 'Fine Dining in the Sky with Candlelight & River Echoes',
    price: 3499,
    priceUnit: 'per guest (5-Course Menu)',
    duration: '90 mins',
    timing: 'Sunset Session (05:00 PM) & Starlight Session (07:30 PM)',
    minAge: 10,
    safetyBrief: 'Engineered hydraulic lifting platform with individual 5-point aeronautical seatbelts.',
    image: '/assets/experiences/sky_dining_candlelight.jpg',
    included: ['5-Course Gourmet Tasting Menu', 'Welcome Sparkling Drink', 'Live Acoustic Violinist', 'Commemorative Glassware'],
  },
  {
    id: 'exp-hanging-bridge',
    title: 'The Whispering Hanging Bridge',
    category: 'adventure',
    subtitle: 'Swaying suspension bridge connecting the two river shores',
    description:
      'Traverse our photogenic hanging suspension bridge hung across the roaring rapids. Adorned with traditional colorful prayer flags, it is the premier spot for morning strolls and Instagram-worthy golden hour photography.',
    highlight: 'Connects the Homestay Grounds to Secluded Forest Trails',
    price: 299,
    priceUnit: 'Complimentary for resident guests',
    duration: 'Open all day',
    timing: '06:00 AM - 09:00 PM',
    safetyBrief: 'High tensile steel cables with enclosed safety mesh.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    included: ['Bridge crossing access', 'Access to riverside pebble beach and meditation stones'],
  },
  {
    id: 'exp-bbq-karaoke',
    title: 'Riverside Barbecue & Karaoke Nights',
    category: 'nightlife',
    subtitle: 'Sizzling skewers, warm campfires, and lively singing under the stars',
    description:
      'As dusk blankets Sikkim, the riverbanks come alive with fragrant smoke from live barbecue grills, crackling log campfires, hot spiced rum, and a high-energy karaoke lounge where stories and songs unfold.',
    highlight: 'Unlimited Gourmet Barbecue & Open Mic Fun',
    price: 1299,
    priceUnit: 'per guest',
    duration: '3 hours',
    timing: '07:00 PM - 10:30 PM Nightly',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    included: ['Choice of marinated meats, fresh fish & charred veggies', 'Karaoke mic & song queue', 'Campfire seating'],
  },
];

// Curated Multi-Cuisine Menu Items
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dish-1',
    name: 'Sikkimese Traditional Thukpa & Momos Platter',
    category: 'local-sikkim',
    description: 'Steaming handmade organic broth infused with mountain herbs, served alongside pan-seared river trout momos and fiery Dalle Khursani chili dip.',
    price: 490,
    isChefSpecial: true,
    spiceLevel: 'Signature Hot',
  },
  {
    id: 'dish-2',
    name: 'Chef Special - Roasted Crab Delicacy',
    category: 'seafood',
    description: 'Dovaan’s signature culinary masterpiece: succulent whole crab wok-tossed in roasted mountain spices, fresh garden herbs, and savory garlic-chili glaze, served on an artisan black platter.',
    price: 850,
    isChefSpecial: true,
    isSeafood: true,
    spiceLevel: 'Signature Hot',
    image: '/assets/food/chef_special.jpg',
  },
  {
    id: 'dish-3',
    name: 'Char-Grilled Jumbo Tiger Prawns in Lemon Butter',
    category: 'seafood',
    description: 'Exquisite fresh seafood prepared with smoked paprika, crushed peppercorns, and fresh citrus reduction from Sikkim orchards.',
    price: 1100,
    isChefSpecial: true,
    isSeafood: true,
    spiceLevel: 'Medium',
    image: '/assets/food/tiger_prawns.jpg',
  },
  {
    id: 'dish-4',
    name: 'Sikkim Bamboo Shoot & Pork/Paneer Curry (Gundruk Melange)',
    category: 'local-sikkim',
    description: 'Heritage tribal recipe slowly simmered in clay pots with fermented mustard greens, aromatic ginger, and wild mountain peppercorns.',
    price: 520,
    isChefSpecial: true,
    spiceLevel: 'Medium',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dish-5',
    name: 'Tuscan Truffle Wood-Fired Pizza',
    category: 'international',
    description: 'Fresh buffalo mozzarella, wild mountain mushrooms, and white truffle oil baked in our stone wood-fired oven.',
    price: 680,
    isVeg: true,
    spiceLevel: 'Mild',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dish-6',
    name: 'Pan-Asian Chilli Wok-Tossed Calamari & Squid',
    category: 'seafood',
    description: 'Tender squid tossed with scallions, bell peppers, fresh garlic, and spicy scallion sambal.',
    price: 790,
    isSeafood: true,
    spiceLevel: 'Signature Hot',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dish-7',
    name: 'Chhurpi Sweet Tart with Wild Himalayan Berry Coulis',
    category: 'dessert',
    description: 'Rich artisanal cheese tart crafted from high-pasture yak dairy, paired with tart wild berries harvested from nearby Sikkim hills.',
    price: 360,
    isChefSpecial: true,
    spiceLevel: 'Mild',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dish-8',
    name: 'Dovaan Golden Confluence Signature Mocktail',
    category: 'beverage',
    description: 'Fresh passionfruit, lemongrass infusion, sparkling mountain spring water, and edible 24k gold leaf flakes.',
    price: 320,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
  },
];

// Add-ons for booking wizard
export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: 'addon-swing',
    name: 'Sikkim Swing Canyon Thrill Pass',
    category: 'Adventure',
    price: 1499,
    description: 'High-altitude river swing flight including GoPro HD recording video.',
  },
  {
    id: 'addon-skydining',
    name: 'Sky Dining Table for Two (Sunset Slot)',
    category: 'Dining',
    price: 6998,
    description: 'Suspended dining 5-course menu over the river with sparkling toast.',
  },
  {
    id: 'addon-bbq-night',
    name: 'Riverside Barbecue & Karaoke Night Access',
    category: 'Nightlife',
    price: 1299,
    description: 'Live grill skewers, camp fire lounge, and karaoke entry.',
  },
  {
    id: 'addon-airport-transfer',
    name: 'Pakyong / Bagdogra Airport Luxury 4x4 Transfer',
    category: 'Transport',
    price: 3499,
    description: 'Private chauffeur SUV pickup or drop directly to Dovaan Resort gate.',
  },
];

// Realistic seeded bookings in the database
const SEED_BOOKINGS: Booking[] = [
  {
    id: 'DVN-2026-8942',
    createdAt: '2026-11-01T10:30:00Z',
    customer: {
      fullName: 'Vikram & Ananya Sengupta',
      email: 'vikram.sengupta@kolkata.in',
      phone: '+91 98301 22841',
      city: 'Kolkata',
      state: 'West Bengal',
      specialRequests: 'Balcony with direct sunrise view and anniversary flower arrangement.',
    },
    bookingType: 'stay',
    roomId: 'room-tower-deluxe',
    roomName: 'Sikkim Confluence Tower Suite',
    checkInDate: '2026-11-10',
    checkOutDate: '2026-11-13',
    nights: 3,
    guests: { adults: 2, children: 0 },
    addons: [
      { id: 'addon-swing', name: 'Sikkim Swing Canyon Thrill Pass', price: 1499, qty: 2 },
      { id: 'addon-bbq-night', name: 'Riverside Barbecue & Karaoke Night Access', price: 1299, qty: 2 },
    ],
    baseAmount: 22497,
    addonsAmount: 5596,
    taxes: 3371,
    totalAmount: 31464,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'upi',
    notes: 'Anniversary celebration package.',
  },
  {
    id: 'DVN-2026-6190',
    createdAt: '2026-10-29T14:15:00Z',
    customer: {
      fullName: 'Rahul & Neha Sharma',
      email: 'rahul.sharma@techcorp.com',
      phone: '+91 98112 45890',
      city: 'Gurugram',
      state: 'Haryana',
      specialRequests: 'Need vegetarian preparation for breakfast.',
    },
    bookingType: 'stay',
    roomId: 'room-luxury-cottage',
    roomName: 'Dovaan Heritage River Cottage',
    checkInDate: '2026-11-03',
    checkOutDate: '2026-11-06',
    nights: 3,
    guests: { adults: 2, children: 1 },
    addons: [
      { id: 'addon-bbq-night', name: 'Riverside Barbecue & Karaoke Night Access', price: 1299, qty: 2 },
      { id: 'addon-airport-transfer', name: 'Pakyong / Bagdogra Airport Luxury 4x4 Transfer', price: 3499, qty: 1 },
    ],
    baseAmount: 26997,
    addonsAmount: 6097,
    taxes: 3971,
    totalAmount: 37065,
    status: 'checked-in',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    notes: 'Guests checked in today at Cottage 02.',
  },
  {
    id: 'DVN-2026-3371',
    createdAt: '2026-10-25T09:00:00Z',
    customer: {
      fullName: 'Tenzing & Pema Dorjee',
      email: 'dorjee.family@gangtok.net',
      phone: '+91 94340 88219',
      city: 'Gangtok',
      state: 'Sikkim',
      specialRequests: 'Elderly guest in party; ground level river cottage preferred.',
    },
    bookingType: 'stay',
    roomId: 'room-tower-family',
    roomName: 'Grand Tower Duplex Penthouse',
    checkInDate: '2026-11-18',
    checkOutDate: '2026-11-20',
    nights: 2,
    guests: { adults: 4, children: 2 },
    addons: [
      { id: 'addon-skydining', name: 'Sky Dining Table for Two (Sunset Slot)', price: 6998, qty: 1 },
    ],
    baseAmount: 23998,
    addonsAmount: 6998,
    taxes: 3719,
    totalAmount: 34715,
    status: 'confirmed',
    paymentStatus: 'advance_paid',
    paymentMethod: 'net_banking',
    notes: 'Advance 50% paid online. Remaining at check-in.',
  },
];

// Seeded inquiries for events
const SEED_INQUIRIES: EventInquiry[] = [
  {
    id: 'INQ-882',
    createdAt: '2026-11-01T16:00:00Z',
    fullName: 'Pooja Agarwal',
    email: 'events@agarwalgroup.in',
    phone: '+91 97482 11993',
    eventType: 'wedding',
    preferredVenue: 'open-air-lawn',
    tentativeDate: '2026-12-14',
    estimatedGuests: 250,
    budgetRange: '₹12,00,000 - ₹18,00,000',
    message: 'Planning 3-day destination wedding with Sangeet at Grand Banquet and Varmala at Open Air Riverside Lawn.',
    status: 'new',
  },
  {
    id: 'INQ-719',
    createdAt: '2026-10-28T11:20:00Z',
    fullName: 'David Mitchell',
    email: 'dmitchell@greenadventure.org',
    phone: '+91 99201 55432',
    eventType: 'corporate',
    preferredVenue: 'conference-hall',
    tentativeDate: '2026-11-25',
    estimatedGuests: 45,
    budgetRange: '₹4,00,000 - ₹6,00,000',
    message: 'Annual eco-leadership summit requiring AV conference hall and team building at Sikkim Swing & Sky Walk.',
    status: 'contacted',
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sonam Gyatso',
    location: 'Darjeeling',
    rating: 5,
    date: 'October 2026',
    review:
      'Dovaan is heavenly! The name truly fits—you see two glistening mountain rivers collide right beneath your room balcony. The Sikkim Swing was an adrenaline rush of a lifetime, and the fresh river trout at the multi-cuisine restaurant was cooked to perfection.',
    stayedAt: 'Sikkim Confluence Tower Suite',
    verifiedBooking: true,
  },
  {
    id: 'rev-2',
    author: 'Priyanka & Karan Mehra',
    location: 'Mumbai',
    rating: 5,
    date: 'October 2026',
    review:
      'The Sky Dining was surreal. Dining suspended hundreds of feet above the river during sunset with live violin music was magical. The Sikkim Swing and panoramic sky walks kept our kids thrilled all day. Staff hospitality is heartwarming.',
    stayedAt: 'Dovaan Heritage River Cottage',
    verifiedBooking: true,
  },
  {
    id: 'rev-3',
    author: 'Arindam Chatterjee',
    location: 'Kolkata',
    rating: 5,
    date: 'September 2026',
    review:
      'We hosted our corporate leadership retreat at the Grand Banquet and Conference Hall. Seamless tech setup, majestic mountain views, and the evening BBQ with karaoke by the river was the best team experience we have had.',
    stayedAt: 'Grand Tower Duplex Penthouse',
    verifiedBooking: true,
  },
];

// Dedicated Database Management Service
export class DovaanDatabase {
  private static load<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return defaultValue;
  }

  private static save<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to database store', e);
    }
  }

  // Bookings CRUD
  static getAllBookings(): Booking[] {
    return this.load<Booking[]>(STORAGE_KEYS.BOOKINGS, SEED_BOOKINGS);
  }

  static getBookingById(id: string): Booking | undefined {
    const list = this.getAllBookings();
    return list.find((b) => b.id.trim().toUpperCase() === id.trim().toUpperCase());
  }

  static getBookingsByEmail(email: string): Booking[] {
    const list = this.getAllBookings();
    return list.filter((b) => b.customer.email.toLowerCase() === email.trim().toLowerCase());
  }

  static createBooking(bookingData: Omit<Booking, 'id' | 'createdAt'>): Booking {
    const list = this.getAllBookings();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newId = `DVN-2026-${randomCode}`;
    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    // Prepend new booking
    const updated = [newBooking, ...list];
    this.save(STORAGE_KEYS.BOOKINGS, updated);
    return newBooking;
  }

  static updateBookingStatus(id: string, status: Booking['status']): boolean {
    const list = this.getAllBookings();
    const index = list.findIndex((b) => b.id === id);
    if (index !== -1) {
      list[index].status = status;
      this.save(STORAGE_KEYS.BOOKINGS, list);
      return true;
    }
    return false;
  }

  static cancelBooking(id: string, reason?: string): boolean {
    const list = this.getAllBookings();
    const index = list.findIndex((b) => b.id === id);
    if (index !== -1) {
      list[index].status = 'cancelled';
      list[index].cancellationReason = reason || 'Cancelled by guest request.';
      this.save(STORAGE_KEYS.BOOKINGS, list);
      return true;
    }
    return false;
  }

  static deleteBooking(id: string): boolean {
    const list = this.getAllBookings();
    const filtered = list.filter((b) => b.id !== id);
    if (filtered.length !== list.length) {
      this.save(STORAGE_KEYS.BOOKINGS, filtered);
      return true;
    }
    return false;
  }

  // Inquiries CRUD
  static getAllInquiries(): EventInquiry[] {
    return this.load<EventInquiry[]>(STORAGE_KEYS.INQUIRIES, SEED_INQUIRIES);
  }

  static createInquiry(data: Omit<EventInquiry, 'id' | 'createdAt' | 'status'>): EventInquiry {
    const list = this.getAllInquiries();
    const newId = `INQ-${Math.floor(100 + Math.random() * 900)}`;
    const newInquiry: EventInquiry = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    const updated = [newInquiry, ...list];
    this.save(STORAGE_KEYS.INQUIRIES, updated);
    return newInquiry;
  }

  static updateInquiryStatus(id: string, status: EventInquiry['status']): void {
    const list = this.getAllInquiries();
    const index = list.findIndex((i) => i.id === id);
    if (index !== -1) {
      list[index].status = status;
      this.save(STORAGE_KEYS.INQUIRIES, list);
    }
  }

  static deleteInquiry(id: string): boolean {
    const list = this.getAllInquiries();
    const filtered = list.filter((i) => i.id !== id);
    if (filtered.length !== list.length) {
      this.save(STORAGE_KEYS.INQUIRIES, filtered);
      return true;
    }
    return false;
  }

  // Rates & Tariffs Management (Changeable by Owner)
  static getRates(): ResortRates {
    const stored = this.load<ResortRates | null>(STORAGE_KEYS.RATES, null);
    if (!stored) {
      return DEFAULT_RATES;
    }
    return {
      rooms: { ...DEFAULT_RATES.rooms, ...(stored.rooms || {}) },
      experiences: { ...DEFAULT_RATES.experiences, ...(stored.experiences || {}) },
      addons: { ...DEFAULT_RATES.addons, ...(stored.addons || {}) },
      menuItems: { ...DEFAULT_RATES.menuItems, ...(stored.menuItems || {}) },
      taxPercentage: typeof stored.taxPercentage === 'number' ? stored.taxPercentage : DEFAULT_RATES.taxPercentage,
      lastUpdated: stored.lastUpdated || DEFAULT_RATES.lastUpdated,
      updatedBy: stored.updatedBy || DEFAULT_RATES.updatedBy,
    };
  }

  static updateRates(newRates: ResortRates, updatedByStaffName: string = 'Resort Owner'): ResortRates {
    const payload: ResortRates = {
      ...newRates,
      lastUpdated: new Date().toISOString(),
      updatedBy: updatedByStaffName,
    };
    this.save(STORAGE_KEYS.RATES, payload);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('dovaan_rates_updated', { detail: payload }));
    }
    return payload;
  }

  static resetRates(): ResortRates {
    this.save(STORAGE_KEYS.RATES, DEFAULT_RATES);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('dovaan_rates_updated', { detail: DEFAULT_RATES }));
    }
    return DEFAULT_RATES;
  }

  static getTaxPercentage(): number {
    return this.getRates().taxPercentage;
  }

  // Room Inventory (Synced with dynamic rates)
  static getAllRooms(): Room[] {
    const rates = this.getRates();
    return INITIAL_ROOMS.map((room) => {
      const roomRate = rates.rooms[room.id];
      if (roomRate) {
        return {
          ...room,
          pricePerNight: roomRate.pricePerNight,
          originalPrice: roomRate.originalPrice ?? room.originalPrice,
        };
      }
      return room;
    });
  }

  static getRoomById(id: string): Room | undefined {
    return this.getAllRooms().find((r) => r.id === id);
  }

  // Experiences (Synced with dynamic rates)
  static getAllExperiences(): Experience[] {
    const rates = this.getRates();
    return EXPERIENCES.map((exp) => {
      const expRate = rates.experiences[exp.id];
      if (expRate) {
        return {
          ...exp,
          price: expRate.price,
        };
      }
      return exp;
    });
  }

  // Addons (Synced with dynamic rates)
  static getAllAddons(): BookingAddon[] {
    const rates = this.getRates();
    return BOOKING_ADDONS.map((addon) => {
      const addonRate = rates.addons[addon.id];
      if (addonRate) {
        return {
          ...addon,
          price: addonRate.price,
        };
      }
      return addon;
    });
  }

  // Menu Items (Synced with dynamic rates)
  static getAllMenuItems(): MenuItem[] {
    const rates = this.getRates();
    return MENU_ITEMS.map((item) => {
      const itemRate = rates.menuItems[item.id];
      if (itemRate) {
        return {
          ...item,
          price: itemRate.price,
        };
      }
      return item;
    });
  }


  // Database Analytics
  static getStats() {
    const bookings = this.getAllBookings();
    const activeBookings = bookings.filter((b) => b.status === 'confirmed' || b.status === 'checked-in');
    const totalRevenue = bookings
      .filter((b) => b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.totalAmount, 0);
    const checkedInGuests = bookings
      .filter((b) => b.status === 'checked-in')
      .reduce((sum, b) => sum + (b.guests.adults + b.guests.children), 0);
    const inquiries = this.getAllInquiries();

    return {
      totalBookings: bookings.length,
      activeBookingsCount: activeBookings.length,
      totalRevenue,
      checkedInGuests,
      pendingInquiries: inquiries.filter((i) => i.status === 'new').length,
      occupancyRate: Math.min(94, Math.round((activeBookings.length / 15) * 100)),
    };
  }

  // Export Database
  static exportBookingsJSON(): string {
    return JSON.stringify(this.getAllBookings(), null, 2);
  }

  static exportBookingsCSV(): string {
    const bookings = this.getAllBookings();
    const headers = ['Booking ID', 'Date', 'Customer Name', 'Email', 'Phone', 'Room / Type', 'Check-In', 'Check-Out', 'Total (INR)', 'Status'];
    const rows = bookings.map((b) => [
      b.id,
      b.createdAt.slice(0, 10),
      `"${b.customer.fullName.replace(/"/g, '""')}"`,
      b.customer.email,
      b.customer.phone,
      `"${(b.roomName || b.bookingType).replace(/"/g, '""')}"`,
      b.checkInDate,
      b.checkOutDate,
      b.totalAmount,
      b.status,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }

  // Reset to seed data
  static resetToSeedData(): void {
    this.save(STORAGE_KEYS.BOOKINGS, SEED_BOOKINGS);
    this.save(STORAGE_KEYS.ROOMS, INITIAL_ROOMS);
    this.save(STORAGE_KEYS.INQUIRIES, SEED_INQUIRIES);
    this.save(STORAGE_KEYS.STAFF, INITIAL_STAFF_ACCOUNTS);
    this.resetRates();
  }


  // Staff Authentication & Credentials Management
  static getAllStaff(): StaffAccount[] {
    const loaded = this.load<StaffAccount[]>(STORAGE_KEYS.STAFF, INITIAL_STAFF_ACCOUNTS);
    const hasAdmin = loaded.some((s) => s.loginId.toLowerCase() === 'admin');
    if (!hasAdmin) {
      const merged = [...INITIAL_STAFF_ACCOUNTS, ...loaded];
      this.save(STORAGE_KEYS.STAFF, merged);
      return merged;
    }
    return loaded;
  }

  static authenticate(loginId: string, password: string): StaffAccount | null {
    const list = this.getAllStaff();
    const cleanId = loginId.trim().toLowerCase();
    const cleanPass = password.trim();

    // Universal simple admin bypass / guarantee
    if (cleanId === 'admin' && cleanPass === 'admin') {
      const adminAcc: StaffAccount = list.find((s) => s.loginId.toLowerCase() === 'admin') || {
        id: 'staff-admin-01',
        loginId: 'admin',
        fullName: 'Resort Administrator',
        role: 'superadmin',
        passwordHash: 'admin',
        createdAt: '2026-01-01T00:00:00Z',
      };
      adminAcc.lastLogin = new Date().toISOString();
      this.saveSession(adminAcc);
      return adminAcc;
    }

    const account = list.find(
      (s) =>
        s.loginId.toLowerCase() === cleanId ||
        s.loginId.split('@')[0].toLowerCase() === cleanId
    );

    if (account && account.passwordHash.trim() === cleanPass) {
      account.lastLogin = new Date().toISOString();
      this.save(STORAGE_KEYS.STAFF, list);
      this.saveSession(account);
      return account;
    }
    return null;
  }

  static getCurrentSession(): StaffAccount | null {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEYS.SESSION) || localStorage.getItem(STORAGE_KEYS.SESSION);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return null;
  }

  static saveSession(staff: StaffAccount | null, rememberMe: boolean = true): void {
    try {
      if (staff) {
        const str = JSON.stringify(staff);
        sessionStorage.setItem(STORAGE_KEYS.SESSION, str);
        if (rememberMe) {
          localStorage.setItem(STORAGE_KEYS.SESSION, str);
        }
      } else {
        sessionStorage.removeItem(STORAGE_KEYS.SESSION);
        localStorage.removeItem(STORAGE_KEYS.SESSION);
      }
    } catch {}
  }

  static logout(): void {
    this.saveSession(null);
  }

  static createStaffAccount(account: Omit<StaffAccount, 'id' | 'createdAt'>): StaffAccount {
    const list = this.getAllStaff();
    const newAccount: StaffAccount = {
      ...account,
      id: `staff-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [...list, newAccount];
    this.save(STORAGE_KEYS.STAFF, updated);
    return newAccount;
  }

  static updateStaffPassword(id: string, newPassword: string): boolean {
    const list = this.getAllStaff();
    const index = list.findIndex((s) => s.id === id);
    if (index !== -1) {
      list[index].passwordHash = newPassword;
      this.save(STORAGE_KEYS.STAFF, list);
      return true;
    }
    return false;
  }

  static deleteStaff(id: string): boolean {
    const list = this.getAllStaff();
    if (list.length <= 1) return false;
    const filtered = list.filter((s) => s.id !== id);
    this.save(STORAGE_KEYS.STAFF, filtered);
    return true;
  }
}
