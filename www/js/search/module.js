'use strict';

module.exports = angular.module('search', [])

  .directive('keywordForm',   require('./directives/keyword-form/directive'))
  .directive('structureForm', require('./directives/structure-form/directive'))

  .directive('structureEditor',            require('./directives/structure-editor/directive'))
  .controller('StructureEditorController', require('./directives/structure-editor/controller'))

  .directive('searchKeyword',        require('./directives/search-keyword/directive'))
  .controller('KeywordController',   require('./directives/search-keyword/controller'))

  .directive('searchStructure',      require('./directives/search-structure/directive'))
  .controller('StructureController', require('./directives/search-structure/controller'))
  .provider('StructureModel',        require('./directives/search-structure/model.structure'));
