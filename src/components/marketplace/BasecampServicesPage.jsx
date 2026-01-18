import React, { useState, useMemo } from 'react';
import {
    ArrowLeft,
    Share2,
    Star,
    ChevronRight,
    Plus,
    Minus,
    ShoppingCart,
    CheckCircle2,
    MapPin,
    Phone,
    Clock
} from 'lucide-react';
import MaterialIcon from './MaterialIcon';
import { getLayananByBasecamp, getUserById } from '../../data/mockData';

/**
 * Service Item Card
 */
const ServiceItem = ({ service, quantity, onQuantityChange }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const formatPrice = (price) => {
        return `Rp ${price.toLocaleString('id-ID')}`;
    };

    const getTypeLabel = (type) => {
        const labels = {
            'equipment': 'Peralatan',
            'porter': 'Porter',
            'guide': 'Guide',
            'package': 'Paket'
        };
        return labels[type] || type;
    };

    return (
        <div className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
            {/* Image */}
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <img
                    src={service.imageUrl}
                    alt={service.nama_layanan}
                    className={`w-full h-full object-cover transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                />
                {/* Type Badge */}
                <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-primary/90 text-white text-[9px] font-bold rounded">
                    {getTypeLabel(service.type)}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                    <h4 className="text-active-dark font-bold text-sm leading-tight line-clamp-1">
                        {service.nama_layanan}
                    </h4>
                    <p className="text-gray-500 text-[11px] mt-0.5 line-clamp-1">
                        {service.deskripsi_layanan}
                    </p>

                    {/* Rating & Stock */}
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-0.5">
                            <Star size={10} className="text-orange-400" fill="currentColor" />
                            <span className="text-[10px] font-medium text-gray-600">{service.rating}</span>
                        </div>
                        {service.stock <= 5 && (
                            <span className="text-[10px] text-red-500 font-medium">
                                Sisa {service.stock}
                            </span>
                        )}
                    </div>
                </div>

                {/* Price & Quantity */}
                <div className="flex items-center justify-between mt-2">
                    <div>
                        <span className="text-price-green font-bold text-sm">
                            {formatPrice(service.harga)}
                        </span>
                        <span className="text-gray-400 text-[10px]">/{service.unit}</span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                        {quantity > 0 && (
                            <>
                                <button
                                    onClick={() => onQuantityChange(service.id, quantity - 1)}
                                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-6 text-center font-bold text-sm text-active-dark">{quantity}</span>
                            </>
                        )}
                        <button
                            onClick={() => onQuantityChange(service.id, quantity + 1)}
                            disabled={service.stock <= quantity}
                            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${quantity === 0
                                    ? 'bg-primary-neon text-text-dark hover:bg-opacity-90'
                                    : service.stock <= quantity
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-primary-neon text-text-dark hover:bg-opacity-90'
                                }`}
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Basecamp Services Page
 * Shows all services from a selected basecamp
 */
const BasecampServicesPage = ({
    basecamp,
    jalur,
    mountain,
    onBack,
    onCheckout
}) => {
    // Cart state: { serviceId: quantity }
    const [cart, setCart] = useState({});
    const [activeFilter, setActiveFilter] = useState('all');

    // Get services for this basecamp
    const allServices = useMemo(() => {
        return getLayananByBasecamp(basecamp?.id) || [];
    }, [basecamp?.id]);

    // Get vendor info
    const vendor = useMemo(() => {
        return getUserById(basecamp?.user_id);
    }, [basecamp?.user_id]);

    // Filter services by type
    const filteredServices = useMemo(() => {
        if (activeFilter === 'all') return allServices;
        return allServices.filter(s => s.type === activeFilter);
    }, [allServices, activeFilter]);

    // Get unique types for filter tabs
    const serviceTypes = useMemo(() => {
        const types = [...new Set(allServices.map(s => s.type))];
        return ['all', ...types];
    }, [allServices]);

    // Handle quantity change
    const handleQuantityChange = (serviceId, quantity) => {
        setCart(prev => {
            if (quantity <= 0) {
                const { [serviceId]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [serviceId]: quantity };
        });
    };

    // Calculate cart summary
    const cartSummary = useMemo(() => {
        let totalItems = 0;
        let totalPrice = 0;

        Object.entries(cart).forEach(([serviceId, quantity]) => {
            const service = allServices.find(s => s.id === parseInt(serviceId));
            if (service) {
                totalItems += quantity;
                totalPrice += service.harga * quantity;
            }
        });

        return { totalItems, totalPrice };
    }, [cart, allServices]);

    const getTypeLabel = (type) => {
        const labels = {
            'all': 'Semua',
            'equipment': 'Alat',
            'porter': 'Porter',
            'guide': 'Guide',
            'package': 'Paket'
        };
        return labels[type] || type;
    };

    return (
        <div className="relative flex flex-col min-h-screen w-full bg-background-light overflow-hidden font-display max-w-md mx-auto">

            {/* Header */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
                <div className="flex items-center gap-3 p-4">
                    <button
                        onClick={onBack}
                        className="flex w-10 h-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeft size={20} className="text-active-dark" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-active-dark font-bold text-lg truncate">
                            {basecamp?.nama_basecamp}
                        </h1>
                        <p className="text-gray-500 text-xs truncate">
                            {jalur?.nama_jalur} • {mountain?.nama_gunung}
                        </p>
                    </div>
                    <button className="flex w-10 h-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <Share2 size={18} className="text-active-dark" />
                    </button>
                </div>

                {/* Basecamp Info */}
                <div className="px-4 pb-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200">
                            <img
                                src={basecamp?.imageUrl}
                                alt={basecamp?.nama_basecamp}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <Star size={14} className="text-orange-400" fill="currentColor" />
                                <span className="font-bold text-sm text-active-dark">{basecamp?.rating}</span>
                                <span className="text-gray-400 text-xs">({basecamp?.totalReviews} ulasan)</span>
                            </div>
                            {basecamp?.isVerified && (
                                <div className="flex items-center gap-1 mt-1">
                                    <CheckCircle2 size={12} className="text-blue-500" />
                                    <span className="text-xs text-blue-500 font-medium">Verified Vendor</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 px-4 pb-3 overflow-x-auto hide-scrollbar">
                    {serviceTypes.map((type) => {
                        const isActive = activeFilter === type;
                        return (
                            <button
                                key={type}
                                onClick={() => setActiveFilter(type)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${isActive
                                        ? 'bg-active-dark text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {getTypeLabel(type)}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Services List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
                <div className="flex flex-col gap-3">
                    {filteredServices.length > 0 ? (
                        filteredServices.map((service) => (
                            <ServiceItem
                                key={service.id}
                                service={service}
                                quantity={cart[service.id] || 0}
                                onQuantityChange={handleQuantityChange}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <MaterialIcon name="inventory_2" className="text-gray-300 text-5xl mb-3" />
                            <p className="text-gray-500 text-sm">Tidak ada layanan tersedia</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Cart Summary Bar */}
            {cartSummary.totalItems > 0 && (
                <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 pb-8 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <ShoppingCart size={24} className="text-active-dark" />
                                <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-primary-neon text-text-dark text-xs font-bold rounded-full">
                                    {cartSummary.totalItems}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Total Harga</p>
                                <p className="text-lg font-extrabold text-active-dark">
                                    Rp {cartSummary.totalPrice.toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => onCheckout?.(cart, allServices)}
                            className="h-12 bg-text-dark text-white rounded-2xl px-6 font-bold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                        >
                            Checkout
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BasecampServicesPage;
