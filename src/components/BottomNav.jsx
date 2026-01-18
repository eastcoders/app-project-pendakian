import React, { useState } from 'react';
import { Home, Store, Plus, MessageCircle, User } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const BottomNav = ({ onNavigate, currentPage = 'home' }) => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const NavItem = ({ icon: Icon, label, pageKey, active = false }) => (
        <button
            onClick={() => onNavigate?.(pageKey)}
            className={`flex flex-col items-center justify-center gap-1 w-16 group transition-colors ${active ? 'text-accent' : 'text-gray-400 hover:text-primary'}`}
        >
            <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-medium">{label}</span>
        </button>
    );

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-30 bg-surface/90 backdrop-blur-lg border-t border-gray-100 pb-5 pt-3 px-6 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]"
            >
                <div className="flex items-center justify-between">
                    <NavItem icon={Home} label="Home" pageKey="home" active={currentPage === 'home'} />
                    <NavItem icon={Store} label="Marketplace" pageKey="marketplace" active={currentPage === 'marketplace'} />

                    {/* Spacer for FAB */}
                    <div className="w-12" />

                    <NavItem icon={MessageCircle} label="Chat" pageKey="chat" active={currentPage === 'chat'} />
                    <NavItem icon={User} label="Profile" pageKey="profile" active={currentPage === 'profile'} />
                </div>
            </motion.nav>

            {/* Floating Action Button - Animate with Nav */}
            <motion.div
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "150%" }, // Slide down further to clear screen
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed bottom-8 left-0 right-0 max-w-md mx-auto z-40 pointer-events-none flex justify-center"
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="pointer-events-auto flex items-center justify-center size-14 bg-accent text-white rounded-full shadow-lg shadow-accent/30 border-4 border-background"
                >
                    <Plus className="w-7 h-7" />
                </motion.button>
            </motion.div>
        </>
    );
};

export default BottomNav;
