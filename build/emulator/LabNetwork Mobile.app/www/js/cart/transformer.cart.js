'use strict';

function CompaniesTransformer($q, ObservableService) {

  var transformer = {
    items: {
      response(response) {
        if ( transformer.items.response.deferred ) {
          return transformer.items.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.items.response.deferred = observer;
        return observer.promise;
      }
    },

    savedItems: {
      response(response) {
        if ( transformer.savedItems.response.deferred ) {
          return transformer.savedItems.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.savedItems.response.deferred = observer;
        return observer.promise;
      }
    },

    addItems: {
      response(response) {
        if ( transformer.addItems.response.deferred ) {
          return transformer.addItems.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.addItems.response.deferred = observer;
        return observer.promise;
      }
    },

    updateItems: {
      response(response) {
        if ( transformer.updateItems.response.deferred ) {
          return transformer.updateItems.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.updateItems.response.deferred = observer;
        return observer.promise;
      }
    },

    saveForLaterItems: {
      response(response) {
        if ( transformer.saveForLaterItems.response.deferred ) {
          return transformer.saveForLaterItems.response.deferred.resolve( response );
        }
        return response;
      },

      transformResponse() {
        let observer = new ObservableService();
        transformer.saveForLaterItems.response.deferred = observer;
        return observer.promise;
      }
    }
  };

  return transformer;
}

module.exports = ['$q', 'ObservableService', CompaniesTransformer];
