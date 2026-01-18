import React, { useState } from 'react';
import MaterialIcon from './MaterialIcon';

const MountainCard = ({ mountain }) => {
    const [isFavorite, setIsFavorite] = useState(mountain.isFavorite);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const formatPrice = (price) => {
        if (typeof price === 'number') {
            return `Rp ${price.toLocaleString('id-ID')}`;
        }
        return `From $${price}`;
    };

    return (
        <div className="relative flex flex-col min-w-[280px] snap-center group cursor-pointer">
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-gray-100">
                {/* Skeleton placeholder while loading */}
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}

                {/* Actual Image */}
                <img
                    src={mountain.imageUrl}
                    alt={mountain.nama_gunung || mountain.name}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setImageError(true);
                        setImageLoaded(true);
                    }}
                    loading="lazy"
                />

                {/* Error fallback */}
                {imageError && (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <MaterialIcon name="image_not_supported" className="text-gray-400 text-4xl" />
                    </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
                    <MaterialIcon name="star" className="text-orange-400 text-[16px]" filled />
                    <span className="text-xs font-bold text-active-dark">{mountain.rating}</span>
                </div>

                {/* MDPL Badge (if available) */}
                {mountain.mdpl && (
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-lg">
                        <p className="text-xs font-semibold">{mountain.mdpl} mdpl</p>
                    </div>
                )}

                {/* Price Badge */}
                <div className="absolute bottom-3 left-3 bg-price-green text-white px-3 py-1.5 rounded-lg shadow-md">
                    <p className="text-xs font-bold">{formatPrice(mountain.price || 50)}</p>
                </div>

                {/* Difficulty Badge (if available) */}
                {mountain.difficulty && (
                    <div className={`absolute bottom-3 right-3 px-2 py-1 rounded-lg text-xs font-semibold ${mountain.difficulty === 'Easy' ? 'bg-green-500 text-white' :
                            mountain.difficulty === 'Medium' ? 'bg-yellow-500 text-white' :
                                'bg-red-500 text-white'
                        }`}>
                        {mountain.difficulty}
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="mt-3 px-1">
                <div className="flex justify-between items-start">
                    <h3 className="text-active-dark text-lg font-bold leading-snug">
                        {mountain.nama_gunung || mountain.name}
                    </h3>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFavorite(!isFavorite);
                        }}
                        className={`transition-colors ${isFavorite ? 'text-red-500' : 'text-active-dark/40 hover:text-red-500'}`}
                    >
                        <MaterialIcon name="favorite" className="text-[24px]" filled={isFavorite} />
                    </button>
                </div>
                <div className="flex items-center gap-1 mt-1 text-active-dark/60">
                    <MaterialIcon name="location_on" className="text-[16px]" />
                    <p className="text-sm font-medium">{mountain.provinsi || mountain.location}</p>
                </div>
                {/* Reviews count */}
                {mountain.totalReviews && (
                    <p className="text-xs text-active-dark/50 mt-1">
                        {mountain.totalReviews.toLocaleString('id-ID')} reviews
                    </p>
                )}
            </div>
        </div>
    );
};

export default MountainCard;
