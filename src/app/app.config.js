(function () {
  'use strict';

  angular
    .module('todoApp')
    .config(config);

  /* @ngInject */
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/app/app.html',
        controller: 'AppController as app'
      })
      .state('error', {
        url: '/error',
        templateUrl: 'src/app/error.html',
        controller: 'ErrorController as error'
      });

    $urlRouterProvider.otherwise('/error');
  }
})();