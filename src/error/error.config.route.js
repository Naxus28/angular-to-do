(function () {
  'use strict';

  angular
    .module('error')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('error', {
        url: '/error',
        templateUrl: 'error/error.html',
        controller: 'ErrorController as error'
      });
  }
})();