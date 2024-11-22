import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function SingleBook({ token }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  useEffect(() => {
    axios(`${import.meta.env.VITE_API_BASE_URL}/api/books/${id}`)
      .then((data) => {
        console.log(data);
        setBook(data.data.book);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCheckout = async () => {
    try {
      const data = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/books/${id}`,
        { available: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data);
      if (data.data.book) {
        setBook(data.data.book);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single-book-container">
      <h2>{book?.title}</h2>
      <img src={book?.coverimage} alt={book?.title} />
      <p>{book?.description}</p>
      <p>
        {!token && (
          <>
            <Link to="/login">Login</Link> to check out this book
          </>
        )}
        {token &&
          (book?.available ? (
            <button onClick={handleCheckout}>Checkout book</button>
          ) : (
            <p>Book Checked Out</p>
          ))}
      </p>
    </div>
  );
}

export default SingleBook;
