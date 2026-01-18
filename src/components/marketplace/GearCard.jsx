import React, { useState } from 'react';
import MaterialIcon from './MaterialIcon';

const GearCard = ({ gear }) => {
    const [isBookmarked, setIsBookmarked] = useState(gear.isBookmarked);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const formatPrice = (price) => {
        if (typeof price === 'number' && price > 1000) {
            return `Rp ${price.toLocaleString('id-ID')}`;
        }
        return `$${price}`;
    };

    const getTypeLabel = (type) => {
        const labels = {
            'equipment': 'Alat',
            'porter': 'Porter',
            'guide': 'Guide',
            'package': 'Paket'
        };
        return labels[type] || type;
    };

    const getTypeColor = (type) => {
        const colors = {
            'equipment': 'bg-blue-100 text-blue-700',
            'porter': 'bg-orange-100 text-orange-700',
            'guide': 'bg-purple-100 text-purple-700',
            'package': 'bg-green-100 text-green-700'
        };
        return colors[type] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="flex flex-col min-w-[150px] group cursor-pointer">
            {/* Image Container */}
            <div className="w-full aspect-square bg-white rounded-2xl overflow-hidden mb-3 shadow-sm border border-gray-100 relative">
                {/* Bookmark Button */}
                <div className="absolute top-2 right-2 z-10">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsBookmarked(!isBookmarked);
                        }}
                        className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-sm"
                    >
                        <MaterialIcon
                            name="bookmark"
                            className={`text-[18px] ${isBookmarked ? 'text-price-green' : 'text-active-dark'}`}
                            filled={isBookmarked}
                        />
                    </button>
                </div>

                {/* Type Badge */}
                {gear.type && (
                    <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-semibold ${getTypeColor(gear.type)}`}>
                        {getTypeLabel(gear.type)}
                    </div>
                )}

                {/* Stock Warning */}
                {gear.stock !== undefined && gear.stock <= 3 && gear.stock > 0 && (
                    <div className="absolute bottom-2 left-2 z-10 bg-red-500 text-white px-2 py-0.5 rounded text-[10px] font-semibold">
                        Sisa {gear.stock}
                    </div>
                )}

                {/* Out of Stock */}
                {gear.stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 m-2 rounded-xl">
                        <span className="text-white font-bold text-sm">Habis</span>
                    </div>
                )}

                {/* Skeleton placeholder while loading */}
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}

                {/* Product Image */}
                <img
                    src={gear.imageUrl}
                    alt={gear.nama_layanan || gear.name}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
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
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <MaterialIcon name="image_not_supported" className="text-gray-400 text-2xl" />
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div>
                <h4 className="text-active-dark font-bold text-base leading-tight group-hover:text-price-green transition-colors line-clamp-2">
                    {gear.nama_layanan || gear.name}
                </h4>
                <p className="text-active-dark/50 text-xs mt-1 font-medium">
                    {gear.brand || gear.deskripsi_layanan?.substring(0, 30) + '...'}
                </p>

                {/* Rating (if available) */}
                {gear.rating && (
                    <div className="flex items-center gap-1 mt-1">
                        <MaterialIcon name="star" className="text-orange-400 text-[14px]" filled />
                        <span className="text-xs font-medium text-active-dark">{gear.rating}</span>
                    </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-1 mt-2">
                    <p className="text-price-green font-bold text-sm">
                        {formatPrice(gear.harga || gear.price)}
                    </p>
                    <span className="text-active-dark/40 text-xs">
                        / {gear.unit || gear.priceUnit || 'day'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GearCard;
