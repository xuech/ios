'use strict';

module.exports = angular.module('common', [])
  // Services
  .factory('HistoryPageService', require('./services/service.history-page'))
  .factory('i18nService',        require('./services/service.i18n'))
  .provider('ObservableService', require('./services/service.observable'))

  // Directives
  .directive('barSubheader',           require('./directives/bar-subheader'))
  .directive('chemicalImage',          require('./directives/chemical-image/directive'))
  .directive('collapsibleIcon',        require('./directives/collapsible-icon/directive'))
  .directive('historyBackButton',      require('./directives/history-back-button/directive'))
  .directive('historySavePage',        require('./directives/history-save-page'))
  .directive('itemInventory',          require('./directives/item-inventory/directive'))
  .directive('ionScroll',              require('./directives/ion-scroll'))
  .directive('itemDrawer',             require('./directives/item-drawer'))
  .directive('itemIsLoading',          require('./directives/item-is-loading'))
  .directive('messageOutput',          require('./directives/message-output'))
  .directive('ngMin',                  require('./directives/ng-min'))
  .directive('ngMax',                  require('./directives/ng-max'))
  .directive('paymentTerms',           require('./directives/payment-terms/directive'))
  .directive('positionBarsAndContent', require('./directives/position-bars-and-content'))
  .directive('range',                  require('./directives/range'))
  .directive('tabSlideBox',            require('./directives/tab-slide-box/directive'))
  .directive('uiShade',                require('./directives/ui-shade'))
  .directive('uiShadow',               require('./directives/ui-shadow'))
  .directive('uiState',                require('./directives/ui-state'))

  // Transformers
  .service('ProductsTransformerInventory', require('./directives/item-inventory/transformer.products'))

  // Models
  .provider('InventoryModel',  require('./directives/item-inventory/model.inventory'))

  // Filters
  .filter('currency',  require('./filters/currency'))
  .filter('hasValue',  require('./filters/value'))
  .filter('thousands', require('./filters/thousands'));
