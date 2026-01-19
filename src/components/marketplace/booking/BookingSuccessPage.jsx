import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import {
    CheckCircle,
    Download,
    Share2,
    Home,
    Calendar,
    MapPin,
    Users,
    Clock,
    ChevronRight,
    Sparkles,
    Mountain
} from 'lucide-react';

/**
 * Booking Success Page Component
 * Displays a premium, polished QR ticket after successful payment
 */
const BookingSuccessPage = ({
    bookingData = {},
    onGoHome,
    onViewBookings
}) => {
    const [showConfetti, setShowConfetti] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const ticketRef = useRef(null);

    useEffect(() => {
        // Trigger mount animations
        setMounted(true);
        // Hide confetti after 4 seconds
        const timer = setTimeout(() => setShowConfetti(false), 4000);
        return () => clearTimeout(timer);
    }, []);

    // Generate QR code for ticket
    const ticketId = bookingData.orderId || `HKR-${Date.now().toString(36).toUpperCase()}`;
    const qrData = JSON.stringify({
        ticketId,
        mountain: bookingData.mountain?.nama_gunung,
        date: bookingData.selectedDate,
        hikers: bookingData.hikerCount,
        paidAt: bookingData.paidAt
    });
    const ticketQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`;

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

    // Download entire ticket card as image
    const downloadTicket = async () => {
        if (!ticketRef.current || isDownloading) return;

        setIsDownloading(true);

        try {
            // Wait for QR image to fully load
            const qrImage = ticketRef.current.querySelector('img');
            if (qrImage && !qrImage.complete) {
                await new Promise((resolve) => {
                    qrImage.onload = resolve;
                    qrImage.onerror = resolve;
                });
            }

            // Capture the ticket card with html2canvas
            const canvas = await html2canvas(ticketRef.current, {
                backgroundColor: null,
                scale: 2, // Higher quality
                useCORS: true, // Allow cross-origin images (QR code)
                allowTaint: true,
                logging: false,
            });

            // Convert to blob and download
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `tiket-${ticketId}.png`;

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    window.URL.revokeObjectURL(url);
                }
            }, 'image/png', 1.0);
        } catch (error) {
            console.error('Failed to download ticket:', error);
            // Fallback: try to download just the QR code
            try {
                const response = await fetch(ticketQrUrl);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `tiket-${ticketId}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch {
                window.open(ticketQrUrl, '_blank');
            }
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="relative flex flex-col min-h-screen w-full overflow-hidden font-display max-w-md mx-auto">

            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600">
                {/* Animated floating shapes */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
                <div className="absolute top-40 right-5 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-40 left-5 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Enhanced Confetti Animation */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-20px`,
                                animation: `confetti-fall ${2 + Math.random() * 3}s ease-in-out forwards`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        >
                            <div
                                className="rounded-sm"
                                style={{
                                    width: `${6 + Math.random() * 8}px`,
                                    height: `${6 + Math.random() * 8}px`,
                                    backgroundColor: ['#FBBF24', '#34D399', '#60A5FA', '#F472B6', '#A78BFA', '#FB923C'][Math.floor(Math.random() * 6)],
                                    transform: `rotate(${Math.random() * 360}deg)`,
                                    animation: `confetti-spin ${1 + Math.random()}s linear infinite`
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 flex-1 overflow-y-auto px-5 py-8">

                {/* Success Header */}
                <div className={`flex flex-col items-center mb-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {/* Success Icon with glow effect */}
                    <div className="relative mb-5">
                        <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-pulse" />
                        <div className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 opacity-20" />
                            <CheckCircle size={42} className="text-emerald-500" strokeWidth={2.5} />
                        </div>
                        {/* Sparkle decorations */}
                        <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
                        <Sparkles size={12} className="absolute -bottom-1 -left-1 text-yellow-300 animate-pulse" style={{ animationDelay: '0.3s' }} />
                    </div>

                    <h1 className="text-2xl font-extrabold text-white mb-2 text-center drop-shadow-lg">
                        Booking Berhasil!
                    </h1>
                    <p className="text-white/90 text-center text-sm px-4">
                        Tiket Anda sudah siap. Tunjukkan QR code ini saat check-in.
                    </p>
                </div>

                {/* Premium Ticket Card */}
                <div className={`transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div ref={ticketRef} className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">

                        {/* Ticket Header with Mountain Info */}
                        <div className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 px-5 py-5">
                            {/* Background pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-1/2 -translate-x-1/2" />
                            </div>

                            <div className="relative flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                                    <Mountain size={22} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="font-bold text-lg text-white">
                                        {bookingData.mountain?.nama_gunung || 'Gunung Rinjani'}
                                    </h2>
                                    <div className="flex items-center gap-1.5 text-white/80 text-xs mt-0.5">
                                        <MapPin size={12} />
                                        <span>
                                            {bookingData.jalur?.nama_jalur || 'Senaru'} • {bookingData.basecamp?.nama_basecamp || 'Rinjani Basecamp Senaru'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ticket Tear Effect */}
                        <div className="relative h-5 bg-gray-50">
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600" />
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600" />
                            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-gray-300" />
                        </div>

                        {/* QR Code Section */}
                        <div className="px-5 py-6 flex flex-col items-center bg-white">
                            {/* QR Container with decorative border */}
                            <div className="relative p-3 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl mb-4">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl" />
                                <div className="relative w-44 h-44 bg-white rounded-xl p-2 shadow-inner">
                                    <img
                                        src={ticketQrUrl}
                                        alt="Ticket QR Code"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            {/* Ticket ID */}
                            <div className="text-center">
                                <p className="font-mono text-lg font-bold text-gray-800 tracking-widest bg-gray-100 px-4 py-2 rounded-xl">
                                    {ticketId}
                                </p>
                                <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    Scan QR code saat check-in
                                </p>
                            </div>
                        </div>

                        {/* Ticket Details */}
                        <div className="px-5 pb-6 space-y-3">
                            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                                    <Calendar size={20} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Tanggal Pendakian</p>
                                    <p className="font-bold text-gray-800">{formatDate(bookingData.selectedDate)}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1 flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-100">
                                        <Users size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Pendaki</p>
                                        <p className="font-bold text-gray-800">{bookingData.hikerCount || 1} Orang</p>
                                    </div>
                                </div>
                                <div className="flex-1 flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-100">
                                        <span className="text-white font-bold text-sm">Rp</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Total</p>
                                        <p className="font-bold text-gray-800 text-sm">{formatPrice(bookingData.amount)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Action Buttons */}
                <div className={`flex gap-3 mt-6 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <button
                        onClick={downloadTicket}
                        disabled={isDownloading}
                        className="flex-1 h-12 flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl font-semibold text-white hover:bg-white/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDownloading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <Download size={18} />
                                Simpan
                            </>
                        )}
                    </button>
                    <button className="flex-1 h-12 flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl font-semibold text-white hover:bg-white/30 transition-all active:scale-95">
                        <Share2 size={18} />
                        Bagikan
                    </button>
                </div>

                {/* Info Card */}
                <div className={`mt-6 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-4 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                            <Clock size={18} className="text-white" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm mb-2">Informasi Penting</h4>
                            <ul className="text-xs text-white/80 space-y-1.5">
                                <li className="flex items-start gap-2">
                                    <span className="w-1 h-1 bg-white/60 rounded-full mt-1.5 flex-shrink-0" />
                                    Datang 30 menit sebelum waktu check-in
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1 h-1 bg-white/60 rounded-full mt-1.5 flex-shrink-0" />
                                    Bawa KTP asli untuk verifikasi
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1 h-1 bg-white/60 rounded-full mt-1.5 flex-shrink-0" />
                                    Tiket tidak dapat dipindahtangankan
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 p-4 pb-8 bg-gradient-to-t from-black/20 to-transparent flex gap-3">
                <button
                    onClick={onGoHome}
                    className="flex-1 h-14 flex items-center justify-center gap-2 bg-white/90 backdrop-blur text-gray-700 rounded-2xl font-bold hover:bg-white transition-all active:scale-[0.98] shadow-lg"
                >
                    <Home size={20} />
                    Beranda
                </button>
                <button
                    onClick={onViewBookings}
                    className="flex-1 h-14 flex items-center justify-center gap-2 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg"
                >
                    Lihat Booking
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* CSS for confetti animation */}
            <style>{`
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
                @keyframes confetti-spin {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(360deg); }
                }
            `}</style>

        </div>
    );
};

export default BookingSuccessPage;
