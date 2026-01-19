// Comprehensive Marketplace Mock Data based on Database Schema
// Tables: Gunung, Jalur Pendakian, Basecamps, Layanan Basecamp, User

// ============================================
// USERS (Vendors/Hikers)
// ============================================
export const users = [
    {
        id: 1,
        name: 'Rinjani Basecamp Official',
        username: 'rinjani_basecamp',
        email: 'info@rinjanibasecamp.id',
        bio: 'Official basecamp partner untuk pendakian Gunung Rinjani via Senaru',
        gender: 'other',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        role: 'vendor',
        address: {
            zip_code: '83354',
            city: 'Lombok Utara',
            province: 'Nusa Tenggara Barat',
            address: 'Jl. Pariwisata Senaru No. 15'
        }
    },
    {
        id: 2,
        name: 'Semeru Adventure',
        username: 'semeru_adventure',
        email: 'hello@semeruadventure.com',
        bio: 'Penyedia layanan pendakian Gunung Semeru sejak 2015',
        gender: 'other',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        role: 'vendor',
        address: {
            zip_code: '67184',
            city: 'Lumajang',
            province: 'Jawa Timur',
            address: 'Desa Ranu Pani, Senduro'
        }
    },
    {
        id: 3,
        name: 'Bromo Sunrise Camp',
        username: 'bromo_sunrise',
        email: 'booking@bromosunrise.id',
        bio: 'Pengalaman sunrise terbaik di Gunung Bromo',
        gender: 'other',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        role: 'vendor',
        address: {
            zip_code: '67254',
            city: 'Probolinggo',
            province: 'Jawa Timur',
            address: 'Desa Ngadisari, Sukapura'
        }
    },
    {
        id: 4,
        name: 'Merbabu Gear Rental',
        username: 'merbabu_gear',
        email: 'rent@merbabugear.com',
        bio: 'Sewa alat pendakian lengkap untuk Merbabu & Merapi',
        gender: 'other',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
        role: 'vendor',
        address: {
            zip_code: '57316',
            city: 'Boyolali',
            province: 'Jawa Tengah',
            address: 'Jl. Selo-Boyolali Km 20'
        }
    }
];

// ============================================
// GUNUNG (Mountains)
// ============================================
export const gunungData = [
    {
        id: 1,
        nama_gunung: 'Gunung Rinjani',
        mdpl: 3726,
        provinsi: 'Nusa Tenggara Barat',
        imageUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=450&fit=crop',
        rating: 4.8,
        totalReviews: 1247,
        difficulty: 'Hard',
        estimatedDays: '3-4 hari',
        isFavorite: false
    },
    {
        id: 2,
        nama_gunung: 'Gunung Semeru',
        mdpl: 3676,
        provinsi: 'Jawa Timur',
        imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=600&h=450&fit=crop',
        rating: 4.9,
        totalReviews: 2156,
        difficulty: 'Hard',
        estimatedDays: '2-3 hari',
        isFavorite: true
    },
    {
        id: 3,
        nama_gunung: 'Gunung Bromo',
        mdpl: 2329,
        provinsi: 'Jawa Timur',
        imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&h=450&fit=crop',
        rating: 4.7,
        totalReviews: 3421,
        difficulty: 'Easy',
        estimatedDays: '1 hari',
        isFavorite: false
    },
    {
        id: 4,
        nama_gunung: 'Gunung Merbabu',
        mdpl: 3145,
        provinsi: 'Jawa Tengah',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=450&fit=crop',
        rating: 4.6,
        totalReviews: 1893,
        difficulty: 'Medium',
        estimatedDays: '2 hari',
        isFavorite: false
    },
    {
        id: 5,
        nama_gunung: 'Gunung Prau',
        mdpl: 2565,
        provinsi: 'Jawa Tengah',
        imageUrl: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&h=450&fit=crop',
        rating: 4.5,
        totalReviews: 2784,
        difficulty: 'Easy',
        estimatedDays: '1-2 hari',
        isFavorite: false
    }
];

