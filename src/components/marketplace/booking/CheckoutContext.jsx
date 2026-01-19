import React, { createContext, useContext, useState, useEffect } from 'react';

// Storage key
const CHECKOUT_STORAGE_KEY = 'checkout_session';

// Create Context
const CheckoutContext = createContext(null);

/**
 * Checkout Provider Component
 * Manages checkout state with sessionStorage persistence
 * Data survives page refresh but is cleared when browser tab is closed
 */
export const CheckoutProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [bookingDetails, setBookingDetails] = useState({
        mountain: null,
        jalur: null,
        basecamp: null,
        hikerCount: 1,
        selectedDate: null
    });
    const [paymentData, setPaymentData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from sessionStorage on mount
    useEffect(() => {
        try {
            const stored = sessionStorage.getItem(CHECKOUT_STORAGE_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                if (data.cartItems) setCartItems(data.cartItems);
                if (data.bookingDetails) setBookingDetails(data.bookingDetails);
                if (data.paymentData) setPaymentData(data.paymentData);
            }
        } catch (error) {
            console.error('Failed to load checkout session:', error);
        }
        setIsLoaded(true);
    }, []);

    // Save to sessionStorage whenever state changes
    useEffect(() => {
        if (!isLoaded) return;

        const data = {
            cartItems,
            bookingDetails,
            paymentData,
            timestamp: Date.now()
        };

        sessionStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(data));
    }, [cartItems, bookingDetails, paymentData, isLoaded]);

    // Initialize checkout with items (from basecamp services page)
    const initCheckout = (items, mountain, jalur, basecamp) => {
        setCartItems(items);
        setBookingDetails(prev => ({
            ...prev,
            mountain,
            jalur,
            basecamp
        }));
    };

    // Update cart item quantity
    const updateQuantity = (serviceId, quantity) => {
        if (quantity <= 0) {
            setCartItems(prev => prev.filter(item => item.id !== serviceId));
        } else {
            setCartItems(prev => prev.map(item =>
                item.id === serviceId ? { ...item, quantity } : item
            ));
        }
    };

    // Remove item from cart
    const removeItem = (serviceId) => {
        setCartItems(prev => prev.filter(item => item.id !== serviceId));
    };

    // Update hiker count
    const updateHikerCount = (count) => {
        setBookingDetails(prev => ({ ...prev, hikerCount: Math.max(1, count) }));
    };

    // Update selected date
    const updateSelectedDate = (date) => {
        setBookingDetails(prev => ({ ...prev, selectedDate: date }));
    };

    // Set payment data
    const setPayment = (data) => {
        setPaymentData(data);
    };

    // Calculate cart summary
    const getCartSummary = () => {
        const subtotal = cartItems.reduce((acc, item) => acc + (item.harga * item.quantity), 0);
        const serviceFee = Math.round(subtotal * 0.025);
        return {
            totalItems: cartItems.reduce((acc, item) => acc + item.quantity, 0),
            subtotal,
            serviceFee,
            total: subtotal + serviceFee,
            items: cartItems
        };
    };

    // Clear checkout session (after successful booking)
    const clearCheckout = () => {
        setCartItems([]);
        setBookingDetails({
            mountain: null,
            jalur: null,
            basecamp: null,
            hikerCount: 1,
            selectedDate: null
        });
        setPaymentData(null);
        sessionStorage.removeItem(CHECKOUT_STORAGE_KEY);
    };

    // Check if checkout has valid data
    const hasValidCheckout = () => {
        return cartItems.length > 0 || bookingDetails.mountain !== null;
    };

    const value = {
        cartItems,
        bookingDetails,
        paymentData,
        isLoaded,
        initCheckout,
        updateQuantity,
        removeItem,
        updateHikerCount,
        updateSelectedDate,
        setPayment,
        getCartSummary,
        clearCheckout,
        hasValidCheckout
    };

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    );
};

/**
 * Custom hook to use checkout context
 */
export const useCheckout = () => {
    const context = useContext(CheckoutContext);
    if (!context) {
        throw new Error('useCheckout must be used within a CheckoutProvider');
    }
    return context;
};

export default CheckoutContext;
