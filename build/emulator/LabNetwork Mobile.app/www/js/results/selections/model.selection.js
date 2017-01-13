'use strict';

import _ from 'lodash';

class SelectionModel {

  constructor(selectionId) {
    let selection  = this._filters.getFiltersSelectionById( selectionId );
    this.selection = selection;

    this.setContentBySelectionType( selectionId );
  }

  hasMultipleItems() {
    let totalItems = this.selection.value.length;
    return totalItems > 1;
  }

  areAllItemsSelected() {
    let totalItems = this.selection.value.length;
    let selections = _.where( this.selection.value, { isSelected: true } );
    return totalItems === selections.length;
  }

  toggleSelectAll(isSelected) {
    // preserve {}'s to prevent return value which cancels .each
    _.each( this.selection.value, item => { item.isSelected = isSelected } );
  }

  save() {
    let selections = _.where( this.selection.value, { isSelected: true } );
    let values     = _.pluck( selections, 'value' );

    this._filters.updateSelectionFiltersById( this.selection.id, values );
    this._logger.debug( 'SelectionModel#save', this.selection.id, values );
  }

  setContentBySelectionType(type) {
    let map = this._map;

    switch(type) {
      case map.suppliers:
        this.setContentAsSupplier();
        break;

      case map.brands:
        this.setContentAsBrand();
        break;

      case map.productGroups:
        this.setContentAsProduct();
        break;
    }
  }

  setContentAsSupplier() {
    this.displayCount = true;
  }

  setContentAsBrand() {
    //
  }

  setContentAsProduct() {
    //
  }

}


export default function() {

  this.instance = SelectionModel;

  this.$get = ['$log', 'FiltersModel', ($log, FiltersModel) => {
    this.instance.prototype._logger   = $log;
    this.instance.prototype._filters  = FiltersModel;
    this.instance.prototype._map      = FiltersModel.filters.selectionsMap;

    return this.instance;
  }];

}
