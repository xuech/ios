'use strict';

class CompaniesService {

  findAll(data={}) {
    let params = $.param( data );
    return this._resources.names().$promise;
  }

  findAddresses() {
    return this._resources.addresses().$promise;
  }

}


export default function() {

  this.instance = CompaniesService;

  this.$get = ['CompaniesResources', (CompaniesResources) => {
    this.instance.prototype._resources = CompaniesResources;
    return this.instance;
  }];

}
