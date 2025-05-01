"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/data/firebase";
import SignOut from "@/components/SignOut";

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-lg text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v18m9-9H3"
            />
          </svg>
          <h1 className="text-2xl font-bold tracking-wide">My App</h1>
        </Link>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                Welcome, {user.displayName || user.email}
              </span>
              <SignOut />
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/signin"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white transition duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white transition duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
