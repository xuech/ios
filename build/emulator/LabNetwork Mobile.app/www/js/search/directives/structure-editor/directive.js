'use strict';

function structureEditor($log, $q, $window) {

  let increment = 0;
  let defer = $q.defer();
  let scripts = [
    $.getScript( 'lib/marvin-editor/js/webservices.js' ),
    $.getScript( 'lib/marvin-editor/gui/gui.nocache.js' ),
    $.getScript( 'lib/marvin-editor/gui/lib/promise-1.0.0.min.js' ),
    $.getScript( 'lib/marvin-editor/js/marvinjslauncher.js' )
  ];

  function exec() {
    if ( !$window.MarvinJSUtil ) {
      $q.all( scripts ).then(() => {
        defer.resolve();
      });
    }

    return defer.promise;
  }

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'search/directives/structure-editor/template.html',
    controller: 'StructureEditorController',
    scope: {
      query: '='
    },

    link(scope, element, attrs) {
      let onSuccess = (marvin) => {
        scope._editor = marvin;
        $log.debug( 'Successfully loaded sketcher' );
      };

      let onFailure = (error) => {
        $log.error( `Failed loading sketcher: ${error}` );
      };

      // increment frame-id
      ++increment;
      let frameId = `sketch-${increment}`;
      let $frame  = element.find( '.sketcher-frame' ).attr( 'id', frameId );

      $frame.load(() => {
        setTimeout(() => {
          let $container = $frame.contents().find( '#root' );
          $container.css({ height: element.outerHeight() });
          $frame.parent().css({ border: '1px solid transparent' })
          setTimeout(() => {
          }, 100);
        }, 1000); // ಠ_ಠ MARVIN!!
      });

      exec()
        .then(() => {
          $window.MarvinJSUtil.getEditor( `#${frameId}` )
          .then( onSuccess, onFailure );
        });
    }
  };

};

module.exports = ['$log', '$q', '$window', structureEditor];
