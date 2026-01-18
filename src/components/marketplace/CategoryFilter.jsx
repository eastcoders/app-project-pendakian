import React, { useState } from 'react';
import MaterialIcon from './MaterialIcon';

const CategoryFilter = ({ categories: initialCategories, onCategoryChange }) => {
    const [categories, setCategories] = useState(initialCategories);

    const handleCategoryClick = (id) => {
        const updated = categories.map(cat => ({
            ...cat,
            isActive: cat.id === id
        }));
        setCategories(updated);
        onCategoryChange?.(id);
    };

    return (
        <div className="w-full overflow-x-auto hide-scrollbar pl-4 pr-4 py-3">
            <div className="flex gap-3 min-w-max">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`flex items-center gap-2 rounded-full px-5 py-2.5 transition-transform active:scale-95 ${category.isActive
                                ? 'bg-active-dark'
                                : 'bg-white shadow-sm border border-gray-100'
                            }`}
                    >
                        <MaterialIcon
                            name={category.icon}
                            className={`text-[20px] ${category.isActive ? 'text-white' : 'text-active-dark'}`}
                        />
                        <span className={`text-sm whitespace-nowrap ${category.isActive
                                ? 'text-white font-semibold'
                                : 'text-active-dark font-medium'
                            }`}>
                            {category.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
