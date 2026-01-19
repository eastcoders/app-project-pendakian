import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import FeedCard from './components/FeedCard';
import FeedSkeleton from './components/FeedSkeleton';
import BottomNav from './components/BottomNav';
import { MarketplacePage, BookingProvider } from './components/marketplace';
import { feedData } from './data';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'marketplace'

    useEffect(() => {
        // Simulate network request
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Handle navigation
    const handleNavigate = (page) => {
        setCurrentPage(page);
    };

    // Render Marketplace Page
    if (currentPage === 'marketplace') {
        return (
            <BookingProvider>
                <MarketplacePage onBack={() => setCurrentPage('home')} />
            </BookingProvider>
        );
    }

    // Render Home/Feed Page
    return (
        <Layout>
            <Header />
            <main className="flex-1 flex flex-col gap-8 px-4 pt-24 pb-24">
                {isLoading ? (
                    // Show 3 skeleton items while loading
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
}

export default App;
