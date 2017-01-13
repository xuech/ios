'use strict';

import BaseController from '../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$stateParams', '$log'],

  initialize($scope, $stateParams) {
    let type = $stateParams.selectionId;
    this.selectionType   = type;
    this.selectedAddress = $scope.addressModel.getSelectedAddressByType( type );
  },

  defineScope($scope) {
    $scope.isLoading = true;

    $scope.model = {
      type:       this.selectionType,
      selectedId: this.selectedAddress
    };

    // add addresses to model
    this.updateModelWithAddresses();
  },

  defineListeners($scope) {
    $scope.$on( '$ionicView.enter', this.onEnterView );
  },

  onEnterView() {
    this.$scope.isLoading = true;
    this.$scope.addressModel.loadAddresses().then(() => {
      this.$scope.isLoading = false;
      this.updateModelWithAddresses();
    });
  },

  updateModelWithAddresses() {
    let type = this.selectionType;
    let addresses = this.$scope.addressModel.getAddressesByType( type );
    this.$scope.model.addresses = addresses;
  }

});
