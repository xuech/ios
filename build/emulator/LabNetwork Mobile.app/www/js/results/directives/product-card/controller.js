'use strict';

import BaseController from '../../../common/controllers/BaseController';

export default BaseController.extend({

  defineScope($scope) {
    $scope.isCollapsed = true;

    $scope.product.cas = $scope.product.cas || 'N/A';
    $scope.product.mdl = $scope.product.mdl || 'N/A';
  },

  handleToggleIsCollapsed() {
    let isCollapsed = !this.$scope.isCollapsed;
    this.$scope.isCollapsed = isCollapsed;
    this.$scope.$broadcast( 'component:productCard:isCollapsed', isCollapsed );
  }

});
