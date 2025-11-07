"use client"; // clint component

import React from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {
    try {
      // axios is used to make api calls just like fetch but easier to use
      const response = await axios.post("/api/user/signup", user);

      // once the api is fetched by axios router redirect's to login page
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Signup</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 ml-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
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
        onClick={onSignup}
      >
        Signup Here
      </button>
      <p>Already have an account?</p>
      <Link href="/login" className="text-blue-900">
        Login
      </Link>
    </div>
  );
}
