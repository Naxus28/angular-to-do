(function() {
  'use strict';
  angular
    .module('services')
    .factory('todoService', todoService);

  function todoService() {
    let _completedTodos = []; // holds todos state

    let addTodo = (todo) => _completedTodos.push(todo);

    let deleteTodo = (todo) => {
      let todoIndex = _completedTodos.indexOf(todo);
      _completedTodos.splice(todoIndex, 1);
    };
    
    let getTodos = () => _completedTodos;

    let resetTodos = () => _completedTodos.length = 0;

    let toggleTodo = (todo) => {
      if (!_completedTodos.includes(todo)) {
        addTodo(todo);
      } else {
        deleteTodo(todo);
      }
    };

    const service = { 
      getTodos,
      resetTodos,
      toggleTodo
    };

    return service; // expose API
  }
})();