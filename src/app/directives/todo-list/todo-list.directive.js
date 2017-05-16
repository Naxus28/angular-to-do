(function() {
  'use strict';
  angular
    .module('todoList')
    .directive('todoListDirective', todoListDirective);

  /* @nginject */
  function todoListDirective (todosProgressService) {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      link: link,
      templateUrl: 'app/directives/todo-list/todo-list.html'
    };

    function link(scope) {
      scope.todos = todosProgressService.getCompletedTodos();

      console.log(todosProgressService.getCompletedTodos());
    }
  }
})();