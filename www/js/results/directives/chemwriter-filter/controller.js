'use strict';

import BaseController from '../../../common/controllers/BaseController';

export default BaseController.extend({

  defineScope($scope) {
    $scope.width  = $scope.width || 100;
    $scope.height = $scope.height || 100;
  }

});
