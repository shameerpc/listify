import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token); // Save JWT
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center py-20 relative">
        <img
          src="/waves.svg"
          alt="wave"
          className="absolute bottom-0 left-0 w-full opacity-20"
        />

        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-3xl p-10 w-full max-w-md z-10 text-center">
          <h2 className="text-blue-600 font-bold text-xl mb-2">Login</h2>
          <p className="text-gray-600 text-sm mb-4">
            Welcome back! Sign in using your social account or email to continue us
          </p>

          <div className="flex justify-center gap-4 my-4">
            <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" className="w-8 h-8" />
            <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="w-8 h-8" />
            <img src="https://img.icons8.com/ios-filled/50/000000/mac-os.png" alt="Apple" className="w-8 h-8" />
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-md bg-white shadow border border-gray-200 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-md bg-white shadow border border-gray-200 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="mt-4 py-3 rounded-lg bg-white text-black shadow hover:shadow-md font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
