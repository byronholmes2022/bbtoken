import React from "react";
import BookCard from "./BookCard";

function BookCardList({ books }) {
  return (
    <div className="book-card-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookCardList;
