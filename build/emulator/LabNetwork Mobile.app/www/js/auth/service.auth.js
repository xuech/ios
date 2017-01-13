'use strict';

var AuthService = function($log, $q, $rootScope, $interval, AuthResources, SessionService) {
  var service = {
    login : login,
    logout: logout
  };

  function login(credentials) {
    let promise = AuthResources.login( {}, credentials ).$promise;
    promise.then(userData => {
      handleSuccess( userData );
      getUserMetadata().then( () =>  $rootScope.$broadcast('auth:login') );
    }).catch( handleError );
    return promise;
  }

  function logout() {
    let request = AuthResources.logout().$promise.then(() => {
      SessionService.setCurrentUser();
      getUserMetadata();
    });

    $rootScope.$broadcast( 'auth:logout' );
    return request;
  }

  function verifyAuthorization() {
    let isLoggedIn = SessionService.isLoggedIn;
    if ( isLoggedIn ) {
      AuthResources.companyAuth().$promise.catch(() => {
        logout().then(() => {
          $rootScope.$broadcast( 'auth:invalid' );
        });
      });
    }
  }

  function getUserMetadata() {
    return AuthResources.permissions().$promise.then(abilities => {
      SessionService.setUserMetadata( abilities );
    });
  }

  function handleSuccess(userData) {
    SessionService.setCurrentUser( userData );
  }

  function handleError(error) {
    $log.error( 'Could not login', error );
  }

  // get user abilities, then verify auth
  getUserMetadata().then( () => verifyAuthorization() );
  $interval( verifyAuthorization, 45000 ); // verify auth every 45 seconds


  return service;
};


module.exports = [
  '$log',
  '$q',
  '$rootScope',
  '$interval',
  'AuthResources',
  'SessionService',
  AuthService
];
