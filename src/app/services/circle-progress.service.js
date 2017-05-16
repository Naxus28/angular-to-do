(function() {
  'use strict';
  angular
    .module('services')
    .factory('circleProgressService', circleProgressService);

  function circleProgressService(todoService) {
    let _circleOptions = {}; // holds circle options state

    let getCircleOptions = () => _circleOptions;
    
    let getUpdatedCircleValue = () => {
      let completedTodos = todoService.getTodos();
      let progress = completedTodos.length === 6 ? 1 : completedTodos.length / 6;

      return progress;
    };

    let setCircleOptions = (optionsObj) => {
      _circleOptions = _.cloneDeep(optionsObj);
    };

    let updateProgressCircle = () => {
      let progress = getUpdatedCircleValue();
      $('#circle').circleProgress('value', progress); //updates circle value
    };
   
    const service = { 
      getCircleOptions,
      setCircleOptions,
      updateProgressCircle
    };

    return service; // expose API
  }
})();