'use strict';

import BaseController from '../common/controllers/BaseController';

export default BaseController.extend({

  inject: [
    '$state',
    'ResultsTransformerProducts',
    'ResultsTransformerCompanies'
  ],

  initialize($scope, $state) {
    if ( !$state.params.id ) {
      this.$state.go( 'app.results.index' );
    }
  },

  defineScope($scope) {
    $scope.tabs = {};
  }

});
