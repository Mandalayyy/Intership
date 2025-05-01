"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailPassword, signInWithGoogle } from "../../services/authService";
import { useDispatch } from "react-redux"; 
import { setUser } from "@/store/authSlice"; // Імпортуємо екшн для оновлення стейту

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch(); // Ініціалізація dispatch
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const user = await signInWithEmailPassword(email, password); // Оновлено на отримання користувача

    if (user) {
      dispatch(setUser(user)); // Оновлення стейту в Redux
      router.push("/home");
    } else {
      setError("Invalid credentials. Please try again.");
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const user = await signInWithGoogle(); // Оновлено на отримання користувача
    if (user) {
      dispatch(setUser(user)); // Оновлення стейту в Redux
      router.push("/home");
    } else {
      setError("Failed to sign in with Google. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      {error && <p>{error}</p>}
      <button onClick={handleGoogleSignIn} disabled={loading}>
        Sign In with Google
      </button>
    </div>
  );
};

export default SignIn;
