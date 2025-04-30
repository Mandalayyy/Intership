// src/components/ProtectedRoute.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/hooks/useUser';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/signin'); // редірект якщо не авторизований
    }
  }, [user, router]);

  if (!user) return null; // або спінер, або нічого

  return <>{children}</>;
}
