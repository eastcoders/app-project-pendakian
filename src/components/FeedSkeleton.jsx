import React from 'react';

const FeedSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 animate-pulse">
            {/* User Header Skeleton */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gray-200"></div>
                    <div className="flex flex-col gap-2">
                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                        <div className="h-2.5 w-16 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-200"></div>
            </div>

            {/* Image Skeleton */}
            <div className="w-full aspect-[4/5] bg-gray-200"></div>

            {/* Actions Skeleton */}
            <div className="px-2 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="size-7 rounded bg-gray-200"></div>
                        <div className="size-7 rounded bg-gray-200"></div>
                        <div className="size-7 rounded bg-gray-200"></div>
                    </div>
                    <div className="size-7 rounded bg-gray-200"></div>
                </div>

                {/* Likes & Caption Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="space-y-1.5">
                        <div className="h-3.5 w-full bg-gray-200 rounded"></div>
                        <div className="h-3.5 w-3/4 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedSkeleton;
