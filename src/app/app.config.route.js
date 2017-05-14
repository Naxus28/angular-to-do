(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    let appState = {
      name: 'home',
      url: '/home',
      templateUrl: 'app/app.html',
      controller: 'AppCtrl as app'
    };

    $stateProvider.state(appState);
  }
})();