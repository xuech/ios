'use strict';

function ProductsTransformer($q, ObservableService) {

  var transformer = {
    products: {
      response(response) {
        if ( transformer.products.response.deferred ) {
          return transformer.products.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.products.response.deferred = observer;
        return observer.promise;
      }
    },

    product: {
      response(response) {
        if ( transformer.product.response.deferred ) {
          return transformer.product.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.product.response.deferred = observer;
        return observer.promise;
      }
    },

    productInventory: {
      response(response) {
        if ( transformer.productInventory.response.deferred ) {
          return transformer.productInventory.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.productInventory.response.deferred = observer;
        return observer.promise;
      }
    },

    packageInventory: {
      response(response) {
        if ( transformer.packageInventory.response.deferred ) {
          return transformer.packageInventory.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.packageInventory.response.deferred = observer;
        return observer.promise;
      }
    },

    chemicalImages: {
      response: function(response) {
        let data = response.data;

        if ( data.imageLocationThumb ) {
          data.imageUrl = `${data.imageServer}${data.imageLocation}`;
        }

        if ( transformer.chemicalImages.response.deferred ) {
          transformer.chemicalImages.response.deferred.resolve( response );
        }

        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.chemicalImages.response.deferred = observer;
        return observer.promise;
      }
    }
  };

  return transformer;
}

module.exports = ['$q', 'ObservableService', ProductsTransformer];
