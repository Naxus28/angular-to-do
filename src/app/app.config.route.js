(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  function config($stateProvider) {
    let appState = {
      name: 'home',
      url: '/',
      templateUrl: 'app/app.html',
      controller: 'AppCtrl as app'
    };

    $stateProvider.state(appState);
  }
})();