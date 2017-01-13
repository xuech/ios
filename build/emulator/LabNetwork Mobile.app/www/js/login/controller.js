'use strict';

import BaseController from '../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$ionicModal', 'AuthService', 'SessionService'],

  initialize($scope, $ionicModal, AuthService) {
    $ionicModal.fromTemplateUrl('login/template.html', {
      scope: $scope
    })
    .then( (modal) => $scope.modal = modal );
  },

  defineScope($scope) {
    this.resetIdentification();
    $scope.session = this.SessionService;
  },

  resetIdentification() {
    this.$scope.identification = {};
    this.$scope.persist = { email: false };

    if ( this.$scope.session.savedLogin ) {
      this.$scope.persist.email = true;
      this.$scope.identification.email = this.$scope.session.savedLogin;
    }
    else {
      this.$scope.shouldPersist = false;
    }
  },

  handleSubmitLogin() {
    let identification = this.$scope.identification;
    let shouldPersist  = this.$scope.persist.email;

    this.AuthService.login( identification )
      .then(() => {
        this.$scope.handleCloseLogin();
        this.SessionService.setSavedLogin( shouldPersist ? identification.email : null );
      })
      .catch(() => {
        this.$scope.errors = "Email or password is incorrect.";
      });

    this.$scope.errors = null;
  },

  handleOpenLogin() {
    this.resetIdentification();
    this.$scope.modal.show();
  },

  handleCloseLogin() {
    this.$scope.modal.hide();
  }

});
