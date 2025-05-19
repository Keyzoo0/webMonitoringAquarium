// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    address: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setErrorMsg("Password tidak cocok.");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const uid = userCredential.user.uid;
      await setDoc(doc(db, "users", uid), {
        ...formData,
        password: undefined,
        confirmPassword: undefined,
      });
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg("Gagal registrasi: " + err.message);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {["firstName", "lastName", "dob", "phone", "address", "age", "email", "password", "confirmPassword"].map(field => (
            <input
              key={field}
              type={field.includes("password") ? "password" : field === "dob" ? "date" : field === "email" ? "email" : "text"}
              id={field}
              placeholder={
                field === "firstName" ? "Nama Depan" :
                field === "lastName" ? "Nama Belakang" :
                field === "dob" ? "Tanggal Lahir" :
                field === "phone" ? "Nomor HP" :
                field === "address" ? "Alamat" :
                field === "age" ? "Umur" :
                field === "email" ? "Email" :
                field === "password" ? "Password" : "Konfirmasi Password"
              }
              className="w-full px-4 py-2 border rounded"
              required
              value={formData[field]}
              onChange={handleChange}
            />
          ))}
          <p className="text-red-500 text-center text-sm">{errorMsg}</p>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Daftar
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Sudah punya akun? <Link to="/" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}
