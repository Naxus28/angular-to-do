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
            // handle empty response
          }
        },
        err => {
          $log.error('Error: ', err);
          // handle error
        }
      );
    }

    fetchTodos();
  }

})();