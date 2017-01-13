'use strict';

function OrdersTransformer($q, ObservableService) {

  var transformer = {
    orders: {
      response(response) {
        if ( transformer.orders.response.deferred ) {
          return transformer.orders.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.orders.response.deferred = observer;
        return observer.promise;
      }
    },

    order: {
      response(response) {
        if ( transformer.order.response.deferred ) {
          return transformer.order.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.order.response.deferred = observer;
        return observer.promise;
      }
    }
  };

  return transformer;
}

module.exports = ['$q', 'ObservableService', OrdersTransformer];
