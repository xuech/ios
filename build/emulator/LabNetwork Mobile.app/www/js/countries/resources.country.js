'use strict';

function CountryResources($resource, apiUrl) {

  return $resource('', {}, {

    findByIP: {
      method: 'GET',
      url: `${apiUrl}/resources/countries/ip`,
      isArray: false
    },

    findAll: {
      method: 'GET',
      url: `${apiUrl}/resources/countries`,
      isArray: true
    }

  });

}

module.exports = ['$resource', 'apiUrl', CountryResources];
