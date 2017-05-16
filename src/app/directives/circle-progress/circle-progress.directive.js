(function() {
  'use strict';
  angular
    .module('circleProgress')
    .directive('circleProgressDirective', circleProgressDirective);

  function circleProgressDirective (todosProgressService, $timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        value: '@?',
        size: '@',
        thickness: '@',
        gradient: '=',
        todo: '=?',
        resetTodos: '=?'
      },
      link: link,
      templateUrl: 'app/directives/circle-progress/circle-progress.html'
    };
    
    function link(scope) {
      let defaultCircleOptions = {
        value: scope.value || 0,
        size: scope.size,
        thickness: scope.thickness,
        fill: {
          gradient: scope.gradient
        }
      };

      todosProgressService.setCircleOptions(defaultCircleOptions);
      
      let circleOptions = todosProgressService.getCircleOptions();

       /**
        * needs to be asynchronous so jQuery has time to load in case we initialize 
        * the circle with value > 0
        */
      let setCircle = () => $('#circle').circleProgress(circleOptions);
      $timeout(setCircle, 0);

      /**
       * watch parent scope and update the directive's template with new values
       */
      scope.$watchGroup(['todo.active', 'todo.item'], () => scope.todo && todosProgressService.updateTodosAndSetView(scope));
      scope.$watch('resetTodos', (newValue, oldValue) => {
        if (newValue === oldValue) {
          return;
        }

        todosProgressService.resetCompletedTodos(); 
        todosProgressService.setView(scope); 
      });
    }
  }
})();