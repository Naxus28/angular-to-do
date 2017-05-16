(function() {
  'use strict';
  angular
    .module('circleProgress')
    .directive('circleProgressDirective', circleProgressDirective);

  function circleProgressDirective (todoService, $timeout) {
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

      todoService.setCircleOptions(defaultCircleOptions);
      
      let circleOptions = todoService.getCircleOptions();

       /**
        * needs to be asynchronous so jquery-circle-progress has time to initialize 
        * in case we want the circle to initialize with value > 0
        */
      let setCircle = () => $('#circle').circleProgress(circleOptions);
      $timeout(setCircle, 0);

      /**
       * watch parent scope and update the directive's template with new values
       */
      scope.$watchGroup(['todo.active', 'todo.item'], () => scope.todo && todoService.updateTodosAndSetView(scope));
      scope.$watch('resetTodos', (newValue, oldValue) => {
        if (newValue === oldValue) {
          return;
        }

        todoService.resetCompletedTodos(); 
        todoService.setView(scope); 
      });
    }
  }
})();