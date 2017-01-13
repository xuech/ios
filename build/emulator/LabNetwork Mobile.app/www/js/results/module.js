'use strict';

module.exports = angular.module('results', [])

  // Models
  .provider('ResultsModel',        require('./index/model.results'))
  .provider('FiltersModel',        require('./filters/model.filters'))
  .provider('SelectionModel',      require('./selections/model.selection'))
  .provider('ProductModel',        require('./details/model.product'))
  .provider('ProductPackageModel', require('./directives/product-packages/model.package'))
  .provider('PackageDetailModel',  require('./directives/package-detail/model.package'))

  // Controllers
  .controller('ResultsController',           require('./controller'))
  .controller('ResultsIndexController',      require('./index/controller'))
  .controller('ResultsFiltersController',    require('./filters/controller'))
  .controller('ResultsSelectionsController', require('./selections/controller'))
  .controller('ProductController',           require('./details/controller'))
  .controller('ChemwriterFilterController',  require('./directives/chemwriter-filter/controller'))
  .controller('ProductPackagesController',   require('./directives/product-packages/controller'))
  .controller('PackageDetailController',     require('./directives/package-detail/controller'))

  // Transformers
  .service('ResultsTransformerProducts',  require('./transformer.products'))
  .service('ResultsTransformerCompanies', require('./transformer.companies'))
  .service('ProductTransformerProducts',  require('./details/transformer.products'))
  .service('PackagesTransformerProducts', require('./directives/product-packages/transformer.products'))
  .service('PackagesTransformerPricing',  require('./directives/product-packages/transformer.pricing'))

  // Filters
  .filter('isSelected', require('./filters/filter.isSelected'))

  // Directives
  .directive('chemwriterFilter', require('./directives/chemwriter-filter/directive'))
  .directive('packageDetail',    require('./directives/package-detail/directive'))
  .directive('productCard',      require('./directives/product-card/directive'))
  .directive('productPackages',  require('./directives/product-packages/directive'))
  .directive('productSpecs',     require('./directives/product-specs/directive'))
  .directive('sanitizeNumber',   require('./directives/sanitize-number'))
  .directive('selectionToggle',  require('./directives/selection-toggle'))

  // Services
  .provider('CriteriaService', require('./service.criteria'))

  .config(require('./router'));
