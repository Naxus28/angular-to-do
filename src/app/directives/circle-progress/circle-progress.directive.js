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
        todo: '=',
        reset: '='
      },
      link: link,
      templateUrl: 'app/directives/circle-progress/circle-progress.html'
    };
    
    return circleProgressObj;

    function link(scope) {
      let _completedTodos = [];
      
      /**
       * getters and setters
       */
      let getCompletedTodos = () => _completedTodos;
      let updateProgressCircleValue = () => {
        let todosList = getCompletedTodos();
        let circleValue = todosList.length === 6 ? 1 : todosList.length / 6;
        $('#circle').circleProgress('value', circleValue); //updates circle value
      };
      let setTodoList = () => scope.completedTodos = getCompletedTodos();
      let resetTodoList = () => {
        _completedTodos = [];
        setTodoList();
      };
      let updateTodoList = (todo) => {
        if (!_completedTodos.includes(todo) && todo !== undefined && todo !== 'removeTodo') {
          _completedTodos.push(todo);
          updateProgressCircleValue();
        } else {
          let todoIndex = _completedTodos.indexOf(todo);
          _completedTodos.splice(todoIndex, 1);
          updateProgressCircleValue();
        }
        
        setTodoList(); // update view
      };
      
      /**
       * watch parent scope and update the directive's template with new values
       */
      scope.$watch('todo', () => updateTodoList(scope.todo));
      scope.$watch('reset', () => {
        resetTodoList();
        updateProgressCircleValue();
      });
      
      /**
       * cirle progress configuration and DOM manipulation
       */
      const circleOptions = {
        value: getCompletedTodos(),
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