// ============================================
// JALUR PENDAKIAN (Hiking Trails)
// ============================================
export const jalurPendakian = [
    { id: 1, gunung_id: 1, nama_jalur: 'Senaru', estimatedTime: '10-12 jam', distance: '16 km' },
    { id: 2, gunung_id: 1, nama_jalur: 'Sembalun', estimatedTime: '8-10 jam', distance: '14 km' },
    { id: 3, gunung_id: 2, nama_jalur: 'Ranu Pani', estimatedTime: '12-14 jam', distance: '21 km' },
    { id: 4, gunung_id: 3, nama_jalur: 'Cemoro Lawang', estimatedTime: '2-3 jam', distance: '3 km' },
    { id: 5, gunung_id: 4, nama_jalur: 'Selo', estimatedTime: '5-6 jam', distance: '8 km' },
    { id: 6, gunung_id: 4, nama_jalur: 'Wekas', estimatedTime: '6-7 jam', distance: '9 km' },
    { id: 7, gunung_id: 5, nama_jalur: 'Dieng', estimatedTime: '3-4 jam', distance: '5 km' },
    { id: 8, gunung_id: 5, nama_jalur: 'Patak Banteng', estimatedTime: '4-5 jam', distance: '6 km' },
];

// ============================================
// BASECAMPS (Vendor Stores)
// ============================================
export const basecamps = [
    {
        id: 1,
        user_id: 1,
        jalur_id: 1,
        nama_basecamp: 'Rinjani Basecamp Senaru',
        location_coordinate: '-8.3025, 116.4072',
        rating: 4.8,
        totalReviews: 342,
        isVerified: true,
        imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        user_id: 2,
        jalur_id: 3,
        nama_basecamp: 'Semeru Adventure Camp',
        location_coordinate: '-8.1025, 112.9222',
        rating: 4.9,
        totalReviews: 567,
        isVerified: true,
        imageUrl: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        user_id: 3,
        jalur_id: 4,
        nama_basecamp: 'Bromo View Basecamp',
        location_coordinate: '-7.9425, 112.9530',
        rating: 4.6,
        totalReviews: 891,
        isVerified: true,
        imageUrl: 'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        user_id: 4,
        jalur_id: 5,
        nama_basecamp: 'Selo Mountain Gear',
        location_coordinate: '-7.4592, 110.4461',
        rating: 4.7,
        totalReviews: 234,
        isVerified: false,
        imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=400&h=300&fit=crop'
    }
];

// ============================================
// LAYANAN BASECAMP (Products/Services)
// ============================================
export const layananBasecamp = [
    // Equipment Rentals
    {
        id: 1,
        basecamp_id: 1,
        type: 'equipment',
        unit: 'day',
        harga: 75000,
        stock: 15,
        nama_layanan: 'Tenda Dome 2P',
        deskripsi_layanan: 'Tenda kapasitas 2 orang, tahan angin dan waterproof',
        imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=400&fit=crop',
        isBookmarked: false,
        rating: 4.7
    },
    {
        id: 2,
        basecamp_id: 1,
        type: 'equipment',
        unit: 'day',
        harga: 50000,
        stock: 20,
        nama_layanan: 'Sleeping Bag -5°C',
        deskripsi_layanan: 'Sleeping bag untuk suhu ekstrem hingga -5 derajat',
        imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=400&h=400&fit=crop',
        isBookmarked: true,
        rating: 4.8
    },
    {
        id: 3,
        basecamp_id: 2,
        type: 'equipment',
        unit: 'day',
        harga: 35000,
        stock: 30,
        nama_layanan: 'Trekking Pole (pair)',
        deskripsi_layanan: 'Trekking pole aluminium adjustable',
        imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=400&fit=crop',
        isBookmarked: false,
        rating: 4.5
    },
    {
        id: 4,
        basecamp_id: 2,
        type: 'equipment',
        unit: 'day',
        harga: 45000,
        stock: 10,
        nama_layanan: 'Carrier 60L',
        deskripsi_layanan: 'Tas carrier kapasitas 60 liter dengan frame',
        imageUrl: 'https://images.unsplash.com/photo-1622260614927-208ad5d0a9a5?w=400&h=400&fit=crop',
        isBookmarked: false,
        rating: 4.6
    },
    {
        id: 5,
        basecamp_id: 3,
        type: 'equipment',
        unit: 'day',
        harga: 25000,
        stock: 50,
        nama_layanan: 'Headlamp LED',
        deskripsi_layanan: 'Headlamp 1000 lumens rechargeable',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        isBookmarked: false,
        rating: 4.4
    },
    // Porter Services
    {
        id: 6,
        basecamp_id: 1,
        type: 'porter',
        unit: 'trip',
        harga: 350000,
        stock: 8,
        nama_layanan: 'Porter Profesional',
        deskripsi_layanan: 'Porter berpengalaman, maksimal 15kg bagasi',
        imageUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&h=400&fit=crop',
        isBookmarked: false,
        rating: 4.9
    },
    {
        id: 7,
        basecamp_id: 2,
        type: 'porter',
        unit: 'trip',
        harga: 400000,
        stock: 5,
        nama_layanan: 'Porter + Cook',
        deskripsi_layanan: 'Porter yang juga bisa memasak di basecamp',
        imageUrl: 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=400&h=400&fit=crop',
        isBookmarked: false,
        rating: 4.8
    },
    // Guide Services
    {
        id: 8,
        basecamp_id: 1,
        type: 'guide',
        unit: 'trip',
        harga: 500000,
        stock: 4,
        nama_layanan: 'Guide Bersertifikat',
        deskripsi_layanan: 'Pemandu gunung bersertifikat BNPB',
        imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400&h=400&fit=crop',
        isBookmarked: true,
        rating: 5.0
    },
    {
        id: 9,
        basecamp_id: 3,
        type: 'guide',
        unit: 'trip',
        harga: 300000,
        stock: 6,
        nama_layanan: 'Local Guide Bromo',
        deskripsi_layanan: 'Guide lokal yang paham medan Bromo',
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=400&fit=crop',
        isBookmarked: false,
        rating: 4.7
    },
    // Packages
    {
        id: 10,
        basecamp_id: 2,
        type: 'package',
        unit: 'trip',
        harga: 1500000,
        stock: 10,
        nama_layanan: 'Paket Semeru 3D2N',
        deskripsi_layanan: 'Include: Guide, Porter, Tenda, Makan 3x, Transport lokal',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop',
        isBookmarked: false,
        rating: 4.9
    }
];

