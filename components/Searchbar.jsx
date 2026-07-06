"use client";

import { useState } from "react";

export default function Searchbar({ searchBooks }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (query.trim() !== "") {
      searchBooks(query);
    }
  }

  return (
    <form
      className="search-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

