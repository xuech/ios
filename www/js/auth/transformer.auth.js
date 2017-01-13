'use strict';

function AuthTransformer($q, ObservableService) {

  var transformer = {
    permissions: {
      response(response) {
        if ( transformer.permissions.response.deferred ) {
          return transformer.permissions.response.deferred.resolve( response );
        }

        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.permissions.response.deferred = observer;
        return observer.promise;
      }
    }

  };

  return transformer;
}

module.exports = ['$q', 'ObservableService', AuthTransformer];
