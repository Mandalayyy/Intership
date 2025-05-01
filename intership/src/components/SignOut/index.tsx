'use client';

import { auth } from '@/data/firebase';
import { signOut } from 'firebase/auth';

export default function SignOut() {
  return (
    <button
      onClick={() => signOut(auth)}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
    >
      Вийти
    </button>
  );
}