import BaseController from '../../../common/controllers/BaseController';

export default BaseController.extend({

  inject: [ '$ionicModal', 'CountryService' ],

  initialize($scope, $ionicModal, CountryService) {
    $ionicModal.fromTemplateUrl('countries/directives/country-selector/template.html', {
      scope: $scope
    })
    .then( modal => $scope.countryModal = modal );
  },

  defineScope($scope, $ionicModal, CountryService) {
    $scope.countryService = CountryService;
    $scope.selected = {
      countryCode: null
    };
  },

  defineListeners($scope, $ionicModal, CountryService) {
    CountryService.onChange.then(() => {
      $scope.selected.countryCode = CountryService.country;
    });
  },

  handleOpenSelector() {
    this.$scope.countryModal.show();
  },

  handleCloseSelector() {
    let countryCode = this.$scope.selected.countryCode;
    this.CountryService.setCountryISOCode( countryCode );
    this.$scope.countryModal.hide();
  }

});
