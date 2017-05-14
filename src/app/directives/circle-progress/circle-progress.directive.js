(function() {
  'use strict';
  angular
    .module('circleProgress')
    .directive('circleProgress', circleProgress);

  function circleProgress () {
    let circleProgressObj = {
      restrict: 'E',
      replace: true,
      scope: {
        size: '@',
        thickness: '@',
        gradientColors: '=',
        todo: '='
      },
      link: link,
      templateUrl: 'app/directives/circle-progress/circle-progress.html'
    };
    
    return circleProgressObj;


    function link(scope) {
      let completedTodos = [];
      let circleValue = 0;
      let updateProgressCircleValue = () => {
        circleValue = completedTodos.length === 6 ? 1 : completedTodos.length / 6;
        $('#circle').circleProgress('value', circleValue);
      };
      
      let toggleTodo = (todo) => {
        if (!completedTodos.includes(todo) && todo !== undefined) {
          completedTodos.push(todo);
          updateProgressCircleValue();
        } else {
          let todoIndex = completedTodos.indexOf(todo);
          completedTodos.splice(todoIndex, 1);
          updateProgressCircleValue();
        }
      };

      scope.completedTodos = completedTodos;
      scope.$watch('todo', () => toggleTodo(scope.todo));
      /**
       * cirle progress configuration and DOM manipulation
       */
      const circleOptions = {
        value: circleValue,
        size: scope.size,
        thickness: scope.thickness,
        fill: {
          gradient: scope.gradientColors
        }
      };

      $('#circle').circleProgress(circleOptions);
    }
  }
})();