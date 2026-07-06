"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    setFavorites(savedBooks);
  }, []);

  function removeFavorite(id) {
    const updatedBooks = favorites.filter(
      (book) => book.id !== id
    );

    setFavorites(updatedBooks);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedBooks)
    );
  }

  return (
    <div className="favorites-page">
      <h1>❤️ My Favorite Books</h1>

      {favorites.length === 0 ? (
        <p>No favorite books yet.</p>
      ) : (
        <div className="book-container">
          {favorites.map((book) => (
            <div
              key={book.id}
              className="book-card"
            >
              <img
                src={book.coverId}
                alt={book.title}
              />

              <h3>{book.title}</h3>

              <p>
                Author: {book.author}
              </p>

              <Link href={`/book/${book.id}`}>
                <button className="read-btn">
                  📖 Read Book
                </button>
              </Link>

              <button
                className="remove-btn"
                onClick={() =>
                  removeFavorite(book.id)
                }
              >
                🗑 Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}