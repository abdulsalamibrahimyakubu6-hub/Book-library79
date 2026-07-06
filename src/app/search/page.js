import Link from "next/link";

export default function SearchPage() {
  return (
    <div className="about">
      <h1>Search Books</h1>
      <p>Use the home page search to find books by title, author, or subject.</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
