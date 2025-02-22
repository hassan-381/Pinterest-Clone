"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

function SingIn() {
  const { data: session } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleCredentialsLogin = async () => {
    console.log("Credentials Login");
    setLoading(true);
    if (!username || !password) {
      toast.error("Please provide complete details.");
      setLoading(false);
      return;
    }
    const response = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    setLoading(false);
    if (response?.error) {
      setLoading(false);
      toast.error("Invalid credentials.");
    }
    // router.push("/");
  };

  return (
    <>
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
            Login to your account
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Access your Pinterest account
          </p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-red-500 focus:ring-2 focus:outline-none "
          />

          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-red-500 focus:ring-2 focus:outline-none "
            type="password"
          />

          <button
            onClick={handleCredentialsLogin}
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
            <Link href={"/signup"} className="text-blue-600 hover:underline">
              Sign up
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default SingIn;
