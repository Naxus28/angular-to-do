(function() {
  'use strict';
  angular
    .module('home')
    .factory('todoService', todoService);

  function todoService($http) {
    const gradientColors = ['green', 'blue'];
    const service = { 
      getTodos,
      gradientColors
    };

    return service;

    ///////////////////
    function getTodos() {
      const url = 'app/home/todos.json';
      const requestObj = { 
        method: 'GET', 
        url: url,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      return $http(requestObj);
    }
  }
})();