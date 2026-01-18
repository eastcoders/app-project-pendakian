import React from 'react';
import MarketplaceHeader from './MarketplaceHeader';
import CategoryFilter from './CategoryFilter';
import SectionHeader from './SectionHeader';
import MountainCard from './MountainCard';
import GearCard from './GearCard';
import { categories, popularMountains, gearRentals } from '../../data/mockData';

const MarketplacePage = ({ onBack }) => {
    const handleCategoryChange = (categoryId) => {
        console.log('Category selected:', categoryId);
        // Future: Filter content based on category
    };

    const handleSeeAllMountains = () => {
        console.log('See all mountains clicked');
        // Future: Navigate to mountains list page
    };

    const handleSeeAllGear = () => {
        console.log('See all gear clicked');
        // Future: Navigate to gear rental list page
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-8 max-w-md mx-auto bg-background-light">
            {/* Header with Search */}
            <MarketplaceHeader onBack={onBack} />

            {/* Category Filter Chips */}
            <CategoryFilter
                categories={categories}
                onCategoryChange={handleCategoryChange}
            />

            {/* Section: Popular Mountains */}
            <div className="flex flex-col pt-6">
                <SectionHeader
                    title="Popular Mountains"
                    onSeeAll={handleSeeAllMountains}
                />

                {/* Horizontal Carousel */}
                <div className="flex overflow-x-auto hide-scrollbar px-4 pb-8 -mr-4 gap-4 snap-x snap-mandatory">
                    {popularMountains.map((mountain) => (
                        <MountainCard key={mountain.id} mountain={mountain} />
                    ))}
                </div>
            </div>

            {/* Section: Best Gear Rentals */}
            <div className="flex flex-col pt-2 pb-6">
                <SectionHeader
                    title="Best Gear Rentals"
                    onSeeAll={handleSeeAllGear}
                />

                {/* Horizontal Carousel */}
                <div className="flex overflow-x-auto hide-scrollbar px-4 pb-4 gap-4">
                    {gearRentals.map((gear) => (
                        <GearCard key={gear.id} gear={gear} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketplacePage;
