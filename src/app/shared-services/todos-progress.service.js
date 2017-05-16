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
    let addCompletedTodo = (todo) => _completedTodos.push(todo);

    let deleteTodo = (todo) => {
      let todoIndex = _completedTodos.indexOf(todo);
      _completedTodos.splice(todoIndex, 1);
    };
    
    let getCompletedTodos = () => _completedTodos;

    let resetCompletedTodos = () => _completedTodos.length = 0;

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
    let setProgressCircleView = () => {
      let progress = getUpdatedCircleValue();
      $('#circle').circleProgress('value', progress); //updates circle value
    };

    
    let updateTodosAndSetView = (todo) => {
      if (!_completedTodos.includes(todo)) {
        addCompletedTodo(todo);
      } else {
        deleteTodo(todo);
      }
      
      setProgressCircleView();
    };

    const service = { 
      getCircleOptions,
      getCompletedTodos,
      resetCompletedTodos,
      setCircleOptions,
      setProgressCircleView,
      updateTodosAndSetView
    };

    return service; // expose API
  }
})();