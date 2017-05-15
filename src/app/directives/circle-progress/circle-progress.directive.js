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
        resetTodos: '='
      },
      link: link,
      templateUrl: 'app/directives/circle-progress/circle-progress.html'
    };
    
    return circleProgressObj;

    function link(scope) {
      let _completedTodos = [];
      
      let getCompletedTodos = () => _completedTodos;

      let resetCompletedTodos = () =>_completedTodos = [];

      let setTodoListView = () => scope.completedTodos = _completedTodos;

      let addCompletedTodo = (todo) => _completedTodos.push(todo);

      let deleteTodo = (todo) => {
        let todoIndex = _completedTodos.indexOf(todo);
        _completedTodos.splice(todoIndex, 1);
      };

      let setCircleProgressView = () => {
        let progress = getupdatedCircleValue();
        $('#circle').circleProgress('value', progress); //updates circle value
      };
      
      let setView = () => {
        setTodoListView(); 
        setCircleProgressView();
      };

      let getupdatedCircleValue = () => {
        let completedTodos = getCompletedTodos();
        let progress = completedTodos.length === 6 ? 1 : completedTodos.length / 6;

        return progress;
      };

      let updateTodosAndSetView = (todo) => {
        if (!_completedTodos.includes(todo)) {
          addCompletedTodo(todo);
        } else {
          deleteTodo(todo);
        }
        
        setView();
      };
      
      /**
       * watch parent scope and update the directive's template with new values
       */
      scope.$watchGroup(['todo.active', 'todo.item'], () => scope.todo && updateTodosAndSetView(scope.todo));
      scope.$watch('resetTodos', () => {
        resetCompletedTodos(); 
        setView(); 
      });
      
      /**
       * cirle progress initial configuration 
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