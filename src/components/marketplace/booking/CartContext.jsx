import React, { createContext, useContext, useState, useMemo } from 'react';

// Create Cart Context
const CartContext = createContext(null);

/**
 * Cart Provider Component
 * Provides global cart state management across booking flow
 */
export const CartProvider = ({ children }) => {
    // Cart items: { serviceId: { service, quantity } }
    const [cartItems, setCartItems] = useState({});

    // Booking metadata
    const [bookingDetails, setBookingDetails] = useState({
        mountain: null,
        jalur: null,
        basecamp: null,
        hikerCount: 1,
        selectedDate: null
    });

    // Add item to cart
    const addItem = (service, quantity = 1) => {
        setCartItems(prev => ({
            ...prev,
            [service.id]: {
                service,
                quantity: (prev[service.id]?.quantity || 0) + quantity
            }
        }));
    };

    // Remove item from cart
    const removeItem = (serviceId) => {
        setCartItems(prev => {
            const { [serviceId]: _, ...rest } = prev;
            return rest;
        });
    };

    // Update item quantity
    const updateQuantity = (serviceId, quantity) => {
        if (quantity <= 0) {
            removeItem(serviceId);
            return;
        }
        setCartItems(prev => ({
            ...prev,
            [serviceId]: {
                ...prev[serviceId],
                quantity
            }
        }));
    };

    // Clear entire cart
    const clearCart = () => {
        setCartItems({});
        setBookingDetails({
            mountain: null,
            jalur: null,
            basecamp: null,
            hikerCount: 1,
            selectedDate: null
        });
    };

    // Set booking context (mountain, jalur, basecamp)
    const setBookingContext = (mountain, jalur, basecamp) => {
        setBookingDetails(prev => ({
            ...prev,
            mountain,
            jalur,
            basecamp
        }));
    };

    // Set hiker count
    const setHikerCount = (count) => {
        setBookingDetails(prev => ({
            ...prev,
            hikerCount: Math.max(1, count)
        }));
    };

    // Set selected date
    const setSelectedDate = (date) => {
        setBookingDetails(prev => ({
            ...prev,
            selectedDate: date
        }));
    };

    // Calculate cart totals
    const cartSummary = useMemo(() => {
        let totalItems = 0;
        let subtotal = 0;
        const items = [];

        Object.values(cartItems).forEach(({ service, quantity }) => {
            totalItems += quantity;
            subtotal += service.harga * quantity;
            items.push({ ...service, quantity });
        });

        // Service fee (2.5%)
        const serviceFee = Math.round(subtotal * 0.025);

        // Total
        const total = subtotal + serviceFee;

        return {
            totalItems,
            subtotal,
            serviceFee,
            total,
            items
        };
    }, [cartItems]);

    // Check if cart is empty
    const isEmpty = Object.keys(cartItems).length === 0;

    const value = {
        cartItems,
        bookingDetails,
        cartSummary,
        isEmpty,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setBookingContext,
        setHikerCount,
        setSelectedDate
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

/**
 * Custom hook to use cart context
 */
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;
