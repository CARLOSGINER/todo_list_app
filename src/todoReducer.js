export const todoReducer = (todoList, action) => {
  switch (action.type) {

    case "CHANGE_TITLE": {
      return {
        title:action.payload.title,
        items:[
          ...todoList.items 
        ]
      };
    }

    case "ADD_TODO": {
      const newTodo = {
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      };
      return {
        title:action.payload.title,
        items:[
          ...todoList.items,
          newTodo 
        ]
      };
    }

    case "REMOVE_TODO": {
      const filteredTodoList = todoList.items.filter((todo) => action.payload.id !== todo.id); 
      return  {
        title:action.payload.title,
        items:filteredTodoList 
      };
    }

    case "COMPLETE_TODO": {
      const updatedTodoList = todoList.items.map((todo) => {
        if (action.payload.id === todo.id) {

          return {
            ...todo,
            completed: !todo.completed
          }

        } else {
          return todo;
        }
      });
      return {
        title:action.payload.title,
        items:updatedTodoList
      };
    }
    default:
      return todoList;
  }
};

export default todoReducer;
