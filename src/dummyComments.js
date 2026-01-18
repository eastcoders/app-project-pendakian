// Dummy comments data for each post
export const dummyComments = {
    1: [
        {
            id: 101,
            user: { username: "mountain_lover", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face" },
            text: "Keren banget! Sudah lama pengen ke Rinjani, tips dong buat pemula? 🙏",
            timestamp: "1 jam lalu"
        },
        {
            id: 102,
            user: { username: "hiking_indo", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face" },
            text: "Summit attack nya jam berapa start? Kelihatan golden hour nya perfect!",
            timestamp: "45 menit lalu"
        },
        {
            id: 103,
            user: { username: "nature_seeker", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
            text: "Segara Anak emang juara sih views nya 😍",
            timestamp: "30 menit lalu"
        }
    ],
    2: [
        {
            id: 201,
            user: { username: "camper_id", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
            text: "Sleeping bag nya tahan sampai berapa derajat min?",
            timestamp: "3 jam lalu"
        },
        {
            id: 202,
            user: { username: "prau_hiker", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
            text: "Kemarin baru dari Prau, emang dingin banget! Worth it beli sleeping bag bagus",
            timestamp: "2 jam lalu"
        }
    ],
    3: [
        {
            id: 301,
            user: { username: "semeru_addict", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
            text: "Mahameru emang beda! Sudah 3x kesana ga bosen-bosen 🏔️",
            timestamp: "5 jam lalu"
        },
        {
            id: 302,
            user: { username: "solo_hiker", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
            text: "Buff tebal wajib ya, kemarin teman ada yang kena ISPA karena abu",
            timestamp: "4 jam lalu"
        },
        {
            id: 303,
            user: { username: "mountain_doc", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" },
            text: "Safety first! Jangan lupa bawa P3K lengkap 💪",
            timestamp: "3 jam lalu"
        },
        {
            id: 304,
            user: { username: "ranu_kumbolo", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face" },
            text: "Foto sunset di Ranu Kumbolo dong kak, pasti keren!",
            timestamp: "2 jam lalu"
        }
    ],
    4: [
        {
            id: 401,
            user: { username: "bromo_sunrise", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face" },
            text: "Jam 4 pagi masih dapet spot bagus ga? Pengen kesana weekend ini",
            timestamp: "12 jam lalu"
        },
        {
            id: 402,
            user: { username: "jatim_explorer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
            text: "Jeep nya berapa sekarang dari Cemoro Lawang?",
            timestamp: "10 jam lalu"
        },
        {
            id: 403,
            user: { username: "travel_vlogger", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face" },
            text: "Lautan pasir Bromo emang hits different! 🌋",
            timestamp: "8 jam lalu"
        }
    ],
    5: [
        {
            id: 501,
            user: { username: "gear_hunter", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
            text: "Carrier nya ada warna lain ga selain yang di foto?",
            timestamp: "1 hari lalu"
        },
        {
            id: 502,
            user: { username: "backpacker_id", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
            text: "Frame aluminum emang lebih ringan ya dibanding yang biasa?",
            timestamp: "20 jam lalu"
        }
    ]
};

// Helper function to get comments by post ID
export const getCommentsByPostId = (postId) => {
    return dummyComments[postId] || [];
};
