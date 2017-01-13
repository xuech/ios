'use strict';

import _ from 'lodash';
import BaseController from '../../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$log', '$timeout', 'ProductPackageModel', 'CartService', 'SessionService'],

  defineScope($scope) {
    $scope.model = {
      packages: []
    };

    $scope.session = this.SessionService;
    $scope.isConfirmationVisible = false;
  },

  defineListeners($scope) {
    let debouncePricing = _.debounce( this.updateModelPackagePricing, 500 );

    $scope.$on( 'cart:items:added', this.renderCartItemsAddedConfirmation );
    $scope.$watch( 'product.packages', this.updateModelPackages );
    $scope.$watch( 'model.package.quantity', debouncePricing );
  },

  updateModelPackages(packages) {
    if ( !packages ) return;

    _.each( packages, (pkg) => {
      let model = new this.ProductPackageModel( pkg );
      this.$scope.model.packages.push( model );
    });

    // set initial package
    this.handleShowPackage( packages[0].id );
  },

  updateModelPackagePricing(quantity) {
    if ( quantity === undefined ) return;

    this.$scope.model.package.updatePricing().then(() => {
      this.updatePackagesTotal();
      this.updatePackagesTotalQuantity();
    });
  },

  updatePackagesTotal() {
    let packages = this.$scope.model.packages;
    let total = _.reduce(packages, ((memo, pkg) => {
      let hasQuantity = pkg.quantity > 0;
      let price = pkg.isPriceUponRequest ? 0 : hasQuantity ? pkg.getPrice() : 0;
      return memo + price;
    }), 0);

    this.$scope.model.total = total;
  },

  updatePackagesTotalQuantity() {
    let packages = this.$scope.model.packages;
    let quantity = _.reduce( packages, ((memo, pkg) => memo + pkg.quantity), 0);

    this.$scope.model.hasQuantity     = quantity > 0;
    this.$scope.model.withoutQuantity = quantity < 1;
  },

  renderCartItemsAddedConfirmation(evt, data) {
    this.$scope.isConfirmationVisible   = true;
    this.$scope.confirmationProductData = data.item;
    this.$timeout(() => {
      this.$scope.isConfirmationVisible = false;
      this.$timeout(() => {
        this.$scope.confirmationProductData = null;
      }, 500);
    }, 5000);
  },

  handleQuantityIncrement() {
    this.$scope.model.package.quantityIncrement();
  },

  handleQuantityDecrement() {
    var packageModel = this.$scope.model.package;
    if ( packageModel.hasQuantity(0) ) {
      packageModel.quantityDecrement();
    }
  },

  handleShowPackage(package_id) {
    let pkg = _.findWhere( this.$scope.model.packages, { id: package_id } );
    this.$scope.model.package = pkg;
  },

  handleAddToCart() {
    let packages = _.filter( this.$scope.model.packages, pkg => pkg.quantity > 0 );
    this.CartService.addItems( packages ).then(() => {
      _.each( packages, pkg => pkg.resetQuantity() );
    });
  }

});
