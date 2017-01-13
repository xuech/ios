import BaseController from '../../../common/controllers/BaseController';

export default BaseController.extend({

  inject: [ 'CountryService' ],

  defineListeners($scope, CountryService) {
    CountryService.onChange.then( this.updateCountryDisplay );
  },

  updateCountryDisplay() {
    let countryCode = this.CountryService.country;
    let countries   = this.CountryService.countries;

    if ( countryCode && countries.length ) {
      let country = this.CountryService.getCountryByISOCode( countryCode );
      this.$scope.country = country
    }
  }

});
