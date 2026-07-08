import Link from "next/link";

export default async function BookPage(props) {
  const params = await props.params;
  const id = params.id;

  const response = await fetch(
    `https://gutendex.com/books/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return <h1>Book not found.</h1>;
  }

  const book = await response.json();

  const image =
    book.formats["image/jpeg"]?.replace("http://", "https://") || "";

  const htmlBook =
    book.formats["text/html"] ||
    book.formats["text/html; charset=utf-8"];

  return (
    <div className="book-details">
      <Link href="/">⬅ Back</Link>

      <h1>{book.title}</h1>

      {image && <img src={image} alt={book.title} width={250} />}

      <p>
        Author: {book.authors?.[0]?.name || "Unknown Author"}
      </p>

      {htmlBook && (
        <a
          href={htmlBook}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>📖 Read Online</button>
        </a>
      )}
    </div>
  );
}