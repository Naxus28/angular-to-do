(function () {
  'use strict';
  
  angular.module('todoApp', [
    /**
     * external libraries
     */
    'ui.router',

    /**
     * directives
     */
    'directives',

    /**
     * main modules
     */
    'home',
    'error'
  ]);
})();