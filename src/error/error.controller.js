(function () {
  'use strict';

  angular
    .module('todoApp')
    .controller('ErrorController', ErrorController);

  /* @ngInject */
  function ErrorController() {
    console.log('hello from ErrorController');
  }

})();