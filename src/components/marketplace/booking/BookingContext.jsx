import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { bookingHistory as mockBookings, transactionHistory as mockTransactions } from '../../../data/mockData';

// Storage keys
const BOOKINGS_STORAGE_KEY = 'hiker_bookings';
const TRANSACTIONS_STORAGE_KEY = 'hiker_transactions';

// Create Booking Context
const BookingContext = createContext(null);

/**
 * Booking Provider Component
 * Manages booking state with localStorage persistence for demo purposes
 */
export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load data from localStorage on mount
    useEffect(() => {
        try {
            const storedBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);
            const storedTransactions = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);

            if (storedBookings) {
                setBookings(JSON.parse(storedBookings));
            } else {
                // Initialize with mock data
                setBookings(mockBookings);
                localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(mockBookings));
            }

            if (storedTransactions) {
                setTransactions(JSON.parse(storedTransactions));
            } else {
                setTransactions(mockTransactions);
                localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(mockTransactions));
            }
        } catch (error) {
            console.error('Failed to load booking data:', error);
            setBookings(mockBookings);
            setTransactions(mockTransactions);
        }
        setIsLoaded(true);
    }, []);

    // Save bookings to localStorage whenever they change
    useEffect(() => {
        if (isLoaded && bookings.length > 0) {
            localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
        }
    }, [bookings, isLoaded]);

    // Save transactions to localStorage whenever they change
    useEffect(() => {
        if (isLoaded && transactions.length > 0) {
            localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
        }
    }, [transactions, isLoaded]);

    // Add a new booking
    const addBooking = (bookingData) => {
        const newBooking = {
            id: bookingData.orderId || `HKR-${Date.now().toString(36).toUpperCase()}`,
            userId: 1, // Mock user
            status: 'CONFIRMED',
            ...bookingData,
            createdAt: new Date().toISOString(),
            paidAt: new Date().toISOString(),
        };

        setBookings(prev => [newBooking, ...prev]);

        // Add transaction
        const newTransaction = {
            id: `TRX-${Date.now().toString(36).toUpperCase()}`,
            bookingId: newBooking.id,
            type: 'PAYMENT',
            status: 'SUCCESS',
            amount: bookingData.totalAmount || bookingData.amount,
            paymentMethod: bookingData.paymentMethod || 'QRIS',
            createdAt: new Date().toISOString(),
        };

        setTransactions(prev => [newTransaction, ...prev]);

        return newBooking;
    };

    // Update booking status
    const updateBookingStatus = (bookingId, newStatus, additionalData = {}) => {
        setBookings(prev => prev.map(booking => {
            if (booking.id === bookingId) {
                return {
                    ...booking,
                    status: newStatus,
                    ...additionalData,
                };
            }
            return booking;
        }));
    };

    // Cancel a booking
    const cancelBooking = (bookingId, reason = '') => {
        updateBookingStatus(bookingId, 'CANCELLED', {
            cancelledAt: new Date().toISOString(),
            cancelReason: reason,
        });

        // Add refund transaction
        const booking = bookings.find(b => b.id === bookingId);
        if (booking && booking.totalAmount > 0) {
            const refundTransaction = {
                id: `TRX-${Date.now().toString(36).toUpperCase()}`,
                bookingId,
                type: 'REFUND',
                status: 'SUCCESS',
                amount: booking.totalAmount,
                paymentMethod: 'QRIS',
                createdAt: new Date().toISOString(),
            };
            setTransactions(prev => [refundTransaction, ...prev]);
        }
    };

    // Get booking by ID
    const getBookingById = (bookingId) => {
        return bookings.find(b => b.id === bookingId);
    };

    // Get bookings by status
    const getBookingsByStatus = (status) => {
        if (status === 'ALL') return bookings;
        return bookings.filter(b => b.status === status);
    };

    // Get transactions by booking ID
    const getTransactionsByBooking = (bookingId) => {
        return transactions.filter(t => t.bookingId === bookingId);
    };

    // Reset to mock data (for demo purposes)
    const resetToMockData = () => {
        setBookings(mockBookings);
        setTransactions(mockTransactions);
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(mockBookings));
        localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(mockTransactions));
    };

    // Computed values
    const bookingStats = useMemo(() => {
        return {
            total: bookings.length,
            pending: bookings.filter(b => b.status === 'PENDING').length,
            confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
            ongoing: bookings.filter(b => b.status === 'ONGOING').length,
            completed: bookings.filter(b => b.status === 'COMPLETED').length,
            cancelled: bookings.filter(b => b.status === 'CANCELLED').length,
        };
    }, [bookings]);

    const value = {
        bookings,
        transactions,
        bookingStats,
        isLoaded,
        addBooking,
        updateBookingStatus,
        cancelBooking,
        getBookingById,
        getBookingsByStatus,
        getTransactionsByBooking,
        resetToMockData,
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};

/**
 * Custom hook to use booking context
 */
export const useBookings = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBookings must be used within a BookingProvider');
    }
    return context;
};

export default BookingContext;
