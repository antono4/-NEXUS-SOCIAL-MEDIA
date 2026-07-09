# ☁️ Deploy Full-Stack Version ke Vercel

## 📋 Prerequisites

1. Akun Vercel (sign up di https://vercel.com)
2. PostgreSQL Database (gratis di Neon.tech atau Supabase)

---

## 🚀 Langkah Deployment

### Step 1: Buat PostgreSQL Database

1. Buka https://neon.tech (rekomendasi - gratis)
2. Sign up dengan GitHub
3. Buat project baru
4. Copy connection string:
   ```
   postgresql://user:password@ep-xxx-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### Step 2: Deploy ke Vercel

1. Buka https://vercel.com/new
2. Klik **"Import Git Repository"**
3. Repository URL: `https://github.com/antono4/-NEXUS-SOCIAL-MEDIA`
4. **Penting!** Pilih branch: **`fullstack`**
5. Klik **"Import"**

### Step 3: Configure Project

1. **Project Name**: `nexus-social-media`
2. **Framework Preset**: Next.js (auto-detected)
3. **Root Directory**: `/` (default)

### Step 4: Environment Variables

Klik **"Environment Variables"** dan tambahkan:

| Name | Value | Example |
|------|-------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `NEXTAUTH_SECRET` | Random string (min 32 chars) | `your-secret-key-at-least-32-characters` |
| `NEXTAUTH_URL` | URL deployment (nanti copy) | `https://nexus-social-media.vercel.app` |

### Step 5: Deploy!

1. Klik **"Deploy"**
2. Tunggu ~2-3 menit
3. Copy URL deployment Anda (misal: `https://nexus-social-media.vercel.app`)
4. Paste ke `NEXTAUTH_URL` environment variable
5. Redeploy untuk apply

---

## ✅ Setup Database

Setelah deployment berhasil:

1. Buka Vercel Dashboard → Project Anda
2. Klik **"Storage"** tab
3. Connect Neon database atau gunakan connection string yang sudah ada
4. Vercel akan auto-run Prisma migrations

---

## 🔧 Troubleshooting

### Build Failed?
- Pastikan semua environment variables terisi
- Check deployment logs untuk error details

### Database Connection Error?
- Pastikan DATABASE_URL benar
- Pastikan Neon mengizinkan koneksi (SSL mode)

### 500 Error?
- Check NEXTAUTH_SECRET sudah di-set
- Check NEXTAUTH_URL sesuai dengan URL Vercel

---

## 🌐 Links

- **Vercel**: https://vercel.com
- **Neon (PostgreSQL)**: https://neon.tech
- **Supabase (Alternative)**: https://supabase.com
- **Repository**: https://github.com/antono4/-NEXUS-SOCIAL-MEDIA (branch: `fullstack`)
