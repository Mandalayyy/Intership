'use client';

import { auth } from '@/data/firebase';
import { signOut } from 'firebase/auth';

export default function SignOut() {
  return (
    <button
      onClick={() => signOut(auth)}
      className="bg-gray-800 text-white px-4 py-2 rounded"
    >
      Вийти
    </button>
  );
}
