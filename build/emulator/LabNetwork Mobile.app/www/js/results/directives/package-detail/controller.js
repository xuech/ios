'use strict';

import _ from 'lodash';
import BaseController from '../../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$log', 'PackageDetailModel'],

  initialize($scope) {
    let attrs = $scope.package;
    this.model = new this.PackageDetailModel( attrs );
  },

  defineScope($scope) {
    $scope.model = this.model;
  },

  defineListeners($scope) {
    let handleUpdatePricing = _.once( this.handleUpdatePricing );

    $scope.$on( 'component:productCard:isCollapsed', (evt, isCollapsed) => {
      !isCollapsed && handleUpdatePricing();
    });
  },

  handleUpdatePricing() {
    // this.model.updatePricing();
  }

});
