// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
          setErrorMsg(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-6 drop-shadow-lg">
        Web Monitoring Aquarium
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md transition-all duration-500 hover:shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block font-medium mb-1 text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium mb-1 text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMsg && <p className="text-sm text-red-600 text-center">{errorMsg}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all duration-300"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">Daftar</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
