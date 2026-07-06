"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState("");
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      setUser(currentUser);
    }

    const favorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    setFavoriteCount(favorites.length);
  }, []);

  function handleLogout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    window.location.href = "/login";
  }

  return (
    <nav>
      <h2>📚 Book Library</h2>

      <div className="nav-right">
        <Link href="/" className="nav-link">
          🏠 Home
        </Link>

        <Link href="/favorites" className="nav-link">
          ❤️ Favorites ({favoriteCount})
        </Link>

        <Link href="/about" className="nav-link">
          ℹ️ About
        </Link>

        <span className="user-email">
          👤 {user}
        </span>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}