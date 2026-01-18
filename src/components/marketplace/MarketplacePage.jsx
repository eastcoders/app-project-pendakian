import React, { useState, useEffect } from 'react';
import MarketplaceHeader from './MarketplaceHeader';
import CategoryFilter from './CategoryFilter';
import SectionHeader from './SectionHeader';
import MountainCard from './MountainCard';
import GearCard from './GearCard';
import MarketplaceSkeleton from './MarketplaceSkeleton';
import {
    categories,
    gunungData,
    layananBasecamp,
    getLayananByType
} from '../../data/mockData';

const MarketplacePage = ({ onBack }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(1); // 'Semua'
    const [filteredLayanan, setFilteredLayanan] = useState([]);

    // Simulate initial data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Filter layanan based on category
    useEffect(() => {
        if (activeCategory === 1) {
            // Semua - show equipment by default
            setFilteredLayanan(getLayananByType('equipment'));
        } else if (activeCategory === 4) {
            // Sewa Alat
            setFilteredLayanan(getLayananByType('equipment'));
        } else if (activeCategory === 5) {
            // Porter
            setFilteredLayanan(getLayananByType('porter'));
        } else if (activeCategory === 6) {
            // Guide
            setFilteredLayanan(getLayananByType('guide'));
        } else {
            setFilteredLayanan(layananBasecamp.slice(0, 5));
        }
    }, [activeCategory]);

    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
    };

    const handleSeeAllMountains = () => {
        console.log('See all mountains clicked');
    };

    const handleSeeAllGear = () => {
        console.log('See all gear clicked');
    };

    // Show full page skeleton during initial load
    if (isLoading) {
        return <MarketplaceSkeleton />;
    }

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
                    title="Gunung Populer"
                    onSeeAll={handleSeeAllMountains}
                />

                {/* Horizontal Carousel */}
                <div className="flex overflow-x-auto hide-scrollbar px-4 pb-8 -mr-4 gap-4 snap-x snap-mandatory">
                    {gunungData.map((mountain) => (
                        <MountainCard key={mountain.id} mountain={mountain} />
                    ))}
                </div>
            </div>

            {/* Section: Layanan & Sewa Alat */}
            <div className="flex flex-col pt-2 pb-6">
                <SectionHeader
                    title={
                        activeCategory === 5 ? 'Jasa Porter' :
                            activeCategory === 6 ? 'Guide Profesional' :
                                'Sewa Alat Pendakian'
                    }
                    onSeeAll={handleSeeAllGear}
                />

                {/* Horizontal Carousel */}
                <div className="flex overflow-x-auto hide-scrollbar px-4 pb-4 gap-4">
                    {filteredLayanan.map((gear) => (
                        <GearCard key={gear.id} gear={gear} />
                    ))}
                </div>
            </div>

            {/* Section: Paket Pendakian */}
            <div className="flex flex-col pt-2 pb-6">
                <SectionHeader
                    title="Paket Pendakian"
                    onSeeAll={() => console.log('See all packages')}
                />

                <div className="flex overflow-x-auto hide-scrollbar px-4 pb-4 gap-4">
                    {layananBasecamp
                        .filter(l => l.type === 'package')
                        .map((pkg) => (
                            <GearCard key={pkg.id} gear={pkg} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MarketplacePage;
