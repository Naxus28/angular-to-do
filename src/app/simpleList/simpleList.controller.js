(function () {
  'use strict';

  angular
    .module('simpleList')
    .controller('SimpleTodoList', SimpleTodoList);

  /* @ngInject */
  function SimpleTodoList(simpleListService, todoService, $log) {
    let vm = this;
    vm.toggleTodo = (todo) => todoService.toggleTodo(todo);

    function fetchTodos() {
      simpleListService.getTodos()
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
          vm.error = 'There was an error loading the application. Please try again later. We apologize for any inconvenience.';
        }
      );
    }

    fetchTodos();
  }

})();