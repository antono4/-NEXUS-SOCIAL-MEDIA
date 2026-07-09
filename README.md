# 🎉 Nexus - Platform Media Sosial

Platform media sosial lengkap dengan fitur posting, stories, komentar, like, followers, pesan langsung, dan notifikasi.

![Nexus Preview](https://via.placeholder.com/800x400?text=Nexus+Social+Media+Platform)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/antono4/-NEXUS-SOCIAL-MEDIA)

## 🚀 Deploy ke Vercel

### Cara 1: One-Click Deploy (Recommended)

Klik tombol di atas atau kunjungi:
```
https://vercel.com/new/clone?repository-url=https://github.com/antono4/-NEXUS-SOCIAL-MEDIA
```

### Cara 2: Manual Deploy

1. Buat akun di [vercel.com](https://vercel.com)
2. Klik "Add New" → "Project"
3. Import repository GitHub Anda
4. Tambahkan Environment Variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Secret key (minimal 32 karakter)
   - `NEXTAUTH_URL` - URL deployment Vercel
5. Klik "Deploy"!

## ✨ Fitur

### Fitur Utama
- 📝 **Postingan** - Buat postingan dengan teks, foto, dan video
- 💬 **Komentar** - Berinteraksi dengan postingan melalui komentar
- ❤️ **Like** - Suka postingan favorit Anda
- 👥 **Followers** - Ikuti pengguna lain dan dapatkan pengikut
- 📸 **Stories** - Bagikan momen yang expire dalam 24 jam
- 💬 **Pesan Langsung** - Chat secara private dengan pengguna lain
- 🔔 **Notifikasi** - Update real-time untuk semua aktivitas
- 🔖 **Bookmark** - Simpan postingan untuk dibaca nanti

### Fitur Tambahan
- 🔐 **Autentikasi** - Login dan registrasi yang aman
- 🔍 **Pencarian** - Temukan pengguna dan konten
- 🌙 **Dark Mode** - Desain modern dengan tema gelap
- 📱 **Responsive** - Tampilan optimal di semua perangkat
- ⚡ **Real-time** - Update langsung tanpa refresh

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework dengan App Router
- **React 18** - Library untuk UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animasi
- **Zustand** - State management
- **React Query** - Data fetching

### Backend
- **Next.js API Routes** - Backend API
- **NextAuth.js** - Authentication
- **Prisma** - ORM
- **PostgreSQL** - Database

### Others
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT tokens
- **date-fns** - Date formatting
- **lucide-react** - Icons
- **socket.io** - Real-time communication

## 🚀 Instalasi

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm atau yarn

### Langkah 1: Clone Repository
```bash
git clone https://github.com/your-username/nexus-social.git
cd nexus-social
```

### Langkah 2: Install Dependencies
```bash
npm install
```

### Langkah 3: Setup Database

1. Buat database PostgreSQL:
```sql
CREATE DATABASE social_media;
```

2. Copy file environment:
```bash
cp .env.example .env
```

3. Edit `.env` dan sesuaikan konfigurasi:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/social_media?schema=public"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

4. Generate Prisma client dan push schema:
```bash
npm run db:generate
npm run db:push
```

### Langkah 4: Jalankan Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📁 Struktur Project

```
nexus-social/
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API Routes
│   │   │   ├── auth/      # Authentication APIs
│   │   │   ├── posts/     # Posts APIs
│   │   │   ├── comments/  # Comments APIs
│   │   │   ├── stories/   # Stories APIs
│   │   │   ├── messages/  # Messages APIs
│   │   │   └── users/     # Users APIs
│   │   ├── dashboard/    # Dashboard page
│   │   ├── login/         # Login page
│   │   ├── register/      # Register page
│   │   └── page.tsx       # Landing page
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   ├── store/            # Zustand stores
│   └── types/            # TypeScript types
├── public/              # Static files
└── package.json
```

## 📖 Dokumentasi API

### Authentication
- `POST /api/auth/register` - Registrasi user baru
- `POST /api/auth/[...nextauth]` - Login dengan NextAuth

### Posts
- `GET /api/posts` - Ambil semua postingan
- `POST /api/posts` - Buat postingan baru
- `GET /api/posts/[id]` - Ambil postingan berdasarkan ID
- `PUT /api/posts/[id]` - Update postingan
- `DELETE /api/posts/[id]` - Hapus postingan
- `POST /api/posts/like` - Like/unlike postingan
- `POST /api/posts/save` - Simpan/hapus postingan

### Comments
- `GET /api/comments?postId=xxx` - Ambil komentar postingan
- `POST /api/comments` - Buat komentar baru

### Stories
- `GET /api/stories` - Ambil semua stories
- `POST /api/stories` - Buat story baru

### Messages
- `GET /api/messages` - Ambil percakapan
- `POST /api/messages` - Kirim pesan

### Users
- `GET /api/users` - Ambil daftar pengguna
- `GET /api/users?username=xxx` - Ambil profil pengguna
- `PUT /api/users` - Update profil
- `POST /api/users/follow` - Follow/unfollow pengguna
- `GET /api/users/follow?userId=xxx&type=followers` - Ambil followers/following

### Notifications
- `GET /api/notifications` - Ambil notifikasi
- `PUT /api/notifications` - Tandai sudah dibaca

## 🎨 Desain

Platform ini menggunakan desain modern dengan:
- **Tema Gelap** - Nyaman di mata dengan warna gelap
- **Gradien** - Aksen warna yang menarik
- **Glassmorphism** - Efek blur pada komponen
- **Animasi Halus** - Transisi dan feedback yang smooth
- **Typography Modern** - Font yang mudah dibaca

## 🔒 Keamanan

- Password di-hash dengan bcrypt (12 rounds)
- JWT tokens untuk session management
- CSRF protection
- Input validation
- SQL injection prevention via Prisma ORM

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan buat issue atau pull request.

## 📄 Lisensi

Project ini dilisensikan di bawah MIT License.

## 👨‍💻 Author

Dibuat dengan ❤️ oleh [antono4](https://github.com/antono4)

---

⭐ Jangan lupa untuk memberikan star jika project ini bermanfaat!
