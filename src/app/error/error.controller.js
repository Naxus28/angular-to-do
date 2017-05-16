(function () {
  'use strict';

  angular
    .module('error')
    .controller('ErrorCtrl', ErrorCtrl);

  function ErrorCtrl(todosProgressService) {
    let vm = this;
    let circleOptions = {
      value: 1,
      size: 145,
      thickness: 10,
      fill: {
        gradient: ['#008CBA', '#D4B193', '#E7FCFC', '#29704D']
      }
    };

    todosProgressService.setCircleOptions(circleOptions);
    vm.circleOptions = todosProgressService.getCircleOptions();
  }
})();