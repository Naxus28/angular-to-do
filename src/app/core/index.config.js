(function () {
  'use strict';

  angular
    .module('todoApp')
    .config(config);

  function config($logProvider, $locationProvider, $qProvider) {
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);
    $qProvider.errorOnUnhandledRejections(false);
  }
})();




    