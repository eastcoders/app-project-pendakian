import React, { useState, useMemo } from 'react';
import {
    ArrowLeft,
    Share2,
    Heart,
    MapPin,
    Star,
    Mountain,
    Activity,
    CheckCircle2,
    Calendar,
    Minus,
    Plus,
    Tent,
    Backpack,
    Ticket,
    ChevronRight,
    Users,
    Route,
    Clock,
    Navigation
} from 'lucide-react';
import { jalurPendakian, basecamps, getJalurByGunung, getBasecampsByJalur, getLayananByBasecamp } from '../../data/mockData';

const MountainDetailPage = ({
    mountain,
    onBack,
    onBasecampSelect, // New: callback when user selects basecamp to view services
    defaultAddons = [
        { id: 'ticket', name: 'Tiket Masuk', price: 15000, type: 'required', unit: 'person' },
        { id: 'tent', name: 'Sewa Tenda (4P)', price: 75000, type: 'optional', unit: 'day' },
        { id: 'porter', name: 'Jasa Porter', price: 350000, type: 'optional', unit: 'day' }
    ]
}) => {

    // -- Tab State --
    const [activeTab, setActiveTab] = useState('route'); // Default to Route for flow

    // -- Route Selection State --
    const [selectedJalur, setSelectedJalur] = useState(null);
    const [selectedBasecamp, setSelectedBasecamp] = useState(null);

    // -- Booking Config State --
    const [hikerCount, setHikerCount] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedAddons, setSelectedAddons] = useState(['ticket']);

    // -- Get trails for this mountain --
    const mountainTrails = useMemo(() => {
        return getJalurByGunung(mountain?.id) || [];
    }, [mountain?.id]);

    // -- Get basecamps for selected trail --
    const trailBasecamps = useMemo(() => {
        if (!selectedJalur) return [];
        return getBasecampsByJalur(selectedJalur.id) || [];
    }, [selectedJalur]);

    // -- Mock Dates --
    const dates = useMemo(() => {
        const today = new Date();
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push({
                dayName: date.toLocaleDateString('id-ID', { weekday: 'short' }),
                dayNumber: date.getDate(),
                fullDate: date.toISOString().split('T')[0],
                disabled: false
            });
        }
        return days;
    }, []);

    // -- Handlers --
    const handleHikerChange = (delta) => {
        setHikerCount(prev => Math.max(1, prev + delta));
    };

    const handleJalurSelect = (jalur) => {
        setSelectedJalur(jalur);
        setSelectedBasecamp(null); // Reset basecamp when changing trail
    };

    const handleBasecampSelect = (basecamp) => {
        setSelectedBasecamp(basecamp);
        // Navigate to basecamp services or switch to add-ons tab
        if (onBasecampSelect) {
            onBasecampSelect(basecamp, selectedJalur, mountain);
        }
    };

    const toggleAddon = (addonId) => {
        if (addonId === 'ticket') return;
        setSelectedAddons(prev => {
            if (prev.includes(addonId)) {
                return prev.filter(id => id !== addonId);
            } else {
                return [...prev, addonId];
            }
        });
    };

    // -- Calculations --
    const totalPrice = useMemo(() => {
        let total = 0;
        defaultAddons.forEach(addon => {
            if (selectedAddons.includes(addon.id)) {
                if (addon.unit === 'person') {
                    total += addon.price * hikerCount;
                } else {
                    total += addon.price;
                }
            }
        });
        return total;
    }, [selectedAddons, hikerCount, defaultAddons]);

    // Check if user can proceed
    const canProceed = selectedJalur && selectedBasecamp;

    return (
        <div className="relative flex flex-col min-h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden font-display max-w-md mx-auto shadow-2xl">

            {/* --- TOP NAVIGATION (Absolute) --- */}
            <div className="absolute top-0 left-0 w-full z-30 p-5 pt-8 flex items-center justify-between pointer-events-none">
                <button
                    onClick={onBack}
                    className="pointer-events-auto flex w-10 h-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/30 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="pointer-events-auto flex items-center gap-3">
                    <button className="flex w-10 h-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/30 transition-colors">
                        <Heart size={20} />
                    </button>
                    <button className="flex w-10 h-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/30 transition-colors">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            {/* --- HERO IMAGE (Fixed) --- */}
            <div className="absolute top-0 w-full h-[45vh] z-0">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${mountain?.imageUrl || 'https://images.unsplash.com/photo-1605548230624-8d2d639e7021?q=80&w=2671&auto=format&fit=crop'})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
                </div>
            </div>

            {/* --- CONTENT SCROLL CONTAINER --- */}
            <div className="absolute top-0 w-full h-full overflow-y-auto hide-scrollbar z-10 pt-[38vh]">

                {/* --- MAIN SHEET --- */}
                <div className="relative w-full bg-background-light dark:bg-background-dark rounded-t-[2.5rem] min-h-screen shadow-[0_-8px_20px_rgba(0,0,0,0.1)] pb-32">

                    {/* Drag Handle */}
                    <div className="w-full flex justify-center pt-3 pb-1">
                        <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600/50"></div>
                    </div>

                    {/* Header Info */}
                    <div className="px-6 pt-4 pb-2">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-text-dark dark:text-white tracking-tight text-3xl font-extrabold leading-tight">
                                    {mountain?.nama_gunung || 'Mount Merbabu'}
                                </h1>
                                <div className="flex items-center gap-1.5 mt-2 text-gray-500 dark:text-gray-400">
                                    <MapPin size={16} className="text-primary-neon" />
                                    <p className="text-sm font-medium">{mountain?.provinsi || 'Central Java, Indonesia'}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star size={20} fill="currentColor" />
                                    <span className="text-text-dark dark:text-white font-bold text-lg">{mountain?.rating || 4.7}</span>
                                </div>
                                <span className="text-xs text-gray-400 dark:text-gray-500">({mountain?.totalReviews || '1.2k'} reviews)</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Chips */}
                    <div className="flex gap-3 px-6 py-5 overflow-x-auto hide-scrollbar">
                        <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#e7fdf2] dark:bg-primary-neon/10 pl-3 pr-4 border border-transparent dark:border-primary-neon/20">
                            <Mountain size={18} className="text-primary-neon" />
                            <p className="text-text-dark dark:text-white text-sm font-bold">{mountain?.mdpl || '3145'} mdpl</p>
                        </div>
                        <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#e7fdf2] dark:bg-primary-neon/10 pl-3 pr-4 border border-transparent dark:border-primary-neon/20">
                            <Activity size={18} className="text-primary-neon" />
                            <p className="text-text-dark dark:text-white text-sm font-bold">{mountain?.difficulty || 'Moderate'}</p>
                        </div>
                        <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#e7fdf2] dark:bg-primary-neon/10 pl-3 pr-4 border border-transparent dark:border-primary-neon/20">
                            <CheckCircle2 size={18} className="text-primary-neon" />
                            <p className="text-text-dark dark:text-white text-sm font-bold">{mountain?.status || 'Open'}</p>
                        </div>
                    </div>

                    <div className="h-px w-full bg-gray-100 dark:bg-gray-800/50 my-2"></div>

                    {/* Tabs */}
                    <div className="px-6 mb-6">
                        <div className="flex w-full border-b border-gray-200 dark:border-gray-700/50">
                            {['Overview', 'Route', 'Add-ons'].map((tab) => {
                                const isActive = activeTab === tab.toLowerCase();
                                const slug = tab.toLowerCase();
                                return (
                                    <button
                                        key={slug}
                                        onClick={() => setActiveTab(slug)}
                                        className={`flex-1 pb-3 pt-2 text-center text-sm transition-all ${isActive
                                            ? 'font-bold text-text-dark dark:text-white relative'
                                            : 'font-semibold text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
                                            }`}
                                    >
                                        {tab}
                                        {isActive && (
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-neon rounded-t-full shadow-[0_-2px_6px_rgba(19,236,128,0.4)]"></span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- TAB CONTENT: OVERVIEW --- */}
                    {activeTab === 'overview' && (
                        <div className="px-6 flex flex-col gap-6 animate-in fade-in duration-300">
                            <div>
                                <h3 className="text-text-dark dark:text-white font-bold text-base mb-2">Tentang Gunung</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {mountain?.nama_gunung || 'Gunung ini'} adalah salah satu destinasi pendakian populer di Indonesia
                                    dengan ketinggian {mountain?.mdpl || '3145'} mdpl. Terletak di {mountain?.provinsi || 'Jawa Tengah'},
                                    gunung ini menawarkan pemandangan alam yang memukau dan jalur pendakian yang menantang.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-text-dark dark:text-white font-bold text-base mb-3">Jalur Tersedia</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {mountainTrails.map((jalur) => (
                                        <div key={jalur.id} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                            <span className="text-sm font-medium text-text-dark dark:text-white">{jalur.nama_jalur}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-text-dark dark:text-white font-bold text-base mb-3">Estimasi Waktu</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {mountain?.estimatedDays || '2-3 hari'} pendakian
                                </p>
                            </div>
                        </div>
                    )}

                    {/* --- TAB CONTENT: ROUTE (Jalur & Basecamp Selection) --- */}
                    {activeTab === 'route' && (
                        <div className="px-6 flex flex-col gap-6 animate-in fade-in duration-300">

                            {/* Step 1: Select Trail */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-text-dark dark:text-white font-bold text-base flex items-center gap-2">
                                    <Route size={18} className="text-primary-neon" />
                                    Pilih Jalur Pendakian
                                </h3>

                                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-6 px-6">
                                    {mountainTrails.length > 0 ? (
                                        mountainTrails.map((jalur) => {
                                            const isSelected = selectedJalur?.id === jalur.id;
                                            return (
                                                <button
                                                    key={jalur.id}
                                                    onClick={() => handleJalurSelect(jalur)}
                                                    className={`flex flex-col items-start min-w-[160px] p-4 rounded-2xl border transition-all ${isSelected
                                                            ? 'bg-primary-neon text-text-dark border-primary-neon shadow-[0_4px_16px_rgba(19,236,128,0.3)]'
                                                            : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800'
                                                        }`}
                                                >
                                                    <span className={`font-bold text-sm ${isSelected ? '' : 'text-text-dark dark:text-white'}`}>
                                                        {jalur.nama_jalur}
                                                    </span>
                                                    <div className={`flex items-center gap-1 mt-2 ${isSelected ? 'opacity-80' : 'text-gray-500'}`}>
                                                        <Clock size={12} />
                                                        <span className="text-xs">{jalur.estimatedTime}</span>
                                                    </div>
                                                    <div className={`flex items-center gap-1 mt-1 ${isSelected ? 'opacity-80' : 'text-gray-500'}`}>
                                                        <Navigation size={12} />
                                                        <span className="text-xs">{jalur.distance}</span>
                                                    </div>
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <p className="text-gray-400 text-sm">Tidak ada jalur tersedia</p>
                                    )}
                                </div>
                            </div>

                            {/* Step 2: Select Basecamp (Only show if trail selected) */}
                            {selectedJalur && (
                                <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <h3 className="text-text-dark dark:text-white font-bold text-base flex items-center gap-2">
                                        <Tent size={18} className="text-primary-neon" />
                                        Pilih Basecamp
                                    </h3>

                                    {trailBasecamps.length > 0 ? (
                                        <div className="flex flex-col gap-3">
                                            {trailBasecamps.map((basecamp) => {
                                                const isSelected = selectedBasecamp?.id === basecamp.id;
                                                return (
                                                    <button
                                                        key={basecamp.id}
                                                        onClick={() => handleBasecampSelect(basecamp)}
                                                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isSelected
                                                                ? 'bg-[#e7fdf2] dark:bg-primary-neon/5 border-primary-neon dark:border-primary-neon/30'
                                                                : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-12 h-12 rounded-xl overflow-hidden bg-gray-100`}>
                                                                <img
                                                                    src={basecamp.imageUrl}
                                                                    alt={basecamp.nama_basecamp}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="text-left">
                                                                <h4 className="font-bold text-text-dark dark:text-white text-sm">
                                                                    {basecamp.nama_basecamp}
                                                                </h4>
                                                                <div className="flex items-center gap-2 mt-0.5">
                                                                    <div className="flex items-center gap-0.5">
                                                                        <Star size={12} className="text-orange-400" fill="currentColor" />
                                                                        <span className="text-xs text-gray-600">{basecamp.rating}</span>
                                                                    </div>
                                                                    {basecamp.isVerified && (
                                                                        <span className="text-[10px] text-blue-500 font-medium">✓ Verified</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <ChevronRight size={20} className={isSelected ? 'text-primary-neon' : 'text-gray-400'} />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <p className="text-gray-400 text-sm">Tidak ada basecamp tersedia untuk jalur ini</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Selection Summary */}
                            {selectedJalur && (
                                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Pilihan Anda</h4>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-text-dark dark:text-white">
                                            <span className="text-gray-500">Jalur:</span> {selectedJalur.nama_jalur}
                                        </p>
                                        {selectedBasecamp && (
                                            <p className="text-sm text-text-dark dark:text-white">
                                                <span className="text-gray-500">Basecamp:</span> {selectedBasecamp.nama_basecamp}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- TAB CONTENT: ADD-ONS & CONFIG --- */}
                    {activeTab === 'addons' && (
                        <div className="px-6 flex flex-col gap-8 animate-in fade-in duration-300">

                            {/* Notice if no basecamp selected */}
                            {!selectedBasecamp && (
                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800">
                                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                        Silakan pilih jalur dan basecamp terlebih dahulu di tab "Route"
                                    </p>
                                </div>
                            )}

                            {/* 1. Date Picker */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-text-dark dark:text-white font-bold text-base flex items-center gap-2">
                                    <Calendar size={18} className="text-primary-neon" />
                                    Pilih Tanggal
                                </h3>
                                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-6 px-6">
                                    {dates.map((date, idx) => {
                                        const isSelected = selectedDate === date.fullDate;
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedDate(date.fullDate)}
                                                className={`flex flex-col items-center justify-center min-w-[70px] h-[84px] rounded-2xl border transition-all ${isSelected
                                                        ? 'bg-primary-neon text-text-dark border-primary-neon shadow-[0_4px_16px_rgba(19,236,128,0.3)]'
                                                        : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400'
                                                    }`}
                                            >
                                                <span className={`text-xs font-medium mb-1 ${isSelected ? 'opacity-80' : ''}`}>{date.dayName}</span>
                                                <span className="text-xl font-extrabold">{date.dayNumber}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* 2. Hikers Counter */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-text-dark dark:text-white font-bold text-base flex items-center gap-2">
                                    <Users size={18} className="text-primary-neon" />
                                    Jumlah Pendaki
                                </h3>
                                <div className="flex items-center justify-between bg-white dark:bg-surface-dark p-2 rounded-2xl border border-gray-100 dark:border-gray-800">
                                    <button
                                        onClick={() => handleHikerChange(-1)}
                                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-[#15231c] text-text-dark dark:text-white hover:bg-gray-100 transition-colors"
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <span className="text-xl font-bold text-text-dark dark:text-white">{hikerCount} <span className="text-sm font-normal text-gray-400">Orang</span></span>
                                    <button
                                        onClick={() => handleHikerChange(1)}
                                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-neon text-text-dark hover:bg-opacity-90 transition-colors shadow-lg shadow-primary-neon/20"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* 3. Add-ons List */}
                            <div className="flex flex-col gap-3">
                                <h3 className="text-text-dark dark:text-white font-bold text-base flex items-center gap-2">
                                    <Backpack size={18} className="text-primary-neon" />
                                    Tambahan & Fasilitas
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {defaultAddons.map((addon) => {
                                        const isChecked = selectedAddons.includes(addon.id);
                                        const isRequired = addon.type === 'required';

                                        return (
                                            <div
                                                key={addon.id}
                                                onClick={() => !isRequired && toggleAddon(addon.id)}
                                                className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${isChecked
                                                        ? 'bg-[#e7fdf2] dark:bg-primary-neon/5 border-primary-neon dark:border-primary-neon/30'
                                                        : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isChecked ? 'bg-primary-neon text-text-dark' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                                                        }`}>
                                                        {addon.id === 'ticket' && <Ticket size={18} />}
                                                        {addon.id === 'tent' && <Tent size={18} />}
                                                        {addon.id === 'porter' && <Users size={18} />}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-text-dark dark:text-white text-sm">{addon.name}</h4>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {addon.type === 'required' ? 'Wajib' : 'Opsional'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-sm font-bold text-primary-neon">
                                                        Rp {addon.price.toLocaleString('id-ID')}
                                                    </span>
                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-1 ${isChecked
                                                            ? 'bg-primary-neon border-primary-neon'
                                                            : 'border-gray-300 dark:border-gray-600'
                                                        }`}>
                                                        {isChecked && <CheckCircle2 size={12} className="text-text-dark" />}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    )}

                </div>
            </div>

            {/* --- STICKY BOTTOM BAR --- */}
            <div className="absolute bottom-0 w-full bg-white dark:bg-[#0e1f16]/95 dark:backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-5 pb-8 z-40 flex items-center justify-between shadow-[0_-4px_30px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Total Estimasi</span>
                    <div className="flex items-end gap-1">
                        <span className="text-2xl font-extrabold text-text-dark dark:text-primary-neon">
                            Rp {totalPrice.toLocaleString('id-ID')}
                        </span>
                    </div>
                </div>
                <button
                    disabled={!canProceed}
                    className={`h-14 rounded-[20px] pl-8 pr-6 font-bold text-base shadow-lg transition-all flex items-center gap-3 ${canProceed
                            ? 'bg-text-dark dark:bg-white text-white dark:text-text-dark shadow-black/10 hover:opacity-90 active:scale-95'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    {activeTab === 'route' ? 'Lihat Layanan' : 'Book Now'}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${canProceed ? 'bg-white/20 dark:bg-black/10' : 'bg-gray-300 dark:bg-gray-600'
                        }`}>
                        <ChevronRight size={18} />
                    </div>
                </button>
            </div>

        </div>
    );
};

export default MountainDetailPage;
