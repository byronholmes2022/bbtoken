import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register({ setToken, token }) {
  const [newUserData, setNewUserData] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUserData.password && newUserData.email) {
      axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/register`,
          newUserData
        )
        .then((data) => {
          console.log(data.data.token);
          setToken(data.data.token);
          localStorage.setItem("token", data.data.token);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleInput = (e) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  if (token) {
    navigate("/account");
  }
  return (
    <div className="register-container">
      <h2>Register Here</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstname" onChange={handleInput} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastname" onChange={handleInput} />
        </label>
        <label>
          Email:
          <input type="email" name="email" onChange={handleInput} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handleInput} />
        </label>
        <button>Register Now!</button>
      </form>
    </div>
  );
}

export default Register;
