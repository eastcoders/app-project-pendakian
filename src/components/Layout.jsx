import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full flex flex-col pb-24 mx-auto max-w-md bg-background shadow-2xl overflow-hidden font-sans">
            {children}
        </div>
    );
};

export default Layout;
