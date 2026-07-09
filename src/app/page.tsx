"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Users,
  Image,
  Bell,
  Globe,
  Heart,
  Share2,
  Bookmark,
  Zap,
  Shield,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-400 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                Nexus
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
              >
                Daftar Gratis
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <Zap className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-white/80">
                  Platform Media Sosial Masa Depan
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  Connect,
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                  Share,
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Grow Together
                </span>
              </h1>

              <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto lg:mx-0">
                Nexus adalah platform media sosial baru yang dirancang untuk
                menghubungkan orang-orang dan memfasilitasi berbagi momen
                berharga dengan desain yang modern dan fitur yang lengkap.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/register"
                  className="group px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold text-lg hover:from-primary-600 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 flex items-center justify-center gap-2"
                >
                  Mulai Gratis
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Demo Live
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start">
                <div>
                  <div className="text-3xl font-bold text-white">10K+</div>
                  <div className="text-sm text-white/40">Pengguna Aktif</div>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <div className="text-3xl font-bold text-white">50K+</div>
                  <div className="text-sm text-white/40">Postingan</div>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <div className="text-3xl font-bold text-white">99%</div>
                  <div className="text-sm text-white/40">Uptime</div>
                </div>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Phone mockup */}
                <div className="relative bg-dark-300 rounded-[3rem] p-3 shadow-2xl border border-white/10">
                  <div className="bg-dark-400 rounded-[2.5rem] overflow-hidden">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-6 py-3 bg-dark-300/50">
                      <span className="text-xs text-white/60">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 bg-white/20 rounded-sm" />
                        <div className="w-4 h-2 bg-white/20 rounded-sm" />
                        <div className="w-6 h-3 bg-primary-500 rounded-sm" />
                      </div>
                    </div>

                    {/* App content preview */}
                    <div className="p-4 space-y-4">
                      {/* Stories preview */}
                      <div className="flex gap-3 overflow-hidden">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500/50 to-purple-500/50 p-0.5 flex-shrink-0"
                          >
                            <div className="w-full h-full rounded-full bg-dark-400 flex items-center justify-center">
                              <Users className="w-6 h-6 text-white/40" />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Post preview */}
                      <div className="bg-dark-300/50 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600" />
                          <div>
                            <div className="w-24 h-3 bg-white/20 rounded mb-1" />
                            <div className="w-16 h-2 bg-white/10 rounded" />
                          </div>
                        </div>
                        <div className="w-full h-20 bg-white/5 rounded-xl" />
                        <div className="flex justify-between">
                          <div className="flex gap-4">
                            <Heart className="w-5 h-5 text-primary-400" />
                            <MessageCircle className="w-5 h-5 text-white/40" />
                            <Share2 className="w-5 h-5 text-white/40" />
                          </div>
                          <Bookmark className="w-5 h-5 text-white/40" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-dark-300 rounded-2xl p-4 shadow-xl border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">+50 Friends</div>
                      <div className="text-xs text-white/40">This week</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-dark-300 rounded-2xl p-4 shadow-xl border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">1.2K Likes</div>
                      <div className="text-xs text-white/40">Your best post</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Fitur Lengkap untuk
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                Pengalaman Terbaik
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Semua fitur yang Anda butuhkan untuk tetap terhubung dengan
              teman, keluarga, dan komunitas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MessageCircle,
                title: "Posting & Stories",
                description:
                  "Bagikan momen dengan postingan teks, foto, dan video. Buat stories yang expire dalam 24 jam.",
                gradient: "from-primary-500 to-blue-600",
              },
              {
                icon: Heart,
                title: "Like & Komentar",
                description:
                  "Tunjukkan appreciation dengan like dan terlibat dalam percakapan melalui komentar.",
                gradient: "from-pink-500 to-rose-600",
              },
              {
                icon: Users,
                title: "Follow & Friends",
                description:
                  "Ikuti orang-orang menarik dan bangun jaringan sosial Anda dengan mudah.",
                gradient: "from-purple-500 to-indigo-600",
              },
              {
                icon: Bell,
                title: "Notifikasi Real-time",
                description:
                  "Tetap update dengan notifikasi untuk semua aktivitas di akun Anda.",
                gradient: "from-amber-500 to-orange-600",
              },
              {
                icon: Globe,
                title: "Pesan Langsung",
                description:
                  "Chat secara private dengan teman-teman dalam percakapan yang aman.",
                gradient: "from-green-500 to-emerald-600",
              },
              {
                icon: Shield,
                title: "Aman & Privasi",
                description:
                  "Data Anda aman dengan enkripsi end-to-end dan kontrol privasi lengkap.",
                gradient: "from-cyan-500 to-teal-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-dark-300/50 rounded-3xl p-8 border border-white/5 hover:border-primary-500/50 transition-all duration-500"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                />
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-600 rounded-3xl blur-3xl opacity-30" />
            <div className="relative bg-dark-300 rounded-3xl p-12 md:p-16 border border-white/10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Siap untuk{" "}
                <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                  Memulai?
                </span>
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ribuan pengguna yang sudah merasakan
                pengalaman media sosial yang lebih baik. Daftar gratis sekarang
                dan mulai berbagi momen Anda!
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 text-white font-bold text-xl hover:from-primary-600 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50"
              >
                <Sparkles className="w-6 h-6" />
                Daftar Sekarang - Gratis!
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Nexus</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-white/60">
              <Link href="#" className="hover:text-white transition-colors">
                Tentang
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privasi
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Syarat
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Kontak
              </Link>
            </div>
            <div className="text-sm text-white/40">
              © 2024 Nexus. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
