# 🌊 Monitoring Aquarium Web App

![Vite + React](https://img.shields.io/badge/Vite-React-blueviolet)
![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-orange)
![Firebase](https://img.shields.io/badge/Firebase-FireStore-Green)
![GeoLocator](https://img.shields.io/badge/LeafLet-OpenSourceGeoLocaatorJavaScript-Red)

### 📸 Tampilan Dashboard
![Dashboard](./screenshots/dashboard.jpg)

### 🗺️ Tampilan Map View
![Login Page](./screenshots/loginPage.jpg)

Monitoring Aquarium adalah aplikasi dashboard berbasis web untuk memantau kondisi lingkungan secara real-time seperti suhu air, kejernihan (turbidity), dan kapasitas tangki. Sistem ini terintegrasi dengan Firebase dan menampilkan lokasi perangkat di peta menggunakan Leaflet.

---

## 🚀 Fitur Utama

- 📈 **Dashboard Sensor Realtime** – Data grafik dari Firebase (suhu, turbidity, kapasitas)
- 🗺️ **Peta Interaktif** – Menampilkan posisi terakhir perangkat + polyline rute
- 🎨 **UI Modern** – Dibangun dengan React + Tailwind CSS
- 🔄 **Navigasi Halaman** – Menggunakan React Router DOM
- ⚡ **Fast Build System** – Menggunakan Vite untuk pengembangan cepat

---

## 🖼️ Tampilan

### 🔹 Realtime Dashboard
![Dashboard Screenshot](./src/assets/react.svg)

### 🔹 Logo Vite (Placeholder)
![Preview UI](./dist/vite.svg)

---

## 📦 Teknologi & Library

| Library            | Kegunaan                           |
|--------------------|------------------------------------|
| `react`            | Framework utama UI                 |
| `leaflet`          | Menampilkan peta interaktif        |
| `react-leaflet`    | Integrasi Leaflet dengan React     |
| `chart.js`         | Grafik chart sensor                |
| `react-chartjs-2`  | Wrapper React untuk Chart.js       |
| `firebase`         | Backend Realtime & Auth            |
| `react-router-dom` | Navigasi antar halaman             |

---

## ⚙️ Cara Menjalankan

```bash
# 1. Install dependencies
pnpm install

# 2. Jalankan server lokal
pnpm dev

# 3. Build untuk production
pnpm build
```

---

## 📝 Struktur Proyek

```
web/
├── index.html
├── src/
│   ├── App.jsx
│   ├── firebase.js
│   └── ...
├── public/
├── dist/
└── package.json
```

---

## 📄 Lisensi

MIT License
