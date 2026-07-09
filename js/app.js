// ============================================
// NEXUS SOCIAL MEDIA - APP.JS
// Static Version with LocalStorage
// ============================================

// ============================================
// DATA MANAGEMENT
// ============================================
const DataStore = {
    // Keys
    KEYS: {
        USERS: 'nexus_users',
        CURRENT_USER: 'nexus_current_user',
        POSTS: 'nexus_posts',
        STORIES: 'nexus_stories',
        NOTIFICATIONS: 'nexus_notifications',
        MESSAGES: 'nexus_messages',
        COMMENTS: 'nexus_comments'
    },

    // Initialize with sample data
    init() {
        if (!localStorage.getItem(this.KEYS.USERS)) {
            const sampleUsers = [
                {
                    id: 'user_1',
                    name: 'John Doe',
                    username: 'johndoe',
                    email: 'john@example.com',
                    password: '123456',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
                    bio: 'Software Developer | Tech Enthusiast',
                    location: 'San Francisco, CA',
                    followers: 1250,
                    following: 342,
                    posts: 89
                },
                {
                    id: 'user_2',
                    name: 'Alice Smith',
                    username: 'alicesmith',
                    email: 'alice@example.com',
                    password: '123456',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
                    bio: 'Digital Artist | Creative Soul',
                    location: 'New York, NY',
                    followers: 2340,
                    following: 567,
                    posts: 156
                },
                {
                    id: 'user_3',
                    name: 'Bob Wilson',
                    username: 'bobwilson',
                    email: 'bob@example.com',
                    password: '123456',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
                    bio: 'Photographer | Traveler',
                    location: 'Los Angeles, CA',
                    followers: 5670,
                    following: 234,
                    posts: 234
                },
                {
                    id: 'user_4',
                    name: 'Carol Davis',
                    username: 'caroldavis',
                    email: 'carol@example.com',
                    password: '123456',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
                    bio: 'Food Blogger | Chef',
                    location: 'Chicago, IL',
                    followers: 890,
                    following: 456,
                    posts: 78
                },
                {
                    id: 'user_5',
                    name: 'David Lee',
                    username: 'davidlee',
                    email: 'david@example.com',
                    password: '123456',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
                    bio: 'Music Producer | DJ',
                    location: 'Miami, FL',
                    followers: 3450,
                    following: 123,
                    posts: 167
                }
            ];
            localStorage.setItem(this.KEYS.USERS, JSON.stringify(sampleUsers));
        }

        if (!localStorage.getItem(this.KEYS.POSTS)) {
            const samplePosts = [
                {
                    id: 'post_1',
                    userId: 'user_3',
                    content: 'Sunset di pantai adalah momen terbaik untuk photography! 🌅',
                    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
                    likes: 234,
                    comments: 45,
                    saved: false,
                    createdAt: Date.now() - 3600000,
                    type: 'user'
                },
                {
                    id: 'post_2',
                    userId: 'user_2',
                    content: 'Finally selesai membuat artwork baru! Apa pendapat kalian? 🎨✨',
                    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600',
                    likes: 567,
                    comments: 89,
                    saved: false,
                    createdAt: Date.now() - 7200000,
                    type: 'user'
                },
                {
                    id: 'post_3',
                    userId: 'user_5',
                    content: 'New track dropping this Friday! Stay tuned 🎵🔥',
                    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
                    likes: 890,
                    comments: 123,
                    saved: false,
                    createdAt: Date.now() - 10800000,
                    type: 'user'
                },
                {
                    id: 'post_4',
                    userId: 'user_4',
                    content: 'Resep pasta carbonara paling autentik! 🧀🍝',
                    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600',
                    likes: 345,
                    comments: 67,
                    saved: false,
                    createdAt: Date.now() - 14400000,
                    type: 'user'
                },
                {
                    id: 'post_5',
                    userId: 'user_1',
                    content: 'Coding sambil ngopi adalah kombinasi terbaik ☕💻',
                    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
                    likes: 456,
                    comments: 78,
                    saved: false,
                    createdAt: Date.now() - 18000000,
                    type: 'user'
                }
            ];
            localStorage.setItem(this.KEYS.POSTS, JSON.stringify(samplePosts));
        }

        if (!localStorage.getItem(this.KEYS.STORIES)) {
            const sampleStories = [
                { id: 'story_1', userId: 'user_2', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400', createdAt: Date.now() - 3600000 },
                { id: 'story_2', userId: 'user_3', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', createdAt: Date.now() - 7200000 },
                { id: 'story_3', userId: 'user_5', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400', createdAt: Date.now() - 10800000 },
                { id: 'story_4', userId: 'user_4', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', createdAt: Date.now() - 14400000 }
            ];
            localStorage.setItem(this.KEYS.STORIES, JSON.stringify(sampleStories));
        }

        if (!localStorage.getItem(this.KEYS.NOTIFICATIONS)) {
            const sampleNotifs = [
                { id: 'notif_1', type: 'like', userId: 'user_2', postId: 'post_1', read: false, createdAt: Date.now() - 1800000 },
                { id: 'notif_2', type: 'comment', userId: 'user_3', postId: 'post_1', read: false, createdAt: Date.now() - 3600000 },
                { id: 'notif_3', type: 'follow', userId: 'user_4', read: true, createdAt: Date.now() - 7200000 }
            ];
            localStorage.setItem(this.KEYS.NOTIFICATIONS, JSON.stringify(sampleNotifs));
        }

        if (!localStorage.getItem(this.KEYS.MESSAGES)) {
            const sampleMessages = [
                {
                    id: 'msg_1',
                    participants: ['user_1', 'user_2'],
                    messages: [
                        { senderId: 'user_2', text: 'Hey! Apa kabar?', createdAt: Date.now() - 86400000 },
                        { senderId: 'user_1', text: 'Baik! Kamu gimana?', createdAt: Date.now() - 86300000 },
                        { senderId: 'user_2', text: ' тоже baik! Kerjaan gimana?', createdAt: Date.now() - 86200000 }
                    ]
                },
                {
                    id: 'msg_2',
                    participants: ['user_1', 'user_3'],
                    messages: [
                        { senderId: 'user_3', text: 'Foto sunsetnya keren banget!', createdAt: Date.now() - 172800000 }
                    ]
                }
            ];
            localStorage.setItem(this.KEYS.MESSAGES, JSON.stringify(sampleMessages));
        }
    },

    // Get data
    get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    // Set data
    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // Get users
    getUsers() {
        return this.get(this.KEYS.USERS) || [];
    },

    // Get current user
    getCurrentUser() {
        return this.get(this.KEYS.CURRENT_USER);
    },

    // Set current user
    setCurrentUser(user) {
        this.set(this.KEYS.CURRENT_USER, user);
    },

    // Get posts
    getPosts() {
        return this.get(this.KEYS.POSTS) || [];
    },

    // Get stories
    getStories() {
        return this.get(this.KEYS.STORIES) || [];
    },

    // Get notifications
    getNotifications() {
        return this.get(this.KEYS.NOTIFICATIONS) || [];
    },

    // Get messages
    getMessages() {
        return this.get(this.KEYS.MESSAGES) || [];
    }
};

// ============================================
// AUTHENTICATION
// ============================================
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('regName').value;
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    const users = DataStore.getUsers();
    
    // Check if email or username already exists
    if (users.find(u => u.email === email)) {
        showToast('Email sudah terdaftar!', 'error');
        return;
    }
    
    if (users.find(u => u.username === username)) {
        showToast('Username sudah digunakan!', 'error');
        return;
    }

    // Create new user
    const newUser = {
        id: 'user_' + Date.now(),
        name,
        username,
        email,
        password,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        bio: '',
        location: '',
        followers: 0,
        following: 0,
        posts: 0
    };

    users.push(newUser);
    DataStore.set(DataStore.KEYS.USERS, users);
    DataStore.setCurrentUser(newUser);

    showToast('Registrasi berhasil!', 'success');
    closeModal('registerModal');
    
    setTimeout(() => {
        window.location.href = 'app.html';
    }, 1000);
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = DataStore.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        showToast('Email atau password salah!', 'error');
        return;
    }

    DataStore.setCurrentUser(user);
    showToast('Login berhasil!', 'success');
    closeModal('loginModal');
    
    setTimeout(() => {
        window.location.href = 'app.html';
    }, 1000);
}

function logout() {
    localStorage.removeItem(DataStore.KEYS.CURRENT_USER);
    showToast('Logout berhasil!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// ============================================
// MODAL MANAGEMENT
// ============================================
function showLogin() {
    document.getElementById('loginModal').classList.add('show');
}

function showRegister() {
    document.getElementById('registerModal').classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function switchModal(closeId, openId) {
    closeModal(closeId);
    setTimeout(() => {
        document.getElementById(openId).classList.add('show');
    }, 200);
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span class="toast-message">${message}</span>
    `;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// USER MENU
// ============================================
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.getElementById('userDropdown');
    
    if (userMenu && !userMenu.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

// ============================================
// POSTS MANAGEMENT
// ============================================
function loadPosts() {
    const currentUser = DataStore.getCurrentUser();
    if (!currentUser) return;

    const posts = DataStore.getPosts();
    const users = DataStore.getUsers();
    const feedSection = document.getElementById('feedSection');
    
    if (!feedSection) return;

    feedSection.innerHTML = posts.map(post => {
        const author = users.find(u => u.id === post.userId) || currentUser;
        const timeAgo = getTimeAgo(post.createdAt);
        const isLiked = post.likedBy?.includes(currentUser.id);
        
        return `
            <article class="post-card" data-post-id="${post.id}">
                <div class="post-card-header">
                    <div class="post-user">
                        <img src="${author.avatar}" alt="${author.name}" class="post-avatar">
                        <div class="post-info">
                            <strong>${author.username}</strong>
                            <small>${timeAgo}</small>
                        </div>
                    </div>
                    <button class="post-more-btn" onclick="showPostOptions('${post.id}')">⋯</button>
                </div>
                <div class="post-content">
                    <p class="post-text">${post.content}</p>
                    ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image" loading="lazy">` : ''}
                </div>
                <div class="post-actions-bar">
                    <button class="post-action-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${post.id}')">
                        ${isLiked ? '❤️' : '🤍'} ${post.likes}
                    </button>
                    <button class="post-action-btn" onclick="openPostDetail('${post.id}')">
                        💬 ${post.comments}
                    </button>
                    <button class="post-action-btn" onclick="sharePost('${post.id}')">
                        📤
                    </button>
                    <button class="post-action-btn ${post.saved ? 'saved' : ''}" onclick="toggleSave('${post.id}')">
                        ${post.saved ? '🔖' : '📑'}
                    </button>
                </div>
            </article>
        `;
    }).join('');
}

function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    const intervals = [
        { label: 'tahun', seconds: 31536000 },
        { label: 'bulan', seconds: 2592000 },
        { label: 'minggu', seconds: 604800 },
        { label: 'hari', seconds: 86400 },
        { label: 'jam', seconds: 3600 },
        { label: 'menit', seconds: 60 }
    ];
    
    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label} lalu`;
        }
    }
    
    return 'Baru saja';
}

function toggleLike(postId) {
    const currentUser = DataStore.getCurrentUser();
    if (!currentUser) {
        showToast('Silakan login terlebih dahulu!', 'error');
        return;
    }

    const posts = DataStore.getPosts();
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;

    if (!post.likedBy) post.likedBy = [];
    
    const likeIndex = post.likedBy.indexOf(currentUser.id);
    
    if (likeIndex === -1) {
        post.likedBy.push(currentUser.id);
        post.likes++;
        showToast('Anda menyukai postingan ini!', 'success');
    } else {
        post.likedBy.splice(likeIndex, 1);
        post.likes--;
    }
    
    DataStore.set(DataStore.KEYS.POSTS, posts);
    loadPosts();
}

function toggleSave(postId) {
    const currentUser = DataStore.getCurrentUser();
    if (!currentUser) {
        showToast('Silakan login terlebih dahulu!', 'error');
        return;
    }

    const posts = DataStore.getPosts();
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;

    post.saved = !post.saved;
    DataStore.set(DataStore.KEYS.POSTS, posts);
    
    showToast(post.saved ? 'Postingan disimpan!' : 'Postingan dihapus dari tersimpan', 'success');
    loadPosts();
}

function sharePost(postId) {
    const post = DataStore.getPosts().find(p => p.id === postId);
    if (navigator.share) {
        navigator.share({
            title: 'Nexus Post',
            text: post?.content || 'Check out this post on Nexus!',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('Link berhasil disalin!', 'success');
    }
}

function showCreatePost() {
    const currentUser = DataStore.getCurrentUser();
    if (!currentUser) {
        showToast('Silakan login terlebih dahulu!', 'error');
        return;
    }
    document.getElementById('createPostModal').classList.add('show');
}

function handleCreatePost(event) {
    event.preventDefault();
    
    const currentUser = DataStore.getCurrentUser();
    const content = document.getElementById('postContent').value;
    const imageInput = document.getElementById('postImage');
    
    const newPost = {
        id: 'post_' + Date.now(),
        userId: currentUser.id,
        content,
        image: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null,
        likes: 0,
        comments: 0,
        saved: false,
        likedBy: [],
        createdAt: Date.now(),
        type: 'user'
    };

    const posts = DataStore.getPosts();
    posts.unshift(newPost);
    DataStore.set(DataStore.KEYS.POSTS, posts);

    // Update user posts count
    const users = DataStore.getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].posts++;
        DataStore.set(DataStore.KEYS.USERS, users);
        DataStore.setCurrentUser(users[userIndex]);
    }

    // Reset form
    document.getElementById('createPostForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
    closeModal('createPostModal');
    
    loadPosts();
    showToast('Postingan berhasil diposting!', 'success');
}

function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('imagePreview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function openPostDetail(postId) {
    const post = DataStore.getPosts().find(p => p.id === postId);
    const users = DataStore.getUsers();
    const author = users.find(u => u.id === post.userId);
    
    document.getElementById('postDetailContent').innerHTML = `
        <div style="padding: 20px;">
            <div class="post-user" style="margin-bottom: 16px;">
                <img src="${author?.avatar}" alt="${author?.name}" class="post-avatar">
                <div class="post-info">
                    <strong>${author?.username}</strong>
                    <small>${getTimeAgo(post.createdAt)}</small>
                </div>
            </div>
            <p style="margin-bottom: 16px;">${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post" style="width: 100%; border-radius: 12px;">` : ''}
        </div>
    `;
    
    document.getElementById('postDetailModal').classList.add('show');
    
    // Store current post ID for comments
    window.currentPostId = postId;
    loadComments(postId);
}

function loadComments(postId) {
    const comments = DataStore.getComments?.() || [];
    const postComments = comments.filter(c => c.postId === postId);
    const users = DataStore.getUsers();
    
    document.getElementById('commentsList').innerHTML = postComments.length ? 
        postComments.map(comment => {
            const author = users.find(u => u.id === comment.userId);
            return `
                <div class="comment-item">
                    <img src="${author?.avatar}" alt="${author?.name}" class="comment-avatar">
                    <div class="comment-content">
                        <span class="comment-user">${author?.username}</span>
                        <p class="comment-text">${comment.text}</p>
                        <span class="comment-time">${getTimeAgo(comment.createdAt)}</span>
                    </div>
                </div>
            `;
        }).join('') :
        '<p style="text-align: center; color: var(--text-muted); padding: 20px;">Belum ada komentar</p>';
}

function handleAddComment(event) {
    event.preventDefault();
    const input = document.getElementById('commentInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    const currentUser = DataStore.getCurrentUser();
    const postId = window.currentPostId;
    
    if (!currentUser || !postId) return;

    const comments = DataStore.get(DataStore.KEYS.COMMENTS) || [];
    comments.push({
        id: 'comment_' + Date.now(),
        postId,
        userId: currentUser.id,
        text,
        createdAt: Date.now()
    });
    
    DataStore.set(DataStore.KEYS.COMMENTS, comments);
    
    // Update post comments count
    const posts = DataStore.getPosts();
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments++;
        DataStore.set(DataStore.KEYS.POSTS, posts);
    }
    
    input.value = '';
    loadComments(postId);
    loadPosts();
}

function showPostOptions(postId) {
    // Simple confirmation for demo
    if (confirm('Hapus postingan ini?')) {
        const posts = DataStore.getPosts().filter(p => p.id !== postId);
        DataStore.set(DataStore.KEYS.POSTS, posts);
        loadPosts();
        showToast('Postingan dihapus!', 'success');
    }
}

// ============================================
// STORIES MANAGEMENT
// ============================================
function loadStories() {
    const currentUser = DataStore.getCurrentUser();
    const stories = DataStore.getStories();
    const users = DataStore.getUsers();
    const container = document.getElementById('storiesContainer');
    
    if (!container || !currentUser) return;

    const storiesHTML = `
        <div class="story-item add-story" onclick="showCreateStory()">
            <div class="add-story-icon">+</div>
            <span>Cerita Baru</span>
        </div>
        ${stories.map(story => {
            const author = users.find(u => u.id === story.userId);
            const isOwn = story.userId === currentUser.id;
            return `
                <div class="story-item" onclick="viewStory('${story.id}')">
                    <div class="story-avatar">
                        <img src="${story.image}" alt="${author?.name}">
                    </div>
                    <span>${isOwn ? 'Cerita Anda' : author?.username || 'User'}</span>
                </div>
            `;
        }).join('')}
    `;
    
    container.innerHTML = storiesHTML;
}

function showCreateStory() {
    const currentUser = DataStore.getCurrentUser();
    if (!currentUser) {
        showToast('Silakan login terlebih dahulu!', 'error');
        return;
    }
    document.getElementById('createStoryModal').classList.add('show');
}

function previewStoryImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('storyPreview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function handleCreateStory(event) {
    event.preventDefault();
    
    const currentUser = DataStore.getCurrentUser();
    const imageInput = document.getElementById('storyImage');
    
    if (!imageInput.files[0]) {
        showToast('Pilih gambar untuk story!', 'error');
        return;
    }
    
    const newStory = {
        id: 'story_' + Date.now(),
        userId: currentUser.id,
        image: URL.createObjectURL(imageInput.files[0]),
        createdAt: Date.now()
    };

    const stories = DataStore.getStories();
    stories.unshift(newStory);
    DataStore.set(DataStore.KEYS.STORIES, stories);

    document.getElementById('createStoryForm').reset();
    document.getElementById('storyPreview').style.display = 'none';
    closeModal('createStoryModal');
    
    loadStories();
    showToast('Story berhasil dibuat!', 'success');
}

// ============================================
// STORY VIEWER
// ============================================
let currentStoryIndex = 0;
let currentStories = [];
let storyTimer = null;

function viewStory(storyId) {
    const stories = DataStore.getStories();
    const users = DataStore.getUsers();
    const currentUser = DataStore.getCurrentUser();
    
    if (!currentUser) {
        showToast('Silakan login terlebih dahulu!', 'error');
        return;
    }
    
    // Filter out own story from viewing (or include it based on preference)
    const otherStories = stories.filter(s => s.userId !== currentUser.id);
    
    if (otherStories.length === 0) {
        showToast('Belum ada story untuk dilihat!', 'info');
        return;
    }
    
    // Find starting index
    const startIndex = otherStories.findIndex(s => s.id === storyId);
    currentStoryIndex = startIndex >= 0 ? startIndex : 0;
    currentStories = otherStories;
    
    // Create and show story viewer
    showStoryViewer();
}

function showStoryViewer() {
    if (currentStoryIndex >= currentStories.length) {
        closeStoryViewer();
        return;
    }
    
    const story = currentStories[currentStoryIndex];
    const users = DataStore.getUsers();
    const author = users.find(u => u.id === story.userId);
    
    // Create story viewer overlay
    let viewer = document.getElementById('storyViewer');
    if (!viewer) {
        viewer = document.createElement('div');
        viewer.id = 'storyViewer';
        viewer.className = 'story-viewer';
        viewer.onclick = handleStoryClick;
        document.body.appendChild(viewer);
    }
    
    // Calculate progress
    const progress = ((currentStoryIndex + 1) / currentStories.length) * 100;
    
    viewer.innerHTML = `
        <div class="story-container">
            <div class="story-progress">
                ${currentStories.map((_, i) => `
                    <div class="progress-bar ${i < currentStoryIndex ? 'filled' : ''} ${i === currentStoryIndex ? 'active' : ''}"></div>
                `).join('')}
            </div>
            <div class="story-header">
                <img src="${author?.avatar}" alt="${author?.name}" class="story-author-avatar">
                <div class="story-author-info">
                    <strong>${author?.username || 'User'}</strong>
                    <small>${getTimeAgo(story.createdAt)}</small>
                </div>
                <button class="story-close" onclick="closeStoryViewer()">&times;</button>
            </div>
            <img src="${story.image}" alt="Story" class="story-image" onerror="this.src='https://via.placeholder.com/400x700?text=Story'">
            <div class="story-replies">
                <input type="text" placeholder="Balas..." class="story-reply-input" id="storyReplyInput">
                <button class="story-send-btn" onclick="sendStoryReply()">➤</button>
            </div>
        </div>
    `;
    
    viewer.classList.add('show');
    
    // Start timer (5 seconds per story)
    startStoryTimer();
}

function handleStoryClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Click left side = previous, right side = next
    if (x < width / 3) {
        previousStory();
    } else if (x > (width * 2 / 3)) {
        nextStory();
    }
}

function previousStory() {
    if (currentStoryIndex > 0) {
        stopStoryTimer();
        currentStoryIndex--;
        showStoryViewer();
    }
}

function nextStory() {
    stopStoryTimer();
    currentStoryIndex++;
    if (currentStoryIndex < currentStories.length) {
        showStoryViewer();
    } else {
        closeStoryViewer();
    }
}

function startStoryTimer() {
    stopStoryTimer();
    storyTimer = setTimeout(() => {
        nextStory();
    }, 5000); // 5 seconds
}

function stopStoryTimer() {
    if (storyTimer) {
        clearTimeout(storyTimer);
        storyTimer = null;
    }
}

function closeStoryViewer() {
    stopStoryTimer();
    const viewer = document.getElementById('storyViewer');
    if (viewer) {
        viewer.classList.remove('show');
        setTimeout(() => viewer.remove(), 300);
    }
}

function sendStoryReply() {
    const input = document.getElementById('storyReplyInput');
    if (input && input.value.trim()) {
        showToast('Balasan terkirim! 💬', 'success');
        input.value = '';
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const viewer = document.getElementById('storyViewer');
    if (viewer && viewer.classList.contains('show')) {
        if (e.key === 'ArrowLeft') previousStory();
        if (e.key === 'ArrowRight') nextStory();
        if (e.key === 'Escape') closeStoryViewer();
    }
});

// ============================================
// NOTIFICATIONS
// ============================================
function loadNotifications() {
    const currentUser = DataStore.getCurrentUser();
    if (!currentUser) return;

    const notifications = DataStore.getNotifications();
    const users = DataStore.getUsers();
    const notifBadge = document.getElementById('notifBadge');
    
    const unreadCount = notifications.filter(n => !n.read).length;
    if (notifBadge) {
        notifBadge.textContent = unreadCount || '';
        notifBadge.style.display = unreadCount ? 'flex' : 'none';
    }

    document.getElementById('notificationsList').innerHTML = notifications.map(notif => {
        const user = users.find(u => u.id === notif.userId);
        const icon = notif.type === 'like' ? '❤️' : notif.type === 'comment' ? '💬' : '👤';
        const text = notif.type === 'like' ? 'menyukai' : notif.type === 'comment' ? 'mengomentari' : 'mengikuti';
        
        return `
            <div class="notification-item ${notif.read ? '' : 'unread'}">
                <img src="${user?.avatar}" alt="${user?.name}" class="notification-avatar">
                <div class="notification-content">
                    <p class="notification-text">
                        <strong>${user?.username}</strong> ${text} postingan Anda
                    </p>
                    <span class="notification-time">${getTimeAgo(notif.createdAt)}</span>
                </div>
                <span>${icon}</span>
            </div>
        `;
    }).join('');
}

function showNotifications() {
    document.getElementById('notificationsModal').classList.add('show');
    loadNotifications();
}

// ============================================
// SUGGESTIONS
// ============================================
function loadSuggestions() {
    const currentUser = DataStore.getCurrentUser();
    if (!currentUser) return;

    const users = DataStore.getUsers();
    const suggestions = users.filter(u => u.id !== currentUser.id).slice(0, 5);
    
    document.getElementById('suggestionsList').innerHTML = suggestions.map(user => `
        <div class="suggestion-item">
            <img src="${user.avatar}" alt="${user.name}" class="suggestion-avatar">
            <div class="suggestion-info">
                <strong>${user.username}</strong>
                <small>${user.followers} followers</small>
            </div>
            <button class="follow-btn" onclick="followUser('${user.id}', this)">Ikuti</button>
        </div>
    `).join('');
}

function followUser(userId, btn) {
    const currentUser = DataStore.getCurrentUser();
    if (!currentUser) {
        showToast('Silakan login terlebih dahulu!', 'error');
        return;
    }

    const users = DataStore.getUsers();
    const targetUser = users.find(u => u.id === userId);
    
    if (targetUser) {
        targetUser.followers++;
        DataStore.set(DataStore.KEYS.USERS, users);
        
        btn.textContent = 'Mengikuti';
        btn.classList.add('following');
        btn.onclick = null;
        
        showToast(`Anda mengikuti ${targetUser.username}!`, 'success');
    }
}

function searchUsers() {
    const query = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const users = DataStore.getUsers();
    
    // Filter posts or show results
    if (query.length > 0) {
        const results = users.filter(u => 
            u.username.toLowerCase().includes(query) || 
            u.name.toLowerCase().includes(query)
        );
        console.log('Search results:', results);
    }
}

// ============================================
// MESSAGES
// ============================================
function loadMessages() {
    const currentUser = DataStore.getCurrentUser();
    if (!currentUser) return;

    const messages = DataStore.getMessages();
    const users = DataStore.getUsers();
    
    const userMessages = messages.filter(m => m.participants.includes(currentUser.id));
    
    document.getElementById('messagesList').innerHTML = userMessages.map(msg => {
        const otherUserId = msg.participants.find(p => p !== currentUser.id);
        const otherUser = users.find(u => u.id === otherUserId);
        const lastMsg = msg.messages[msg.messages.length - 1];
        
        return `
            <div class="message-preview" onclick="openChat('${msg.id}')">
                <img src="${otherUser?.avatar}" alt="${otherUser?.name}" class="message-avatar">
                <div class="message-info">
                    <div class="message-name">${otherUser?.username}</div>
                    <div class="message-last">${lastMsg?.text || ''}</div>
                </div>
            </div>
        `;
    }).join('') || '<p style="text-align: center; padding: 20px; color: var(--text-muted);">Belum ada pesan</p>';
}

function showSection(section) {
    showToast(`Section ${section} akan segera hadir!`, 'info');
}

function openChat(messageId) {
    showToast('Fitur chat akan segera hadir!', 'info');
}

function showSection(section) {
    if (section === 'messages') {
        document.getElementById('messagesModal').classList.add('show');
        loadMessages();
    }
}

// ============================================
// PROFILE PAGE
// ============================================
function loadProfile() {
    const currentUser = DataStore.getCurrentUser();
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('profileHeader').innerHTML = `
        <div class="profile-cover"></div>
        <div class="profile-info">
            <div class="profile-avatar-wrapper">
                <img src="${currentUser.avatar}" alt="${currentUser.name}" class="profile-avatar">
            </div>
            <div class="profile-details">
                <h1 class="profile-name">${currentUser.name}</h1>
                <p class="profile-username">@${currentUser.username}</p>
                <p class="profile-bio">${currentUser.bio || 'Belum ada bio'}</p>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">📍 ${currentUser.location || 'Tidak ditentukan'}</p>
                <div class="profile-stats">
                    <div class="profile-stat">
                        <strong>${currentUser.posts}</strong>
                        <span>Posts</span>
                    </div>
                    <div class="profile-stat">
                        <strong>${currentUser.followers}</strong>
                        <span>Followers</span>
                    </div>
                    <div class="profile-stat">
                        <strong>${currentUser.following}</strong>
                        <span>Following</span>
                    </div>
                </div>
                <div class="profile-actions">
                    <button class="btn btn-primary" onclick="showEditProfile()">Edit Profil</button>
                </div>
            </div>
        </div>
    `;

    loadProfilePosts(currentUser.id);
    loadProfileFollowers();
    loadProfileFollowing();
}

function showProfileTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.tab-btn').classList.add('active');
    
    document.getElementById('profilePosts').classList.add('hidden');
    document.getElementById('profileSaved').classList.add('hidden');
    document.getElementById('profileFollowers').classList.add('hidden');
    document.getElementById('profileFollowing').classList.add('hidden');
    
    if (tab === 'posts') {
        document.getElementById('profilePosts').classList.remove('hidden');
    } else if (tab === 'saved') {
        document.getElementById('profileSaved').classList.remove('hidden');
    } else if (tab === 'followers') {
        document.getElementById('profileFollowers').classList.remove('hidden');
    } else if (tab === 'following') {
        document.getElementById('profileFollowing').classList.remove('hidden');
    }
}

function loadProfilePosts(userId) {
    const posts = DataStore.getPosts().filter(p => p.userId === userId);
    
    document.getElementById('profilePosts').innerHTML = posts.length ?
        posts.map(post => `
            <div class="profile-post" onclick="openPostDetail('${post.id}')">
                ${post.image ? `<img src="${post.image}" alt="Post">` : '<div style="background: var(--bg-tertiary); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">📝</div>'}
                <div class="profile-post-overlay">
                    <span class="profile-post-stat">❤️ ${post.likes}</span>
                    <span class="profile-post-stat">💬 ${post.comments}</span>
                </div>
            </div>
        `).join('') :
        '<div class="empty-state"><span>📝</span><h3>Belum Ada Postingan</h3><p>Mulai bagikan momen pertama Anda!</p></div>';
}

function loadProfileFollowers() {
    const currentUser = DataStore.getCurrentUser();
    if (!currentUser) return;

    document.getElementById('followersList').innerHTML = `
        <div class="empty-state">
            <span>👥</span>
            <h3>Belum Ada Followers</h3>
            <p>Ayo mulai membangun komunitas!</p>
        </div>
    `;
}

function loadProfileFollowing() {
    const currentUser = DataStore.getCurrentUser();
    if (!currentUser) return;

    document.getElementById('followingList').innerHTML = `
        <div class="empty-state">
            <span>👤</span>
            <h3>Belum Mengikuti Anyone</h3>
            <p>Temukan orang-orang menarik untuk diikuti!</p>
        </div>
    `;
}

function showEditProfile() {
    const currentUser = DataStore.getCurrentUser();
    if (!currentUser) return;

    document.getElementById('editName').value = currentUser.name;
    document.getElementById('editBio').value = currentUser.bio || '';
    document.getElementById('editLocation').value = currentUser.location || '';
    document.getElementById('editAvatarPreview').src = currentUser.avatar;
    
    document.getElementById('editProfileModal').classList.add('show');
}

function previewEditAvatar(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('editAvatarPreview').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function handleEditProfile(event) {
    event.preventDefault();
    
    const currentUser = DataStore.getCurrentUser();
    const name = document.getElementById('editName').value;
    const bio = document.getElementById('editBio').value;
    const location = document.getElementById('editLocation').value;
    const avatarInput = document.getElementById('editAvatar');
    
    const users = DataStore.getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex].name = name;
        users[userIndex].bio = bio;
        users[userIndex].location = location;
        
        if (avatarInput.files[0]) {
            users[userIndex].avatar = URL.createObjectURL(avatarInput.files[0]);
        }
        
        DataStore.set(DataStore.KEYS.USERS, users);
        DataStore.setCurrentUser(users[userIndex]);
        
        closeModal('editProfileModal');
        loadProfile();
        showToast('Profil berhasil diperbarui!', 'success');
    }
}

// ============================================
// INITIALIZE APP
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize data
    DataStore.init();
    
    // Check auth state on app.html and profile.html
    const path = window.location.pathname;
    if (path.includes('app.html') || path.includes('profile.html')) {
        const currentUser = DataStore.getCurrentUser();
        if (!currentUser) {
            window.location.href = 'index.html';
            return;
        }
        
        // Update nav
        document.getElementById('navAvatar').src = currentUser.avatar;
        document.getElementById('navUsername').textContent = currentUser.username;
        document.getElementById('postCreatorAvatar').src = currentUser.avatar;
        
        // Load content
        if (path.includes('app.html')) {
            loadPosts();
            loadStories();
            loadSuggestions();
            loadNotifications();
        }
    }
});
