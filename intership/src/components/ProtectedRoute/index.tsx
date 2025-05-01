"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/data/firebase"; // Ваш Firebase конфігураційний файл

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname(); // Using Next.js usePathname to get the current path
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Перевірка авторизації через Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Якщо користувач є, оновлюємо стан
      } else {
        setUser(null); // Якщо користувача немає, ставимо null
      }
      setLoading(false); // Після перевірки стану користувача, припиняємо завантаження
    });

    return () => unsubscribe(); // Очищаємо підписку, коли компонент розмонтується
  }, []);

  // Логіка редиректу для неавторизованих користувачів
  useEffect(() => {
    if (!user && !["/signin", "/signup", "/home", "/"].includes(pathname)) {
      // Якщо користувач не авторизований і намагається зайти на захищену сторінку
      router.push("/signin"); // Перенаправлення на /signin
    }

    // Якщо користувач авторизований, і намагається зайти на /signin або /signup, редирект на /dashboard
    if (user && ["/signin", "/signup"].includes(pathname)) {
      router.push("/dashboard");
    }
  }, [user, router, pathname]);

  if (loading) return <p>Loading...</p>; // Показуємо спінер або повідомлення під час перевірки стану користувача

  return <>{children}</>; // Якщо користувач авторизований, рендеримо children
}
