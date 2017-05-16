(function () {
  'use strict';
  
  angular.module('todoApp', [
    /**
     * external libraries
     */
    'ui.router',

    /**
     * main modules
     */
    'home',
    'error',

    /**
     * directives
     */
    'directives',

    /**
     * services
     */
    'services'
  ]);
})();