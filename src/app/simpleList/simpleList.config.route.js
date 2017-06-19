(function () {
  'use strict';

  angular
    .module('simpleList')
    .config(config);

  function config($stateProvider) {
    let appState = {
      name: 'simplelist',
      url: '/simplelist',
      templateUrl: 'app/simpleList/simpleList.html',
      controller: 'SimpleTodoList as slist'
    };

    $stateProvider.state(appState);
  }
})();