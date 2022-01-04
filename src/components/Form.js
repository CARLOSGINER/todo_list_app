import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export default function Form() {
  const { todoListTitle,titleChange,text,setText,handleSubmit,inputRef } = useContext(GlobalContext);

  return (
    <>
      <input
        className="todoListTitle"
        value={todoListTitle}
        onChange={(e) => titleChange(e)}
      />
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="todoInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn" type="submit">
          +
        </button>
      </form>
    </>
  );
}
