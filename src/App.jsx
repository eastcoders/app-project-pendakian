import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import FeedCard from './components/FeedCard';
import FeedSkeleton from './components/FeedSkeleton';
import BottomNav from './components/BottomNav';
import {
    MarketplacePage,
    BookingProvider,
    CheckoutProvider
} from './components/marketplace';
import {
    BookingHistoryPage,
    TransactionHistoryPage
} from './components/marketplace/booking';
import { feedData } from './data';

/**
 * Feed Page Component
 */
const FeedPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Simulate network request
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleNavigate = (page) => {
        if (page === 'marketplace') {
            navigate('/marketplace');
        }
    };

    // Determine current page from location
    const currentPage = location.pathname === '/' ? 'home' :
        location.pathname.startsWith('/marketplace') ? 'marketplace' : 'home';

    return (
        <Layout>
            <Header />
            <main className="flex-1 flex flex-col gap-8 px-4 pt-24 pb-24">
                {isLoading ? (
                    [...Array(3)].map((_, index) => (
                        <React.Fragment key={index}>
                            <FeedSkeleton />
                            {index < 2 && (
                                <div className="h-px w-full bg-gray-200 mx-auto"></div>
                            )}
                        </React.Fragment>
                    ))
                ) : (
                    feedData.map((post, index) => (
                        <React.Fragment key={post.id}>
                            <FeedCard post={post} />
                            {index < feedData.length - 1 && (
                                <div className="h-px w-full bg-gray-200 mx-auto"></div>
                            )}
                        </React.Fragment>
                    ))
                )}
            </main>
            <BottomNav onNavigate={handleNavigate} currentPage={currentPage} />
        </Layout>
    );
};

/**
 * Marketplace Layout Component
 * Provides context providers for marketplace routes
 */
const MarketplaceLayout = () => {
    const navigate = useNavigate();

    return (
        <BookingProvider>
            <CheckoutProvider>
                <MarketplacePage onBack={() => navigate('/')} />
            </CheckoutProvider>
        </BookingProvider>
    );
};

/**
 * Booking History Layout Component
 */
const BookingHistoryLayout = () => {
    const navigate = useNavigate();

    return (
        <BookingProvider>
            <BookingHistoryPage
                onBack={() => navigate('/marketplace')}
                onViewDetail={(booking, downloadMode) => {
                    // Navigate to marketplace with booking data
                    navigate('/marketplace', {
                        state: {
                            viewBooking: booking,
                            downloadMode
                        }
                    });
                }}
            />
        </BookingProvider>
    );
};

/**
 * Transaction History Layout Component
 */
const TransactionHistoryLayout = () => {
    const navigate = useNavigate();

    return (
        <BookingProvider>
            <TransactionHistoryPage
                onBack={() => navigate('/marketplace')}
                onViewBooking={(booking) => {
                    navigate('/booking-history');
                }}
            />
        </BookingProvider>
    );
};

/**
 * Main App Component with Routes
 */
function App() {
    return (
        <Routes>
            {/* Home/Feed Route */}
            <Route path="/" element={<FeedPage />} />

            {/* Marketplace Routes */}
            <Route path="/marketplace/*" element={<MarketplaceLayout />} />

            {/* Booking History Route */}
            <Route path="/booking-history" element={<BookingHistoryLayout />} />

            {/* Transaction History Route */}
            <Route path="/transactions" element={<TransactionHistoryLayout />} />
        </Routes>
    );
}

export default App;
