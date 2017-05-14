(function () {
  'use strict';

  angular
    .module('app')
    .controller('AppCtrl', AppCtrl);

  /* @ngInject */
  function AppCtrl() {
    console.log('hello from controller');
  }

})();