// src/hooks/useUser.ts
'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/data/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return user;
}