// ============================================
// CATEGORIES (for filter chips)
// ============================================
export const categories = [
    { id: 1, name: 'Semua', icon: 'apps', isActive: true },
    { id: 2, name: 'Gunung', icon: 'landscape', isActive: false },
    { id: 3, name: 'Open Trip', icon: 'groups', isActive: false },
    { id: 4, name: 'Sewa Alat', icon: 'backpack', isActive: false },
    { id: 5, name: 'Porter', icon: 'hiking', isActive: false },
    { id: 6, name: 'Guide', icon: 'person_pin', isActive: false },
];

// ============================================
// HELPER FUNCTIONS
// ============================================
export const getBasecampsByJalur = (jalurId) =>
    basecamps.filter(b => b.jalur_id === jalurId);

export const getLayananByBasecamp = (basecampId) =>
    layananBasecamp.filter(l => l.basecamp_id === basecampId);

export const getLayananByType = (type) =>
    layananBasecamp.filter(l => l.type === type);

export const getJalurByGunung = (gunungId) =>
    jalurPendakian.filter(j => j.gunung_id === gunungId);

export const getUserById = (userId) =>
    users.find(u => u.id === userId);

export const getBasecampWithVendor = (basecampId) => {
    const basecamp = basecamps.find(b => b.id === basecampId);
    if (!basecamp) return null;
    return {
        ...basecamp,
        vendor: getUserById(basecamp.user_id)
    };
};

// Legacy exports for backward compatibility
export const popularMountains = gunungData;
export const gearRentals = layananBasecamp.filter(l => l.type === 'equipment').slice(0, 5);

