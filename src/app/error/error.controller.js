(function () {
  'use strict';

  angular
    .module('error')
    .controller('ErrorCtrl', ErrorCtrl);

  function ErrorCtrl() {
    let circleOptions = {
      value: 1,
      size: 145,
      thickness: 10,
      fill: {
        gradient: ['#008CBA', '#D4B193', '#E7FCFC', '#29704D']
      }, 
      animation: {
        duration: 1800
      }
    };

    $('.error_circle').circleProgress(circleOptions);
  }
})();