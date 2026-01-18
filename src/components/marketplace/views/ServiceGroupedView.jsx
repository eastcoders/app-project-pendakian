import React, { useState } from 'react';
import MaterialIcon from '../MaterialIcon';

/**
 * Compact Service Card for Grid/List View
 */
const ServiceCard = ({ service, onAdd }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const formatPrice = (price) => {
        return `Rp ${price.toLocaleString('id-ID')}`;
    };

    const getTypeIcon = (type) => {
        const icons = {
            'equipment': 'backpack',
            'porter': 'directions_walk',
            'guide': 'person_pin'
        };
        return icons[type] || 'inventory_2';
    };

    return (
        <div className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100">
            {/* Image */}
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <img
                    src={service.imageUrl}
                    alt={service.nama_layanan}
                    className={`w-full h-full object-cover transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                    <h4 className="text-active-dark font-bold text-sm leading-tight line-clamp-1">
                        {service.nama_layanan}
                    </h4>
                    <p className="text-gray-500 text-[11px] mt-0.5 line-clamp-1">
                        {service.deskripsi_layanan}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <div>
                        <span className="text-price-green font-bold text-sm">
                            {formatPrice(service.harga)}
                        </span>
                        <span className="text-gray-400 text-[10px]">/{service.unit}</span>
                    </div>

                    {/* Stock indicator */}
                    {service.stock !== undefined && (
                        <span className={`text-[10px] ${service.stock <= 3 ? 'text-red-500' : 'text-gray-400'
                            }`}>
                            Stok: {service.stock}
                        </span>
                    )}
                </div>
            </div>

            {/* Add Button */}
            <button
                onClick={() => onAdd?.(service)}
                className="self-center w-8 h-8 flex items-center justify-center rounded-full bg-primary-neon text-text-dark hover:bg-opacity-90 transition-colors"
            >
                <MaterialIcon name="add" className="text-[18px]" />
            </button>
        </div>
    );
};

/**
 * Basecamp Group Section
 */
const BasecampGroup = ({ basecamp, services, onServiceAdd, defaultExpanded = true }) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className="mb-4">
            {/* Basecamp Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MaterialIcon name="store" className="text-primary text-[18px]" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-active-dark font-bold text-sm">{basecamp.nama_basecamp}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center gap-0.5">
                                <MaterialIcon name="star" className="text-orange-400 text-[12px]" filled />
                                <span className="text-[11px] font-medium text-active-dark">{basecamp.rating}</span>
                            </div>
                            {basecamp.isVerified && (
                                <>
                                    <span className="text-gray-300">•</span>
                                    <div className="flex items-center gap-0.5">
                                        <MaterialIcon name="verified" className="text-blue-500 text-[12px]" filled />
                                        <span className="text-[11px] text-blue-500 font-medium">Verified</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <MaterialIcon
                    name={isExpanded ? 'expand_less' : 'expand_more'}
                    className="text-gray-400 text-[24px]"
                />
            </button>

            {/* Services List */}
            {isExpanded && (
                <div className="mt-3 space-y-2 pl-2">
                    {services.length > 0 ? (
                        services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                onAdd={onServiceAdd}
                            />
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm text-center py-4">
                            Tidak ada layanan tersedia
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

/**
 * Service Grouped View - Layanan dikelompokkan per Basecamp
 */
const ServiceGroupedView = ({
    basecamps,
    services,
    filterType, // 'equipment' | 'porter' | 'guide' | null (all)
    onServiceAdd
}) => {
    // Group services by basecamp
    const getServicesByBasecamp = (basecampId) => {
        return services.filter(s => {
            const matchBasecamp = s.basecamp_id === basecampId;
            const matchType = filterType ? s.type === filterType : true;
            return matchBasecamp && matchType;
        });
    };

    // Get label for filter type
    const getFilterLabel = () => {
        const labels = {
            'equipment': 'Sewa Alat',
            'porter': 'Jasa Porter',
            'guide': 'Guide Profesional'
        };
        return labels[filterType] || 'Semua Layanan';
    };

    // Count total services
    const totalServices = basecamps.reduce((acc, bc) =>
        acc + getServicesByBasecamp(bc.id).length, 0
    );

    return (
        <div className="px-4 py-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-active-dark font-bold text-lg">{getFilterLabel()}</h2>
                    <p className="text-gray-500 text-xs">
                        {totalServices} layanan dari {basecamps.length} basecamp
                    </p>
                </div>
            </div>

            {/* Grouped by Basecamp */}
            {basecamps.map((basecamp, index) => {
                const basecampServices = getServicesByBasecamp(basecamp.id);
                // Only show basecamp if it has services matching the filter
                if (basecampServices.length === 0) return null;

                return (
                    <BasecampGroup
                        key={basecamp.id}
                        basecamp={basecamp}
                        services={basecampServices}
                        onServiceAdd={onServiceAdd}
                        defaultExpanded={index === 0} // Expand first one by default
                    />
                );
            })}

            {/* Empty State */}
            {totalServices === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <MaterialIcon name="inventory_2" className="text-gray-300 text-5xl mb-3" />
                    <p className="text-gray-500 text-sm">Belum ada layanan tersedia</p>
                </div>
            )}
        </div>
    );
};

export default ServiceGroupedView;
