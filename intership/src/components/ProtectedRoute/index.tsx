"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/data/firebase";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); 
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user && !["/signin", "/signup"].includes(pathname)) {

      router.push("/signin"); 
    }


    if (user && ["/signin", "/signup"].includes(pathname)) {
      router.push("/");
    }
  }, [user, router, pathname]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
