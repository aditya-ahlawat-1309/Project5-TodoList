import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "../App";

export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const login = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
          password,
        });
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const history = useHistory();

  return (
    <div>
      <h1 style={{ fontSize: "3rem", color: "black" }}>Login</h1>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <form onSubmit={login}>
       <label style={{ fontSize: "1.5rem" }}>Username</label>
<br/>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <br />
     <br/>
<label style={{ fontSize: "1.5rem" }}>Password</label>

     <br/>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
