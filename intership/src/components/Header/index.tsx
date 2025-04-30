"use client"; 

import React, { useEffect, useState } from "react";
import Link from "next/link"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
    <header className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl">My App</h1>
        <div>
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.displayName || user.email}</span>
              <SignOut />
            </>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/signin"
                className="bg-green-500 px-4 py-2 rounded text-white"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-blue-500 px-4 py-2 rounded text-white"
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
