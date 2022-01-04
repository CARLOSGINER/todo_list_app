//argumento no destructurado sería: const todoReducer = {currentState,action} => {
export const todoReducer = ({items}, {type,payload:{id,title,text}}) => {
  switch (type) {

    case "CHANGE_TITLE": {
      return {
        title:title,
        items:[
          ...items 
        ]
      };
    }

    case "ADD_TODO": {
      const newTodo = {
        id: id,
        text: text,
        completed: false
      };
      return {
        title:title,
        items:[
          ...items,
          newTodo 
        ]
      };
    }

    case "REMOVE_TODO": {
      const filteredTodoList = items.filter((todo) => id !== todo.id); 
      return  {
        title:title,
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
        title:title,
        items:updatedTodoList
      };
    }
    default:
      return {
        title:title,
        items:[
          ...items 
        ]
      };
  }
};

export default todoReducer;
