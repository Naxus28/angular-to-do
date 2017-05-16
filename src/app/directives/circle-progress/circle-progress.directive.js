(function() {
  'use strict';
  angular
    .module('circleProgress')
    .directive('circleProgressDirective', circleProgressDirective);

  function circleProgressDirective (circleProgressService, todoService, $timeout) {
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

      circleProgressService.setCircleOptions(defaultCircleOptions);
      
      let circleOptions = circleProgressService.getCircleOptions();

       /**
        * needs to be asynchronous so jquery-circle-progress has time to initialize when initial circle value is > 0
        */
      let setCircle = () => $('#circle').circleProgress(circleOptions);
      $timeout(setCircle, 0);

      /**
       * these "watches" trigger behavior on the directive and update the its inner state based on parent's scope 
       */
      scope.$watchGroup(['todo.active', 'todo.item'], () => {
        if (scope.todo) {
          todoService.toggleTodo(scope.todo);
          circleProgressService.updateProgressCircle();
        }
      });
      scope.$watch('resetTodos', (newValue, oldValue) => {
        if (newValue === oldValue) {
          return;
        }

        todoService.resetCompletedTodos(); 
        circleProgressService.updateProgressCircle(); 
      });
    }
  }
})();