(function() {
  'use strict';
  angular
    .module('services')
    .factory('todoService', todoService);

  function todoService() {
    let _completedTodos = []; // holds todos state

    /**
     * todos methods
     */
    let addTodo = (todo) => _completedTodos.push(todo);

    let deleteTodo = (todo) => {
      let todoIndex = _completedTodos.indexOf(todo);
      _completedTodos.splice(todoIndex, 1);
    };
    
    let getCompletedTodos = () => _completedTodos;

    let resetCompletedTodos = () => _completedTodos.length = 0;

    let toggleTodo = (todo) => {
      if (!_completedTodos.includes(todo)) {
        addTodo(todo);
      } else {
        deleteTodo(todo);
      }
    };

    const service = { 
      getCompletedTodos,
      resetCompletedTodos,
      toggleTodo
    };

    return service; // expose API
  }
})();