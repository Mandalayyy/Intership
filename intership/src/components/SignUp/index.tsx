"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpWithEmailPassword } from "../../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice"; // Імпортуємо екшн для оновлення стейту

const SignUp = () => {
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

    const user = await signUpWithEmailPassword(email, password); // Оновлено на отримання користувача

    if (user) {
      dispatch(setUser(user)); // Оновлення стейту в Redux
      router.push("/home");
    } else {
      setError("Failed to sign up. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
