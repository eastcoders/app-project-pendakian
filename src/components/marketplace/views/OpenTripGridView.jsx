import React, { useState } from 'react';
import MaterialIcon from '../MaterialIcon';

/**
 * Compact Open Trip Card for Grid View
 */
const TripGridCard = ({ trip, onClick }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(trip.isBookmarked);

    const formatPrice = (price) => {
        return `Rp ${price.toLocaleString('id-ID')}`;
    };

    return (
        <div
            onClick={() => onClick?.(trip)}
            className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
        >
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] bg-gray-100">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}

                <img
                    src={trip.imageUrl}
                    alt={trip.nama_layanan}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                />

                {/* Duration Badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary text-white">
                    {trip.duration || '3D2N'}
                </div>

                {/* Bookmark Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsBookmarked(!isBookmarked);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm"
                >
                    <MaterialIcon
                        name="bookmark"
                        className={`text-[16px] ${isBookmarked ? 'text-price-green' : 'text-gray-400'}`}
                        filled={isBookmarked}
                    />
                </button>

                {/* Stock/Quota Badge */}
                {trip.stock <= 5 && (
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white">
                        Sisa {trip.stock} slot
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-3">
                {/* Name */}
                <h3 className="text-active-dark font-bold text-sm leading-tight line-clamp-2">
                    {trip.nama_layanan}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-[11px] mt-1 line-clamp-1">
                    {trip.deskripsi_layanan}
                </p>

                {/* Stats Row */}
                <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-0.5">
                        <MaterialIcon name="star" className="text-orange-400 text-[14px]" filled />
                        <span className="text-xs font-bold text-active-dark">{trip.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] text-gray-500">{trip.unit}</span>
                </div>

                {/* Price */}
                <div className="mt-2">
                    <span className="text-price-green font-bold text-sm">
                        {formatPrice(trip.harga)}
                    </span>
                    <span className="text-gray-400 text-[10px]"> /pax</span>
                </div>
            </div>
        </div>
    );
};

/**
 * Open Trip Grid View - 2 column layout
 */
const OpenTripGridView = ({ trips, onTripClick }) => {
    return (
        <div className="px-4 py-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-active-dark font-bold text-lg">Open Trip</h2>
                    <p className="text-gray-500 text-xs">{trips.length} paket tersedia</p>
                </div>

                {/* Filter Button */}
                <button className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-full border border-gray-200 text-sm">
                    <MaterialIcon name="filter_list" className="text-gray-500 text-[16px]" />
                    <span className="text-gray-600 text-xs font-medium">Filter</span>
                </button>
            </div>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-2 gap-3">
                {trips.map((trip) => (
                    <TripGridCard
                        key={trip.id}
                        trip={trip}
                        onClick={onTripClick}
                    />
                ))}
            </div>

            {/* Empty State */}
            {trips.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <MaterialIcon name="hiking" className="text-gray-300 text-5xl mb-3" />
                    <p className="text-gray-500 text-sm">Belum ada open trip tersedia</p>
                </div>
            )}
        </div>
    );
};

export default OpenTripGridView;
