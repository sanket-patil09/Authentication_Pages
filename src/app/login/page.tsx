"use client"; // clint component
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      const reqBody = await axios.post("/api/user/login", user);
      toast.success("Login Success", reqBody.data);
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 ml-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 ml-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="cursor-pointer p-2 ml-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
        onClick={onLogin}
      >
        Login Here
      </button>
      <p>Don't have an account?</p>
      <Link href="/signup" className="text-blue-900">
        Signup
      </Link>
    </div>
  );
}
