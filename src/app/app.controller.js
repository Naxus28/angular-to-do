(function () {
  'use strict';

  angular
    .module('todoApp')
    .controller('AppController', AppController);

  /* @ngInject */
  function AppController() {
    console.log('hello from controller');
  }

})();