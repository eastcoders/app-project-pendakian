import React from 'react';
import { MountainSnow, Bell } from 'lucide-react';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md max-w-md mx-auto transition-all duration-300">
            <div className="flex items-center gap-2">
                <MountainSnow className="text-primary w-7 h-7" strokeWidth={2} />
                <h1 className="text-xl font-extrabold tracking-tight text-primary">Hiker Feed</h1>
            </div>
            <button className="relative p-2 rounded-full hover:bg-black/5 transition-colors">
                <Bell className="text-primary w-6 h-6" />
                <span className="absolute top-2 right-2 size-2 bg-accent rounded-full border-2 border-background"></span>
            </button>
        </header>
    );
};

export default Header;
