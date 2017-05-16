(function () {
  'use strict';

  angular
    .module('error')
    .controller('ErrorCtrl', ErrorCtrl);

  function ErrorCtrl(circleProgressService) {
    let vm = this;
    let circleOptions = {
      value: 1,
      size: 145,
      thickness: 10,
      fill: {
        gradient: ['#008CBA', '#D4B193', '#E7FCFC', '#29704D']
      }
    };

    circleProgressService.setCircleOptions(circleOptions);
    vm.circleOptions = circleProgressService.getCircleOptions();
  }
})();