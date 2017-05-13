(function () {
  'use strict';

  angular
    .module('todoApp')
    .config(config);

  function config($logProvider, $locationProvider, $rootScopeProvider, $qProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $locationProvider.html5Mode(true);

    $rootScopeProvider.digestTtl(12);

    $qProvider.errorOnUnhandledRejections(false);
  }
})();




    