(function () {
  'use strict';

  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($log, todoService, todosProgressService) {
    let vm = this;
    let circleOptions = {
      value: 0,
      size: 190,
      thickness: 30,
      fill: {
        gradient: ['green', '#A990B0', 'rgb(63, 97, 176)']
      }
    };

    todosProgressService.setCircleOptions(circleOptions);

    vm.circleOptions = todosProgressService.getCircleOptions();

    vm.fetchTodos = fetchTodos;

    function fetchTodos() {
      todoService.getTodos()
      .then(
        response => {
          if (response.data.todos.length) {
            vm.todos = todoService.getSixRandomTodos(response.data.todos);
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