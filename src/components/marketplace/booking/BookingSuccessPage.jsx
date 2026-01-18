import React, { useEffect, useState } from 'react';
import {
    CheckCircle,
    Download,
    Share2,
    Home,
    Calendar,
    MapPin,
    Users,
    Clock,
    ChevronRight
} from 'lucide-react';
import MaterialIcon from '../MaterialIcon';

/**
 * Booking Success Page Component
 * Displays QR ticket after successful payment
 */
const BookingSuccessPage = ({
    bookingData = {},
    onGoHome,
    onViewBookings
}) => {
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        // Hide confetti after 3 seconds
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    // Generate QR code for ticket
    const ticketId = bookingData.orderId || `TKT-${Date.now().toString(36).toUpperCase()}`;
    const qrData = JSON.stringify({
        ticketId,
        mountain: bookingData.mountain?.nama_gunung,
        date: bookingData.selectedDate,
        hikers: bookingData.hikerCount,
        paidAt: bookingData.paidAt
    });
    const ticketQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatPrice = (price) => `Rp ${price?.toLocaleString('id-ID') || 0}`;

    return (
        <div className="relative flex flex-col min-h-screen w-full bg-gradient-to-b from-primary-neon/20 to-background-light overflow-hidden font-display max-w-md mx-auto">

            {/* Confetti Animation */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-bounce"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-${Math.random() * 20}px`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        >
                            <div
                                className="w-3 h-3 rounded-sm"
                                style={{
                                    backgroundColor: ['#13EC80', '#FACC15', '#3B82F6', '#EC4899'][Math.floor(Math.random() * 4)],
                                    transform: `rotate(${Math.random() * 360}deg)`
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-8">

                {/* Success Icon */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-primary-neon flex items-center justify-center mb-4 shadow-lg shadow-primary-neon/30 animate-in zoom-in duration-500">
                        <CheckCircle size={40} className="text-text-dark" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-active-dark mb-2">Booking Berhasil!</h1>
                    <p className="text-gray-500 text-center">
                        Tiket Anda sudah siap. Tunjukkan QR code ini saat check-in.
                    </p>
                </div>

                {/* Ticket Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
                    {/* Ticket Header */}
                    <div className="bg-gradient-to-r from-primary to-primary-neon p-6 text-text-dark">
                        <div className="flex items-center gap-3 mb-2">
                            <MaterialIcon name="landscape" className="text-2xl" />
                            <h2 className="font-bold text-lg">{bookingData.mountain?.nama_gunung || 'Gunung'}</h2>
                        </div>
                        <div className="flex items-center gap-2 text-text-dark/80 text-sm">
                            <MapPin size={14} />
                            <span>{bookingData.jalur?.nama_jalur || 'Jalur'} • {bookingData.basecamp?.nama_basecamp || 'Basecamp'}</span>
                        </div>
                    </div>

                    {/* Ticket Divider */}
                    <div className="relative h-6 bg-background-light">
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background-light" />
                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background-light" />
                        <div className="absolute inset-x-8 top-1/2 border-t-2 border-dashed border-gray-300" />
                    </div>

                    {/* QR Code */}
                    <div className="p-6 flex flex-col items-center">
                        <div className="w-48 h-48 bg-white rounded-2xl border-2 border-gray-100 p-2 mb-4">
                            <img
                                src={ticketQrUrl}
                                alt="Ticket QR Code"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p className="font-mono text-lg font-bold text-active-dark tracking-wider">{ticketId}</p>
                        <p className="text-xs text-gray-400 mt-1">Scan QR code saat check-in</p>
                    </div>

                    {/* Ticket Details */}
                    <div className="px-6 pb-6 space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <Calendar size={20} className="text-primary" />
                            <div>
                                <p className="text-xs text-gray-500">Tanggal Pendakian</p>
                                <p className="font-bold text-sm text-active-dark">{formatDate(bookingData.selectedDate)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <Users size={20} className="text-primary" />
                            <div>
                                <p className="text-xs text-gray-500">Jumlah Pendaki</p>
                                <p className="font-bold text-sm text-active-dark">{bookingData.hikerCount || 1} Orang</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <MaterialIcon name="payments" className="text-primary text-xl" />
                            <div>
                                <p className="text-xs text-gray-500">Total Pembayaran</p>
                                <p className="font-bold text-sm text-primary">{formatPrice(bookingData.amount)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                    <button className="flex-1 h-12 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl font-medium text-active-dark hover:bg-gray-50 transition-colors">
                        <Download size={18} />
                        Simpan
                    </button>
                    <button className="flex-1 h-12 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl font-medium text-active-dark hover:bg-gray-50 transition-colors">
                        <Share2 size={18} />
                        Bagikan
                    </button>
                </div>

                {/* Info Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                    <div className="flex gap-3">
                        <Clock size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-blue-800 text-sm mb-1">Informasi Penting</h4>
                            <ul className="text-xs text-blue-700 space-y-1">
                                <li>• Datang 30 menit sebelum waktu check-in</li>
                                <li>• Bawa KTP asli untuk verifikasi</li>
                                <li>• Tiket tidak dapat dipindahtangankan</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Actions */}
            <div className="p-4 pb-8 bg-white border-t border-gray-100 flex gap-3">
                <button
                    onClick={onGoHome}
                    className="flex-1 h-14 flex items-center justify-center gap-2 bg-gray-100 text-active-dark rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                >
                    <Home size={20} />
                    Beranda
                </button>
                <button
                    onClick={onViewBookings}
                    className="flex-1 h-14 flex items-center justify-center gap-2 bg-text-dark text-white rounded-2xl font-bold hover:opacity-90 transition-all"
                >
                    Lihat Booking
                    <ChevronRight size={18} />
                </button>
            </div>

        </div>
    );
};

export default BookingSuccessPage;
