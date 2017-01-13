'use strict';

import BaseController from '../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$log'],

  defineScope($scope) {
    $scope.model = $scope.addressModel;

    $scope.datepickerData = {
      from:       new Date(),                        // disable IU for lt tomorrow
      inputDate:  $scope.model.expectedDeliveryDate, // allow UI to select tomorrow and beyond (this is stupid)
      dateFormat: 'MM/dd/yyyy',
      callback:   this.handlePickerCallback,
    };
  },

  handlePickerCallback(date) {
    if ( date ) {
      // delegate to model to validate and assign value
      this.$scope.model.setExpectedDeliveryDate( date );
    }
    else {
      this.$log.debug( 'AddressController#handlePickerCallback: Expdcted Delivery Date was not selected' );
    }
  }

});
