"use client"; // client component
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import react, { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("No User");
  const onLogout = async () => {
    try {
      await axios.get("/api/user/logout");
      toast.success("Logged out successfully.");
      router.push("/login");
    } catch (error: any) {
      return toast.error("Something went wrong.");
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/user/User");
    setData(response.data.data.username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>User Profile</h1>
      <hr />
      <p>Welcome to your profile page!</p>
      <h2 className="bg-amber-600 text-white p-2 rounded-md">
        {data == "No User" ? (
          "No User"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={onLogout}
        className="bg-blue-400 mt-4 text-white rounded-md py-3 px-2 hover:bg-blue-500 cursor-pointer font-bold"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 text-white rounded-md py-3 px-2 hover:bg-green-700 cursor-pointer font-bold"
      >
        Get User Details
      </button>
    </div>
  );
}
