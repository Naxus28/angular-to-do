(function () {
  'use strict';

  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);

  /* @ngInject */
  function HomeCtrl(todoService, $log) {
    let vm = this;
    let errorMsg = `There was an error with the application. 
                    Please refresh the page to try again or contact an administrator. 
                    We apologize for any inconvenience.`;

    vm.toggleTodo = (todo) => vm.todoItem = todo;
    vm.gradientColors = todoService.gradientColors;

    todoService.getTodos()
    .then( 
      response => {
        if (response.data.todos.length) {
          vm.todos = response.data.todos;
        } else {
          vm.noTodosMsg = 'There are no to-dos for today!';
        }
      },
      err => {
        $log.error('Error: ', err);
        vm.error = errorMsg;
      });
  }

})();