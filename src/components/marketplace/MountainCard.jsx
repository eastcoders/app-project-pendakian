import React, { useState } from 'react';
import MaterialIcon from './MaterialIcon';

const MountainCard = ({ mountain }) => {
    const [isFavorite, setIsFavorite] = useState(mountain.isFavorite);

    return (
        <div className="relative flex flex-col min-w-[280px] snap-center group cursor-pointer">
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <div
                    className="w-full h-full bg-gray-200 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${mountain.imageUrl}')` }}
                />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
                    <MaterialIcon name="star" className="text-orange-400 text-[16px]" filled />
                    <span className="text-xs font-bold text-active-dark">{mountain.rating}</span>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-3 left-3 bg-price-green text-white px-3 py-1.5 rounded-lg shadow-md">
                    <p className="text-xs font-bold">From ${mountain.price}</p>
                </div>
            </div>

            {/* Card Content */}
            <div className="mt-3 px-1">
                <div className="flex justify-between items-start">
                    <h3 className="text-active-dark text-lg font-bold leading-snug">{mountain.name}</h3>
                    <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={`transition-colors ${isFavorite ? 'text-red-500' : 'text-active-dark/40 hover:text-red-500'}`}
                    >
                        <MaterialIcon name="favorite" className="text-[24px]" filled={isFavorite} />
                    </button>
                </div>
                <div className="flex items-center gap-1 mt-1 text-active-dark/60">
                    <MaterialIcon name="location_on" className="text-[16px]" />
                    <p className="text-sm font-medium">{mountain.location}</p>
                </div>
            </div>
        </div>
    );
};

export default MountainCard;
