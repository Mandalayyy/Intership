// src/components/SignUp/index.tsx
"use client"; // Це клієнтський компонент

import { useState } from "react";
import { useRouter } from "next/navigation"; // Замість next/router
import { signUpWithEmailPassword } from "../../services/authService";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = await signUpWithEmailPassword(email, password);

    if (success) {
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
