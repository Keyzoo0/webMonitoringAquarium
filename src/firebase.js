import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDdwctagHhj-kj_JPZLhsmrJm4korAkdu4",
  authDomain: "monitoringaquarium-52f11.firebaseapp.com",
  projectId: "monitoringaquarium-52f11",
  storageBucket: "monitoringaquarium-52f11.appspot.com",
  messagingSenderId: "426687097538",
  appId: "1:426687097538:web:28d11407fcecd635e3295b",
  measurementId: "G-J192Z92LPE",
  databaseURL: "https://monitoringaquarium-52f11-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

// Ambil 30 lokasi terakhir
export async function getLast30Locations(userId) {
  const locationRef = collection(db, "users", userId, "location");
  const q = query(locationRef, orderBy("timestamp", "desc"), limit(30));
  const snapshot = await getDocs(q);

  const coordinates = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.latitude && data.longitude) {
      coordinates.push({
        id: doc.id,
        lat: data.latitude,
        lng: data.longitude,
      });
    }
  });

  return coordinates.reverse();
}

// Ambil 50 data sensor terakhir
export async function getLast50Sensor(userId) {
  const sensorRef = collection(db, "users", userId, "sensor");
  const q = query(sensorRef, orderBy("__name__", "desc"), limit(50));
  const snapshot = await getDocs(q);

  const data = [];
  snapshot.docs.reverse().forEach((doc) => {
    const sensor = doc.data();
    data.push({
      id: doc.id,
      temp: sensor.temp || 0,
      humidity: sensor.humidity || 0,
    });
  });

  return data;
}
