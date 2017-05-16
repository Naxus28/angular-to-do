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
        * needs to be asynchronous so jquery-circle-progress has time to initialize when initial circle value is > 0
        */
      let setCircle = () => $('#circle').circleProgress(circleOptions);
      $timeout(setCircle, 0);

      /**
       * optional watch if we need to trigger behavior and update the directive's inner state based on parent's scope 
       */
      scope.$watchGroup(['todo.active', 'todo.item'], () => scope.todo && todoService.updateTodosAndSetView(scope.todo));
      scope.$watch('resetTodos', (newValue, oldValue) => {
        if (newValue === oldValue) {
          return;
        }

        todoService.resetCompletedTodos(); 
        todoService.setProgressCircleView(); 
      });
    }
  }
})();