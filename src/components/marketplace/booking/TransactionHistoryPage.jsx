import React, { useMemo } from 'react';
import {
    ArrowLeft,
    Receipt,
    CreditCard,
    ArrowDownLeft,
    ArrowUpRight,
    CheckCircle,
    XCircle,
    Clock,
    ChevronRight
} from 'lucide-react';
import { useBookings } from './BookingContext';

/**
 * Transaction Type Badge
 */
const TransactionTypeBadge = ({ type }) => {
    const config = {
        PAYMENT: {
            label: 'Pembayaran',
            bgColor: 'bg-green-100',
            textColor: 'text-green-700',
            icon: ArrowUpRight,
        },
        REFUND: {
            label: 'Pengembalian',
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-700',
            icon: ArrowDownLeft,
        },
    };

    const { label, bgColor, textColor, icon: Icon } = config[type] || config.PAYMENT;

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
            <Icon size={10} />
            {label}
        </span>
    );
};

/**
 * Transaction Status Icon
 */
const TransactionStatusIcon = ({ status }) => {
    switch (status) {
        case 'SUCCESS':
            return <CheckCircle size={16} className="text-green-500" />;
        case 'FAILED':
            return <XCircle size={16} className="text-red-500" />;
        case 'PENDING':
            return <Clock size={16} className="text-yellow-500" />;
        default:
            return <Clock size={16} className="text-gray-400" />;
    }
};

/**
 * Transaction Card Component
 */
const TransactionCard = ({ transaction, booking, onViewBooking }) => {
    const formatPrice = (price) => `Rp ${(price || 0).toLocaleString('id-ID')}`;

    const formatDateTime = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isRefund = transaction.type === 'REFUND';

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all">
            <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isRefund ? 'bg-orange-100' : 'bg-emerald-100'
                    }`}>
                    <CreditCard size={20} className={isRefund ? 'text-orange-600' : 'text-emerald-600'} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <TransactionTypeBadge type={transaction.type} />
                        <TransactionStatusIcon status={transaction.status} />
                    </div>

                    <p className={`font-bold text-lg ${isRefund ? 'text-orange-600' : 'text-gray-800'}`}>
                        {isRefund ? '+' : '-'}{formatPrice(transaction.amount)}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                        {transaction.paymentMethod} • {formatDateTime(transaction.createdAt)}
                    </p>
                </div>
            </div>

            {/* Booking Info */}
            {booking && (
                <button
                    onClick={() => onViewBooking?.(booking)}
                    className="w-full mt-3 p-3 bg-gray-50 rounded-xl flex items-center gap-3 hover:bg-gray-100 transition-colors"
                >
                    <img
                        src={booking.mountain?.imageUrl}
                        alt={booking.mountain?.nama_gunung}
                        className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 text-left">
                        <p className="font-medium text-gray-800 text-sm">
                            {booking.mountain?.nama_gunung || 'Unknown'}
                        </p>
                        <p className="text-xs text-gray-500">{transaction.bookingId}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                </button>
            )}
        </div>
    );
};

/**
 * Transaction History Page Component
 * Displays all payment transactions
 */
const TransactionHistoryPage = ({ onBack, onViewBooking }) => {
    const { transactions, bookings, isLoaded } = useBookings();

    // Calculate stats
    const stats = useMemo(() => {
        let totalPayments = 0;
        let totalRefunds = 0;

        transactions.forEach(t => {
            if (t.status === 'SUCCESS') {
                if (t.type === 'PAYMENT') totalPayments += t.amount;
                if (t.type === 'REFUND') totalRefunds += t.amount;
            }
        });

        return { totalPayments, totalRefunds, netAmount: totalPayments - totalRefunds };
    }, [transactions]);

    const formatPrice = (price) => `Rp ${(price || 0).toLocaleString('id-ID')}`;

    const getBookingForTransaction = (transaction) => {
        return bookings.find(b => b.id === transaction.bookingId);
    };

    // Group transactions by date
    const groupedTransactions = useMemo(() => {
        const groups = {};

        transactions.forEach(t => {
            const date = new Date(t.createdAt).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            if (!groups[date]) groups[date] = [];
            groups[date].push(t);
        });

        return groups;
    }, [transactions]);

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent" />
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
                        <h1 className="text-gray-800 font-bold text-lg">Riwayat Transaksi</h1>
                        <p className="text-gray-500 text-xs">{transactions.length} transaksi</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Receipt size={20} className="text-emerald-600" />
                    </div>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="p-4">
                <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-2xl p-5 text-white">
                    <p className="text-white/80 text-sm mb-1">Total Pengeluaran</p>
                    <p className="font-extrabold text-2xl mb-3">{formatPrice(stats.netAmount)}</p>

                    <div className="flex gap-4 pt-3 border-t border-white/20">
                        <div className="flex-1">
                            <p className="text-white/70 text-xs">Pembayaran</p>
                            <p className="font-bold text-sm">{formatPrice(stats.totalPayments)}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-white/70 text-xs">Pengembalian</p>
                            <p className="font-bold text-sm">{formatPrice(stats.totalRefunds)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions List */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
                {transactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <Receipt size={40} className="text-gray-400" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg mb-2">Belum Ada Transaksi</h3>
                        <p className="text-gray-500 text-center text-sm">
                            Transaksi pembayaran akan muncul di sini
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {Object.entries(groupedTransactions).map(([date, txns]) => (
                            <div key={date}>
                                <p className="text-xs font-medium text-gray-500 mb-2 px-1">{date}</p>
                                <div className="space-y-3">
                                    {txns.map((transaction) => (
                                        <TransactionCard
                                            key={transaction.id}
                                            transaction={transaction}
                                            booking={getBookingForTransaction(transaction)}
                                            onViewBooking={onViewBooking}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionHistoryPage;
