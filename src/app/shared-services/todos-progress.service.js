(function() {
  'use strict';
  angular
    .module('sharedServices')
    .factory('todoService', todoService);

  function todoService() {
    let _completedTodos = []; // holds todos state
    let _circleOptions = {}; // holds circle options state

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

    /**
     * progress circle methods
     */
    let getCircleOptions = () => _circleOptions;
    
    let getUpdatedCircleValue = () => {
      let completedTodos = getCompletedTodos();
      let progress = completedTodos.length === 6 ? 1 : completedTodos.length / 6;

      return progress;
    };

    let setCircleOptions = (optionsObj) => {
      _circleOptions = _.cloneDeep(optionsObj);
    };

    /**
     * DOM methods
     */
    let updateProgressCircle = () => {
      let progress = getUpdatedCircleValue();
      $('#circle').circleProgress('value', progress); //updates circle value
    };

   

    const service = { 
      getCircleOptions,
      getCompletedTodos,
      resetCompletedTodos,
      setCircleOptions,
      updateProgressCircle,
      toggleTodo
    };

    return service; // expose API
  }
})();