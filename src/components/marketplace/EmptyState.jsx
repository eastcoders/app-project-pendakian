import React from 'react';
import MaterialIcon from './MaterialIcon';

const EmptyState = ({ query, onClear }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <MaterialIcon name="search_off" className="text-gray-300 text-5xl" />
            </div>
            <h3 className="text-active-dark font-bold text-lg mb-2">
                Tidak ditemukan "{query}"
            </h3>
            <p className="text-active-dark/50 text-sm max-w-[250px] mb-6">
                Coba gunakan kata kunci lain atau ubah filter kategori pencarianmu.
            </p>
            <button
                onClick={onClear}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-active-dark rounded-full font-medium transition-colors text-sm"
            >
                Hapus Pencarian
            </button>
        </div>
    );
};

export default EmptyState;
