"use client";
import Image from "next/image";
import React, { use, useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 fixed top-0 left-0 w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-4">
          <Image
            src="/pinterest.svg"
            alt="Pinterest Svg"
            width={150}
            height={150}
            priority
            className="w-12 h-12"
          />
        </div>
        <h2 className="text-center text-xl font-semibold">
          Welcome to Pinterest
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign up to see photos and videos from your friends
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-red-500 focus:ring-2 focus:outline-none "
        />
        <input
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-red-500 focus:ring-2 focus:outline-none "
          type="email"
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-red-500 focus:ring-2 focus:outline-none "
          type="password"
        />
      </div>
    </div>
  );
}

export default Register;
