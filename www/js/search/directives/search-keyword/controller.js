'use strict';

import _ from 'lodash';
import BaseController from '../../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$state', '$ionicHistory'],

  defineScope($scope) {
    $scope.query = {
      type: "fineChems"
    };
  },

  handleSubmitQuery() {
    this.$ionicHistory.clearHistory(); // because ionic is stupid

    // force ionic to not cache the results query we're sending along
    // this.$ionicHistory.clearCache().then(() => {
    let timestamp = ( new Date() ).getTime();
    let query = _.extend( this.$scope.query, {timestamp: timestamp} );

    this.$state.go( 'app.results.index', query );
  }

});
