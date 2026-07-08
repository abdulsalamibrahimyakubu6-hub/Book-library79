"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BookCard from "../../components/BookCard";
import Navbar from "../../components/Navbar";
import Searchbar from "../../components/Searchbar";
import Footer from "../../components/Footer";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");

    if (!user) {
      router.push("/login");
    }
  }, [router]);

  async function searchBooks(query) {
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `https://gutendex.com/books?search=${encodeURIComponent(query)}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books.");
      }

      const data = await response.json();
      setBooks(data.results || []);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch books.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Navbar />

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Hero Section */}
      <div className="hero">
        <h1>📚 Welcome to Book Library</h1>

        <p>
          Discover thousands of free books, search by title, and enjoy reading
          online anytime.
        </p>

        <Searchbar searchBooks={searchBooks} />
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature-card">
          <h3>📚 70,000+ Books</h3>
          <p>Search thousands of classic books from the Gutendex Library.</p>
        </div>

        <div className="feature-card">
          <h3>📖 Read Online</h3>
          <p>Open books instantly and enjoy reading directly in your browser.</p>
        </div>

        <div className="feature-card">
          <h3>🌙 Dark Mode</h3>
          <p>
            Switch between light and dark themes for a comfortable reading
            experience.
          </p>
        </div>

        <div className="feature-card">
          <h3>🔒 Secure Login</h3>
          <p>Login securely before accessing your personal library.</p>
        </div>
      </div>

      {/* Books */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : books.length > 0 ? (
        <div className="book-container">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.authors?.[0]?.name || "Unknown Author"}
              coverId={book.formats?.["image/jpeg"] || ""}
            />
          ))}
        </div>
      ) : (
        searched && (
          <p style={{ textAlign: "center" }}>No books found.</p>
        )
      )}

      <Footer />
    </div>
  );
}