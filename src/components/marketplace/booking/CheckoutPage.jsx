import React, { useState } from 'react';
import {
    ArrowLeft,
    Calendar,
    Users,
    MapPin,
    Minus,
    Plus,
    Trash2,
    ChevronRight,
    CreditCard,
    Wallet,
    QrCode,
    ShieldCheck
} from 'lucide-react';
import MaterialIcon from '../MaterialIcon';

/**
 * Checkout Page Component
 * Displays order summary, date/hiker selection, and payment method
 */
const CheckoutPage = ({
    cartItems = [],
    bookingDetails = {},
    cartSummary = {},
    onBack,
    onUpdateQuantity,
    onRemoveItem,
    onHikerChange,
    onDateChange,
    onProceedPayment
}) => {
    const [selectedPayment, setSelectedPayment] = useState('qris');

    // Generate dates for next 7 days
    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            dayName: date.toLocaleDateString('id-ID', { weekday: 'short' }),
            dayNumber: date.getDate(),
            month: date.toLocaleDateString('id-ID', { month: 'short' }),
            fullDate: date.toISOString().split('T')[0]
        };
    });

    const paymentMethods = [
        { id: 'qris', name: 'QRIS', icon: <QrCode size={20} />, desc: 'Scan & bayar dengan e-wallet manapun' },
        { id: 'ewallet', name: 'E-Wallet', icon: <Wallet size={20} />, desc: 'GoPay, OVO, DANA, ShopeePay' },
        { id: 'bank', name: 'Transfer Bank', icon: <CreditCard size={20} />, desc: 'Virtual Account BCA, BRI, Mandiri' }
    ];

    const formatPrice = (price) => `Rp ${price?.toLocaleString('id-ID') || 0}`;

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
                    <h1 className="text-active-dark font-bold text-lg">Checkout</h1>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-64">

                {/* Booking Context */}
                <div className="px-4 py-4">
                    <div className="p-4 bg-gradient-to-r from-primary/10 to-primary-neon/10 rounded-2xl border border-primary/20">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-primary-neon flex items-center justify-center">
                                <MaterialIcon name="landscape" className="text-text-dark text-2xl" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-active-dark">{bookingDetails.mountain?.nama_gunung || 'Gunung'}</h3>
                                <p className="text-sm text-gray-600">
                                    {bookingDetails.jalur?.nama_jalur || 'Jalur'} • {bookingDetails.basecamp?.nama_basecamp || 'Basecamp'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date Selection */}
                <div className="px-4 pb-6">
                    <h3 className="text-active-dark font-bold text-base mb-3 flex items-center gap-2">
                        <Calendar size={18} className="text-primary" />
                        Tanggal Pendakian
                    </h3>
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
                        {dates.map((date) => {
                            const isSelected = bookingDetails.selectedDate === date.fullDate;
                            return (
                                <button
                                    key={date.fullDate}
                                    onClick={() => onDateChange?.(date.fullDate)}
                                    className={`flex flex-col items-center min-w-[70px] py-3 px-2 rounded-2xl border transition-all ${isSelected
                                        ? 'bg-primary-neon text-text-dark border-primary-neon shadow-lg shadow-primary-neon/20'
                                        : 'bg-white border-gray-100 text-gray-600'
                                        }`}
                                >
                                    <span className="text-[10px] font-medium">{date.dayName}</span>
                                    <span className="text-xl font-extrabold my-1">{date.dayNumber}</span>
                                    <span className="text-[10px]">{date.month}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Hiker Count */}
                <div className="px-4 pb-6">
                    <h3 className="text-active-dark font-bold text-base mb-3 flex items-center gap-2">
                        <Users size={18} className="text-primary" />
                        Jumlah Pendaki
                    </h3>
                    <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-gray-100">
                        <span className="text-gray-600 text-sm">Jumlah orang</span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => onHikerChange?.(bookingDetails.hikerCount - 1)}
                                disabled={bookingDetails.hikerCount <= 1}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                            >
                                <Minus size={18} />
                            </button>
                            <span className="w-8 text-center font-bold text-lg text-active-dark">
                                {bookingDetails.hikerCount || 1}
                            </span>
                            <button
                                onClick={() => onHikerChange?.(bookingDetails.hikerCount + 1)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-neon text-text-dark hover:bg-opacity-90 transition-colors"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="px-4 pb-6">
                    <h3 className="text-active-dark font-bold text-base mb-3 flex items-center gap-2">
                        <MaterialIcon name="shopping_cart" className="text-primary text-lg" />
                        Pesanan ({cartSummary.totalItems || 0} item)
                    </h3>
                    <div className="flex flex-col gap-3">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100">
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.nama_layanan}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm text-active-dark line-clamp-1">{item.nama_layanan}</h4>
                                    <p className="text-xs text-gray-500">{formatPrice(item.harga)}/{item.unit}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
                                                className="w-7 h-7 flex items-center justify-center rounded bg-gray-100 text-gray-600"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                                                className="w-7 h-7 flex items-center justify-center rounded bg-gray-100 text-gray-600"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => onRemoveItem?.(item.id)}
                                            className="text-red-400 hover:text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Method */}
                <div className="px-4 pb-6">
                    <h3 className="text-active-dark font-bold text-base mb-3 flex items-center gap-2">
                        <CreditCard size={18} className="text-primary" />
                        Metode Pembayaran
                    </h3>
                    <div className="flex flex-col gap-2">
                        {paymentMethods.map((method) => {
                            const isSelected = selectedPayment === method.id;
                            return (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedPayment(method.id)}
                                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${isSelected
                                        ? 'bg-primary-neon/10 border-primary-neon'
                                        : 'bg-white border-gray-100'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? 'bg-primary-neon text-text-dark' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {method.icon}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h4 className="font-bold text-sm text-active-dark">{method.name}</h4>
                                        <p className="text-xs text-gray-500">{method.desc}</p>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-primary-neon bg-primary-neon' : 'border-gray-300'
                                        }`}>
                                        {isSelected && <div className="w-2 h-2 rounded-full bg-text-dark" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>

            {/* Bottom Summary Bar */}
            <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 pb-8 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                {/* Price Breakdown */}
                <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="text-active-dark">{formatPrice(cartSummary.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Biaya layanan</span>
                        <span className="text-active-dark">{formatPrice(cartSummary.serviceFee)}</span>
                    </div>
                    <div className="h-px bg-gray-100 my-2" />
                    <div className="flex justify-between">
                        <span className="font-bold text-active-dark">Total</span>
                        <span className="font-extrabold text-lg text-primary">{formatPrice(cartSummary.total)}</span>
                    </div>
                </div>

                {/* Pay Button */}
                <button
                    onClick={() => onProceedPayment?.(selectedPayment)}
                    disabled={!bookingDetails.selectedDate || cartSummary.totalItems === 0}
                    className="w-full h-14 bg-text-dark text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ShieldCheck size={20} />
                    Bayar Sekarang
                    <ChevronRight size={18} />
                </button>
            </div>

        </div>
    );
};

export default CheckoutPage;
