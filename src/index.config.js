(function () {
  'use strict';

  angular
    .module('todoApp')
    .config(config);

  function config($logProvider, $locationProvider, $qProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $locationProvider.html5Mode(true).hashPrefix('!');

    $qProvider.errorOnUnhandledRejections(false);
  }
})();




    