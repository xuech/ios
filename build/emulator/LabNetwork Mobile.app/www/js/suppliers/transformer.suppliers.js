'use strict';

function SuppliersTransformer($q, ObservableService) {

  var transformer = {
    logo: {
      response(response) {
        if ( transformer.logo.response.deferred ) {
          return transformer.logo.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.logo.response.deferred = observer;
        return observer.promise;
      }
    }
  };

  return transformer;
}

module.exports = ['$q', 'ObservableService', SuppliersTransformer];
