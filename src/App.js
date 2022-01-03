import { useRef, useEffect, useReducer, useState } from "react";
import todoReducer from "./todoReducer";
import "./styles.css";

const App = () => {
  const [text, setText] = useState("");
  const [todoListTitle, setTodoListTitle] = useState("My Todo List")
  //* nota 1
  const count = useRef(0);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const initialState = 
    {
    title:todoListTitle,
    items:[
      {
        id: count.current,
        text: "first, add new tasks!",
        completed: false
      }   
    ]
    }
  ;
  const [upTodoList, dispatch] = useReducer(todoReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    count.current++;
    dispatch({
      type: "ADD_TODO",
      payload: {
        title:todoListTitle,
        id: count.current,
        text: text
      }
    });
    setText("");
  };

  const completeTodo = (clickedId) => {
    dispatch({
      type: "COMPLETE_TODO",
      payload: {
        title:todoListTitle,
        todoListTitle,
        id: clickedId
      }
    });
  };

  const removeTodo = (clickedId) => {
    count.current--;
    dispatch({
      type: "REMOVE_TODO",
      payload: {
        title:todoListTitle,
        id: clickedId
      }
    });
  };

  const titleChange= (e) => {
    setTodoListTitle(e.target.value)  
  }

  //ejecuta el dispatch despues de que todoListTitle ya cambió y esté disponible
  useEffect(()=>{
    dispatch({
      type:"CHANGE_TITLE",
      payload:{
        title:todoListTitle
      }
    })
  },[todoListTitle])

  return (
    <div className="App">
      <input 
        className="todoListTitle" 
        value={todoListTitle}
        onChange={(e)=>titleChange(e)}
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
    </div>
  );
};

export default App;


//NOTA 1:
// Es mejor usar useRef en vez de useState, porque nos interesa sumar 1 al ultimo ID, y necesitamos ese valor inmediatamente
// para el Dispatch. Usando "useState" el valor estaría disponible asincronamente, por lo que siempre estaría desfasado
// por uno atrás. Además da el error de Key repetida, pues el primer renderizado el id es cero, al igual que el valor
// inicial.  Es en estos casos es util el useRef que es "persistente", es decir no cambia entre renderizados.
// (cosa que pasaria definiendo una variable normalmente con <let count= 0>, volviendose a iniciar cada vez)
// y  la segunda característica, que no manda a re-renderizar el componente.   Mas info: https://dmitripavlutin.com/react-useref-guide/
