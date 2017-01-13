'use strict';

import _ from 'lodash';

function SessionService($log, $rootScope, localStorageService) {

  let service = {
    setCurrentUser:  setCurrentUser,
    setUserMetadata: setUserMetadata,
    setSavedLogin:   setSavedLogin
  };

  function setCurrentUser(userData) {
    service.currentUser = userData || null;
    service.isLoggedIn  = !!userData;

    localStorageService.set( 'session', userData );
    service.savedLogin  = localStorageService.get( 'savedLogin' ) || false;

    $log.debug( 'SessionService#setCurrentUser', service.currentUser );
  }

  function setUserMetadata(userMetadata) {
    if ( service.isLoggedIn ) {
      service.company     = userMetadata.company;
      service.permissions = userMetadata.permissions;
      service.preferences = userMetadata.preferences;
      _.extend( service.currentUser, userMetadata.user );
    }

    $rootScope.$broadcast( 'user:metadata:change', userMetadata );
    $log.debug( 'SessionService#setUserMetadata', userMetadata );
  }

  function setSavedLogin(email) {
    if ( email ) {
      localStorageService.set( 'savedLogin', email );
      $log.debug( 'persisting login', email );
    }
    else {
      localStorageService.remove( 'savedLogin' );
    }
  }

  // initially set currentUser
  let session = localStorageService.get( 'session' );
  setCurrentUser( session );

  return service;

}


module.exports = ['$log', '$rootScope', 'localStorageService', 'AuthTransformerSession', SessionService];
