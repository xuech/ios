'use strict';

function HistorySavePage(HistoryPageService) {

  return {
    link(scope, element, attrs) {
      let stateName = attrs.historySavePage;
      element.on('click', function() {
        HistoryPageService.savePage( stateName );
      });
    }
  };

};

module.exports = ['HistoryPageService', HistorySavePage];
