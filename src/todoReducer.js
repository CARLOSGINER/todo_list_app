//argumento no destructurado sería: const todoReducer = {currentState,action} => {
export const todoReducer = ({items}, {type,payload:{id,title,text}}) => {
  switch (type) {

    case "CHANGE_TITLE": {
      return {
        title,
        items:[
          ...items 
        ]
      };
    }

    case "ADD_TODO": {
      const newTodo = {
        id,
        text,
        completed: false
      };
      return {
        title,
        items:[
          ...items,
          newTodo 
        ]
      };
    }

    case "REMOVE_TODO": {
      const filteredTodoList = items.filter((todo) => id !== todo.id); 
      return  {
        title,
        items:filteredTodoList 
      };
    }

    case "COMPLETE_TODO": {
      const updatedTodoList = items.map((todo) => {
        if (id === todo.id) {

          return {
            ...todo,
            completed: !todo.completed
          }

        } else {
          return todo;
        }
      });
      return {
        title,
        items:updatedTodoList
      };
    }
    default:
      return {
        title,
        items:[
          ...items 
        ]
      };
  }
};

export default todoReducer;
