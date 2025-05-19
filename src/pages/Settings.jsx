// src/pages/Settings.jsx
import { useState } from "react";

export default function Settings() {
  const [interval, setInterval] = useState(10);
  const [mode, setMode] = useState("auto");

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { interval, mode };
    console.log("Config saved:", config);
    alert("Pengaturan disimpan");
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-lg font-semibold mb-4">Konfigurasi Sistem</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
      >
        <div>
          <label className="block mb-1 font-medium" htmlFor="interval">
            Interval Sampling (detik)
          </label>
          <input
            type="number"
            id="interval"
            className="w-full px-4 py-2 border rounded-md"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="mode">
            Mode
          </label>
          <select
            id="mode"
            className="w-full px-4 py-2 border rounded-md"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="auto">Auto</option>
            <option value="manual">Manual</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Simpan
        </button>
      </form>
    </main>
  );
}
