'use strict';

class SuppliersService {

  logo(supplierId='') {
    return this._resources.logo({ supplierId }).$promise;
  }

}


export default function() {

  this.instance = new SuppliersService();

  this.$get = ['SuppliersResources', SuppliersResources => {
    this.instance._resources = SuppliersResources;
    return this.instance;
  }];

}
