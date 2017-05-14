(function () {
  'use strict';

  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);

  /* @ngInject */
  function HomeCtrl(todoService) {
    let vm = this;
    vm.todos = '';
    todoService.getTodos().then( response => vm.todos = response.data.todos);
  }

})();