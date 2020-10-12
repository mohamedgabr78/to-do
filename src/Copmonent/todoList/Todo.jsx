import React, { useEffect, useState } from "react";
import { useTodo } from "../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "react-spring";
function Todo() {
  const { setInputs, inputs, todo, setTodo, setTodoType, todoType } = useTodo();
  const [isInputs, setIsInputs] = useState(false);
  const errorTodo = "coudnt upload new todo";
  const maxTodo = 50;
  const longTodo = inputs.length > maxTodo;
  const [toggle, set] = useState(false);
  const transitions = useTransition(toggle, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const handelTodo = (e) => {
    if (inputs.length < 50) {
      setInputs(e.target.value);
    }
  };

  const submithandelTodo = (e) => {
    e.preventDefault();
    if (inputs.length > 0) {
      let new_id = todo.length + Math.random() * 100;
      setTodo([
        ...todo,
        {
          text: inputs,
          complete: false,
          id: new_id,
        },
      ]);
      setInputs("");
    }
  };

  useEffect(() => {
    if (inputs.length > 0) {
      setIsInputs(true);
    } else {
      setIsInputs(false);
    }
  }, [inputs]);

  return (
    <div className="form-container">
      <div
        className="animation"
        onMouseEnter={() => {
          set(true);
        }}
        onMouseLeave={() => {
          set(false);
        }}
      >
        {transitions.map(({ item, key, props }) =>
          item ? (
            <animated.div style={props}>😄</animated.div>
          ) : (
            <animated.div style={props}>🤪</animated.div>
          )
        )}
      </div>
      <form onSubmit={submithandelTodo} className="todo-row">
        <input type="text" value={inputs} onChange={handelTodo} />
        {isInputs ? (
          <button type="submit">
            <FontAwesomeIcon icon={faPlus} />
            Add
          </button>
        ) : null}
      </form>
      <div className="todo-row">
        <select
          value={todoType}
          onChange={(e) => {
            setTodoType(e.target.value);
          }}
        >
          <option value="all">all</option>
          <option value="completed">completed</option>
          <option value="uncomppeted">uncomppeted</option>
        </select>
        <div>{longTodo ? errorTodo : null}</div>
        <span className="words">
          {inputs.length}/{maxTodo}
        </span>
      </div>
    </div>
  );
}

export default Todo;
