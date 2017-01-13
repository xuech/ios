'use strict';

class PricingService {

  find(data={}) {
    let params = {
      countryId: this._service.country
    };

    return this._resources.pricing( params, data ).$promise;
  }

  findAll(data=[]) {
    let params = {
      countryId: this._service.country
    };

    return this._resources.startingAt( params, data ).$promise;
  }

}


export default function() {

  this.instance = new PricingService();

  this.$get = ['PricingResources', 'CountryService', (PricingResources, CountryService) => {
    this.instance._resources = PricingResources;
    this.instance._service   = CountryService;
    return this.instance;
  }];

}
