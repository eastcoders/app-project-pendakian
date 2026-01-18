import React, { useState } from 'react';
import { MountainSnow, Bell } from 'lucide-react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

const Header = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 bg-background/80 backdrop-blur-md max-w-md mx-auto transition-all duration-300 ${isScrolled ? 'py-2 shadow-sm' : 'py-4'
                }`}
        >
            <div className={`flex items-center gap-2 transition-all duration-300 ${isScrolled ? 'scale-90 origin-left' : 'scale-100'}`}>
                <MountainSnow
                    className={`text-primary transition-all duration-300 ${isScrolled ? 'w-6 h-6' : 'w-7 h-7'}`}
                    strokeWidth={2}
                />
                <h1 className={`font-extrabold tracking-tight text-primary transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}>
                    Hiker Feed
                </h1>
            </div>
            <button className={`relative p-2 rounded-full hover:bg-black/5 transition-all duration-300 ${isScrolled ? 'scale-90 origin-right' : 'scale-100'}`}>
                <Bell className={`text-primary transition-all duration-300 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} />
                <span className="absolute top-2 right-2 size-2 bg-accent rounded-full border-2 border-background"></span>
            </button>
        </header>
    );
};

export default Header;
