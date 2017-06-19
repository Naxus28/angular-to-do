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
    'simpleList',
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