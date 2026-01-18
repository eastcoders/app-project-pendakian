import React, { useState } from 'react';
import MaterialIcon from './MaterialIcon';

const GearCard = ({ gear }) => {
    const [isBookmarked, setIsBookmarked] = useState(gear.isBookmarked);

    return (
        <div className="flex flex-col min-w-[150px] group cursor-pointer">
            {/* Image Container */}
            <div className="w-full aspect-square bg-white rounded-2xl overflow-hidden mb-3 shadow-sm border border-gray-100 flex items-center justify-center p-2 relative">
                {/* Bookmark Button */}
                <div className="absolute top-2 right-2 z-10">
                    <button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className="bg-white/50 p-1 rounded-full hover:bg-white transition-colors"
                    >
                        <MaterialIcon
                            name="bookmark"
                            className={`text-[18px] ${isBookmarked ? 'text-price-green' : 'text-active-dark'}`}
                            filled={isBookmarked}
                        />
                    </button>
                </div>

                {/* Product Image */}
                <div
                    className="w-full h-full bg-cover bg-center rounded-xl"
                    style={{ backgroundImage: `url('${gear.imageUrl}')` }}
                />
            </div>

            {/* Card Content */}
            <div>
                <h4 className="text-active-dark font-bold text-base leading-tight group-hover:text-price-green transition-colors">
                    {gear.name}
                </h4>
                <p className="text-active-dark/50 text-xs mt-1 font-medium">{gear.brand}</p>
                <div className="flex items-center gap-1 mt-2">
                    <p className="text-active-dark font-bold text-sm">${gear.price}</p>
                    <span className="text-active-dark/40 text-xs">/ {gear.priceUnit}</span>
                </div>
            </div>
        </div>
    );
};

export default GearCard;
