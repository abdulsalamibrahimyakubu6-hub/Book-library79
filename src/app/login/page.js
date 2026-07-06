"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const users = [
    {
      email: "admin@gmail.com",
      password: "12345",
    },
    {
      email: "salam@gmail.com",
      password: "54321",
    },
    {
      email: "john@gmail.com",
      password: "11111",
    },
    {
      email: "mary@gmail.com",
      password: "22222",
    },
  ];

  function handleLogin(e) {
    e.preventDefault();

    // Check hardcoded users
    const existingUser = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    // Check user created from signup
    const savedUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (
      existingUser ||
      (
        savedUser &&
        savedUser.email === email &&
        savedUser.password === password
      )
    ) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", email);

      router.push("/");
    } else {
      alert("Invalid email or password");
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
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
          placeholder="Enter your password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link href="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

