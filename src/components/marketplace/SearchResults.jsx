import React from 'react';
import MountainCard from './MountainCard';
import GearCard from './GearCard';
import BasecampCard from './BasecampCard';
import SectionHeader from './SectionHeader';

const SearchResults = ({ results, totalCount }) => {
    const hasResults = totalCount > 0;

    if (!hasResults) return null;

    return (
        <div className="flex flex-col gap-6 pb-20">
            <div className="px-4">
                <p className="text-sm font-medium text-active-dark/60">
                    Ditemukan {totalCount} hasil pencarian
                </p>
            </div>

            {/* Mountains Results */}
            {results.mountains.length > 0 && (
                <div className="flex flex-col gap-3">
                    <SectionHeader title="Gunung" />
                    <div className="flex overflow-x-auto hide-scrollbar px-4 pb-4 -mr-4 gap-4 snap-x snap-mandatory">
                        {results.mountains.map(item => (
                            <MountainCard key={item.id} mountain={item} />
                        ))}
                    </div>
                </div>
            )}

            {/* Basecamps Results */}
            {results.basecamps.length > 0 && (
                <div className="flex flex-col gap-3 px-4">
                    <SectionHeader title="Basecamp Official" />
                    <div className="grid grid-cols-1 gap-3">
                        {results.basecamps.map(item => (
                            <BasecampCard key={item.id} basecamp={item} />
                        ))}
                    </div>
                </div>
            )}

            {/* Gear/Services Results */}
            {results.services.length > 0 && (
                <div className="flex flex-col gap-3">
                    <SectionHeader title="Layanan & Sewa Alat" />
                    <div className="grid grid-cols-2 gap-4 px-4">
                        {results.services.map(item => (
                            <GearCard key={item.id} gear={item} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
