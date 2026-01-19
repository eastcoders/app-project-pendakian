import React from 'react';

const SearchSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 px-4 pt-4">
            {/* Result Stats Skeleton */}
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />

            {/* List/Grid Skeleton Items */}
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-4 animate-pulse">
                    {/* Image Placeholder */}
                    <div className="w-24 h-24 bg-gray-200 rounded-xl flex-shrink-0" />

                    {/* Content Placeholder */}
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-5 w-3/4 bg-gray-200 rounded" />
                        <div className="h-3 w-1/2 bg-gray-200 rounded" />
                        <div className="h-4 w-20 bg-gray-200 rounded mt-2" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchSkeleton;
   