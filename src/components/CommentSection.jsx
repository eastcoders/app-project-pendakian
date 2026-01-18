import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CommentSection = ({ isOpen, onClose, comments: initialComments, postId, postUser, onCommentCountChange }) => {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');

    // Sync with initial comments when modal opens
    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment = {
            id: Date.now(),
            user: {
                username: "you",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
            },
            text: newComment,
            timestamp: "Baru saja"
        };

        const updatedComments = [...comments, comment];
        setComments(updatedComments);
        setNewComment('');

        // Notify parent about comment count change
        if (onCommentCountChange) {
            onCommentCountChange(updatedComments.length);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[60]"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[70] max-h-[70vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <h3 className="text-base font-bold text-primary">
                                Komentar ({comments.length})
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Comments List */}
                        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                            {comments.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                    <p>Belum ada komentar</p>
                                    <p className="text-sm">Jadilah yang pertama berkomentar!</p>
                                </div>
                            ) : (
                                comments.map((comment) => (
                                    <motion.div
                                        key={comment.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-3"
                                    >
                                        <img
                                            src={comment.user.avatar}
                                            alt={comment.user.username}
                                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-semibold text-sm text-primary">
                                                    @{comment.user.username}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {comment.timestamp}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700 mt-0.5 break-words">
                                                {comment.text}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Input Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
                                alt="You"
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder={`Komentari postingan @${postUser}...`}
                                className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                            />
                            <button
                                type="submit"
                                disabled={!newComment.trim()}
                                className="p-2 rounded-full bg-accent text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CommentSection;
