import React, { useState, useMemo } from 'react';
import {
    ArrowLeft,
    History,
    Clock,
    CheckCircle,
    XCircle,
    Loader2,
    Ticket,
    Package,
    AlertTriangle
} from 'lucide-react';
import { useBookings } from './BookingContext';
import BookingCard from './BookingCard';

/**
 * Filter Tab Component
 */
const FilterTab = ({ label, count, isActive, onClick, icon: Icon }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${isActive
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
    >
        {Icon && <Icon size={14} />}
        {label}
        {count > 0 && (
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                {count}
            </span>
        )}
    </button>
);

/**
 * Empty State Component
 */
const EmptyState = ({ filter }) => {
    const messages = {
        ALL: 'Belum ada riwayat booking',
        PENDING: 'Tidak ada booking yang menunggu pembayaran',
        ONGOING: 'Tidak ada pendakian yang sedang berlangsung',
        COMPLETED: 'Belum ada pendakian yang selesai',
        CANCELLED: 'Tidak ada booking yang dibatalkan',
    };

    return (
        <div className="flex flex-col items-center justify-center py-16 px-8">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Package size={40} className="text-gray-400" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Kosong</h3>
            <p className="text-gray-500 text-center text-sm">
                {messages[filter] || messages.ALL}
            </p>
        </div>
    );
};

/**
 * Cancel Confirmation Modal
 */
const CancelModal = ({ booking, onConfirm, onClose }) => {
    const [reason, setReason] = useState('');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle size={24} className="text-red-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">Batalkan Booking?</h3>
                        <p className="text-sm text-gray-500">{booking.id}</p>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                    Apakah Anda yakin ingin membatalkan booking pendakian ke{' '}
                    <strong>{booking.mountain?.nama_gunung}</strong>?
                </p>

                <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Alasan pembatalan (opsional)"
                    className="w-full h-12 px-4 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:border-emerald-500"
                />

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 h-12 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={() => onConfirm(reason)}
                        className="flex-1 h-12 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                    >
                        Ya, Batalkan
                    </button>
                </div>
            </div>
        </div>
    );
};

/**
 * Booking History Page Component
 * Displays all user bookings with filter tabs
 */
const BookingHistoryPage = ({ onBack, onViewDetail }) => {
    const { bookings, bookingStats, cancelBooking, isLoaded } = useBookings();
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [cancelModalBooking, setCancelModalBooking] = useState(null);

    // Filter tabs configuration
    const filters = [
        { id: 'ALL', label: 'Semua', count: bookingStats.total },
        { id: 'ONGOING', label: 'Berlangsung', count: bookingStats.ongoing + bookingStats.confirmed, icon: Loader2 },
        { id: 'COMPLETED', label: 'Selesai', count: bookingStats.completed, icon: CheckCircle },
        { id: 'CANCELLED', label: 'Dibatalkan', count: bookingStats.cancelled, icon: XCircle },
    ];

    // Filtered bookings
    const filteredBookings = useMemo(() => {
        if (activeFilter === 'ALL') return bookings;
        if (activeFilter === 'ONGOING') {
            return bookings.filter(b => ['CONFIRMED', 'ONGOING'].includes(b.status));
        }
        return bookings.filter(b => b.status === activeFilter);
    }, [bookings, activeFilter]);

    const handleCancelConfirm = (reason) => {
        if (cancelModalBooking) {
            cancelBooking(cancelModalBooking.id, reason);
            setCancelModalBooking(null);
        }
    };

    const handleDownloadTicket = (booking) => {
        // Navigate to success page with booking data to download ticket
        onViewDetail?.(booking, true); // true flag for download mode
    };

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-emerald-500" size={32} />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-50 font-display max-w-md mx-auto">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
                <div className="flex items-center gap-3 p-4">
                    <button
                        onClick={onBack}
                        className="flex w-10 h-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-700" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-gray-800 font-bold text-lg">Riwayat Booking</h1>
                        <p className="text-gray-500 text-xs">{bookingStats.total} total booking</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <History size={20} className="text-emerald-600" />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="px-4 pb-4 overflow-x-auto">
                    <div className="flex gap-2">
                        {filters.map((filter) => (
                            <FilterTab
                                key={filter.id}
                                label={filter.label}
                                count={filter.count}
                                icon={filter.icon}
                                isActive={activeFilter === filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {filteredBookings.length === 0 ? (
                    <EmptyState filter={activeFilter} />
                ) : (
                    <div className="space-y-4">
                        {filteredBookings.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                                onViewDetail={() => onViewDetail?.(booking)}
                                onDownloadTicket={() => handleDownloadTicket(booking)}
                                onCancel={() => setCancelModalBooking(booking)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Cancel Modal */}
            {cancelModalBooking && (
                <CancelModal
                    booking={cancelModalBooking}
                    onConfirm={handleCancelConfirm}
                    onClose={() => setCancelModalBooking(null)}
                />
            )}
        </div>
    );
};

export default BookingHistoryPage;
