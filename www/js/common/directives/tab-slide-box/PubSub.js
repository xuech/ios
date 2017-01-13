'use strict';

export default function() {
  let events = {};

  return {
    on: function(names, handler) {
      names.split(' ').forEach(function(name) {
        if ( !events[name] ) {
          events[ name ] = [];
        }

        events[ name ].push( handler );
      });

      return this;
    },
    trigger: function(name, args) {
      angular.forEach(events[ name ], (handler) => {
        handler.call( null, args );
      });

      return this;
    }
  };

}