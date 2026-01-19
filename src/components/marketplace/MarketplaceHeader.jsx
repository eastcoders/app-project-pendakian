import React from 'react';
import MaterialIcon from './MaterialIcon';

const MarketplaceHeader = ({ onBack, searchQuery, onSearchChange, onClearSearch, onViewHistory }) => {
    return (
        <div className="sticky top-0 z-30 bg-background-light/95 backdrop-blur-sm pt-6 pb-2 px-4 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <MaterialIcon name="arrow_back" className="text-active-dark text-[24px]" />
                </button>

                {/* Search Input */}
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <MaterialIcon name="search" className="text-active-dark/50" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Cari gunung, alat, atau basecamp..."
                        className="block w-full rounded-full border-none bg-white py-3.5 pl-12 pr-12 text-active-dark shadow-soft focus:ring-2 focus:ring-primary/50 placeholder:text-gray-400 text-sm font-medium leading-normal transition-shadow"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-1">
                        {searchQuery && (
                            <button
                                onClick={onClearSearch}
                                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors animate-fade-in"
                            >
                                <MaterialIcon name="close" className="text-active-dark/50 text-[18px]" />
                            </button>
                        )}
                        <button className="p-2 transition-colors hover:text-primary">
                            <MaterialIcon name="tune" className="text-active-dark/70 text-[20px] hover:text-primary" />
                        </button>
                    </div>
                </div>

                {/* History Button */}
                {onViewHistory && (
                    <button
                        onClick={onViewHistory}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                        title="Riwayat Booking"
                    >
                        <MaterialIcon name="receipt_long" className="text-active-dark text-[24px]" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default MarketplaceHeader;
