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
    fetch(`https://todo-aditya0183.herokuapp.com/login`, {
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
      <h1 style={{ fontSize: "5rem", color: "white" }}>Login</h1>
      {error ? (
        <span style={{ color: "red", fontSize: "2.5rem" }}>{error}</span>
      ) : (
        <span style={{ color: "red", fontSize: "2.5rem" }}>Please Wait</span>
      )}
      <br />
      <br />
      <br />
      <form onSubmit={login}>
        <label style={{ fontSize: "1.5rem", color: "white" }}>Username</label>
        <br />
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          style={{ borderRadius: "25px" }}
        />
        <br />
        <br />
        <label style={{ fontSize: "1.5rem", color: "white" }}>Password</label>

        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          style={{ borderRadius: "25px" }}
        />
        <br />
        <br />
        <button type="submit">Login</button>
        <br/>
        <br/>
        <a href="/register" style={{color:"yellow",textDecoration:"none"}}>Wanna Register?</a>
      </form>
    </div>
  );
}
