(function () {
  'use strict';

  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($log, homeService) {
    let vm = this;
    vm.circleOptions = {
      size: 190,
      thickness: 30,
      fill: {
        gradient: ['green', '#A990B0', 'rgb(63, 97, 176)']
      }
    };

    vm.fetchTodos = fetchTodos;

    function fetchTodos() {
      homeService.getTodos()
      .then(
        response => {
          if (response.data.todos.length) {
            vm.todos = homeService.getSixRandomTodos(response.data.todos);
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