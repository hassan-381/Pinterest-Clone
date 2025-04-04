"use client";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

function Signup() {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };
  const handleUserRegister = async () => {
    setLoading(true);
    if (!username || !email || !password || !image) {
      toast.error("Please provide complete details.");
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);
      await axios.post("http://localhost:3000/api/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUsername("");
      setEmail("");
      setImage("");
      setImagePreview("");
      setLoading(false);
      toast.success("User registered successfully.");
      router.push("/signin");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      setLoading(false);
      console.error(error);
    }
  };

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
        <div className="w-full p-3 rounded-lg focus:outline-none flex items-center space-x-4">
          <Image
            src={imagePreview ? imagePreview : "/avatar.png"}
            alt="User Avatar"
            width={100}
            height={100}
            className="w-12 h-12 rounded-full "
          />
          <label
            className={`${
              imagePreview ? "bg-green-600" : "bg-gray-600"
            } w-[-webkit-fill-available] text-white px-4 py-2 rounded cursor-pointer`}
          >
            Choose Avatar
            <input type="file" className="hidden" onChange={handleImage} />
          </label>
        </div>
        <button
          onClick={handleUserRegister}
          className="w-full p-3 border-red-50 text-white rounded-lg mb-4 bg-red-500 hover:bg-red-600 transition-all 
        "
        >
          {loading ? <ClipLoader color={"#fff"} size={20} /> : "Continue"}
        </button>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="h-px bg-gray-300 w-full "></div>
          <p className="text-gray-500">OR</p>{" "}
          <div className=" h-px bg-gray-300 w-full"></div>
        </div>
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full p-3 bg-black text-white rounded-lg flex items-center justify-center space-x-2  mb-3  hover:bg-[#111]"
        >
          <Image
            src={"/github2.svg"}
            alt="Github Svg"
            width={150}
            height={150}
            priority
            className="w-6 h-6"
          />
          <span className="font-semibold"> Continue with Github</span>
        </button>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full p-3 bg-white text-black rounded-lg flex items-center justify-center space-x-2  mb-3  hover:bg-gray-100"
        >
          <Image
            src={"/google.svg"}
            alt="Github Svg"
            width={150}
            height={150}
            priority
            className="w-6 h-6"
          />
          <span className="font-semibold"> Continue with Google</span>
        </button>
        <p className="text-center text-xm text-gray-500 mt-4">
          By continuing, you agree to Pinterest's
          <Link href="/" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{" "}
          ,
          <Link href="/" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
        <p className="text-center text-sm mt-4 ">
          Already have an account?{" "}
          <Link href={"/signin"} className="text-blue-600 hover:underline">
            Sign in
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Signup;
