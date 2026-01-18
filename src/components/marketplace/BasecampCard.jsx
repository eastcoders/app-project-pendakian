import React from 'react';
import MaterialIcon from './MaterialIcon';

const BasecampCard = ({ basecamp }) => {
    return (
        <div className="flex gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
            {/* Image */}
            <div className="w-20 h-20 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
                <img
                    src={basecamp.imageUrl}
                    alt={basecamp.nama_basecamp}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex items-start justify-between">
                    <h4 className="text-active-dark font-bold text-sm truncate pr-2">
                        {basecamp.nama_basecamp}
                    </h4>
                    {basecamp.isVerified && (
                        <MaterialIcon name="verified" className="text-blue-500 text-[16px]" filled />
                    )}
                </div>

                <div className="flex items-center gap-1 mt-1 text-active-dark/60">
                    <MaterialIcon name="location_on" className="text-[14px]" />
                    <p className="text-xs truncate">{basecamp.location_coordinate}</p>
                </div>

                <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-0.5">
                        <MaterialIcon name="star" className="text-orange-400 text-[14px]" filled />
                        <span className="text-xs font-bold text-active-dark">{basecamp.rating}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">•</span>
                    <span className="text-[10px] text-gray-500">{basecamp.totalReviews} reviews</span>
                </div>
            </div>
        </div>
    );
};

export default BasecampCard;
