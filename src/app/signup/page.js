"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const user = {
      email,
      password,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert("Account created successfully!");

    router.push("/login");
  }
  return (
    <div className="login">
      <h1>Create Account</h1>

      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Sign Up
        </button>

        <p>
          Already have an account?{" "}
          <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
