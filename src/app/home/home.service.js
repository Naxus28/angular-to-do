(function() {
  'use strict';
  angular
    .module('home')
    .factory('todoService', todoService);

  function todoService($http) {
    const service = { getTodos };

    return service;

    ///////////////////
    function getTodos() {
      const url = 'app/home/todos.json';
      const requestObj = { method: 'GET', url: url };
      
      return $http(requestObj).then(data => data, err => err);
    }
  }
})();