'use strict';

import _ from 'lodash';

export default function() {

  return function(input) {
    let selections = _.where( input.value, { isSelected: true } );
    let values     = _.pluck( selections, 'name' );
    let hasValues  = !!values.length;

    return hasValues ? values.join( ', ' ) : '';
  }

}