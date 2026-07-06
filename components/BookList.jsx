import Link from "next/link";

export default function BookCard({
  title,
  author,
  id,
  coverId,
}) {
  return (
    <Link href={`/book/${id}`}>
      <div className="book-card">
        {coverId ? (
          <img
            src={coverId}
            alt={title}
          />
        ) : (
          <img
            src="https://via.placeholder.com/200x300?text=No+Cover"
            alt="No cover"
          />
        )}

        <h3>{title}</h3>
        <p>Author: {author || "Unknown Author"}</p>
      </div>
    </Link>
  );
}