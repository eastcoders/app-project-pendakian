import React from 'react';

const SectionHeader = ({ title, onSeeAll }) => {
    return (
        <div className="flex items-center justify-between px-4 pb-4">
            <h2 className="text-active-dark text-[22px] font-bold leading-tight tracking-tight">
                {title}
            </h2>
            {onSeeAll && (
                <button
                    onClick={onSeeAll}
                    className="text-sm font-medium text-active-dark/60 hover:text-primary transition-colors"
                >
                    See all
                </button>
            )}
        </div>
    );
};

export default SectionHeader;
