(function() {
  'use strict';
  angular
    .module('circleProgress')
    .directive('circleProgress', circleProgress);

  function circleProgress () {
    let circleProgressObj = {
      restrict: 'E',
      replace: true,
      scope: {},
      link: link,
      templateUrl: 'app/directives/circle-progress/circle-progress.html'
    };
    
    return circleProgressObj;

    function link(scope, element, attrs, controller) {
      const circleOptions = {
        value: 1,
        size: 200,
        thickness: 20,
        fill: {
          gradient: ['green', 'blue']
        }
      };

      $('#circle').circleProgress(circleOptions);
    }
  }
})();