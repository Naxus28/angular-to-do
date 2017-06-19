(function() {
  'use strict';
  angular
    .module('circleProgress')
    .directive('circleProgressDirective', circleProgressDirective);

  function circleProgressDirective (circleProgressService, todoService) {
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
      let circleOptions = {
        value: scope.value || 0,
        size: scope.size,
        thickness: scope.thickness,
        fill: {
          gradient: scope.gradient
        }
      };

      circleProgressService.setInitialCircleOptions(circleOptions);

      /**
       * these "watches" trigger behavior on the directive and update its inner state based on parent's scope 
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

        todoService.resetTodos(); 
        circleProgressService.updateProgressCircle(); 
      });
    }
  }
})();