'use strict';

import BaseController from '../../../common/controllers/BaseController';

export default BaseController.extend({

  inject: ['$log', '$timeout'],

  defineListeners($scope) {
    $scope.$watch( '_editor', this.initializeEditor );
    $scope.$watch( 'query.molfile', this.importMolData );
  },

  initializeEditor(editor) {
    if ( editor ) {
      let settings = this.getSettings();
      editor.setDisplaySettings( settings );
      editor.exportStructure( 'jpeg', settings );
      editor.onMolChange( () => this.updateMolData() );
      this.$log.debug( 'initializeEditor', editor );
      this.importMolData( this.$scope.query.molfile );
    }
  },

  importMolData(molfile) {
    let editor = this.$scope._editor;
    if ( editor ) {
      this.$log.debug( 'importMolData', molfile );
      editor.importStructure( null, molfile );
    }
  },

  updateMolData() {
    let editor  = this.$scope._editor;
    let molData = editor.exportAsMol();
    this.$timeout( () => this.$scope.query.molfile = molData );
  },

  getSettings() {
    return {
      width:                      100,
      height:                     100,
      toolbars:                   'education',
      lonePairsVisible:           false,
      lonepaircalculationenabled: false,
      implicitHydrogen:           'OFF',
      valenceErrorVisible:        false
    };
  }

});
