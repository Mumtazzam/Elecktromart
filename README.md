# 🛒 Website Toko Bahan Makanan

Website e-commerce untuk berjualan bahan makanan dengan desain cerah dan colorful. Data pesanan tersimpan otomatis ke Google Spreadsheet.

## ✨ Fitur

- 🎨 Desain modern dengan warna cerah (merah, biru, kuning, hijau)
- 🛍️ 16 produk bahan makanan dengan emoji
- 🛒 Keranjang belanja interaktif
- 📱 Responsive design (mobile & desktop)
- 📊 Integrasi Google Spreadsheet untuk menyimpan pesanan
- ✅ Notifikasi sukses setelah checkout

## 🚀 Cara Setup

### 1. Setup Google Spreadsheet

1. Buka [Google Sheets](https://sheets.google.com) dan buat spreadsheet baru
2. Buka **Extensions** → **Apps Script**
3. Hapus kode default dan paste kode dari file `google-apps-script.gs`
4. Klik **Deploy** → **New deployment**
5. Pilih type: **Web app**
6. Atur:
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Klik **Deploy** dan copy **Web app URL**

### 2. Setup Website

1. Buka file `script.js`
2. Ganti baris ini dengan URL Web App Anda:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'MASUKKAN_URL_GOOGLE_APPS_SCRIPT_ANDA_DISINI';
   ```
3. Simpan file

### 3. Jalankan Website

Buka file `index.html` di browser Anda. Website siap digunakan!

## 📦 Struktur File

```
├── index.html              # Halaman utama website
├── script.js              # Logic JavaScript & integrasi Google Sheets
├── google-apps-script.gs  # Script untuk Google Apps Script
└── README.md             # Dokumentasi
```

## 🎨 Warna yang Digunakan

- **Primary (Merah)**: #FF6B6B
- **Secondary (Biru Tosca)**: #4ECDC4
- **Accent (Kuning)**: #FFE66D
- **Success (Hijau Mint)**: #95E1D3

## 📝 Produk yang Tersedia

### Bahan Pokok
- Beras Premium
- Minyak Goreng
- Gula Pasir

### Protein
- Telur Ayam
- Daging Ayam
- Daging Sapi
- Ikan Segar

### Sayuran
- Tomat
- Bawang Merah
- Cabai Merah
- Kentang
- Wortel

### Buah
- Jeruk
- Apel
- Pisang

### Susu
- Susu Segar

## 💡 Cara Menggunakan

1. Pilih produk yang ingin dibeli
2. Atur jumlah yang diinginkan
3. Klik tombol "Tambah" untuk memasukkan ke keranjang
4. Klik tombol "Keranjang" di header
5. Isi data pelanggan (nama, telepon, alamat)
6. Klik "Checkout Sekarang"
7. Data pesanan otomatis tersimpan di Google Spreadsheet

## 🔧 Kustomisasi

### Menambah Produk Baru

Edit array `products` di file `script.js`:

```javascript
{ 
  id: 17, 
  name: 'Nama Produk', 
  price: 50000, 
  unit: 'kg', 
  emoji: '🥬', 
  category: 'Kategori' 
}
```

### Mengubah Warna

Edit konfigurasi Tailwind di `index.html`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#FF6B6B',    // Ubah warna di sini
                secondary: '#4ECDC4',
                accent: '#FFE66D',
                success: '#95E1D3',
            }
        }
    }
}
```

## 📊 Format Data di Spreadsheet

| Timestamp | Nama Pelanggan | No. Telepon | Alamat | Item Pesanan | Total (Rp) | Detail Pesanan |
|-----------|----------------|-------------|---------|--------------|------------|----------------|
| Data otomatis tersimpan dengan format lengkap |

## 🌐 Browser Support

- Chrome (Recommended)
- Firefox
- Safari
- Edge

## 📱 Mobile Friendly

Website ini fully responsive dan dapat diakses dengan baik di perangkat mobile.

## 🎯 Tips

- Pastikan koneksi internet stabil saat checkout
- URL Google Apps Script harus di-deploy dengan akses "Anyone"
- Jika ada error, cek console browser (F12) untuk debugging

---

Dibuat dengan ❤️ menggunakan HTML, Tailwind CSS, JavaScript, dan Google Apps Script