// ============================================
// BOOKING HISTORY (Mock Data for Demo)
// ============================================
export const bookingHistory = [
    {
        id: 'HKR-MKL8F200',
        userId: 1,
        status: 'CONFIRMED', // PENDING, CONFIRMED, ONGOING, COMPLETED, CANCELLED
        mountain: gunungData[0], // Rinjani
        jalur: jalurPendakian[0], // Senaru
        basecamp: basecamps[0], // Rinjani Basecamp Senaru
        services: [
            { ...layananBasecamp[0], quantity: 1 }, // Tenda Dome 2P
            { ...layananBasecamp[5], quantity: 1 }, // Porter Profesional
        ],
        hikerCount: 2,
        selectedDate: '2026-01-25',
        subtotal: 425000,
        serviceFee: 10625,
        totalAmount: 435625,
        createdAt: '2026-01-18T10:30:00',
        paidAt: '2026-01-18T10:35:00',
    },
    {
        id: 'HKR-ABC12345',
        userId: 1,
        status: 'COMPLETED',
        mountain: gunungData[1], // Semeru
        jalur: jalurPendakian[2], // Ranu Pani
        basecamp: basecamps[1], // Semeru Adventure Camp
        services: [
            { ...layananBasecamp[9], quantity: 1 }, // Paket Semeru 3D2N
        ],
        hikerCount: 3,
        selectedDate: '2026-01-10',
        subtotal: 4500000,
        serviceFee: 112500,
        totalAmount: 4612500,
        createdAt: '2026-01-05T14:20:00',
        paidAt: '2026-01-05T14:25:00',
        completedAt: '2026-01-12T18:00:00',
    },
    {
        id: 'HKR-XYZ78901',
        userId: 1,
        status: 'CANCELLED',
        mountain: gunungData[2], // Bromo
        jalur: jalurPendakian[3], // Cemoro Lawang
        basecamp: basecamps[2], // Bromo View Basecamp
        services: [
            { ...layananBasecamp[8], quantity: 1 }, // Local Guide Bromo
        ],
        hikerCount: 1,
        selectedDate: '2026-01-15',
        subtotal: 300000,
        serviceFee: 7500,
        totalAmount: 307500,
        createdAt: '2026-01-12T09:00:00',
        cancelledAt: '2026-01-13T11:30:00',
        cancelReason: 'Perubahan jadwal',
    },
    {
        id: 'HKR-DEF45678',
        userId: 1,
        status: 'ONGOING',
        mountain: gunungData[3], // Merbabu
        jalur: jalurPendakian[4], // Selo
        basecamp: basecamps[3], // Selo Mountain Gear
        services: [
            { ...layananBasecamp[2], quantity: 2 }, // Trekking Pole
            { ...layananBasecamp[3], quantity: 1 }, // Carrier 60L
        ],
        hikerCount: 2,
        selectedDate: '2026-01-19',
        subtotal: 115000,
        serviceFee: 2875,
        totalAmount: 117875,
        createdAt: '2026-01-17T16:00:00',
        paidAt: '2026-01-17T16:05:00',
    },
    {
        id: 'HKR-GHI11223',
        userId: 1,
        status: 'PENDING',
        mountain: gunungData[4], // Prau
        jalur: jalurPendakian[6], // Dieng
        basecamp: null,
        services: [],
        hikerCount: 4,
        selectedDate: '2026-02-01',
        subtotal: 0,
        serviceFee: 0,
        totalAmount: 0,
        createdAt: '2026-01-19T08:00:00',
    },
];

// ============================================
// TRANSACTION HISTORY (Mock Data for Demo)
// ============================================
export const transactionHistory = [
    {
        id: 'TRX-001',
        bookingId: 'HKR-MKL8F200',
        type: 'PAYMENT',
        status: 'SUCCESS',
        amount: 435625,
        paymentMethod: 'QRIS',
        createdAt: '2026-01-18T10:35:00',
    },
    {
        id: 'TRX-002',
        bookingId: 'HKR-ABC12345',
        type: 'PAYMENT',
        status: 'SUCCESS',
        amount: 4612500,
        paymentMethod: 'QRIS',
        createdAt: '2026-01-05T14:25:00',
    },
    {
        id: 'TRX-003',
        bookingId: 'HKR-XYZ78901',
        type: 'REFUND',
        status: 'SUCCESS',
        amount: 307500,
        paymentMethod: 'QRIS',
        createdAt: '2026-01-13T12:00:00',
    },
    {
        id: 'TRX-004',
        bookingId: 'HKR-DEF45678',
        type: 'PAYMENT',
        status: 'SUCCESS',
        amount: 117875,
        paymentMethod: 'QRIS',
        createdAt: '2026-01-17T16:05:00',
    },
];

// ============================================
// BOOKING HELPER FUNCTIONS
// ============================================
export const getBookingById = (bookingId) =>
    bookingHistory.find(b => b.id === bookingId);

export const getBookingsByStatus = (status) =>
    bookingHistory.filter(b => b.status === status);

export const getTransactionsByBooking = (bookingId) =>
    transactionHistory.filter(t => t.bookingId === bookingId);
