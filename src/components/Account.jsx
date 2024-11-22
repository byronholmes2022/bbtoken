import React, { useEffect, useState } from "react";
import axios from "axios";

function Account({ token }) {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios(`${import.meta.env.VITE_API_BASE_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data) => {
        console.log(data);
        setUser(data.data);
        setBooks(data.data.books);
      })
      .catch((err) => console.log(err));
  }, [token]);

  const handleReturnBook = async (id) => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/reservations/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (result.data.deletedReservation) {
        const bookData = await axios(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBooks(bookData.data.books);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>My Account</h2>
      <p>
        {user?.firstname} {user?.lastname}
      </p>
      <p>{user?.email}</p>
      {books.map((book) => (
        <div
          className="book-card"
          key={book.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>{book.title}</h2>
          <img src={book.coverimage} alt={book.title} />
          <button onClick={() => handleReturnBook(book.id)}>Return Book</button>
        </div>
      ))}
    </div>
  );
}

export default Account;
