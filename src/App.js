import React, { useState } from "react";
import "./App.scss";
import { todoContext } from "./Copmonent/Context";
import TodoList from "./Copmonent/todoList/TodoList";
import Todo from "./Copmonent/todoList/Todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [inputs, setInputs] = useState("");
  const [todo, setTodo] = useState([]);
  const [todoType, setTodoType] = useState("all");
  const [min, setMin] = useState(0);
  const [error, setError] = useState("error");

  return (
    <div className="App">
      <marquee behavior="alternate">
        <div className="header">
          <h1>gabr♦Todo</h1>
        </div>
      </marquee>
      <todoContext.Provider
        value={{
          inputs,
          setInputs,
          todo,
          setTodo,
          todoType,
          setTodoType,
        }}
      >
        <div className="main-container">
          <Todo icon={faPlus} />
          <TodoList faMinus={faMinus} />
        </div>
      </todoContext.Provider>
    </div>
  );
}

export default App;
