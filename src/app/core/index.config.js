(function () {
  'use strict';

  angular
    .module('todoApp')
    .config(config);

  function config($logProvider, $locationProvider) {
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);
  }
})();




    