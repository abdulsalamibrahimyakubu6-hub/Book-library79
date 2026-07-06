"use client";

import Link from "next/link";

export default function BookCard({
  title,
  author,
  id,
  coverId,
}) {
  const imageUrl = coverId?.replace("http://", "https://");

  function addToFavorites(e) {
    e.preventDefault();

    const book = {
      id,
      title,
      author,
      coverId: imageUrl,
    };

    const favorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    const exists = favorites.find(
      (item) => item.id === id
    );

    if (!exists) {
      favorites.push(book);

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      alert("❤️ Book added to Favorites!");
    } else {
      alert("📚 Book is already in Favorites.");
    }
  }

  return (
    <div className="book-card">
      <Link href={`/book/${id}`}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
          />
        )}

        <h3>{title || "Untitled"}</h3>

        <p>
          Author: {author || "Unknown Author"}
        </p>
      </Link>

      <button
        className="favorite-btn"
        onClick={addToFavorites}
      >
        ❤️ Add to Favorites
      </button>
    </div>
  );
}