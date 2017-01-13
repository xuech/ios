'use strict';

var HistoryPageService = function($log, $ionicHistory, $state) {
  var service = {
    history:  [],
    goBack:   goBack,
    savePage: savePage
  };

  function goBack() {
    $ionicHistory.clearHistory();
    let state = service.history.pop();
    $log.debug( 'HistoryPageService#goBack', state );
    $state.go( state );
  }

  function savePage(state) {
    state = state || $ionicHistory.currentView().stateName;
    $log.debug( 'HistoryPageService#savePage', state );
    service.history.push( state );

    // http://www.gajotres.net/ionic-framework-handling-android-back-button-like-a-pro/

    $ionicHistory.nextViewOptions({
       disableBack: true
    });
  }

  return service;
};

module.exports = ['$log', '$ionicHistory', '$state', HistoryPageService];
