import React, { useState, useContext, useEffect } from "react";
import { CredentialsContext } from "../App";
import { v4 as uuidv4 } from "uuid";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [credentials] = useContext(CredentialsContext);
  const [filter, setFilter] = useState("uncompleted");

  const persist = (newTodos) => {
    fetch(`https://helpful-toad-top-coat.cyclic.app/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => {});
  };

  useEffect(() => {
    fetch(`https://helpful-toad-top-coat.cyclic.app/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { id: uuidv4(), checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoText("");
    persist(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodoList = [...todos];
    const todoItem = newTodoList.find((todo) => todo.id === id);
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList);
    persist(newTodoList);
  };

  const getTodos = () => {
    return todos.filter((todo) =>
      filter === "completed" ? todo.checked : !todo.checked
    );
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div style={{marginTop:"-5%"}}>
    <span style={{color:"red",fontSize:"1.5rem"}}>See the Todos in the Uncompleted Section</span>
      <br/>
      <select value={filter} onChange={(e) => changeFilter(e.target.value)}>
        <option value="completed" style={{ color: "black",fontSize:"1rem",borderRadius:"25px" }}>
          Completed
        </option>
        <option value="uncompleted" style={{ color: "black",fontSize:"1rem",borderRadius:"25px" }}>
          Uncompleted
        </option>
      </select>

      {getTodos().map((todo) => (
        <>
          <br />
          <div
            key={todo.id}
            style={{
              textAlign: "center",
              marginLeft: "30%",
              fontSize: "2rem",
              backgroundColor: "crimson",
              color: "white",
              width: "40%",
              borderRadius: "25px",
              display: "flex",
              padding: "10px",
            }}
          >
            <input
              checked={todo.checked}
              onChange={() => toggleTodo(todo.id)}
              type="checkbox"
              style={{
                padding: "10px",
                height: "25px",
                width: "25px",
                backgroundColor: "#eee",
              }}
            />
            <label style={{ paddingLeft: "10%" }}>{todo.text}</label>
          </div>
        </>
      ))}
      <br />
      <br />
      <form onSubmit={addTodo}>
        <input
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          type="text"
        ></input>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
