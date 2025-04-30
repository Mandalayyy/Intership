"use client"; // Додано для позначення компонента як клієнтського

import { useState } from "react";
import { useRouter } from "next/navigation"; // Замість next/router
import { signInWithEmailPassword, signInWithGoogle } from "../../services/authService";

const SignIn = () => {
  const router = useRouter(); // Використання useRouter з next/navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = await signInWithEmailPassword(email, password);

    if (success) {
      router.push("/home"); // Редірект після успішного входу
    } else {
      setError("Invalid credentials. Please try again.");
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const success = await signInWithGoogle();
    if (success) {
      router.push("/home"); // Редірект після успішного входу через Google
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
