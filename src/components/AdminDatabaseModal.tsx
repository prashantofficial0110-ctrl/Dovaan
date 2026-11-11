import React, { useState, useEffect } from 'react';
import { Booking, EventInquiry, StaffAccount, ResortRates } from '../types';
import {
  DovaanDatabase,
  INITIAL_ROOMS,
  EXPERIENCES,
  BOOKING_ADDONS,
  MENU_ITEMS,
  DEFAULT_RATES,
} from '../services/db';
import {
  X,
  Database,
  Search,
  Download,
  RefreshCw,
  Plus,
  Trash2,
  CheckCircle,
  Users,
  Calendar,
  Lock,
  Key,
  ShieldCheck,
  LogOut,
  UserCheck,
  Eye,
  EyeOff,
  UserPlus,
  AlertTriangle,
  Tag,
  DollarSign,
  Percent,
  Save,
  RotateCcw,
  Sparkles,
  Sliders,
  TrendingUp,
  TrendingDown,
  Bed,
  Utensils,
  Compass,
  Waves,
} from 'lucide-react';

interface AdminDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshTrigger?: () => void;
}

export const AdminDatabaseModal: React.FC<AdminDatabaseModalProps> = ({
  isOpen,
  onClose,
  onRefreshTrigger,
}) => {
  // Auth state
  const [currentStaff, setCurrentStaff] = useState<StaffAccount | null>(null);
  const [loginIdInput, setLoginIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'bookings' | 'inquiries' | 'staff' | 'rates'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<EventInquiry[]>([]);
  const [staffList, setStaffList] = useState<StaffAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stats, setStats] = useState(DovaanDatabase.getStats());

  // Rates Management state (Owner Privilege)
  const [rates, setRates] = useState<ResortRates>(DovaanDatabase.getRates());
  const [ratesCategory, setRatesCategory] = useState<'all' | 'rooms' | 'experiences' | 'addons' | 'menu' | 'taxes'>('all');
  const [ratesSearch, setRatesSearch] = useState('');
  const [ratesDirty, setRatesDirty] = useState(false);
  const [confirmResetRates, setConfirmResetRates] = useState(false);

  // Walk-in form state
  const [showWalkinForm, setShowWalkinForm] = useState(false);
  const [walkinName, setWalkinName] = useState('');
  const [walkinPhone, setWalkinPhone] = useState('');
  const [walkinEmail, setWalkinEmail] = useState('');
  const [walkinRoom, setWalkinRoom] = useState('room-tower-deluxe');
  const [walkinNights, setWalkinNights] = useState(1);

  // New staff form state
  const [showNewStaffForm, setShowNewStaffForm] = useState(false);
  const [newStaffLoginId, setNewStaffLoginId] = useState('');
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<StaffAccount['role']>('frontdesk');
  const [newStaffPassword, setNewStaffPassword] = useState('');
  const [staffSuccessMsg, setStaffSuccessMsg] = useState('');

  // Password reset modal state
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState<{ [id: string]: boolean }>({});

  // Inline delete confirmations (avoids blocked window.confirm in iframe)
  const [confirmDeleteBookingId, setConfirmDeleteBookingId] = useState<string | null>(null);
  const [confirmDeleteStaffId, setConfirmDeleteStaffId] = useState<string | null>(null);
  const [confirmDeleteInquiryId, setConfirmDeleteInquiryId] = useState<string | null>(null);
  const [confirmResetDemo, setConfirmResetDemo] = useState<boolean>(false);
  const [actionNotification, setActionNotification] = useState<string | null>(null);

  const loadData = () => {
    setBookings(DovaanDatabase.getAllBookings());
    setInquiries(DovaanDatabase.getAllInquiries());
    setStaffList(DovaanDatabase.getAllStaff());
    setStats(DovaanDatabase.getStats());
    setRates(DovaanDatabase.getRates());
  };

  // Rates Management Handlers (Owner & Management Privilege)
  const handleUpdateRoomRate = (roomId: string, field: 'pricePerNight' | 'originalPrice', value: number) => {
    setRates((prev) => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        [roomId]: {
          pricePerNight: field === 'pricePerNight' ? Math.max(0, value) : (prev.rooms[roomId]?.pricePerNight || 0),
          originalPrice: field === 'originalPrice' ? Math.max(0, value) : (prev.rooms[roomId]?.originalPrice || 0),
        },
      },
    }));
    setRatesDirty(true);
  };

  const handleUpdateExpRate = (expId: string, value: number) => {
    setRates((prev) => ({
      ...prev,
      experiences: {
        ...prev.experiences,
        [expId]: { price: Math.max(0, value) },
      },
    }));
    setRatesDirty(true);
  };

  const handleUpdateAddonRate = (addonId: string, value: number) => {
    setRates((prev) => ({
      ...prev,
      addons: {
        ...prev.addons,
        [addonId]: { price: Math.max(0, value) },
      },
    }));
    setRatesDirty(true);
  };

  const handleUpdateMenuRate = (dishId: string, value: number) => {
    setRates((prev) => ({
      ...prev,
      menuItems: {
        ...prev.menuItems,
        [dishId]: { price: Math.max(0, value) },
      },
    }));
    setRatesDirty(true);
  };

  const handleUpdateGeneralRate = (field: 'taxPercentage', value: number) => {
    setRates((prev) => ({
      ...prev,
      [field]: Math.max(0, value),
    }));
    setRatesDirty(true);
  };

  const handleSaveAllRates = () => {
    const updated = DovaanDatabase.updateRates(rates, currentStaff?.fullName || 'Resort Owner');
    setRates(updated);
    setRatesDirty(false);
    setActionNotification('All resort tariffs successfully saved and updated live on the website!');
    setTimeout(() => setActionNotification(null), 4000);
    if (onRefreshTrigger) onRefreshTrigger();
  };

  const handleResetAllRates = () => {
    const reset = DovaanDatabase.resetRates();
    setRates(reset);
    setRatesDirty(false);
    setConfirmResetRates(false);
    setActionNotification('All resort rates reset to standard factory defaults.');
    setTimeout(() => setActionNotification(null), 4000);
    if (onRefreshTrigger) onRefreshTrigger();
  };

  const handleBulkRateAdjust = (percentage: number) => {
    const factor = 1 + percentage / 100;
    setRates((prev) => {
      const updatedRooms = { ...prev.rooms };
      Object.keys(updatedRooms).forEach((id) => {
        const currentP = updatedRooms[id]?.pricePerNight || 0;
        const currentOrig = updatedRooms[id]?.originalPrice || currentP * 1.25;
        updatedRooms[id] = {
          pricePerNight: Math.round(currentP * factor),
          originalPrice: Math.round(currentOrig * factor),
        };
      });

      const updatedExp = { ...prev.experiences };
      Object.keys(updatedExp).forEach((id) => {
        updatedExp[id] = { price: Math.round((updatedExp[id]?.price || 0) * factor) };
      });

      const updatedAddons = { ...prev.addons };
      Object.keys(updatedAddons).forEach((id) => {
        updatedAddons[id] = { price: Math.round((updatedAddons[id]?.price || 0) * factor) };
      });

      return {
        ...prev,
        rooms: updatedRooms,
        experiences: updatedExp,
        addons: updatedAddons,
      };
    });
    setRatesDirty(true);
    setActionNotification(
      `Applied ${percentage > 0 ? '+' : ''}${percentage}% adjustment across rooms & experiences. Click "Save All Rates" to publish live.`
    );
    setTimeout(() => setActionNotification(null), 4000);
  };



  useEffect(() => {
    if (isOpen) {
      const session = DovaanDatabase.getCurrentSession();
      if (session) {
        setCurrentStaff(session);
        loadData();
      } else {
        setCurrentStaff(null);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const authenticated = DovaanDatabase.authenticate(loginIdInput, passwordInput);
    if (authenticated) {
      setCurrentStaff(authenticated);
      loadData();
    } else {
      setLoginError('Invalid Login ID or Password. Please check credentials or use 1-Click Fill below.');
    }
  };

  const handleLogout = () => {
    DovaanDatabase.logout();
    setCurrentStaff(null);
    setLoginIdInput('');
    setPasswordInput('');
  };

  // Status updates
  const handleStatusChange = (id: string, newStatus: Booking['status']) => {
    DovaanDatabase.updateBookingStatus(id, newStatus);
    loadData();
    if (onRefreshTrigger) onRefreshTrigger();
  };

  const handleInquiryStatusChange = (id: string, newStatus: EventInquiry['status']) => {
    DovaanDatabase.updateInquiryStatus(id, newStatus);
    loadData();
  };

  // Safe delete actions (no window.confirm, zero browser blocking)
  const executeDeleteBooking = (id: string) => {
    DovaanDatabase.deleteBooking(id);
    setConfirmDeleteBookingId(null);
    loadData();
    setActionNotification(`Booking ${id} deleted.`);
    setTimeout(() => setActionNotification(null), 3500);
    if (onRefreshTrigger) onRefreshTrigger();
  };

  const executeDeleteStaff = (id: string) => {
    if (id === currentStaff?.id) {
      setActionNotification('Cannot delete your own active account.');
      setTimeout(() => setActionNotification(null), 3500);
      return;
    }
    const success = DovaanDatabase.deleteStaff(id);
    setConfirmDeleteStaffId(null);
    if (success) {
      loadData();
      setActionNotification('Staff login account deleted.');
      setTimeout(() => setActionNotification(null), 3500);
    } else {
      setActionNotification('Cannot delete the primary administrator account.');
      setTimeout(() => setActionNotification(null), 3500);
    }
  };

  const executeDeleteInquiry = (id: string) => {
    DovaanDatabase.deleteInquiry(id);
    setConfirmDeleteInquiryId(null);
    loadData();
    setActionNotification(`Banquet inquiry ${id} deleted.`);
    setTimeout(() => setActionNotification(null), 3500);
  };

  const executeResetSeed = () => {
    DovaanDatabase.resetToSeedData();
    setConfirmResetDemo(false);
    loadData();
    setActionNotification('System restored to default demo records.');
    setTimeout(() => setActionNotification(null), 3500);
    if (onRefreshTrigger) onRefreshTrigger();
  };

  const handleExportCSV = () => {
    const csvData = DovaanDatabase.exportBookingsCSV();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Dovaan_Resort_Bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const jsonData = DovaanDatabase.exportBookingsJSON();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Dovaan_Resort_Database_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddWalkin = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(Date.now() + 86400000 * walkinNights).toISOString().slice(0, 10);

    DovaanDatabase.createBooking({
      customer: {
        fullName: walkinName,
        email: walkinEmail || 'desk@dovaanresort.in',
        phone: walkinPhone,
        city: 'Walk-In Guest',
        state: 'Sikkim',
        specialRequests: 'Desk walk-in registration.',
      },
      bookingType: 'stay',
      roomId: walkinRoom,
      roomName: walkinRoom === 'room-tower-deluxe' ? 'Deluxe room with King size bed & nature views' : 'Heritage Cottage',
      checkInDate: today,
      checkOutDate: tomorrow,
      nights: walkinNights,
      guests: { adults: 2, children: 0 },
      addons: [],
      baseAmount: 7499 * walkinNights,
      addonsAmount: 0,
      taxes: Math.round(7499 * walkinNights * 0.12),
      totalAmount: Math.round(7499 * walkinNights * 1.12),
      status: 'checked-in',
      paymentStatus: 'paid',
      paymentMethod: 'pay_on_arrival',
      notes: `Direct Front Desk check-in processed by ${currentStaff?.fullName || 'Staff'}.`,
    });

    setShowWalkinForm(false);
    setWalkinName('');
    setWalkinPhone('');
    setWalkinEmail('');
    loadData();
    if (onRefreshTrigger) onRefreshTrigger();
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffLoginId || !newStaffPassword || !newStaffName) return;

    DovaanDatabase.createStaffAccount({
      loginId: newStaffLoginId.trim(),
      fullName: newStaffName.trim(),
      role: newStaffRole,
      passwordHash: newStaffPassword.trim(),
    });

    setStaffSuccessMsg(`Staff account ${newStaffLoginId} created successfully!`);
    setTimeout(() => setStaffSuccessMsg(''), 4000);
    setShowNewStaffForm(false);
    setNewStaffLoginId('');
    setNewStaffName('');
    setNewStaffPassword('');
    loadData();
  };

  const handleUpdatePassword = (id: string) => {
    if (!newPasswordVal.trim()) return;
    DovaanDatabase.updateStaffPassword(id, newPasswordVal.trim());
    setEditingStaffId(null);
    setNewPasswordVal('');
    loadData();
  };

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#051c11] border border-[#d4af37]/60 rounded-2xl max-w-6xl w-full overflow-hidden shadow-2xl relative max-h-[94vh] flex flex-col my-2">
        {/* ======================================================== */}
        {/* LOGIN SCREEN IF NOT AUTHENTICATED */}
        {/* ======================================================== */}
        {!currentStaff ? (
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center max-w-md mx-auto w-full my-auto text-center">
            {/* Logo */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_0_25px_rgba(212,175,55,0.3)] bg-[#020e08] p-1.5 mb-3">
              <img
                src="/assets/logo/dovaan_logo.jpg"
                alt="Dovaan Homestay and Resort"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="font-cinzel text-base font-bold text-gold-gradient mb-0.5">
              DOVAAN HOMESTAY AND RESORT
            </div>
            <div className="text-[10px] text-[#d6c28f] uppercase tracking-widest font-semibold mb-3">
              NEW EXPERIENCE.
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Restricted Access</span>
            </div>

            <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
              Staff &amp; Admin Sign In
            </h3>
            <p className="text-xs text-[#cad5cf] mb-5">
              Enter your Login ID and Password to manage room bookings, guests, and resort records.
            </p>

            {loginError && (
              <div className="w-full p-3 bg-red-950/70 border border-red-500/50 rounded-xl text-xs text-red-200 mb-4 flex items-center gap-2 text-left">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-xs text-[#d6c28f] mb-1 font-medium">
                  Login ID / Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginIdInput}
                    onChange={(e) => setLoginIdInput(e.target.value)}
                    placeholder="Enter your authorized Login ID"
                    className="w-full bg-[#03140c] border border-[#d4af37]/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#d6c28f] mb-1 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-[#03140c] border border-[#d4af37]/40 rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8ea89a] hover:text-[#d4af37] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gold-gradient text-[#04160d] font-bold text-xs sm:text-sm py-3 rounded-xl shadow-gold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                <ShieldCheck className="w-4 h-4 text-[#04160d]" />
                <span>Sign In / Login</span>
              </button>
            </form>

            <button
              onClick={onClose}
              className="mt-6 text-xs text-[#8ea89a] hover:text-[#fcedc2] underline cursor-pointer"
            >
              Cancel &amp; Return to Resort Website
            </button>
          </div>
        ) : (
          /* ======================================================== */
          /* AUTHENTICATED DASHBOARD */
          /* ======================================================== */
          <>
            {/* Modal Top Bar */}
            <div className="p-4 sm:p-6 border-b border-[#d4af37]/30 flex flex-wrap items-center justify-between gap-4 bg-[#03140c]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0b3323] border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                      Dovaan Resort Management Console
                    </h3>
                    <span className="bg-[#0b3323] border border-[#d4af37]/40 text-[#fcedc2] text-[10px] px-2 py-0.5 rounded font-mono">
                      AUTHENTICATED
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#8ea89a]">
                    <span>Logged in: <strong className="text-[#fcedc2]">{currentStaff.fullName}</strong></span>
                    <span>·</span>
                    <span className="text-[#d4af37] font-mono text-[11px]">{currentStaff.loginId}</span>
                    <span>·</span>
                    <span className="uppercase text-[10px] bg-[#051c11] px-1.5 py-0.5 rounded border border-[#d4af37]/20 text-[#a3c2b3]">
                      {currentStaff.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 rounded-lg bg-[#051c11] border border-[#d4af37]/40 text-[#fcedc2] hover:border-[#d4af37] text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  title="Export as CSV spreadsheet"
                >
                  <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>

                <button
                  onClick={handleExportJSON}
                  className="px-3 py-1.5 rounded-lg bg-[#051c11] border border-[#d4af37]/40 text-[#fcedc2] hover:border-[#d4af37] text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  title="Export full JSON records"
                >
                  <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span className="hidden sm:inline">JSON</span>
                </button>

                {confirmResetDemo ? (
                  <div className="inline-flex items-center gap-1 bg-[#03140c] border border-amber-500/60 px-2 py-1 rounded-lg">
                    <span className="text-[10px] text-amber-200 font-semibold">Reset all data?</span>
                    <button
                      onClick={executeResetSeed}
                      className="px-2 py-0.5 bg-amber-600 hover:bg-amber-500 text-white rounded text-[10px] font-bold cursor-pointer"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmResetDemo(false)}
                      className="px-1.5 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-[10px] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmResetDemo(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#051c11] border border-[#d4af37]/40 text-[#8ea89a] hover:text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                    title="Reset to default seed data"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset Demo</span>
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 hover:bg-red-900/60 text-xs font-medium flex items-center gap-1.5 cursor-pointer ml-1"
                  title="Log out of console"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-2 text-[#d4af37] hover:text-white rounded-lg hover:bg-[#08291b] cursor-pointer ml-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Action Feedback Banner */}
            {actionNotification && (
              <div className="bg-emerald-950/90 border-b border-emerald-500/50 px-4 py-2 text-xs text-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{actionNotification}</span>
                </div>
                <button
                  onClick={() => setActionNotification(null)}
                  className="text-emerald-400 hover:text-white text-xs cursor-pointer ml-4"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Analytics Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-[#03140c]/80 border-b border-[#d4af37]/20 text-xs">
              <div className="p-3 bg-[#051c11] rounded-xl border border-[#d4af37]/20">
                <span className="text-[#8ea89a] block text-[11px]">Total Bookings</span>
                <span className="font-cinzel text-xl font-bold text-white">{stats.totalBookings}</span>
              </div>

              <div className="p-3 bg-[#051c11] rounded-xl border border-[#d4af37]/20">
                <span className="text-[#8ea89a] block text-[11px]">Active Stays</span>
                <span className="font-cinzel text-xl font-bold text-[#fcedc2]">{stats.activeBookingsCount}</span>
              </div>

              <div className="p-3 bg-[#051c11] rounded-xl border border-[#d4af37]/20">
                <span className="text-[#8ea89a] block text-[11px]">Total Confirmed Revenue</span>
                <span className="font-cinzel text-xl font-bold text-gold-gradient">
                  ₹{stats.totalRevenue.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3 bg-[#051c11] rounded-xl border border-[#d4af37]/20">
                <span className="text-[#8ea89a] block text-[11px]">Resort Occupancy</span>
                <span className="font-cinzel text-xl font-bold text-emerald-400">{stats.occupancyRate}%</span>
              </div>

              <div className="p-3 bg-[#051c11] rounded-xl border border-[#d4af37]/20 col-span-2 sm:col-span-1">
                <span className="text-[#8ea89a] block text-[11px]">Banquet Inquiries</span>
                <span className="font-cinzel text-xl font-bold text-[#fcedc2]">{inquiries.length}</span>
              </div>
            </div>

            {/* Tab Switcher & Search Bar */}
            <div className="p-4 bg-[#04160d] border-b border-[#d4af37]/20 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    activeTab === 'bookings'
                      ? 'bg-gold-gradient text-[#04160d] shadow-gold'
                      : 'bg-[#03140c] text-[#d6c28f] border border-[#d4af37]/25 hover:text-white'
                  }`}
                >
                  Guest Bookings ({bookings.length})
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    activeTab === 'inquiries'
                      ? 'bg-gold-gradient text-[#04160d] shadow-gold'
                      : 'bg-[#03140c] text-[#d6c28f] border border-[#d4af37]/25 hover:text-white'
                  }`}
                >
                  Banquet Inquiries ({inquiries.length})
                </button>

                <button
                  onClick={() => setActiveTab('staff')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    activeTab === 'staff'
                      ? 'bg-gold-gradient text-[#04160d] shadow-gold'
                      : 'bg-[#03140c] text-[#d6c28f] border border-[#d4af37]/25 hover:text-white'
                  }`}
                >
                  Login IDs &amp; Staff ({staffList.length})
                </button>

                <button
                  onClick={() => setActiveTab('rates')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeTab === 'rates'
                      ? 'bg-gold-gradient text-[#04160d] shadow-gold'
                      : 'bg-[#03140c] text-[#d6c28f] border border-[#d4af37]/25 hover:text-white'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Rates &amp; Tariffs (Owner)</span>
                  {ratesDirty && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse ml-0.5" title="Unsaved changes" />
                  )}
                </button>
              </div>

              {activeTab === 'bookings' && (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#8ea89a] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search guest, code or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-[#03140c] border border-[#d4af37]/30 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#687f73] focus:outline-none focus:border-[#d4af37] w-48 sm:w-64"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#03140c] border border-[#d4af37]/30 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="checked-in">Checked-In</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <button
                    onClick={() => setShowWalkinForm(!showWalkinForm)}
                    className="bg-[#0b3323] border border-[#d4af37] text-[#fcedc2] hover:bg-[#0e432d] px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Add Walk-In</span>
                  </button>
                </div>
              )}

              {activeTab === 'staff' && (
                <button
                  onClick={() => setShowNewStaffForm(!showNewStaffForm)}
                  className="bg-[#0b3323] border border-[#d4af37] text-[#fcedc2] hover:bg-[#0e432d] px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Create New Login ID</span>
                </button>
              )}

              {activeTab === 'rates' && (
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#8ea89a] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter rates (e.g. Suite, Swing, Trout)..."
                      value={ratesSearch}
                      onChange={(e) => setRatesSearch(e.target.value)}
                      className="bg-[#03140c] border border-[#d4af37]/30 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#687f73] focus:outline-none focus:border-[#d4af37] w-48 sm:w-60"
                    />
                  </div>

                  <button
                    onClick={handleSaveAllRates}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      ratesDirty
                        ? 'bg-gold-gradient text-[#04160d] shadow-gold animate-pulse'
                        : 'bg-[#0b3323] border border-[#d4af37] text-[#fcedc2] hover:bg-[#0e432d]'
                    }`}
                    title="Publish current rates live to website"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{ratesDirty ? 'Save Rates (Unsaved)' : 'Save All Rates'}</span>
                  </button>

                  {confirmResetRates ? (
                    <div className="inline-flex items-center gap-1 bg-[#03140c] border border-amber-500/60 px-2 py-1 rounded-lg">
                      <span className="text-[10px] text-amber-200">Reset rates?</span>
                      <button
                        onClick={handleResetAllRates}
                        className="px-2 py-0.5 bg-amber-600 hover:bg-amber-500 text-white rounded text-[10px] font-bold cursor-pointer"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmResetRates(false)}
                        className="px-1.5 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-[10px] cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmResetRates(true)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#051c11] border border-[#d4af37]/30 text-[#8ea89a] hover:text-white text-xs font-medium flex items-center gap-1 cursor-pointer"
                      title="Reset all rates to standard factory defaults"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Reset Defaults</span>
                    </button>
                  )}
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 4: RATES & TARIFFS MANAGER (OWNER PRIVILEGE) */}
              {/* ======================================================== */}
              {activeTab === 'rates' && (
                <div className="p-4 sm:p-6 space-y-6">
                  {/* Banner & Control Bar */}
                  <div className="bg-gradient-to-r from-[#03140c] via-[#082a1c] to-[#03140c] border border-[#d4af37]/40 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Owner Tariff &amp; Pricing Control</span>
                        <span className="bg-[#0b3323] text-[#fcedc2] px-2 py-0.5 rounded text-[10px] font-mono border border-[#d4af37]/30">
                          LIVE SYNC
                        </span>
                      </div>
                      <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-1">
                        Resort Rates &amp; Tariffs
                      </h4>
                      <p className="text-xs sm:text-sm text-[#cad9d1] max-w-2xl leading-relaxed">
                        Modify nightly room tariffs, high-altitude adventure passes, multi-cuisine dining delicacies, and taxes. Any saved modifications update immediately across the entire website and booking engine.
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-[#8ea89a]">
                        <span>
                          Last saved by: <strong className="text-[#fcedc2]">{rates.updatedBy || 'Resort Owner'}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          {rates.lastUpdated ? new Date(rates.lastUpdated).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'Standard Config'}
                        </span>
                      </div>
                    </div>

                    {/* Quick Seasonal Batch Adjustment Tools */}
                    <div className="bg-[#04160d] border border-[#d4af37]/30 p-3 rounded-xl shrink-0 flex flex-col gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#8ea89a] font-semibold flex items-center gap-1">
                        <Sliders className="w-3 h-3 text-[#d4af37]" />
                        <span>Quick Seasonal Adjustment</span>
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleBulkRateAdjust(10)}
                          className="px-2.5 py-1 rounded bg-[#0b3323] hover:bg-[#114a33] text-[#fcedc2] border border-[#d4af37]/30 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                          title="Increase all rooms and activities by 10%"
                        >
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                          <span>+10% High Season</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBulkRateAdjust(5)}
                          className="px-2.5 py-1 rounded bg-[#0b3323] hover:bg-[#114a33] text-[#fcedc2] border border-[#d4af37]/30 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                          title="Increase all rooms and activities by 5%"
                        >
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                          <span>+5% Weekend</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBulkRateAdjust(-10)}
                          className="px-2.5 py-1 rounded bg-[#0b3323] hover:bg-[#114a33] text-[#fcedc2] border border-[#d4af37]/30 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                          title="Discount all rooms and activities by 10%"
                        >
                          <TrendingDown className="w-3 h-3 text-amber-400" />
                          <span>-10% Monsoon</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sub-Category Filter Tabs */}
                  <div className="flex flex-wrap items-center gap-2 border-b border-[#d4af37]/20 pb-3">
                    <button
                      onClick={() => setRatesCategory('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                        ratesCategory === 'all'
                          ? 'bg-gold-gradient text-[#04160d] font-bold shadow-gold'
                          : 'bg-[#03140c] text-[#d6c28f] border border-[#d4af37]/20 hover:text-white'
                      }`}
                    >
                      All Tariffs
                    </button>
                    <button
                      onClick={() => setRatesCategory('rooms')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                        ratesCategory === 'rooms'
                          ? 'bg-gold-gradient text-[#04160d] font-bold shadow-gold'
                          : 'bg-[#03140c] text-[#d6c28f] border border-[#d4af37]/20 hover:text-white'
                      }`}
                    >
                      <Bed className="w-3.5 h-3.5" />
                      <span>Rooms &amp; Cottages ({INITIAL_ROOMS.length})</span>
                    </button>
                    <button
                      onClick={() => setRatesCategory('experiences')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                        ratesCategory === 'experiences'
                          ? 'bg-gold-gradient text-[#04160d] font-bold shadow-gold'
                          : 'bg-[#03140c] text-[#d6c28f] border border-[#d4af37]/20 hover:text-white'
                      }`}
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Adventures &amp; Sky Passes ({EXPERIENCES.length})</span>
                    </button>
                    <button
                      onClick={() => setRatesCategory('addons')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                        ratesCategory === 'addons'
                          ? 'bg-gold-gradient text-[#04160d] font-bold shadow-gold'
                          : 'bg-[#03140c] text-[#d6c28f] border border-[#d4af37]/20 hover:text-white'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Booking Add-ons ({BOOKING_ADDONS.length})</span>
                    </button>
                    <button
                      onClick={() => setRatesCategory('menu')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                        ratesCategory === 'menu'
                          ? 'bg-gold-gradient text-[#04160d] font-bold shadow-gold'
                          : 'bg-[#03140c] text-[#d6c28f] border border-[#d4af37]/20 hover:text-white'
                      }`}
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Dining Menu ({MENU_ITEMS.length})</span>
                    </button>
                    <button
                      onClick={() => setRatesCategory('taxes')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                        ratesCategory === 'taxes'
                          ? 'bg-gold-gradient text-[#04160d] font-bold shadow-gold'
                          : 'bg-[#03140c] text-[#d6c28f] border border-[#d4af37]/20 hover:text-white'
                      }`}
                    >
                      <Percent className="w-3.5 h-3.5" />
                      <span>Tax &amp; Day Passes</span>
                    </button>
                  </div>

                  {/* 1. ROOMS SECTION */}
                  {(ratesCategory === 'all' || ratesCategory === 'rooms') && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-2">
                        <div className="flex items-center gap-2">
                          <Bed className="w-4 h-4 text-[#d4af37]" />
                          <h5 className="font-cinzel text-base font-bold text-white">
                            Accommodations (Nightly Room Rates)
                          </h5>
                        </div>
                        <span className="text-xs text-[#8ea89a]">
                          Adjust base nightly rate and displayed original strike-through price
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {INITIAL_ROOMS.filter(
                          (r) =>
                            !ratesSearch ||
                            r.name.toLowerCase().includes(ratesSearch.toLowerCase()) ||
                            r.category.toLowerCase().includes(ratesSearch.toLowerCase())
                        ).map((room) => {
                          const roomRate = rates.rooms[room.id] || {
                            pricePerNight: room.pricePerNight,
                            originalPrice: room.originalPrice || room.pricePerNight * 1.25,
                          };
                          const discountPct = roomRate.originalPrice && roomRate.originalPrice > roomRate.pricePerNight
                            ? Math.round(((roomRate.originalPrice - roomRate.pricePerNight) / roomRate.originalPrice) * 100)
                            : 0;

                          return (
                            <div
                              key={room.id}
                              className="bg-[#051c11] border border-[#d4af37]/30 rounded-xl p-4 flex flex-col justify-between hover:border-[#d4af37] transition-all"
                            >
                              <div>
                                <div className="flex items-start gap-3 mb-3">
                                  <img
                                    src={room.image}
                                    alt={room.name}
                                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#d4af37]/30"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 mb-1">
                                      <span className="text-[10px] uppercase tracking-wider bg-[#0b3323] text-[#d4af37] px-1.5 py-0.5 rounded font-mono">
                                        {room.category}
                                      </span>
                                      {discountPct > 0 && (
                                        <span className="text-[10px] bg-red-950/80 text-red-300 border border-red-500/40 px-1.5 py-0.5 rounded font-bold">
                                          {discountPct}% OFF
                                        </span>
                                      )}
                                    </div>
                                    <h6 className="font-cinzel text-sm font-bold text-white truncate" title={room.name}>
                                      {room.name}
                                    </h6>
                                    <span className="text-[11px] text-[#8ea89a] block truncate">
                                      {room.view}
                                    </span>
                                  </div>
                                </div>

                                <div className="space-y-2.5 pt-2 border-t border-[#d4af37]/15">
                                  <div>
                                    <label className="block text-[11px] text-[#fcedc2] font-medium mb-1">
                                      Nightly Tariff (₹) *
                                    </label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#d4af37] font-bold">
                                        ₹
                                      </span>
                                      <input
                                        type="number"
                                        min="0"
                                        step="50"
                                        value={roomRate.pricePerNight}
                                        onChange={(e) =>
                                          handleUpdateRoomRate(room.id, 'pricePerNight', Number(e.target.value))
                                        }
                                        className="w-full bg-[#03140c] border border-[#d4af37]/40 rounded-lg pl-7 pr-3 py-1.5 text-xs text-white font-mono font-semibold focus:outline-none focus:border-[#d4af37]"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-[11px] text-[#8ea89a] mb-1">
                                      Original Price (Strike-through ₹)
                                    </label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#8ea89a]">
                                        ₹
                                      </span>
                                      <input
                                        type="number"
                                        min="0"
                                        step="50"
                                        value={roomRate.originalPrice || ''}
                                        onChange={(e) =>
                                          handleUpdateRoomRate(room.id, 'originalPrice', Number(e.target.value))
                                        }
                                        className="w-full bg-[#03140c] border border-[#d4af37]/25 rounded-lg pl-7 pr-3 py-1.5 text-xs text-[#a3c2b3] font-mono focus:outline-none focus:border-[#d4af37]"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3 pt-2 border-t border-[#d4af37]/10 flex items-center justify-between text-[11px] text-[#8ea89a]">
                                <span>Max Guests: {room.capacity.adults} Adults, {room.capacity.children} Child</span>
                                <span className="font-mono text-[#d4af37]">ID: {room.id}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 2. ADVENTURES & SKY EXPERIENCES */}
                  {(ratesCategory === 'all' || ratesCategory === 'experiences') && (
                    <div className="space-y-3 pt-4 border-t border-[#d4af37]/20">
                      <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-2">
                        <div className="flex items-center gap-2">
                          <Compass className="w-4 h-4 text-[#d4af37]" />
                          <h5 className="font-cinzel text-base font-bold text-white">
                            Adventure &amp; Sky Experiences
                          </h5>
                        </div>
                        <span className="text-xs text-[#8ea89a]">
                          Sikkim Swing, Sky Walk, Sky Dining, Hanging Bridge &amp; Barbecue
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {EXPERIENCES.filter(
                          (exp) =>
                            !ratesSearch ||
                            exp.title.toLowerCase().includes(ratesSearch.toLowerCase()) ||
                            exp.highlight.toLowerCase().includes(ratesSearch.toLowerCase())
                        ).map((exp) => {
                          const currentPrice = rates.experiences[exp.id]?.price ?? exp.price;

                          return (
                            <div
                              key={exp.id}
                              className="bg-[#051c11] border border-[#d4af37]/30 rounded-xl p-4 flex flex-col justify-between hover:border-[#d4af37] transition-all"
                            >
                              <div>
                                <div className="flex items-start gap-3 mb-3">
                                  <img
                                    src={exp.image}
                                    alt={exp.title}
                                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#d4af37]/30"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <span className="text-[10px] uppercase tracking-wider bg-[#0b3323] text-[#d4af37] px-1.5 py-0.5 rounded font-mono mb-1 inline-block">
                                      {exp.category}
                                    </span>
                                    <h6 className="font-cinzel text-sm font-bold text-white truncate" title={exp.title}>
                                      {exp.title}
                                    </h6>
                                    <span className="text-[11px] text-[#8ea89a] block truncate">
                                      {exp.highlight}
                                    </span>
                                  </div>
                                </div>

                                <div className="pt-2 border-t border-[#d4af37]/15">
                                  <label className="block text-[11px] text-[#fcedc2] font-medium mb-1">
                                    Pass Rate (₹) · <span className="text-[#8ea89a]">{exp.priceUnit}</span>
                                  </label>
                                  <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#d4af37] font-bold">
                                      ₹
                                    </span>
                                    <input
                                      type="number"
                                      min="0"
                                      step="50"
                                      value={currentPrice}
                                      onChange={(e) => handleUpdateExpRate(exp.id, Number(e.target.value))}
                                      className="w-full bg-[#03140c] border border-[#d4af37]/40 rounded-lg pl-7 pr-3 py-1.5 text-xs text-white font-mono font-semibold focus:outline-none focus:border-[#d4af37]"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3 pt-2 border-t border-[#d4af37]/10 flex items-center justify-between text-[11px] text-[#8ea89a]">
                                <span>{exp.duration}</span>
                                <span className="font-mono text-[#d4af37]">ID: {exp.id}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 3. BOOKING ADDONS */}
                  {(ratesCategory === 'all' || ratesCategory === 'addons') && (
                    <div className="space-y-3 pt-4 border-t border-[#d4af37]/20">
                      <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-2">
                        <div className="flex items-center gap-2">
                          <Plus className="w-4 h-4 text-[#d4af37]" />
                          <h5 className="font-cinzel text-base font-bold text-white">
                            Booking Add-ons &amp; Guest Upgrades
                          </h5>
                        </div>
                        <span className="text-xs text-[#8ea89a]">
                          Extra options selected during reservation booking flow
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {BOOKING_ADDONS.filter(
                          (a) =>
                            !ratesSearch ||
                            a.name.toLowerCase().includes(ratesSearch.toLowerCase()) ||
                            a.category.toLowerCase().includes(ratesSearch.toLowerCase())
                        ).map((addon) => {
                          const currentPrice = rates.addons[addon.id]?.price ?? addon.price;

                          return (
                            <div
                              key={addon.id}
                              className="bg-[#051c11] border border-[#d4af37]/30 rounded-xl p-4 flex flex-col justify-between hover:border-[#d4af37] transition-all"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <span className="text-[10px] uppercase tracking-wider bg-[#0b3323] text-[#d4af37] px-1.5 py-0.5 rounded font-mono">
                                    {addon.category}
                                  </span>
                                  <span className="text-[10px] text-[#8ea89a] font-mono">ID: {addon.id}</span>
                                </div>
                                <h6 className="font-cinzel text-sm font-bold text-white mb-1">
                                  {addon.name}
                                </h6>
                                <p className="text-[11px] text-[#8ea89a] leading-relaxed mb-3">
                                  {addon.description}
                                </p>

                                <div>
                                  <label className="block text-[11px] text-[#fcedc2] font-medium mb-1">
                                    Add-on Price (₹)
                                  </label>
                                  <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#d4af37] font-bold">
                                      ₹
                                    </span>
                                    <input
                                      type="number"
                                      min="0"
                                      step="50"
                                      value={currentPrice}
                                      onChange={(e) => handleUpdateAddonRate(addon.id, Number(e.target.value))}
                                      className="w-full bg-[#03140c] border border-[#d4af37]/40 rounded-lg pl-7 pr-3 py-1.5 text-xs text-white font-mono font-semibold focus:outline-none focus:border-[#d4af37]"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 4. MULTI-CUISINE DINING MENU */}
                  {(ratesCategory === 'all' || ratesCategory === 'menu') && (
                    <div className="space-y-3 pt-4 border-t border-[#d4af37]/20">
                      <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-2">
                        <div className="flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-[#d4af37]" />
                          <h5 className="font-cinzel text-base font-bold text-white">
                            DOVAAN Multi-Cuisine Dining Dishes
                          </h5>
                        </div>
                        <span className="text-xs text-[#8ea89a]">
                          Sikkimese delicacies, seafood, pizza &amp; gourmet signature dishes
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {MENU_ITEMS.filter(
                          (item) =>
                            !ratesSearch ||
                            item.name.toLowerCase().includes(ratesSearch.toLowerCase()) ||
                            item.category.toLowerCase().includes(ratesSearch.toLowerCase())
                        ).map((dish) => {
                          const currentPrice = rates.menuItems[dish.id]?.price ?? dish.price;

                          return (
                            <div
                              key={dish.id}
                              className="bg-[#051c11] border border-[#d4af37]/30 rounded-xl p-3 flex flex-col justify-between hover:border-[#d4af37] transition-all"
                            >
                              <div>
                                <div className="relative h-24 rounded-lg overflow-hidden mb-2.5 border border-[#d4af37]/20 bg-[#020e08]">
                                  {dish.image ? (
                                    <img
                                      src={dish.image}
                                      alt={dish.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#072418] text-[#d4af37]">
                                      <Utensils className="w-6 h-6 opacity-70" />
                                    </div>
                                  )}
                                  <div className="absolute top-1 left-1 bg-[#03140c]/90 text-[#fcedc2] px-1.5 py-0.5 rounded text-[9px] font-mono">
                                    {dish.category}
                                  </div>
                                </div>

                                <h6 className="font-cinzel text-xs font-bold text-white mb-1 line-clamp-1" title={dish.name}>
                                  {dish.name}
                                </h6>
                                <p className="text-[10px] text-[#8ea89a] line-clamp-2 leading-relaxed mb-2.5">
                                  {dish.description}
                                </p>

                                <div>
                                  <label className="block text-[10px] text-[#fcedc2] font-medium mb-1">
                                    Dish Price (₹)
                                  </label>
                                  <div className="relative">
                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#d4af37] font-bold">
                                      ₹
                                    </span>
                                    <input
                                      type="number"
                                      min="0"
                                      step="10"
                                      value={currentPrice}
                                      onChange={(e) => handleUpdateMenuRate(dish.id, Number(e.target.value))}
                                      className="w-full bg-[#03140c] border border-[#d4af37]/40 rounded-lg pl-6 pr-2.5 py-1 text-xs text-white font-mono font-semibold focus:outline-none focus:border-[#d4af37]"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 5. TAXES CONFIGURATION */}
                  {(ratesCategory === 'all' || ratesCategory === 'taxes') && (
                    <div className="space-y-3 pt-4 border-t border-[#d4af37]/20">
                      <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-2">
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-[#d4af37]" />
                          <h5 className="font-cinzel text-base font-bold text-white">
                            GST Tax Configuration
                          </h5>
                        </div>
                        <span className="text-xs text-[#8ea89a]">
                          System-wide tax rate configuration for reservations
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* GST Tax Card */}
                        <div className="bg-[#051c11] border border-[#d4af37]/30 rounded-xl p-5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-1">
                              <Percent className="w-4 h-4" />
                              <span>Taxation Authority</span>
                            </div>
                            <h6 className="font-cinzel text-lg font-bold text-white mb-1">
                              Standard GST Percentage
                            </h6>
                            <p className="text-xs text-[#cad5cf] leading-relaxed mb-4">
                              Applied automatically to accommodation subtotal and booking add-ons across the booking wizard and receipt generator.
                            </p>

                            <div>
                              <label className="block text-xs text-[#fcedc2] font-medium mb-1">
                                GST Percentage (% rate)
                              </label>
                              <div className="relative max-w-xs">
                                <input
                                  type="number"
                                  min="0"
                                  max="28"
                                  step="1"
                                  value={rates.taxPercentage}
                                  onChange={(e) =>
                                    handleUpdateGeneralRate('taxPercentage', Number(e.target.value))
                                  }
                                  className="w-full bg-[#03140c] border border-[#d4af37]/40 rounded-lg pl-3 pr-8 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-[#d4af37]"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#d4af37] font-bold">
                                  %
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sticky Floating Save Bar */}
                  <div className="sticky bottom-2 z-20 bg-[#03140c]/95 border-2 border-[#d4af37] rounded-xl p-4 shadow-2xl flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0b3323] border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                        <Tag className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-cinzel text-sm sm:text-base font-bold text-white">
                            Ready to Apply Rates?
                          </span>
                          {ratesDirty ? (
                            <span className="bg-amber-900/60 text-amber-200 border border-amber-500/40 text-[10px] px-2 py-0.5 rounded font-mono font-semibold animate-pulse">
                              UNSAVED CHANGES
                            </span>
                          ) : (
                            <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded font-mono">
                              ALL RATES SYNCED
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#8ea89a]">
                          Changes take immediate effect on the room listings, adventure passes, dining menus, and booking calculator.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {confirmResetRates ? (
                        <div className="inline-flex items-center gap-1.5 bg-[#051c11] border border-amber-500/60 px-3 py-1.5 rounded-lg text-xs">
                          <span className="text-amber-200 text-xs font-semibold">Confirm factory reset?</span>
                          <button
                            type="button"
                            onClick={handleResetAllRates}
                            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-bold cursor-pointer"
                          >
                            Yes, Reset
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmResetRates(false)}
                            className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-xs cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmResetRates(true)}
                          className="px-3.5 py-2 rounded-lg bg-[#051c11] border border-[#d4af37]/30 text-[#8ea89a] hover:text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset to Defaults</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={handleSaveAllRates}
                        className="bg-gold-gradient text-[#04160d] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-gold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4 text-[#04160d]" />
                        <span>Save All Rates Live</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>



            {/* Success message banner */}
            {staffSuccessMsg && (
              <div className="p-3 bg-emerald-950/80 border-b border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{staffSuccessMsg}</span>
              </div>
            )}

            {/* Create New Staff Account Form */}
            {activeTab === 'staff' && showNewStaffForm && (
              <form
                onSubmit={handleCreateStaff}
                className="p-4 bg-[#03140c] border-b border-[#d4af37]/30 grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs"
              >
                <div>
                  <label className="block text-[11px] text-[#8ea89a] mb-1">New Login ID / Email *</label>
                  <input
                    type="text"
                    required
                    value={newStaffLoginId}
                    onChange={(e) => setNewStaffLoginId(e.target.value)}
                    placeholder="e.g. manager2@dovaanresort.in"
                    className="w-full bg-[#051c11] border border-[#d4af37]/30 rounded p-1.5 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#8ea89a] mb-1">Staff Member Name *</label>
                  <input
                    type="text"
                    required
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                    placeholder="e.g. Sonam Bhutia"
                    className="w-full bg-[#051c11] border border-[#d4af37]/30 rounded p-1.5 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#8ea89a] mb-1">Assigned Role</label>
                  <select
                    value={newStaffRole}
                    onChange={(e) => setNewStaffRole(e.target.value as any)}
                    className="w-full bg-[#051c11] border border-[#d4af37]/30 rounded p-1.5 text-white text-xs"
                  >
                    <option value="frontdesk">Front Desk Concierge</option>
                    <option value="manager">Assistant Manager</option>
                    <option value="event_coordinator">Event Coordinator</option>
                    <option value="superadmin">General Manager / Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-[#8ea89a] mb-1">Password *</label>
                  <input
                    type="text"
                    required
                    value={newStaffPassword}
                    onChange={(e) => setNewStaffPassword(e.target.value)}
                    placeholder="Strong password"
                    className="w-full bg-[#051c11] border border-[#d4af37]/30 rounded p-1.5 text-white text-xs"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <button
                    type="submit"
                    className="w-full bg-gold-gradient text-[#04160d] font-bold text-xs py-2 rounded shadow-gold cursor-pointer"
                  >
                    Save Login ID
                  </button>
                </div>
              </form>
            )}

            {/* Walk-in Form Collapse */}
            {activeTab === 'bookings' && showWalkinForm && (
              <form
                onSubmit={handleAddWalkin}
                className="p-4 bg-[#03140c] border-b border-[#d4af37]/30 grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs"
              >
                <div>
                  <label className="block text-[11px] text-[#8ea89a] mb-1">Guest Name *</label>
                  <input
                    type="text"
                    required
                    value={walkinName}
                    onChange={(e) => setWalkinName(e.target.value)}
                    placeholder="Guest Name"
                    className="w-full bg-[#051c11] border border-[#d4af37]/30 rounded p-1.5 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#8ea89a] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={walkinPhone}
                    onChange={(e) => setWalkinPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full bg-[#051c11] border border-[#d4af37]/30 rounded p-1.5 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#8ea89a] mb-1">Room Category</label>
                  <select
                    value={walkinRoom}
                    onChange={(e) => setWalkinRoom(e.target.value)}
                    className="w-full bg-[#051c11] border border-[#d4af37]/30 rounded p-1.5 text-white text-xs"
                  >
                    <option value="room-tower-deluxe">Deluxe Room with King Bed &amp; Nature Views</option>
                    <option value="room-tower-family">Grand Tower Duplex Penthouse</option>
                    <option value="room-luxury-cottage">Swimming Pool &amp; Sole Pole Restaurant Night View</option>
                    <option value="room-double-queen">Double Bed Queen Size Bedroom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-[#8ea89a] mb-1">Nights</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={walkinNights}
                    onChange={(e) => setWalkinNights(Number(e.target.value))}
                    className="w-full bg-[#051c11] border border-[#d4af37]/30 rounded p-1.5 text-white text-xs"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <button
                    type="submit"
                    className="w-full bg-gold-gradient text-[#04160d] font-bold text-xs py-2 rounded shadow-gold cursor-pointer"
                  >
                    Save &amp; Check-In
                  </button>
                </div>
              </form>
            )}

            {/* Database Table Area */}
            <div className="flex-1 overflow-auto p-4">
              {activeTab === 'bookings' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#d4af37]/30 text-[#8ea89a] uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-3">Ref ID</th>
                        <th className="py-3 px-3">Lead Guest</th>
                        <th className="py-3 px-3">Accommodation</th>
                        <th className="py-3 px-3">Check-In / Out</th>
                        <th className="py-3 px-3">Total Amount</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d4af37]/15">
                      {filteredBookings.length > 0 ? (
                        filteredBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-[#072418]/60 transition-colors">
                            <td className="py-3 px-3 font-mono font-bold text-[#fcedc2] whitespace-nowrap">
                              {b.id}
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-semibold text-white">{b.customer.fullName}</div>
                              <div className="text-[11px] text-[#8ea89a]">{b.customer.phone} · {b.customer.email}</div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="text-[#d6c28f] font-medium">{b.roomName}</div>
                              <div className="text-[10px] text-[#8ea89a]">
                                {b.guests.adults}A, {b.guests.children}C
                                {b.addons.length > 0 && ` + ${b.addons.length} Add-ons`}
                              </div>
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <div className="text-white">{b.checkInDate}</div>
                              <div className="text-[11px] text-[#8ea89a]">to {b.checkOutDate} ({b.nights}N)</div>
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className="font-cinzel font-bold text-gold-gradient">
                                ₹{b.totalAmount.toLocaleString('en-IN')}
                              </span>
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <select
                                value={b.status}
                                onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                                className={`text-xs px-2 py-1 rounded font-semibold border cursor-pointer ${
                                  b.status === 'confirmed'
                                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                                    : b.status === 'checked-in'
                                    ? 'bg-blue-950 text-blue-300 border-blue-500/40'
                                    : b.status === 'completed'
                                    ? 'bg-stone-900 text-stone-300 border-stone-600'
                                    : 'bg-red-950 text-red-300 border-red-500/40'
                                }`}
                              >
                                <option value="confirmed">Confirmed</option>
                                <option value="checked-in">Checked-In</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3 px-3 text-right whitespace-nowrap">
                              {confirmDeleteBookingId === b.id ? (
                                <div className="inline-flex items-center gap-1.5 bg-[#03140c] border border-red-500/60 px-2 py-1 rounded">
                                  <span className="text-[10px] text-red-300 font-semibold">Delete?</span>
                                  <button
                                    onClick={() => executeDeleteBooking(b.id)}
                                    className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold cursor-pointer"
                                  >
                                    Yes
                                  </button>
                                  <button
                                    onClick={() => setConfirmDeleteBookingId(null)}
                                    className="px-1.5 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-[10px] cursor-pointer"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setConfirmDeleteBookingId(b.id)}
                                  className="p-1.5 text-red-400 hover:text-red-200 hover:bg-red-950/60 rounded cursor-pointer border border-transparent hover:border-red-500/30 transition-colors"
                                  title="Delete booking record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-[#cad5cf]">
                            No records match your filter criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'inquiries' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#d4af37]/30 text-[#8ea89a] uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-3">Inquiry ID</th>
                        <th className="py-3 px-3">Client Name</th>
                        <th className="py-3 px-3">Event &amp; Venue</th>
                        <th className="py-3 px-3">Tentative Date</th>
                        <th className="py-3 px-3">Guests &amp; Budget</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d4af37]/15">
                      {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-[#072418]/60 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-[#fcedc2]">
                            {inq.id}
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-semibold text-white">{inq.fullName}</div>
                            <div className="text-[11px] text-[#8ea89a]">{inq.phone} · {inq.email}</div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-[#d6c28f] uppercase text-[11px] font-semibold block">
                              {inq.eventType}
                            </span>
                            <span className="text-white">{inq.preferredVenue.replace('-', ' ')}</span>
                          </td>
                          <td className="py-3 px-3 text-white">
                            {inq.tentativeDate}
                          </td>
                          <td className="py-3 px-3">
                            <div className="text-white">{inq.estimatedGuests} Guests</div>
                            <div className="text-[11px] text-[#d4af37]">{inq.budgetRange}</div>
                          </td>
                          <td className="py-3 px-3">
                            <select
                              value={inq.status}
                              onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value as any)}
                              className="bg-[#03140c] border border-[#d4af37]/40 rounded px-2 py-1 text-xs text-white"
                            >
                              <option value="new">New Inquiry</option>
                              <option value="contacted">Contacted</option>
                              <option value="booked">Booked</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-3 px-3 text-right whitespace-nowrap">
                            {confirmDeleteInquiryId === inq.id ? (
                              <div className="inline-flex items-center gap-1.5 bg-[#03140c] border border-red-500/60 px-2 py-1 rounded">
                                <span className="text-[10px] text-red-300 font-semibold">Delete?</span>
                                <button
                                  onClick={() => executeDeleteInquiry(inq.id)}
                                  className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold cursor-pointer"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteInquiryId(null)}
                                  className="px-1.5 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-[10px] cursor-pointer"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDeleteInquiryId(inq.id)}
                                className="p-1.5 text-red-400 hover:text-red-200 hover:bg-red-950/60 rounded cursor-pointer border border-transparent hover:border-red-500/30 transition-colors"
                                title="Delete banquet inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'staff' && (
                <div className="overflow-x-auto">
                  <div className="mb-4 p-3 bg-[#03140c] rounded-xl border border-[#d4af37]/30 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#fcedc2] block">Staff Login Credentials Directory</span>
                      <span className="text-[11px] text-[#8ea89a]">
                        These authorized credentials allow staff to log into the Dovaan Management Console.
                      </span>
                    </div>
                  </div>

                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#d4af37]/30 text-[#8ea89a] uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-3">Login ID / Username</th>
                        <th className="py-3 px-3">Staff Name</th>
                        <th className="py-3 px-3">Assigned Role</th>
                        <th className="py-3 px-3">Password</th>
                        <th className="py-3 px-3">Last Login</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d4af37]/15">
                      {staffList.map((staff) => (
                        <tr key={staff.id} className="hover:bg-[#072418]/60 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-[#fcedc2] whitespace-nowrap">
                            {staff.loginId}
                          </td>
                          <td className="py-3 px-3 text-white font-medium">
                            {staff.fullName}
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-[#0b3323] text-[#d4af37] border border-[#d4af37]/30">
                              {staff.role}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-mono text-[11px] text-[#a3c2b3]">
                            {editingStaffId === staff.id ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="text"
                                  value={newPasswordVal}
                                  onChange={(e) => setNewPasswordVal(e.target.value)}
                                  placeholder="New Password"
                                  className="bg-[#03140c] border border-[#d4af37] rounded px-2 py-1 text-white text-xs w-28"
                                />
                                <button
                                  onClick={() => handleUpdatePassword(staff.id)}
                                  className="px-2 py-1 bg-gold-gradient text-[#04160d] font-bold rounded text-[10px]"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingStaffId(null)}
                                  className="px-2 py-1 bg-stone-800 text-stone-300 rounded text-[10px]"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-white text-xs">
                                  {visiblePasswords[staff.id] ? staff.passwordHash : '••••••••'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setVisiblePasswords((prev) => ({
                                      ...prev,
                                      [staff.id]: !prev[staff.id],
                                    }))
                                  }
                                  className="text-[#8ea89a] hover:text-[#d4af37] cursor-pointer"
                                  title={visiblePasswords[staff.id] ? 'Hide Password' : 'Show Password'}
                                >
                                  {visiblePasswords[staff.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingStaffId(staff.id);
                                    setNewPasswordVal(staff.passwordHash);
                                  }}
                                  className="text-[10px] text-[#d4af37] underline hover:text-white cursor-pointer ml-1"
                                  title="Change Password"
                                >
                                  Edit
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3 text-[#8ea89a] text-[11px] whitespace-nowrap">
                            {staff.lastLogin ? staff.lastLogin.slice(0, 16).replace('T', ' ') : 'Never'}
                          </td>
                          <td className="py-3 px-3 text-right whitespace-nowrap">
                            {staff.id === currentStaff?.id ? (
                              <span className="text-[10px] text-[#8ea89a] italic">Active</span>
                            ) : staff.role === 'superadmin' && staffList.filter((s) => s.role === 'superadmin').length <= 1 ? (
                              <span className="text-[10px] text-[#8ea89a] italic">Primary Admin</span>
                            ) : confirmDeleteStaffId === staff.id ? (
                              <div className="inline-flex items-center gap-1.5 bg-[#03140c] border border-red-500/60 px-2 py-1 rounded">
                                <span className="text-[10px] text-red-300 font-semibold">Delete?</span>
                                <button
                                  onClick={() => executeDeleteStaff(staff.id)}
                                  className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold cursor-pointer"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteStaffId(null)}
                                  className="px-1.5 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-[10px] cursor-pointer"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDeleteStaffId(staff.id)}
                                className="p-1.5 text-red-400 hover:text-red-200 hover:bg-red-950/60 rounded cursor-pointer border border-transparent hover:border-red-500/30 transition-colors"
                                title="Delete staff account"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
