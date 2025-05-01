import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../data/firebase"; 
import { useRouter } from "next/router";

export const signUpWithEmailPassword = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error("Error signing up:", error);
    return false;
  }
};

export const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error("Error signing in:", error);
    return false;
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    return true;
  } catch (error) {
    console.error("Error with Google sign-in:", error);
    return false;
  }
};
