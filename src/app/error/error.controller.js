(function () {
  'use strict';

  angular
    .module('error')
    .controller('ErrorCtrl', ErrorCtrl);

  /* @ngInject */
  function ErrorCtrl() {
    console.log('hello from ErrorCtrl');
  }

})();