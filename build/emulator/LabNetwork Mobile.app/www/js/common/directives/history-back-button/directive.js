'use strict';

function HistoryBackButton(HistoryPageService) {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'common/directives/history-back-button/template.html',

    link(scope, element, attrs) {
      scope.pageHistory = HistoryPageService.history;
      
      element.on('click', function() {
        HistoryPageService.goBack();
      });
    }
  };

};

module.exports = ['HistoryPageService', HistoryBackButton];
