// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return navigate("/");

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!profile) {
    return <div className="text-white text-center mt-10">Loading profile...</div>;
  }

  return (
    <main className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">User Profile</h1>

      <div className="bg-gray-800 p-6 rounded shadow max-w-xl space-y-4">
        <p><span className="font-bold">Nama Depan:</span> {profile.firstName || "-"}</p>
        <p><span className="font-bold">Nama Belakang:</span> {profile.lastName || "-"}</p>
        <p><span className="font-bold">Email:</span> {profile.email || "-"}</p>
        <p><span className="font-bold">Tanggal Lahir:</span> {profile.dob || "-"}</p>
        <p><span className="font-bold">No HP:</span> {profile.phone || "-"}</p>
        <p><span className="font-bold">Alamat:</span> {profile.address || "-"}</p>
        <p><span className="font-bold">Umur:</span> {profile.age || "-"}</p>
      </div>
    </main>
  );
}
