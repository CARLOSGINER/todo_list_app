import { createContext, useReducer, useState, useRef, useEffect } from "react";
import { todoReducer } from "../todoReducer";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    
  const [todoListTitle, setTodoListTitle] = useState("My Todo List");
  const [text, setText] = useState("");
  const [errorFlag,setErrorFlag] = useState(false)
  const count = useRef(0); //*1
  const inputRef = useRef();
  const initialState = {
    title: todoListTitle,
    items: [
      {
        id: count.current,
        text: "first, add new tasks!",
        completed: false,
      },
    ],
  };
  const [upTodoList, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //ejecuta el dispatch despues de que todoListTitle ya cambió y esté disponible
  useEffect(() => {
    dispatch({
      type: "CHANGE_TITLE",
      payload: {
        title: todoListTitle,
      },
    });
  }, [todoListTitle]);

  const titleChange = (e) => {
    setTodoListTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text===""){
        setErrorFlag(true);
        return 
    }
    count.current++;
    dispatch({
      type: "ADD_TODO",
      payload: {
        title: todoListTitle,
        id: count.current,
        text: text,
      },
    });
    setText("");
    setErrorFlag(false);
  };

  const completeTodo = (clickedId) => {
    dispatch({
      type: "COMPLETE_TODO",
      payload: {
        title: todoListTitle,
        id: clickedId,
      },
    });
  };

  const removeTodo = (clickedId) => {
    dispatch({
      type: "REMOVE_TODO",
      payload: {
        title: todoListTitle,
        id: clickedId,
      },
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        upTodoList,
        todoListTitle,
        inputRef,
        text,
        setText,
        titleChange,
        handleSubmit,
        completeTodo,
        removeTodo,
        count,
        errorFlag
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

//NOTA 1:
// Es mejor usar useRef en vez de useState, porque nos interesa sumar 1 al ultimo ID, y necesitamos ese valor inmediatamente
// para el Dispatch. Usando "useState" el valor estaría disponible asincronamente, por lo que siempre estaría desfasado
// por uno atrás. Además da el error de Key repetida, pues el primer renderizado el id es cero, al igual que el valor
// inicial.  Es en estos casos es util el useRef que es "persistente", es decir no cambia entre renderizados.
// (cosa que pasaria definiendo una variable normalmente con <let count= 0>, volviendose a iniciar cada vez)
// y  la segunda característica, que no manda a re-renderizar el componente.   Mas info: https://dmitripavlutin.com/react-useref-guide/
