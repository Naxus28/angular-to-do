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
      templateUrl: 'directives/circle-progress/circle-progress.html'
    };
    
    return circleProgressObj;

    function link(scope, element, attrs, controller, transcludeFn) {
      console.log('circle progress');
      scope.name = 'Gabriel';
    }
  }
})();