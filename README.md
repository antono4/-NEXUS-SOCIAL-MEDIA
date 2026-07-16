# 🎉 Nexus Social Media Platform

> **Created by Antono**


Platform media sosial lengkap dengan **2 versi deployment**:

| Versi | Deploy ke | Fitur |
|-------|-----------|-------|
| **Main Branch (Static)** | GitHub Pages | Posts, Stories, Likes, Comments, Followers, Messages |
| **Fullstack Branch** | Vercel | + PostgreSQL Database, Auth, API Routes |

---

## 🚀 Quick Deploy

## ✨ Fitur

| Fitur | Deskripsi |
|-------|-----------|
| 📝 **Postingan** | Buat, lihat, like, dan simpan postingan |
| 💬 **Komentar** | Berdiskusi di setiap postingan |
| ❤️ **Reaksi** | Like/unlike postingan |
| 📸 **Stories** | Bagikan momen dengan gambar |
| 👥 **Followers** | Sistem followers |
| 🔔 **Notifikasi** | Update aktivitas terbaru |
| 🔖 **Bookmark** | Simpan postingan favorit |
| 💬 **Messages** | Kirim pesan ke pengguna lain |
| 🔍 **Search** | Cari pengguna |
| 📱 **Responsive** | Tampilan optimal di semua device |

## 🚀 Deploy ke GitHub Pages

### Step 1: Upload ke GitHub

1. Buat repository baru di GitHub
2. Upload semua file dari folder ini ke repository
3. Pastikan file-file ini ada:
   - `index.html`
   - `app.html`
   - `profile.html`
   - `css/style.css`
   - `js/app.js`

### Step 2: Aktifkan GitHub Pages

1. Buka repository Anda di GitHub
2. Klik **Settings**
3. Scroll ke **Pages** section
4. Pada **Source**, pilih **Deploy from a branch**
5. Pilih branch **main** dan folder **/ (root)**
6. Klik **Save**

### Step 3: Selesai! 🎉

Website Anda akan tersedia di:
```
https://antono4.github.io/-NEXUS-SOCIAL-MEDIA/
```

---

## ☁️ Deploy ke Vercel (Full-Stack Version)

Versi full-stack dengan database PostgreSQL tersedia di branch `fullstack`:

1. **Buka Vercel**: https://vercel.com/new
2. **Import dari GitHub**: Pilih repository `antono4/-NEXUS-SOCIAL-MEDIA`
3. **Pilih Branch**: `fullstack`
4. **Tambahkan Environment Variables**:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Secret key (minimal 32 karakter)
   - `NEXTAUTH_URL` - URL Vercel Anda

5. **Deploy!** Klik "Deploy"

---

## 📁 Struktur File

```
nexus-static/
├── index.html          # Landing page & Login/Register
├── app.html            # Dashboard utama (Feed, Stories)
├── profile.html        # Halaman profil user
├── 404.html           # Halaman error
├── css/
│   └── style.css      # Styling utama
├── js/
│   └── app.js         # Logic aplikasi
└── README.md          # Dokumentasi
```

## 💾 Data Storage

Aplikasi ini menggunakan **localStorage** untuk menyimpan data:

- `nexus_users` - Daftar pengguna
- `nexus_current_user` - User yang sedang login
- `nexus_posts` - Semua postingan
- `nexus_stories` - Stories
- `nexus_notifications` - Notifikasi
- `nexus_messages` - Pesan
- `nexus_comments` - Komentar

## 🔧 Kustomisasi

### Mengubah Sample Data

Edit file `js/app.js`, cari bagian `init()` dan modifikasi data sample.

### Mengubah Tema/Warna

Edit file `css/style.css`, bagian `:root` untuk mengubah warna.

### Menambah Fitur Baru

Tambahkan fungsi baru di `js/app.js` dan panggil dari HTML.

## ⚠️ Catatan Penting

1. **Data Reset** - Data tersimpan di browser user, jadi:
   - Setiap user punya data sendiri-sendiri
   - Data akan hilang jika browser di-clear
   - Data antar user TIDAK tersinkron

2. **Cocok Untuk**:
   - Demo/prototype
   - Portfolio
   - Belajar React/JavaScript
   - Project sekolah/kuliah

3. **Tidak Cocok Untuk**:
   - Production app dengan banyak user
   - Perlu data real-time sync
   - Perlu keamanan tinggi

## 🛠️ Teknologi

- **HTML5** - Structure
- **CSS3** - Styling (Flexbox, Grid, Variables)
- **JavaScript ES6+** - Logic
- **LocalStorage** - Data persistence
- **DiceBear API** - Avatar generation
- **Unsplash** - Sample images

## 📝 Lisensi

MIT License - Bebas digunakan untuk apapun!

---

Dibuat dengan ❤️ untuk kemudahan deployment!
