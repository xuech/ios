'use strict';

function ChemwriterFilter($log, $q, $timeout, $window) {

  let increment = 0;
  let defer = $q.defer();

  function exec() {
    if ( !$window.chemwriter ) {
      $.getScript( 'lib/chemwriter/chemwriter.js', () => {
        defer.resolve( $window.chemwriter );
      });
    }

    return defer.promise;
  }

  return {
    restrict: 'E',
    replace: true,
    controller: 'ChemwriterFilterController',
    templateUrl: 'results/directives/chemwriter-filter/template.html',
    scope: {
      query: '=',
      width:  '=',
      height: '='
    },

    link(scope, element, attrs) {
      scope.imageId = ++increment;
      let componentName = `image-${increment}`;

      scope.$watch('query', function(query) {
        if ( query && query.molfile ) {
          exec().then((chemwriter) => {
            chemwriter.refresh();
            chemwriter.components[ componentName ].setMolfile( query.molfile );
            $log.debug( 'chemwriter-filter molfile updated', { molfile: query.molfile } );
          });
        }
      }, true);
    }
  }

}

module.exports = ['$log', '$q', '$timeout', '$window', ChemwriterFilter];
