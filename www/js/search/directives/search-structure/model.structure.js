'use strict';

import _ from 'lodash';

class StructureModel {

  constructor(data={}) {
    let similarityThreshold = data.similarityThreshold;
    if ( similarityThreshold ) {
      if ( similarityThreshold  % 1 != 0 ) {
        data.similarityThreshold *= 100;
      }
    }

    this.query = _.extend({
      structureEditorEnabled: true,
      similarityThreshold:    70,
      structureSearchType:   'EXACT',
      molfile: '\n  CWRITER309171408352D                              \nCreated with ChemWriter - http://chemwriter.com\n  0  0  0  0  0  0  0  0  0  0999 V2000\nM  END',
    }, data);

    this.cache = _.extend( {}, this.query );
  }

  prepareQuery() {
    let similarityThreshold = this.query.similarityThreshold / 100;
    return _.extend( {}, this.query, { similarityThreshold } );
  }

  updateCache() {
    this.cache = _.extend( {}, this.query );
  }

  updateQuery() {
    _.extend( this.query, this.cache );
  }

}


export default function() {

  this.instance = StructureModel;

  this.$get = ['$log', ($log) => {
    this.instance.prototype._$log = $log;
    return this.instance;
  }];

}
