import React, { useState, useRef } from 'react';
import { MapPin, Heart, MessageCircle, Send, Bookmark, BookmarkCheck, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CommentSection from './CommentSection';
import ShareModal from './ShareModal';
import { getCommentsByPostId } from '../dummyComments';

const carouselVariants = {
    enter: (direction) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0
    })
};

// Heart burst animation for double tap
const HeartBurst = ({ show }) => (
    <AnimatePresence>
        {show && (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
                <Heart className="w-24 h-24 fill-white text-white drop-shadow-lg" />
            </motion.div>
        )}
    </AnimatePresence>
);

const FeedCard = ({ post }) => {
    // State management
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likesCount, setLikesCount] = useState(post.content.likes);
    const [showHeartBurst, setShowHeartBurst] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    // Get comments for this post
    const initialComments = getCommentsByPostId(post.id);
    const [commentsCount, setCommentsCount] = useState(initialComments.length);

    // Carousel state
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(0);

    // Double tap detection
    const lastTapRef = useRef(0);
    const DOUBLE_TAP_DELAY = 300;

    // Normalize images to array
    const images = post.content.images || [post.content.image];
    const hasMultipleImages = images.length > 1;
    const imageIndex = Math.abs(page % images.length);

    const paginate = (newDirection) => {
        setPage(page + newDirection);
        setDirection(newDirection);
    };

    // Like handlers
    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleDoubleTap = () => {
        const now = Date.now();
        if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
            // Double tap detected
            if (!isLiked) {
                setIsLiked(true);
                setLikesCount(prev => prev + 1);
            }
            // Show heart burst animation
            setShowHeartBurst(true);
            setTimeout(() => setShowHeartBurst(false), 600);
        }
        lastTapRef.current = now;
    };

    // Bookmark handler
    const handleSave = () => {
        setIsSaved(!isSaved);
    };

    // Generate fake post URL
    const postUrl = `https://hikerfeed.app/post/${post.id}`;

    return (
        <>
            <article className="flex flex-col gap-4 group">
                {/* User Header */}
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full overflow-hidden ring-2 ring-accent/30 bg-gray-100">
                            <img src={post.user.avatar} alt={post.user.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-primary text-sm font-bold leading-tight">@{post.user.username || post.user.name}</p>
                            <div className="flex items-center gap-1.5">
                                <span className="text-gray-400 text-xs">{post.time}</span>
                                {post.user.role && (
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${post.user.role === 'vendor' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                                        }`}>
                                        {post.user.role}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-primary transition-colors">
                        <MoreHorizontal className="w-6 h-6" />
                    </button>
                </div>

                {/* Immersive Image / Carousel with Double Tap */}
                <div
                    className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden cursor-pointer"
                    onClick={handleDoubleTap}
                >
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={page}
                            src={images[imageIndex]}
                            custom={direction}
                            variants={carouselVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            alt={post.content.location}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            draggable={false}
                        />
                    </AnimatePresence>

                    {/* Heart Burst Animation */}
                    <HeartBurst show={showHeartBurst} />

                    {/* Navigation Buttons */}
                    {hasMultipleImages && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-black/40 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); paginate(1); }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-black/40 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            {/* Dots Indicator */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                                {images.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === imageIndex ? 'bg-white' : 'bg-white/50'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Floating Location Tag */}
                    <div className="absolute top-4 left-4 z-10 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1">
                        <MapPin className="text-white w-4 h-4" />
                        <span className="text-white text-xs font-semibold tracking-wide">{post.content.location}</span>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 z-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>

                {/* Actions & Interactions */}
                <div className="px-2 flex flex-col gap-3">
                    {/* Action Bar */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            {/* Like Button with Animation */}
                            <motion.button
                                onClick={handleLike}
                                whileTap={{ scale: 0.85 }}
                                className="flex items-center gap-1"
                            >
                                <motion.div
                                    animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Heart
                                        className={`w-7 h-7 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-primary'}`}
                                    />
                                </motion.div>
                            </motion.button>

                            {/* Comment Button */}
                            <motion.button
                                onClick={() => setShowComments(true)}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center gap-1"
                            >
                                <MessageCircle className="text-primary w-7 h-7" />
                            </motion.button>

                            {/* Share Button */}
                            <motion.button
                                onClick={() => setShowShareModal(true)}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center gap-1"
                            >
                                <Send className="text-primary w-7 h-7" />
                            </motion.button>
                        </div>

                        {/* Bookmark Button */}
                        <motion.button
                            onClick={handleSave}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isSaved ? (
                                <BookmarkCheck className="w-7 h-7 fill-primary text-primary" />
                            ) : (
                                <Bookmark className="text-primary w-7 h-7" />
                            )}
                        </motion.button>
                    </div>

                    {/* Prominent Likes & Caption */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <p className="text-primary text-sm font-bold">
                                {likesCount.toLocaleString('id-ID')} suka
                            </p>
                            <button
                                onClick={() => setShowComments(true)}
                                className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
                            >
                                {commentsCount.toLocaleString('id-ID')} komentar
                            </button>
                        </div>
                        <p className="text-primary/90 text-sm leading-relaxed">
                            <span className="font-bold text-primary mr-1">@{post.user.username || post.user.name}</span>
                            {post.content.caption}
                        </p>
                    </div>

                    {/* View Comments Link */}
                    {commentsCount > 0 && (
                        <button
                            onClick={() => setShowComments(true)}
                            className="text-gray-400 text-sm text-left hover:text-gray-600 transition-colors"
                        >
                            Lihat semua {commentsCount} komentar
                        </button>
                    )}

                    {/* Minimalist Hashtags */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {post.content.tags.map((tag, index) => (
                            <a key={index} href="#" className="text-accent text-sm font-semibold hover:underline decoration-2 underline-offset-2">
                                {tag}
                            </a>
                        ))}
                    </div>
                </div>
            </article>

            {/* Comment Section Bottom Sheet */}
            <CommentSection
                isOpen={showComments}
                onClose={() => setShowComments(false)}
                comments={initialComments}
                postId={post.id}
                postUser={post.user.username || post.user.name}
                onCommentCountChange={setCommentsCount}
            />

            {/* Share Modal */}
            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                postUrl={postUrl}
                postCaption={post.content.caption}
            />
        </>
    );
};

export default FeedCard;
