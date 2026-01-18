import React, { useState } from 'react';
import MaterialIcon from '../MaterialIcon';

/**
 * Compact Mountain Card for Grid View (2-column layout)
 * Similar to Shopee product card style
 */
const MountainGridCard = ({ mountain, onClick }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(mountain.isFavorite);

    return (
        <div
            onClick={() => onClick?.(mountain)}
            className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
        >
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] bg-gray-100">
                {/* Skeleton */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}

                <img
                    src={mountain.imageUrl}
                    alt={mountain.nama_gunung}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                />

                {/* Difficulty Badge */}
                <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold ${mountain.difficulty === 'Easy' ? 'bg-green-500 text-white' :
                        mountain.difficulty === 'Medium' ? 'bg-yellow-500 text-white' :
                            'bg-red-500 text-white'
                    }`}>
                    {mountain.difficulty}
                </div>

                {/* Favorite Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFavorite(!isFavorite);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm"
                >
                    <MaterialIcon
                        name="favorite"
                        className={`text-[16px] ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                        filled={isFavorite}
                    />
                </button>
            </div>

            {/* Content */}
            <div className="p-3">
                {/* Name */}
                <h3 className="text-active-dark font-bold text-sm leading-tight line-clamp-1">
                    {mountain.nama_gunung}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 mt-1">
                    <MaterialIcon name="location_on" className="text-gray-400 text-[12px]" />
                    <p className="text-gray-500 text-[11px] line-clamp-1">{mountain.provinsi}</p>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between mt-2">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                        <MaterialIcon name="star" className="text-orange-400 text-[14px]" filled />
                        <span className="text-xs font-bold text-active-dark">{mountain.rating}</span>
                        <span className="text-[10px] text-gray-400">({mountain.totalReviews})</span>
                    </div>

                    {/* MDPL */}
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded">
                        <MaterialIcon name="landscape" className="text-primary text-[12px]" />
                        <span className="text-[10px] font-bold text-active-dark">{mountain.mdpl}m</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Mountain Grid View - 2 column layout like Shopee
 */
const MountainGridView = ({ mountains, onMountainClick }) => {
    return (
        <div className="px-4 py-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-active-dark font-bold text-lg">Semua Gunung</h2>
                    <p className="text-gray-500 text-xs">{mountains.length} gunung tersedia</p>
                </div>

                {/* Sort Button */}
                <button className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-full border border-gray-200 text-sm">
                    <MaterialIcon name="sort" className="text-gray-500 text-[16px]" />
                    <span className="text-gray-600 text-xs font-medium">Urutkan</span>
                </button>
            </div>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-2 gap-3">
                {mountains.map((mountain) => (
                    <MountainGridCard
                        key={mountain.id}
                        mountain={mountain}
                        onClick={onMountainClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default MountainGridView;
