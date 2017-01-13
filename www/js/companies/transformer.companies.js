'use strict';

function CompaniesTransformer($q, ObservableService) {

  var transformer = {
    names: {
      response(response) {
        if ( transformer.names.response.deferred ) {
          return transformer.names.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.names.response.deferred = observer;
        return observer.promise;
      }
    },

    addresses: {
      response(response) {
        if ( transformer.addresses.response.deferred ) {
          return transformer.addresses.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.addresses.response.deferred = observer;
        return observer.promise;
      }
    }
  };

  return transformer;
}

module.exports = ['$q', 'ObservableService', CompaniesTransformer];
