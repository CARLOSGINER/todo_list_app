import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export default function List() {
  const { upTodoList, completeTodo, removeTodo, count } = useContext(GlobalContext);

  return (
    <>
      <div className="todoList">
        {upTodoList.items.map((todo) => (
          <div key={todo.id} className="todo">
            <p className={todo.completed ? "completed" : undefined}>
              {todo.text}
            </p>
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
    </>
  );
}
