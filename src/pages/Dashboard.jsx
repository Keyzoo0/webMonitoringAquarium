import { useEffect, useState } from "react";
import { rtdb, auth, getLast30Locations, getLast50Sensor } from "../firebase";
import { ref, onValue } from "firebase/database";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [watertank, setWatertank] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [turbidity, setTurbidity] = useState(0);
  const [labels, setLabels] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [turbidityData, setTurbidityData] = useState([]);
  const [locations, setLocations] = useState([]);
  const last = locations[locations.length - 1];

  // Realtime dari RTDB
  useEffect(() => {
    const dataRef = ref(rtdb, "/");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setWatertank(data.watertank ?? 0);
        setTemperature(data.temperature ?? 0);
        setTurbidity(data.turbidity ?? 0);
      }
    });
    return () => unsubscribe();
  }, []);

  // Sensor graph dari Firestore
  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) return;
        const result = await getLast50Sensor(uid);

        const lbl = result.map((d) => d.id);
        const temps = result.map((d) => d.temp);
        const hums = result.map((d) => d.humidity);

        setLabels(lbl);
        setTempData(temps);
        setTurbidityData(hums);
      } catch (e) {
        console.error("Error fetching graph data:", e);
      }
    };

    fetchGraph();
  }, []);

  // Lokasi dari Firestore
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const locs = await getLast30Locations(uid);
        console.log("🧭 Last 30 locations:", locs);
        setLocations(locs);
      } catch (err) {
        console.error("Error fetching location data:", err);
      }
    };

    fetchLocation();
  }, []);

  return (
    <main className="p-6 text-white bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Water Tank"
          value={watertank.toFixed(1)}
          color="cyan"
        />
        <InfoCard
          title="Temperature"
          value={temperature.toFixed(1)}
          color="green"
        />
        <InfoCard
          title="Turbidity"
          value={turbidity.toFixed(1)}
          color="green"
        />

        <GraphCard
          title="Temperature Graph"
          data={tempData}
          labels={labels}
          color="#4ade80"
        />
        <GraphCard
          title="Turbidity Graph"
          data={turbidityData}
          labels={labels}
          color="#60a5fa"
        />

        <div className="bg-gray-800 p-4 rounded shadow col-span-1 lg:col-span-3">
          <h2 className="text-lg mb-4">Location Map</h2>
          <MapContainer
            center={last ? [last.lat, last.lng] : [-7.95, 112.61]}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* 🔵 Polyline dari semua titik */}
            {locations.length > 1 && (
              <Polyline
                positions={locations.map((loc) => [loc.lat, loc.lng])}
                color="white"
                weight={3}
              />
            )}

            {/* ⚪ Ganti marker dengan titik */}
            {locations.map((loc, i) => (
              <CircleMarker
                key={i}
                center={[loc.lat, loc.lng]}
                radius={4}
                pathOptions={{
                  color: i === locations.length - 1 ? "black" : "red", // titik terakhir warna beda
                  fillColor: i === locations.length - 1 ? "black" : "red",
                  fillOpacity: 1,
                }}
              >
                <Popup>
                  {loc.id}
                  <br />
                  Lat: {loc.lat.toFixed(5)}
                  <br />
                  Lng: {loc.lng.toFixed(5)}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </main>
  );
}

function InfoCard({ title, value, color }) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg mb-2">{title}</h2>
      <div className={`text-5xl font-bold text-center text-${color}-400`}>
        {value}
      </div>
    </div>
  );
}

function GraphCard({ title, data, labels, color }) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow col-span-1 lg:col-span-2">
      <h2 className="text-lg mb-4">{title}</h2>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: title,
              data,
              borderColor: color,
              backgroundColor: `${color}20`,
              tension: 0.4,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { labels: { color: "white" } } },
          scales: {
            x: { ticks: { color: "white" } },
            y: { ticks: { color: "white" } },
          },
        }}
      />
    </div>
  );
}
