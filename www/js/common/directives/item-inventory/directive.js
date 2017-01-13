'use strict';

import _ from 'lodash';

function ItemInventoryDirective($log, InventoryModel) {

  return {
    restrict: 'AE',
    templateUrl: 'common/directives/item-inventory/template.html',
    scope: {
      product:        '=',
      productId:      '=',
      inventories:    '=',
      productPackage: '=',
      shipTime:       '=',
      label:          '='
    },

    controller: ['$scope', '$attrs', '$ionicPopover', ($scope, $attrs, $ionicPopover) => {
      let displayInventory = $attrs.displayInventoryDetails;
      $scope.displayInventoryDetails = displayInventory === 'true' || displayInventory === true;

      function getAttributes() {
        return _.pick( $scope, 'product', 'productId', 'productPackage', 'shipTime', 'label' );
      }

      // create model
      let model = new InventoryModel( getAttributes() );
      $scope.model = model;

      // watchers
      $scope.$watch( 'product',        () => model.updateAttributes(getAttributes()) );
      $scope.$watch( 'productPackage', () => model.updateAttributes(getAttributes()) );
      $scope.$watch( 'shipTime',       () => model.updateAttributes(getAttributes()) );
      $scope.$watch( 'inventories', inventory => model.updateInventory(inventory) );

      // init popover
      $ionicPopover.fromTemplateUrl('common/directives/item-inventory/template.popover.html', {
        scope: $scope,
      })
      .then( popover => $scope.popover = popover );
    }]
  }

}

module.exports = ['$log', 'InventoryModel', ItemInventoryDirective];
