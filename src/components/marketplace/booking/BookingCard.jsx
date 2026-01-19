import React from 'react';
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    ChevronRight,
    Download,
    XCircle,
    CheckCircle,
    AlertCircle,
    Loader2,
    Mountain
} from 'lucide-react';

/**
 * Status Badge Component
 */
const StatusBadge = ({ status }) => {
    const statusConfig = {
        PENDING: {
            label: 'Menunggu Pembayaran',
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-700',
            icon: Clock,
        },
        CONFIRMED: {
            label: 'Terkonfirmasi',
            bgColor: 'bg-green-100',
            textColor: 'text-green-700',
            icon: CheckCircle,
        },
        ONGOING: {
            label: 'Sedang Berlangsung',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-700',
            icon: Loader2,
        },
        COMPLETED: {
            label: 'Selesai',
            bgColor: 'bg-gray-100',
            textColor: 'text-gray-600',
            icon: CheckCircle,
        },
        CANCELLED: {
            label: 'Dibatalkan',
            bgColor: 'bg-red-100',
            textColor: 'text-red-700',
            icon: XCircle,
        },
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor}`}>
            <Icon size={12} className={status === 'ONGOING' ? 'animate-spin' : ''} />
            {config.label}
        </span>
    );
};

/**
 * Booking Card Component
 * Displays a single booking with its details and actions
 */
const BookingCard = ({
    booking,
    onViewDetail,
    onDownloadTicket,
    onCancel,
    compact = false
}) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatPrice = (price) => `Rp ${(price || 0).toLocaleString('id-ID')}`;

    const formatTimeAgo = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Hari ini';
        if (diffDays === 1) return 'Kemarin';
        if (diffDays < 7) return `${diffDays} hari lalu`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;
        return formatDate(dateStr);
    };

    // Only PENDING can be cancelled (not yet paid)
    // CONFIRMED bookings have been paid - need admin process for refund
    const canCancel = booking.status === 'PENDING';
    const canDownload = ['CONFIRMED', 'ONGOING'].includes(booking.status);
    const canPay = booking.status === 'PENDING'; // Show "Bayar Sekarang" for pending

    if (compact) {
        return (
            <div
                onClick={() => onViewDetail?.(booking)}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer"
            >
                {/* Mountain Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                        src={booking.mountain?.imageUrl}
                        alt={booking.mountain?.nama_gunung}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-800 truncate">
                            {booking.mountain?.nama_gunung || 'Unknown Mountain'}
                        </h3>
                        <StatusBadge status={booking.status} />
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(booking.selectedDate)}
                    </p>
                </div>

                <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
            {/* Header with Mountain Image */}
            <div className="relative h-32 bg-gradient-to-r from-emerald-500 to-teal-500">
                {booking.mountain?.imageUrl && (
                    <img
                        src={booking.mountain.imageUrl}
                        alt={booking.mountain.nama_gunung}
                        className="w-full h-full object-cover opacity-60"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-white text-lg">
                                {booking.mountain?.nama_gunung || 'Unknown Mountain'}
                            </h3>
                            <p className="text-white/80 text-sm flex items-center gap-1">
                                <MapPin size={12} />
                                {booking.jalur?.nama_jalur || 'N/A'}
                                {booking.basecamp && ` • ${booking.basecamp.nama_basecamp}`}
                            </p>
                        </div>
                        <StatusBadge status={booking.status} />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                {/* Booking Details */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                        <Calendar size={18} className="text-emerald-500" />
                        <div>
                            <p className="text-xs text-gray-500">Tanggal</p>
                            <p className="font-semibold text-gray-800 text-sm">
                                {formatDate(booking.selectedDate)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                        <Users size={18} className="text-blue-500" />
                        <div>
                            <p className="text-xs text-gray-500">Pendaki</p>
                            <p className="font-semibold text-gray-800 text-sm">
                                {booking.hikerCount} Orang
                            </p>
                        </div>
                    </div>
                </div>

                {/* Services */}
                {booking.services?.length > 0 && (
                    <div className="text-sm">
                        <p className="text-gray-500 mb-1">Layanan:</p>
                        <div className="flex flex-wrap gap-1">
                            {booking.services.map((service, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs"
                                >
                                    {service.nama_layanan} x{service.quantity}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Price & Order Info */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-500">Total Pembayaran</p>
                        <p className="font-bold text-emerald-600 text-lg">
                            {formatPrice(booking.totalAmount)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400">{booking.id}</p>
                        <p className="text-xs text-gray-500">{formatTimeAgo(booking.createdAt)}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                    {canDownload && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDownloadTicket?.(booking);
                            }}
                            className="flex-1 h-10 flex items-center justify-center gap-1.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors text-sm"
                        >
                            <Download size={16} />
                            Download Tiket
                        </button>
                    )}
                    {canCancel && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onCancel?.(booking);
                            }}
                            className="flex-1 h-10 flex items-center justify-center gap-1.5 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors text-sm"
                        >
                            <XCircle size={16} />
                            Batalkan
                        </button>
                    )}
                    <button
                        onClick={() => onViewDetail?.(booking)}
                        className="flex-1 h-10 flex items-center justify-center gap-1.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
                    >
                        Detail
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;
