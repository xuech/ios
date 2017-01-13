'use strict';

import BaseController from '../common/controllers/BaseController';

export default BaseController.extend({

  inject: [ '$rootScope', '$state', '$ionicPopup' ],

  defineListeners($scope, $rootScope, $state) {
    $rootScope.$on( 'auth:logout', () => $state.go('app.home') );
    $rootScope.$on( 'auth:invalid', () => this.renderInvalidSession() );
  },

  renderInvalidSession() {
    this.$ionicPopup.alert({
      title: 'Session No Longer Valid',
      template: 'It appears your session is no longer valid. You will need to sign back in to continue.'
    });
  }

});
