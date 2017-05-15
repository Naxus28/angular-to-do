(function() {
  'use strict';
  angular
    .module('home')
    .factory('todoService', todoService);

  function todoService($http) {
    const circleOptions = {
      size: 0,
      gradientColors: [],
      thickness: 0
    };

    let getCircleOptions = () => circleOptions;
    let getSixRandomTodos = (todoList) => _.shuffle(todoList).slice(0, 6);
    let setCircleOptions = (optionsObj) => {
      _.forIn(optionsObj, (value, key) => {
        circleOptions[key] = value;
      }); 
    };

    let getTodos = () => {
      const url = 'app/home/todos.json';
      const requestObj = { 
        method: 'GET', 
        url: url,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      return $http(requestObj);
    };

    const service = { 
      getCircleOptions,
      getSixRandomTodos,
      getTodos,
      setCircleOptions
    };

    return service;
  }
})();