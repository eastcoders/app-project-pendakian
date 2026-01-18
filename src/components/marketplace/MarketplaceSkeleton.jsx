import React from 'react';

// Skeleton for Mountain Card (4:3 aspect ratio image + content)
export const MountainCardSkeleton = () => (
    <div className="flex flex-col min-w-[280px] animate-pulse">
        {/* Image Skeleton */}
        <div className="w-full aspect-[4/3] rounded-2xl bg-gray-200" />

        {/* Content Skeleton */}
        <div className="mt-3 px-1 space-y-2">
            <div className="flex justify-between items-start">
                <div className="h-5 w-32 bg-gray-200 rounded" />
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
            </div>
            <div className="flex items-center gap-1">
                <div className="h-4 w-4 bg-gray-200 rounded-full" />
                <div className="h-4 w-28 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

// Skeleton for Gear/Layanan Card (square image + content)
export const GearCardSkeleton = () => (
    <div className="flex flex-col min-w-[150px] animate-pulse">
        {/* Image Skeleton */}
        <div className="w-full aspect-square rounded-2xl bg-gray-200 mb-3" />

        {/* Content Skeleton */}
        <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
    </div>
);

// Skeleton for Category Chips
export const CategoryChipsSkeleton = () => (
    <div className="w-full overflow-x-auto hide-scrollbar pl-4 pr-4 py-3">
        <div className="flex gap-3 min-w-max animate-pulse">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 w-24 rounded-full bg-gray-200" />
            ))}
        </div>
    </div>
);

// Skeleton for Search Header
export const HeaderSkeleton = () => (
    <div className="sticky top-0 z-30 bg-background-light/95 backdrop-blur-sm pt-6 pb-2 px-4 animate-pulse">
        <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div className="flex-1 h-12 rounded-full bg-gray-200" />
        </div>
    </div>
);

// Skeleton for Section Header
export const SectionHeaderSkeleton = () => (
    <div className="flex items-center justify-between px-4 pb-4 animate-pulse">
        <div className="h-6 w-40 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
    </div>
);

// Full Page Marketplace Skeleton
const MarketplaceSkeleton = () => {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-8 max-w-md mx-auto bg-background-light">
            {/* Header Skeleton */}
            <HeaderSkeleton />

            {/* Category Chips Skeleton */}
            <CategoryChipsSkeleton />

            {/* Section: Popular Mountains */}
            <div className="flex flex-col pt-6">
                <SectionHeaderSkeleton />
                <div className="flex overflow-x-auto hide-scrollbar px-4 pb-8 -mr-4 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <MountainCardSkeleton key={i} />
                    ))}
                </div>
            </div>

            {/* Section: Gear Rentals */}
            <div className="flex flex-col pt-2 pb-6">
                <SectionHeaderSkeleton />
                <div className="flex overflow-x-auto hide-scrollbar px-4 pb-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <GearCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketplaceSkeleton;
