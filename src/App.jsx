import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Account from "./components/Account";
import Books from "./components/Books";
import Login from "./components/Login";
import Navigations from "./components/Navigations";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook";
import bookLogo from "./assets/books.png";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
  }, []);
  return (
    <>
      <h1>
        <img id="logo-image" src={bookLogo} />
        Bookbuddy
      </h1>
      <Navigations token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} token={token} />}
        />
        <Route
          path="/register"
          element={<Register setToken={setToken} token={token} />}
        />
        <Route path="/book/:id" element={<SingleBook token={token} />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Account token={token} />} />
        </Route>

        <Route path="*" element={<Books />} />
      </Routes>
    </>
  );
}

export default App;
