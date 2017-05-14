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
        gradientColors: '='
      },
      link: link,
      templateUrl: 'app/directives/circle-progress/circle-progress.html'
    };
    
    return circleProgressObj;


    function link(scope) {
      let completedTasks = [];
      scope.completedTasks = completedTasks;

      const circleOptions = {
        value: 1,
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