(function() {
  'use strict';
  angular
    .module('todosProgress')
    .factory('todosProgressService', todosProgressService);

  /* @ngInject */
  function todosProgressService() {
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

    let resetCompletedTodos = () =>_completedTodos = [];

    /**
     * progress circle methods
     */
    let getCircleOptions = () => _circleOptions;
    
    let getupdatedCircleValue = () => {
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
    let setTodoListView = (scope) => scope.completedTodos = _completedTodos;

    let setProgressCircleView = () => {
      let progress = getupdatedCircleValue();
      $('#circle').circleProgress('value', progress); //updates circle value
    };
    
    let setView = (scope) => {
      setTodoListView(scope); 
      setProgressCircleView();
    };
    
    let updateTodosAndSetView = (todo) => {
      if (!_completedTodos.includes(todo)) {
        addCompletedTodo(todo);
      } else {
        deleteTodo(todo);
      }
      
      setView(todo);
    };

    const service = { 
      getCircleOptions,
      getCompletedTodos,
      resetCompletedTodos,
      setCircleOptions,
      setView,
      updateTodosAndSetView
    };

    return service; // expose API
  }
})();