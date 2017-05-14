(function () {
  'use strict';

  angular
    .module('error')
    .config(config);

  function config($stateProvider) {
    let errorState = {
      name: 'error',
      url: '/404',
      templateUrl: 'error/error.html',
      controller: 'ErrorCtrl as error'
    };

    $stateProvider.state(errorState);
  }
})();