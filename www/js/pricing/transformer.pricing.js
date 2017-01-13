'use strict';

function PricingTransformer($q, ObservableService) {

  var transformer = {
    pricing: {
      response(response) {
        if ( transformer.pricing.response.deferred ) {
          return transformer.pricing.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.pricing.response.deferred = observer;
        return observer.promise;
      }
    },

    startingAt: {
      response(response) {
        if ( transformer.startingAt.response.deferred ) {
          return transformer.startingAt.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.startingAt.response.deferred = observer;
        return observer.promise;
      }
    }
  };

  return transformer;
}

module.exports = ['$q', 'ObservableService', PricingTransformer];
