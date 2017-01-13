'use strict';

class CriteriaService {

  init() {
    this.criteria = this.get();
  }

  get() {
    return this._store.get( 'criteria' ) || {};
  }

  set(data={}) {
    let cached = this.get();
    if ( !data.query && !data.molfile ) return cached;

    this.criteria = data;

    this._store.set( 'criteria', this.criteria );
    this._logger.debug( 'Criteria updated', this.criteria );

    return this.criteria;
  }

}


export default function() {

  this.instance = new CriteriaService();

  this.$get = ['$log', 'localStorageService', ($log, localStorageService) => {
    this.instance._logger = $log;
    this.instance._store  = localStorageService;

    this.instance.init();

    return this.instance;
  }];

}
