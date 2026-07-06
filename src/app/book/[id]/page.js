import Link from "next/link";

export default async function BookPage({ params }) {
  console.log("Params:", params);

  const { id } = await params;

  console.log("Book ID:", id);


  const response = await fetch(
    `https://gutendex.com/books/${id}`
  );

  if (!response.ok) {
    return (
      <div className="book-details">
        <h1>📚 Book not found</h1>
        <p>Unable to load this book.</p>

        <Link href="/" className="read-btn">
          🏠 Back Home
        </Link>
      </div>
    );
  }

  const book = await response.json();

  const imageUrl = book.formats["image/jpeg"];
  const author =
    book.authors?.[0]?.name || "Unknown Author";

  const language =
    book.languages?.join(", ").toUpperCase() || "N/A";

  const downloads = book.download_count || 0;

  const readLink =
    book.formats["text/html"] ||
    book.formats["application/epub+zip"] ||
    book.formats["application/pdf"];

  return (
    <div className="book-details">

      <h1>{book.title}</h1>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={book.title}
          className="details-image"
        />
      )}

      <div className="book-info">

        <p>
          <strong>✍️ Author:</strong> {author}
        </p>

        <p>
          <strong>🌍 Language:</strong> {language}
        </p>

        <p>
          <strong>⬇️ Downloads:</strong> {downloads}
        </p>

      </div>

      {readLink ? (
        <a
          href={readLink}
          target="_blank"
          rel="noopener noreferrer"
          className="read-btn"
        >
          📖 Read Book
        </a>
      ) : (
        <p>No online version available.</p>
      )}

      <br />
      <br />

      <Link href="/" className="read-btn">
        🏠 Back Home
      </Link>

    </div>
  );
}
