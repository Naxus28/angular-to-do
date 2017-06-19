(function() {
  'use strict';
  angular
    .module('services')
    .factory('simpleListService', simpleListService);

  /* @ngInject */
  function simpleListService($http) {

    let getTodos = () => {
      const url = 'app/data/simpleList.json';
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
      getTodos
    };

    return service;
  }
})();