import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CredentialsContext } from "../App";
import Todos from "../components/Todos";

export default function Welcome() {
  const [credentails, setCredentials] = useContext(CredentialsContext);
  const logout = () => {
    setCredentials(null);
  };

  return (
    <div>
    <br/>
    <br/>
      {credentails && <button onClick={logout}>Logout</button>}
      <h1 style={{fontSize:"3rem", color:"black"}}>Welcome {credentails && credentails.username}</h1>
      {!credentails && (
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "green", fontSize: "2rem" }}
        >
          Register
        </Link>
      )}
      <br />
      <br/>
      <br/>
      {!credentails && (
        <Link
          to="/login"
          style={{ textDecoration: "none", color: "red", fontSize: "2rem" }}
        >
          Login
        </Link>
      )}
      {credentails && <Todos />}
    </div>
  );
}
