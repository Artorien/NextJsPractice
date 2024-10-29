"use client";

import { useEffect, useState } from "react";
import { MyBooks } from "@/lib/data";
import Link from "next/link";

export default function Books() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    setBooks(await MyBooks());
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      {books != null ? (
        books.map((book, index) => <p></p>)
      ) : (
        <div>
          <p>No books found...</p>
          <Link href={"/shop"}>
            <button>Buy now</button>
          </Link>
        </div>
      )}
    </div>
  );
}
