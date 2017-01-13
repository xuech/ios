'use strict';

class ObservableService {

  constructor() {
    this._subscribers = [];

    this.promise = {
      then: (fn=angular.noop) => {
        fn._observer = new ObservableService();
        this._subscribers.push( fn );

        if ( this._returnValue ) {
          this._updateSubscriber( fn );
        }
        
        return fn._observer.promise;
      }
    }
  }

  resolve(response) {
    this._returnValue = response;

    this._subscribers.forEach((fn) => {
      this._updateSubscriber( fn );
      this._updateSubscriber( (v) => fn._observer.resolve(v) );
    });

    return this._returnValue;
  }

  reject() {
    let args = arguments;
    this._subscribers.forEach((fn) => fn.apply( this, args ));
  }

  _updateSubscriber(fn=angular.noop) {
    this._returnValue = fn( this._returnValue ) || this._returnValue;
  }

}


export default function() {
  this.instance = ObservableService;
  this.$get = () => this.instance;
}
