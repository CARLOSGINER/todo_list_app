const todoReducer = (todoList, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo = {
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      };
      return [...todoList, newTodo];
    }

    case "REMOVE_TODO": {
      return todoList.filter((todo) => action.payload.id !== todo.id);
    }

    case "COMPLETE_TODO": {
      const updatedTodoList = todoList.map((todo) => {
        if (action.payload.id === todo.id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        } else {
          return todo;
        }
      });
      return updatedTodoList;
    }
    default:
      return todoList;
  }
};

export default todoReducer;
