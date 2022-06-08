import React, { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import ToDoPage from "./components/Todos"
export const CredentialsContext = React.createContext();
function App() {
    const credentialsState = useState(null);
  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <Route path="/" component={Welcome} exact />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/toDoPage" component={ToDoPage} />
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
