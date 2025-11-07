"use client"; // client component
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.get("/api/user/logout");
      toast.success("Logged out successfully.");
      router.push("/login");
    } catch (error: any) {
      return toast.error("Something went wrong.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>User Profile</h1>
      <hr />
      <p>Welcome to your profile page!</p>
      <button
        onClick={onLogout}
        className="bg-blue-400 mt-4 text-white rounded-md py-3 px-2 hover:bg-blue-500 cursor-pointer font-bold"
      >
        Logout
      </button>
    </div>
  );
}
