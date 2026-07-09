# 🎉 Nexus Social Media - Static Version

Platform media sosial statis yang bisa langsung di-hosting di **GitHub Pages** tanpa server!

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
https://username.github.io/repository-name/
```

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
