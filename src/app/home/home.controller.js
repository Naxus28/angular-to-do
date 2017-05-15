(function () {
  'use strict';

  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl(todoService, $log) {
    let vm = this;
    let circleOptions = {
      size: 190,
      gradientColors: ['green', 'blue'],
      thickness: 30
    };
    todoService.setCircleOptions(circleOptions);

    vm.circleOptions = todoService.getCircleOptions();
    vm.updateTodoModel = (todo) => {
      console.log('vm.todoItem :', vm.todoItem );
      console.log('todo :', todo );
      console.log('todo === vm.todoItem: ', todo === vm.todoItem);
      vm.todoItem = todo === vm.todoItem ? 'removeTodo' : todo;
      console.log('new todo: ', vm.todoItem);
    }
    vm.resetTodoList = () => vm.resetCompletedList = !vm.resetCompletedList;
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
          vm.error = 'There was an error loading the application. Please refresh the page to try again later. We apologize for any inconvenience.';
        }
      );
    }

    fetchTodos();
  }
})();