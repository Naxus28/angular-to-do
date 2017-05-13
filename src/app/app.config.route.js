(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/app.html',
        controller: 'AppController as app'
      });
  }
})();