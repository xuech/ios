'use strict';

function AuthResources($resource, apiUrl, AuthTransformer) {

  return $resource('', {}, {

    prelogin: {
      method: 'GET',
      url: `${apiUrl}/resources/users/preloginCheck?:params`,
      isArray: false
    },

    login: {
      method: 'POST',
      url: `${apiUrl}/json_login`,
      isArray: false
    },

    logout: {
      method: 'GET',
      url: `${apiUrl}/logout`,
      isArray: false
    },

    permissions: {
      method: 'GET',
      url: `${apiUrl}/resources/users/current`,
      isArray: false,
      interceptor: AuthTransformer.permissions
    },

    companyAuth: {
      method: 'GET',
      url: `${apiUrl}/resources/users/current/company`,
      isArray: false
    }

  });

}

module.exports = ['$resource', 'apiUrl', 'AuthTransformer', AuthResources];
