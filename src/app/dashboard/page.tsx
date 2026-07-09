"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Search,
  Bell,
  MessageCircle,
  Bookmark,
  User,
  Settings,
  LogOut,
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Image,
  X,
  Loader2,
  Sparkles,
  Plus,
  Camera,
  Send,
} from "lucide-react";
import Link from "next/link";
import { formatRelativeTime, getInitials } from "@/lib/utils";
import type { Post, Story, User as UserType } from "@/types";

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showStories, setShowStories] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [newPostContent, setNewPostContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [postsRes, storiesRes, userRes] = await Promise.all([
        fetch("/api/posts"),
        fetch("/api/stories"),
        fetch("/api/users?userId=current"),
      ]);

      if (postsRes.ok) {
        const { posts } = await postsRes.json();
        setPosts(posts);
      }
      if (storiesRes.ok) {
        const { stories } = await storiesRes.json();
        setStories(stories);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const res = await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });

      if (res.ok) {
        const { isLiked } = await res.json();
        setPosts((prev) =>
          prev.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  isLiked,
                  _count: {
                    ...post._count!,
                    likes: post._count!.likes + (isLiked ? 1 : -1),
                  },
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    setIsPosting(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newPostContent }),
      });

      if (res.ok) {
        const { post } = await res.json();
        setPosts((prev) => [post, ...prev]);
        setNewPostContent("");
        setShowCreatePost(false);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleStoryClick = (index: number) => {
    setActiveStoryIndex(index);
    setShowStories(true);
  };

  return (
    <div className="min-h-screen bg-dark-400 text-white flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-dark-300 border-r border-white/5 flex flex-col p-4 z-40">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold hidden lg:block bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
            Nexus
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {[
            { icon: Home, label: "Beranda", tab: "home" },
            { icon: Search, label: "Cari", tab: "search" },
            { icon: Bell, label: "Notifikasi", tab: "notifications" },
            { icon: MessageCircle, label: "Pesan", tab: "messages" },
            { icon: Bookmark, label: "Tersimpan", tab: "saved" },
            { icon: User, label: "Profil", tab: "profile" },
          ].map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.tab
                  ? "bg-primary-500/20 text-primary-400"
                  : "hover:bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              <item.icon className="w-6 h-6 flex-shrink-0" />
              <span className="hidden lg:block font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Create Post Button */}
        <button
          onClick={() => setShowCreatePost(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl font-semibold hover:from-primary-600 hover:to-purple-700 transition-all shadow-lg shadow-primary-500/25 mb-4"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden lg:block">Buat Post</span>
        </button>

        {/* Settings */}
        <div className="border-t border-white/5 pt-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
            <Settings className="w-6 h-6" />
            <span className="hidden lg:block">Pengaturan</span>
          </button>
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut className="w-6 h-6" />
            <span className="hidden lg:block">Keluar</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 lg:ml-64 min-h-screen">
        <div className="max-w-2xl mx-auto py-6 px-4">
          {/* Stories */}
          <section className="mb-6">
            <div className="bg-dark-300 rounded-2xl p-4 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Stories</h2>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span className="text-sm">Tambah Story</span>
                </button>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                {/* Add story button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 flex-shrink-0"
                  onClick={() => setShowCreatePost(true)}
                >
                  <div className="w-16 h-16 rounded-full bg-dark-400 border-2 border-dashed border-white/20 flex items-center justify-center hover:border-primary-500 transition-colors">
                    <Camera className="w-6 h-6 text-white/40" />
                  </div>
                  <span className="text-xs text-white/60">Cerita</span>
                </motion.button>

                {/* Stories list */}
                {stories.slice(0, 8).map((story, index) => (
                  <motion.button
                    key={story.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStoryClick(index)}
                    className="flex flex-col items-center gap-2 flex-shrink-0"
                  >
                    <div className="story-ring">
                      <div className="w-16 h-16 rounded-full p-0.5 bg-dark-400">
                        <img
                          src={story.author.avatar || "/default-avatar.png"}
                          alt={story.author.name || "User"}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <span className="text-xs text-white/60 truncate max-w-16">
                      {story.author.name || story.author.username}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {/* Create Post */}
          <section className="mb-6">
            <div className="bg-dark-300 rounded-2xl p-4 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                  <span className="font-bold">YO</span>
                </div>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="flex-1 text-left px-4 py-3 bg-dark-400 rounded-full text-white/40 hover:bg-dark-200 transition-colors"
                >
                  Apa yang sedang kamu pikirkan?
                </button>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="p-3 bg-dark-400 rounded-full hover:bg-dark-200 transition-colors"
                >
                  <Image className="w-5 h-5 text-white/40" />
                </button>
              </div>
            </div>
          </section>

          {/* Posts Feed */}
          <section className="space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/60">Belum ada postingan</p>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="mt-4 px-6 py-2 bg-primary-500 rounded-full text-white font-medium hover:bg-primary-600 transition-colors"
                >
                  Buat Postingan Pertama
                </button>
              </div>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={() => handleLike(post.id)}
                />
              ))
            )}
          </section>
        </div>
      </main>

      {/* Right Sidebar - Trending */}
      <aside className="hidden xl:block w-80 fixed right-0 top-0 h-full p-6 overflow-y-auto">
        <div className="bg-dark-300 rounded-2xl p-4 border border-white/5">
          <h2 className="font-bold text-lg mb-4">Trending</h2>
          <div className="space-y-4">
            {["#TechNews", "#Indonesia", "#Programming", "#Lifestyle"].map(
              (tag, i) => (
                <div key={tag} className="flex items-center justify-between">
                  <span className="text-primary-400">{tag}</span>
                  <span className="text-xs text-white/40">{1000 - i * 100} posts</span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="bg-dark-300 rounded-2xl p-4 border border-white/5 mt-6">
          <h2 className="font-bold text-lg mb-4">Pengguna Populer</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600" />
                <div className="flex-1">
                  <div className="font-medium text-sm">User {i}</div>
                  <div className="text-xs text-white/40">@{`user${i}`}</div>
                </div>
                <button className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-medium hover:bg-primary-500/30 transition-colors">
                  Ikuti
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreatePost(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-300 rounded-2xl w-full max-w-lg border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <h2 className="font-bold text-lg">Buat Postingan</h2>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">YO</span>
                  </div>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Apa yang sedang kamu pikirkan?"
                    className="flex-1 bg-transparent resize-none min-h-[150px] focus:outline-none placeholder:text-white/40"
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 border-t border-white/5">
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <Image className="w-5 h-5 text-primary-400" />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <Camera className="w-5 h-5 text-green-400" />
                </button>
                <div className="flex-1" />
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="px-4 py-2 text-white/60 hover:text-white transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim() || isPosting}
                  className="px-6 py-2 bg-primary-500 rounded-full font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isPosting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    "Posting"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stories Modal */}
      <AnimatePresence>
        {showStories && stories[activeStoryIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={() => setShowStories(false)}
          >
            <div className="absolute top-4 left-4 flex items-center gap-3 z-10">
              <img
                src={
                  stories[activeStoryIndex].author.avatar ||
                  "/default-avatar.png"
                }
                alt={stories[activeStoryIndex].author.name || "User"}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <span className="font-medium">
                {stories[activeStoryIndex].author.name ||
                  stories[activeStoryIndex].author.username}
              </span>
            </div>

            <button
              onClick={() => setShowStories(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full max-w-md h-full bg-dark-400">
              <img
                src={stories[activeStoryIndex].image}
                alt="Story"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Story navigation */}
            <div className="absolute bottom-8 left-4 right-4 flex gap-2 z-10">
              <input
                type="text"
                placeholder="Kirim pesan..."
                className="flex-1 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 focus:outline-none placeholder:text-white/60"
              />
              <button className="p-3 bg-white/10 backdrop-blur-sm rounded-full">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PostCard({
  post,
  onLike,
}: {
  post: Post;
  onLike: () => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id, content: newComment }),
      });
      if (res.ok) {
        setNewComment("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-300 rounded-2xl border border-white/5 overflow-hidden"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.author.username}`}>
            <img
              src={post.author.avatar || "/default-avatar.png"}
              alt={post.author.name || "User"}
              className="w-12 h-12 rounded-full object-cover"
            />
          </Link>
          <div>
            <Link
              href={`/profile/${post.author.username}`}
              className="font-semibold hover:text-primary-400 transition-colors"
            >
              {post.author.name || "User"}
            </Link>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span>@{post.author.username}</span>
              <span>•</span>
              <span>{formatRelativeTime(post.createdAt)}</span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-white/40" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4">
        <p className="whitespace-pre-wrap">{post.content}</p>
        {post.images && post.images.length > 0 && (
          <div
            className={`mt-4 grid gap-2 ${
              post.images.length === 1
                ? "grid-cols-1"
                : post.images.length === 2
                ? "grid-cols-2"
                : "grid-cols-2"
            }`}
          >
            {post.images.slice(0, 4).map((image, i) => (
              <div
                key={i}
                className={`relative rounded-xl overflow-hidden ${
                  post.images!.length === 3 && i === 0
                    ? "col-span-2"
                    : "aspect-square"
                }`}
              >
                <img
                  src={image}
                  alt={`Post image ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                {i === 3 && post.images!.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      +{post.images!.length - 4}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between px-4 pb-4 border-t border-white/5 pt-3">
        <div className="flex items-center gap-1">
          <button
            onClick={onLike}
            className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
              post.isLiked
                ? "text-red-500 bg-red-500/10"
                : "text-white/60 hover:text-red-500 hover:bg-red-500/10"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`}
            />
            <span className="text-sm">{post._count?.likes || 0}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-white/60 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm">{post._count?.comments || 0}</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-full text-white/60 hover:text-green-400 hover:bg-green-500/10 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-full text-white/60 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5"
          >
            <div className="p-4 space-y-4">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={comment.author.avatar || "/default-avatar.png"}
                      alt={comment.author.name || "User"}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-dark-400 rounded-2xl px-4 py-2">
                        <span className="font-semibold text-sm">
                          {comment.author.name || comment.author.username}
                        </span>
                        <p className="text-sm mt-1">{comment.content}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-1 px-2 text-xs text-white/40">
                        <span>{formatRelativeTime(comment.createdAt)}</span>
                        <button className="hover:text-white">Balas</button>
                        <button className="hover:text-white">Like</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-white/40 py-4">
                  Belum ada komentar
                </p>
              )}

              {/* Add Comment */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <img
                  src="/default-avatar.png"
                  alt="You"
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div className="flex-1 flex items-center gap-2 bg-dark-400 rounded-full px-4 py-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tulis komentar..."
                    className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-white/40"
                  />
                  <button
                    onClick={handleComment}
                    disabled={!newComment.trim()}
                    className="text-primary-400 hover:text-primary-300 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
