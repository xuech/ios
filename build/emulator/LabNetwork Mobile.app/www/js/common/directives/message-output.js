'use strict';

import _ from 'lodash';

function MessageOutputDirective($compile, MessagesService) {

  return {
    restrict: 'A',
    link(scope, element, attrs) {

      function handleMessageOutput() {
        let id = attrs.messageOutput;
        if ( !id ) return;

        let keys = id.split( '.' );
        var message = MessagesService;
        _.each( keys, key => message = message[ key ] );

        let $tmpl = $compile( `<span>${message}</span>` )( scope );
        element.html( $tmpl );
      }

      if ( attrs.key ) {
        scope.$watch(attrs.key, val => {
          if ( val ) {
            attrs.messageOutput += `.${val}`;
            handleMessageOutput();
          }
        });
      }
      else {
        handleMessageOutput();
      }

    }
  };

};

module.exports = ['$compile', 'MessagesService', MessageOutputDirective];
