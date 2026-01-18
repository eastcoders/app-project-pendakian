import React from 'react';

// Material Symbol component for easier usage
const MaterialIcon = ({ name, className = '', filled = false }) => (
    <span
        className={`material-symbols-outlined ${className}`}
        style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}
    >
        {name}
    </span>
);

export default MaterialIcon;
