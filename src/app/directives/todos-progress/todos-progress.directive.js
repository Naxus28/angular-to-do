(function() {
  'use strict';
  angular
    .module('todosProgress')
    .directive('todosProgress', todosProgress);

  function todosProgress (todosProgressService) {
    let circleProgressObj = {
      restrict: 'E',
      replace: true,
      scope: {
        size: '@',
        thickness: '@',
        gradient: '=',
        todo: '=',
        resetTodos: '='
      },
      link: link,
      templateUrl: 'app/directives/todos-progress/todos-progress.html'
    };
    
    return circleProgressObj;

    function link(scope) {
      let defaultCircleOptions = {
        size: scope.size,
        thickness: scope.thickness,
        fill: {
          gradient: scope.gradient
        }
      };

      todosProgressService.setCircleOptions(defaultCircleOptions);
      
      let circleOptions = todosProgressService.getCircleOptions();

      $('#circle').circleProgress(circleOptions);

      /**
       * watch parent scope and update the directive's template with new values
       */
      scope.$watchGroup(['todo.active', 'todo.item'], () => scope.todo && todosProgressService.updateTodosAndSetView(scope.todo));
      scope.$watch('resetTodos', () => {
        todosProgressService.resetCompletedTodos(); 
        todosProgressService.setView(scope); 
      });
    }
  }
})();