import React, { useState, useEffect } from 'react';
import MarketplaceHeader from './MarketplaceHeader';
import CategoryFilter from './CategoryFilter';
import SectionHeader from './SectionHeader';
import MountainCard from './MountainCard';
import GearCard from './GearCard';
import MarketplaceSkeleton from './MarketplaceSkeleton';
import SearchSkeleton from './SearchSkeleton';
import SearchResults from './SearchResults';
import EmptyState from './EmptyState';
import MountainDetailPage from './MountainDetailPage';
import BasecampServicesPage from './BasecampServicesPage';
import { MountainGridView, OpenTripGridView, ServiceGroupedView } from './views';
import { CheckoutPage, PaymentPage, BookingSuccessPage } from './booking';
import useDebounce from '../../hooks/useDebounce';
import {
    categories,
    gunungData,
    basecamps,
    layananBasecamp,
    getLayananByType
} from '../../data/mockData';

const MarketplacePage = ({ onBack }) => {
    // UI State
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(1); // 'Semua'

    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedQuery = useDebounce(searchQuery, 500);
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState({
        mountains: [],
        basecamps: [],
        services: []
    });

    // Filtered Data State (for default view)
    const [filteredLayanan, setFilteredLayanan] = useState([]);

    // Detail Page State
    const [selectedMountain, setSelectedMountain] = useState(null);

    // Basecamp Services Page State
    const [selectedBasecamp, setSelectedBasecamp] = useState(null);
    const [selectedJalur, setSelectedJalur] = useState(null);

    // Booking Flow State
    const [bookingStep, setBookingStep] = useState(null); // null | 'checkout' | 'payment' | 'success'
    const [cartItems, setCartItems] = useState([]);
    const [bookingDetails, setBookingDetails] = useState({
        mountain: null,
        jalur: null,
        basecamp: null,
        hikerCount: 1,
        selectedDate: null
    });
    const [paymentData, setPaymentData] = useState(null);

    // Simulate initial data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Filter layanan based on active category (Default View)
    useEffect(() => {
        if (activeCategory === 1) { // Semua
            setFilteredLayanan(getLayananByType('equipment'));
        } else if (activeCategory === 4) { // Sewa Alat
            setFilteredLayanan(getLayananByType('equipment'));
        } else if (activeCategory === 5) { // Porter
            setFilteredLayanan(getLayananByType('porter'));
        } else if (activeCategory === 6) { // Guide
            setFilteredLayanan(getLayananByType('guide'));
        } else {
            setFilteredLayanan(layananBasecamp.slice(0, 5));
        }
    }, [activeCategory]);

    // Advanced Search Logic
    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSearchResults({ mountains: [], basecamps: [], services: [] });
            return;
        }

        setIsSearching(true);

        const timer = setTimeout(() => {
            const query = debouncedQuery.toLowerCase();

            const showMountains = activeCategory === 1 || activeCategory === 2;
            const mountains = showMountains ? gunungData.filter(m =>
                m.nama_gunung.toLowerCase().includes(query) ||
                m.provinsi.toLowerCase().includes(query)
            ) : [];

            const showBasecamps = activeCategory === 1;
            const filteredBasecamps = showBasecamps ? basecamps.filter(b =>
                b.nama_basecamp.toLowerCase().includes(query)
            ) : [];

            const services = layananBasecamp.filter(item => {
                let typeMatch = true;
                if (activeCategory === 3) typeMatch = item.type === 'package';
                if (activeCategory === 4) typeMatch = item.type === 'equipment';
                if (activeCategory === 5) typeMatch = item.type === 'porter';
                if (activeCategory === 6) typeMatch = item.type === 'guide';

                if (!typeMatch) return false;

                return (
                    item.nama_layanan.toLowerCase().includes(query) ||
                    (item.deskripsi_layanan && item.deskripsi_layanan.toLowerCase().includes(query))
                );
            });

            setSearchResults({
                mountains,
                basecamps: filteredBasecamps,
                services
            });
            setIsSearching(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [debouncedQuery, activeCategory]);

    // Handlers
    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const handleBasecampSelect = (basecamp, jalur, mountain) => {
        setSelectedBasecamp(basecamp);
        setSelectedJalur(jalur);
        // Keep selectedMountain for back navigation context
    };

    const handleBackFromBasecamp = () => {
        setSelectedBasecamp(null);
        setSelectedJalur(null);
        // Return to mountain detail
    };

    const handleServiceAdd = (service) => {
        console.log('Add to cart:', service);
    };

    // Calculate cart summary
    const cartSummary = {
        totalItems: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: cartItems.reduce((acc, item) => acc + (item.harga * item.quantity), 0),
        serviceFee: Math.round(cartItems.reduce((acc, item) => acc + (item.harga * item.quantity), 0) * 0.025),
        get total() { return this.subtotal + this.serviceFee; },
        items: cartItems
    };

    // Checkout handlers
    const handleCheckout = (cart, services) => {
        // Convert cart object to array with service details
        const items = Object.entries(cart).map(([id, qty]) => {
            const service = services.find(s => s.id === parseInt(id));
            return { ...service, quantity: qty };
        }).filter(item => item.quantity > 0);

        setCartItems(items);
        setBookingDetails(prev => ({
            ...prev,
            mountain: selectedMountain,
            jalur: selectedJalur,
            basecamp: selectedBasecamp
        }));
        setBookingStep('checkout');
    };

    const handleUpdateQuantity = (serviceId, quantity) => {
        if (quantity <= 0) {
            setCartItems(prev => prev.filter(item => item.id !== serviceId));
        } else {
            setCartItems(prev => prev.map(item =>
                item.id === serviceId ? { ...item, quantity } : item
            ));
        }
    };

    const handleRemoveItem = (serviceId) => {
        setCartItems(prev => prev.filter(item => item.id !== serviceId));
    };

    const handleHikerChange = (count) => {
        setBookingDetails(prev => ({ ...prev, hikerCount: Math.max(1, count) }));
    };

    const handleDateChange = (date) => {
        setBookingDetails(prev => ({ ...prev, selectedDate: date }));
    };

    const handleProceedPayment = (paymentMethod) => {
        setPaymentData({
            method: paymentMethod,
            amount: cartSummary.total,
            orderId: `HKR-${Date.now().toString(36).toUpperCase()}`
        });
        setBookingStep('payment');
    };

    const handlePaymentSuccess = (data) => {
        setPaymentData(prev => ({ ...prev, ...data }));
        setBookingStep('success');
    };

    const handleGoHome = () => {
        // Reset all state
        setSelectedMountain(null);
        setSelectedBasecamp(null);
        setSelectedJalur(null);
        setBookingStep(null);
        setCartItems([]);
        setBookingDetails({
            mountain: null,
            jalur: null,
            basecamp: null,
            hikerCount: 1,
            selectedDate: null
        });
        setPaymentData(null);
    };

    const hasResults = searchResults.mountains.length > 0 ||
        searchResults.basecamps.length > 0 ||
        searchResults.services.length > 0;

    // Get filter type for ServiceGroupedView
    const getServiceFilterType = () => {
        if (activeCategory === 4) return 'equipment';
        if (activeCategory === 5) return 'porter';
        if (activeCategory === 6) return 'guide';
        return null;
    };

    // Get open trip packages
    const openTripPackages = layananBasecamp.filter(l => l.type === 'package');

    // View: Initial Full Page Skeleton
    if (isLoading) {
        return <MarketplaceSkeleton />;
    }

    // View: Mountain Detail Page
    if (selectedMountain && !selectedBasecamp) {
        return (
            <MountainDetailPage
                mountain={selectedMountain}
                onBack={() => setSelectedMountain(null)}
                onBasecampSelect={handleBasecampSelect}
            />
        );
    }

    // View: Basecamp Services Page
    if (selectedBasecamp && !bookingStep) {
        return (
            <BasecampServicesPage
                basecamp={selectedBasecamp}
                jalur={selectedJalur}
                mountain={selectedMountain}
                onBack={handleBackFromBasecamp}
                onCheckout={handleCheckout}
            />
        );
    }

    // View: Checkout Page
    if (bookingStep === 'checkout') {
        return (
            <CheckoutPage
                cartItems={cartItems}
                bookingDetails={bookingDetails}
                cartSummary={cartSummary}
                onBack={() => setBookingStep(null)}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onHikerChange={handleHikerChange}
                onDateChange={handleDateChange}
                onProceedPayment={handleProceedPayment}
            />
        );
    }

    // View: Payment Page
    if (bookingStep === 'payment') {
        return (
            <PaymentPage
                paymentMethod={paymentData?.method}
                amount={paymentData?.amount}
                bookingId={paymentData?.orderId}
                onBack={() => setBookingStep('checkout')}
                onPaymentSuccess={handlePaymentSuccess}
            />
        );
    }

    // View: Booking Success Page
    if (bookingStep === 'success') {
        return (
            <BookingSuccessPage
                bookingData={{
                    ...bookingDetails,
                    ...paymentData,
                    items: cartItems
                }}
                onGoHome={handleGoHome}
                onViewBookings={() => console.log('View bookings')}
            />
        );
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-8 max-w-md mx-auto bg-background-light">
            {/* Header with Search */}
            <MarketplaceHeader
                onBack={onBack}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClearSearch={handleClearSearch}
            />

            {/* Category Filter Chips */}
            <CategoryFilter
                categories={categories}
                onCategoryChange={handleCategoryChange}
            />

            {/* Main Content Area */}
            <div className="flex-1 min-h-[50vh]">

                {/* STATE 1: Searching (Skeleton) */}
                {isSearching && searchQuery && (
                    <SearchSkeleton />
                )}

                {/* STATE 2: Search Results */}
                {!isSearching && searchQuery && hasResults && (
                    <div className="pt-4">
                        <SearchResults
                            results={searchResults}
                            totalCount={searchResults.mountains.length + searchResults.basecamps.length + searchResults.services.length}
                        />
                    </div>
                )}

                {/* STATE 3: No Results */}
                {!isSearching && searchQuery && !hasResults && (
                    <EmptyState
                        query={searchQuery}
                        onClear={handleClearSearch}
                    />
                )}

                {/* STATE 4: Filter Views (No Search) */}
                {!searchQuery && (
                    <>
                        {/* FILTER: Semua (Default Dashboard) */}
                        {activeCategory === 1 && (
                            <>
                                {/* Section: Popular Mountains */}
                                <div className="flex flex-col pt-6">
                                    <SectionHeader
                                        title="Gunung Populer"
                                        onSeeAll={() => setActiveCategory(2)}
                                    />
                                    <div className="flex overflow-x-auto hide-scrollbar px-4 pb-8 -mr-4 gap-4 snap-x snap-mandatory">
                                        {gunungData.map((mountain) => (
                                            <MountainCard
                                                key={mountain.id}
                                                mountain={mountain}
                                                onClick={setSelectedMountain}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Section: Sewa Alat */}
                                <div className="flex flex-col pt-2 pb-6">
                                    <SectionHeader
                                        title="Sewa Alat Pendakian"
                                        onSeeAll={() => setActiveCategory(4)}
                                    />
                                    <div className="flex overflow-x-auto hide-scrollbar px-4 pb-4 gap-4">
                                        {filteredLayanan.map((gear) => (
                                            <GearCard key={gear.id} gear={gear} />
                                        ))}
                                    </div>
                                </div>

                                {/* Section: Paket Pendakian */}
                                <div className="flex flex-col pt-2 pb-6">
                                    <SectionHeader
                                        title="Paket Pendakian"
                                        onSeeAll={() => setActiveCategory(3)}
                                    />
                                    <div className="flex overflow-x-auto hide-scrollbar px-4 pb-4 gap-4">
                                        {openTripPackages.map((pkg) => (
                                            <GearCard key={pkg.id} gear={pkg} />
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* FILTER: Gunung (2-Column Grid) */}
                        {activeCategory === 2 && (
                            <MountainGridView
                                mountains={gunungData}
                                onMountainClick={setSelectedMountain}
                            />
                        )}

                        {/* FILTER: Open Trip (2-Column Grid) */}
                        {activeCategory === 3 && (
                            <OpenTripGridView
                                trips={openTripPackages}
                                onTripClick={(trip) => console.log('Open trip detail:', trip)}
                            />
                        )}

                        {/* FILTER: Alat / Porter / Guide (Grouped by Basecamp) */}
                        {(activeCategory === 4 || activeCategory === 5 || activeCategory === 6) && (
                            <ServiceGroupedView
                                basecamps={basecamps}
                                services={layananBasecamp}
                                filterType={getServiceFilterType()}
                                onServiceAdd={handleServiceAdd}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MarketplacePage;
