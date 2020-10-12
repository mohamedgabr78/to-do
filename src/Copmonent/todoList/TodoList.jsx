import React, { useEffect, useState } from "react";
import { useTodo } from "../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

function TodoList() {
  const { todo, setTodo, todoType } = useTodo();
  const [renderedTodo, setRenderedTodo] = useState(todo);
  const deleteTodoItemUsingIndex = (index) => {
    let tempTodo = [...todo];
    tempTodo.splice(index, 1);
    setTodo(tempTodo);
  };
  const handleComplete = (index) => {
    let tempTodo = [...todo];
    tempTodo[index] = {
      ...tempTodo[index],
      complete: true,
    };
    setTodo(tempTodo);
  };
  useEffect(() => {
    if (todoType === "all") {
      setRenderedTodo(todo);
    } else if (todoType === "completed") {
      let tempTodo = [...todo];
      tempTodo = tempTodo.filter((todoItem) => todoItem.complete === true);
      setRenderedTodo(tempTodo);
    } else if (todoType === "uncomppeted") {
      let tempTodo = [...todo];
      tempTodo = tempTodo.filter((el) => el.complete === false);
      setRenderedTodo(tempTodo);
    }
  }, [todoType, todo]);

  return (
    <div className="list-container">
      {renderedTodo &&
        renderedTodo.length > 0 &&
        renderedTodo.map((todoItem, index) => {
          return (
            <div className={`todo-box ${todoItem.complete ? "complete" : ""}`}>
              <div className="text">{todoItem.text}</div>
              <div className="todo-btn-container">
                {!todoItem.complete && (
                  <input
                    className="todo-checkbox"
                    type="checkbox"
                    onChange={() => {
                      handleComplete(index);
                    }}
                  />
                )}
                <button
                  className="todo-btn"
                  onClick={() => {
                    deleteTodoItemUsingIndex(index);
                  }}
                >
                  <FontAwesomeIcon icon={faMinus} />
                  delete
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default TodoList;
