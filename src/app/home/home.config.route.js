(function () {
  'use strict';

  angular
    .module('home')
    .config(config);

  function config($stateProvider) {
    let appState = {
      name: 'home',
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'HomeCtrl as home'
    };

    $stateProvider.state(appState);
  }
})();