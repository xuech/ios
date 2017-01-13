'use strict';

import BaseController from '../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['CheckoutAddressModel'],

  initialize($scope, CheckoutAddressModel) {
    this.addressModel = new CheckoutAddressModel();
  },

  defineScope($scope) {
    $scope.addressModel = this.addressModel;
  }

});
