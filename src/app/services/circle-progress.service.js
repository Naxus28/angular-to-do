(function() {
  'use strict';
  angular
    .module('services')
    .factory('circleProgressService', circleProgressService);

  function circleProgressService(todoService) {
    
    /**
     * @return todos progress
     */
    let getUpdatedCircleValue = () => {
      let completedTodos = todoService.getTodos();
      let progress = completedTodos.length === 6 ? 1 : completedTodos.length / 6;

      return progress;
    };

    /**
     * sets initial circle config options
     * @param  circleOptions
     * @return void
     */
    let setInitialCircleOptions = (circleOptions) => $('#circle').circleProgress(circleOptions);

    /**
     * updates circle progress value
     * @return void
     */
    let updateProgressCircle = () => {
      let progress = getUpdatedCircleValue();
      $('#circle').circleProgress('value', progress); //updates circle value
    };
   

   /**
    * services to be exposed
    */
    const service = { 
      setInitialCircleOptions,
      updateProgressCircle
    };

    return service; // expose API
  }
})();