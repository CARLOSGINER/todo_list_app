import { useReducer, useState } from "react";
import todoReducer from "./todoReducer";
import "./styles.css";

const App = () => {
  const [text, setText] = useState("");
  const [lastId, setLastId] = useState(0);
  const initialState = [
    {
      id: lastId,
      text: "first, add new tasks!",
      completed: false
    }
  ];
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLastId((prev) => prev + 1);
    dispatch({
      type: "ADD_TODO",
      payload: {
        id: lastId,
        text: text
      }
    });
    setText("");
  };

  const completeTodo = (clickedId) => {
    dispatch({
      type: "COMPLETE_TODO",
      payload: {
        id: clickedId
      }
    });
  };

  const removeTodo = (clickedId) => {
    dispatch({
      type: "REMOVE_TODO",
      payload: {
        id: clickedId
      }
    });
  };

  return (
    <div className="App">
      <h2>My Todo List</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="todoInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn" type="submit">
          +
        </button>
      </form>
      <div className="todoList">
        {state.map((todo) => (
          <div key={todo.id} className="todo">
            <p className={todo.completed && "completed"}>{todo.text}</p>
            <div className="check_close">
              <span className="check" onClick={() => completeTodo(todo.id)}>
                ✔
              </span>
              <span className="close" onClick={() => removeTodo(todo.id)}>
                ✖
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
