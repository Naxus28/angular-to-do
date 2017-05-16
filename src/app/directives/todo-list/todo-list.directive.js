(function() {
  'use strict';
  angular
    .module('todoList')
    .directive('todoListDirective', todoListDirective);

  function todoListDirective (todoService) {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      link: link,
      templateUrl: 'app/directives/todo-list/todo-list.html'
    };

    function link(scope) {
      scope.completedTodos = todoService.getCompletedTodos();
    }
  }
})();