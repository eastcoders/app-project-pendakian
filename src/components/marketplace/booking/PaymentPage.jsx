import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Clock,
    CheckCircle,
    Copy,
    AlertCircle,
    RefreshCw
} from 'lucide-react';

/**
 * Payment Page Component
 * Displays QRIS code and handles payment status simulation
 */
const PaymentPage = ({
    paymentMethod = 'qris',
    amount = 0,
    bookingId,
    onBack,
    onPaymentSuccess,
    onPaymentFailed
}) => {
    const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, checking, success, failed
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown
    const [copied, setCopied] = useState(false);

    // Generate mock booking ID
    const orderId = bookingId || `HKR-${Date.now().toString(36).toUpperCase()}`;

    // Mock QRIS data URL (would be from payment gateway in real app)
    const qrisUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021126670016ID.CO.TELKOMSEL.TRAVELAPP0118${orderId}52040000530336054${amount.toString().padStart(10, '0')}5802ID5913HIKER%20APP6007JAKARTA63041234`;

    // Countdown timer
    useEffect(() => {
        if (paymentStatus !== 'pending' || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setPaymentStatus('failed');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [paymentStatus, timeLeft]);

    // Simulate payment check (in real app, this would poll payment gateway)
    const checkPaymentStatus = () => {
        setPaymentStatus('checking');

        // Simulate API call
        setTimeout(() => {
            // 80% chance of success for demo
            const isSuccess = Math.random() > 0.2;

            if (isSuccess) {
                setPaymentStatus('success');
                setTimeout(() => {
                    onPaymentSuccess?.({
                        orderId,
                        amount,
                        paymentMethod,
                        paidAt: new Date().toISOString()
                    });
                }, 1500);
            } else {
                setPaymentStatus('pending');
            }
        }, 2000);
    };

    // Auto-check payment every 10 seconds
    useEffect(() => {
        if (paymentStatus !== 'pending') return;

        const interval = setInterval(() => {
            checkPaymentStatus();
        }, 10000);

        return () => clearInterval(interval);
    }, [paymentStatus]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatPrice = (price) => `Rp ${price?.toLocaleString('id-ID') || 0}`;

    const copyOrderId = () => {
        navigator.clipboard.writeText(orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                    <h1 className="text-active-dark font-bold text-lg">Pembayaran</h1>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6">

                {/* Payment Status Banner */}
                {paymentStatus === 'pending' && (
                    <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl mb-6">
                        <Clock className="text-yellow-600 flex-shrink-0" size={24} />
                        <div>
                            <p className="font-bold text-yellow-800">Menunggu Pembayaran</p>
                            <p className="text-sm text-yellow-700">Selesaikan pembayaran dalam <span className="font-bold">{formatTime(timeLeft)}</span></p>
                        </div>
                    </div>
                )}

                {paymentStatus === 'checking' && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl mb-6">
                        <RefreshCw className="text-blue-600 flex-shrink-0 animate-spin" size={24} />
                        <div>
                            <p className="font-bold text-blue-800">Mengecek Pembayaran...</p>
                            <p className="text-sm text-blue-700">Mohon tunggu sebentar</p>
                        </div>
                    </div>
                )}

                {paymentStatus === 'success' && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl mb-6">
                        <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                        <div>
                            <p className="font-bold text-green-800">Pembayaran Berhasil!</p>
                            <p className="text-sm text-green-700">Tiket akan segera dikirim...</p>
                        </div>
                    </div>
                )}

                {paymentStatus === 'failed' && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl mb-6">
                        <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
                        <div>
                            <p className="font-bold text-red-800">Pembayaran Gagal</p>
                            <p className="text-sm text-red-700">Waktu pembayaran telah habis</p>
                        </div>
                    </div>
                )}

                {/* Amount Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center mb-6">
                    <p className="text-gray-500 text-sm mb-1">Total Pembayaran</p>
                    <p className="text-3xl font-extrabold text-active-dark">{formatPrice(amount)}</p>
                </div>

                {/* QRIS Code */}
                {paymentMethod === 'qris' && paymentStatus !== 'success' && (
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
                        <h3 className="text-center font-bold text-active-dark mb-4">Scan QRIS Code</h3>
                        <div className="flex justify-center mb-4">
                            <div className="w-52 h-52 bg-white rounded-xl border-2 border-gray-200 p-2 flex items-center justify-center">
                                {paymentStatus === 'failed' ? (
                                    <div className="text-center text-gray-400">
                                        <AlertCircle size={48} className="mx-auto mb-2" />
                                        <p className="text-sm">QR Expired</p>
                                    </div>
                                ) : (
                                    <img
                                        src={qrisUrl}
                                        alt="QRIS Code"
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>
                        </div>
                        <p className="text-center text-gray-500 text-sm">
                            Gunakan aplikasi e-wallet favorit Anda untuk scan kode QR di atas
                        </p>
                    </div>
                )}

                {/* Order ID */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-xs">Order ID</p>
                            <p className="font-mono font-bold text-active-dark">{orderId}</p>
                        </div>
                        <button
                            onClick={copyOrderId}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 transition-colors"
                        >
                            <Copy size={14} />
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>

                {/* Instructions */}
                <div className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-bold text-active-dark text-sm mb-3">Cara Pembayaran:</h4>
                    <ol className="space-y-2 text-sm text-gray-600">
                        <li className="flex gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary-neon text-text-dark text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                            <span>Buka aplikasi e-wallet (GoPay, OVO, DANA, dll)</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary-neon text-text-dark text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                            <span>Pilih menu Scan QR / Bayar</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary-neon text-text-dark text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                            <span>Arahkan kamera ke kode QRIS di atas</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary-neon text-text-dark text-xs font-bold flex items-center justify-center flex-shrink-0">4</span>
                            <span>Konfirmasi pembayaran di aplikasi Anda</span>
                        </li>
                    </ol>
                </div>

            </div>

            {/* Bottom Action */}
            {paymentStatus === 'pending' && (
                <div className="p-4 pb-8 bg-white border-t border-gray-100">
                    <button
                        onClick={checkPaymentStatus}
                        className="w-full h-14 bg-text-dark text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
                    >
                        <RefreshCw size={18} />
                        Saya Sudah Bayar
                    </button>
                </div>
            )}

            {paymentStatus === 'failed' && (
                <div className="p-4 pb-8 bg-white border-t border-gray-100">
                    <button
                        onClick={onBack}
                        className="w-full h-14 bg-gray-100 text-active-dark rounded-2xl font-bold hover:bg-gray-200 transition-all"
                    >
                        Kembali ke Checkout
                    </button>
                </div>
            )}

        </div>
    );
};

export default PaymentPage;
