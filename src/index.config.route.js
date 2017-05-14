(function () {
  'use strict';

  angular
    .module('todoApp')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/404');
  }
})();