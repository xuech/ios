import BaseController from '../common/controllers/BaseController';

export default BaseController.extend({

  inject: [ '$ionicSideMenuDelegate', 'SessionService', 'CountryService', 'apiUrl', 'AuthService' ],

  defineScope($scope, $ionicSideMenuDelegate, SessionService, CountryService, apiUrl) {
    $scope.apiUrl  = apiUrl;
    $scope.session = SessionService;
    $scope.countryService = CountryService;
  },

  handleLogout() {
    this.AuthService.logout();
  }

});
