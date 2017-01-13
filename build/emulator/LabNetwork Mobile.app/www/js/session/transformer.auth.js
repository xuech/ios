'use strict';

import _ from 'lodash';

function AuthTransformerSession(MessagesService, AuthTransformer) {

  return AuthTransformer.permissions.transformResponse()
    .then((response) => {
      let data = response.data;
      if ( data ) {
        let preferences = data.servicePreferences;
        let company = _.pick( data, 'company', 'companyAdmin', 'companyId' );
        let user = _.omit( data, 'company', 'companyAdmin', 'companyId', 'permissions', 'servicePreferences' );

        let roles = data.permissions ? data.permissions.permission : [];
        let permissions = {
          isSiteAdmin: _.contains( roles, 'ROLE_SITE_ADMIN' ),
          isCSR:       _.contains( roles, 'ROLE_CSR' ),
          isBuyer:     _.contains( roles, 'ROLE_BUYER' ),

          hasRoles: function() {
            let args = Array.prototype.slice.call( arguments );
            let permissions = _.map( args, role => _.contains(roles, role) );
            return _.compact( permissions ).length > 0;
          }
        };

        return {
          user:        user,
          company:     company,
          permissions: permissions,
          preferences: preferences
        };
      }

      else {
        return null;
      }
    });
}

module.exports = ['MessagesService', 'AuthTransformer', AuthTransformerSession];
