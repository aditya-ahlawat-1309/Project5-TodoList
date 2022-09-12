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
      <br />
      <br />
      {credentails && <button onClick={logout}>Logout</button>}
      <h1 style={{ color: "white", fontSize: "5rem" }}>
        Welcome {credentails && credentails.username}
      </h1>

      {!credentails && (
        <div>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "3rem",
              marginRight: "25%",
            }}
          >
            Login
          </Link>
          
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "white", fontSize: "3rem" }}
          >
            Register
          </Link>
        </div>
      )}
      <br />
      <br />
      <br />
      {/* {!credentails && (
      
      )} */}
      {credentails && <Todos />}
    </div>
  );
}
