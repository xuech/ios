'use strict';

import _ from 'lodash';

class FiltersModel {

  constructor() {
    this.isLoading = false;
    this.resetFilters();
  }

  resetFilters() {
    this.filters = {};
  }

  loadData() {
    let promises = [
      this.loadDataCompanies()
    ];

    this.isLoading = true;
    return this._$q.all( promises ).finally(() => {
      this.isLoading = false;
    });
  }

  loadDataCompanies() {
    // route uses resolve to fetch company data
    return this._service.findAll()
      .then((companies) => {
        this.companies = companies;
        this._matchCompaniesAndSuppliers();
      })
      .catch(() => {
        this.$log.error( 'There was an error retreiving products.' );
      });
  }

  updateFilters(filters) {
    if ( this.isNewCriteria === false ) {
      this._mergeFormerSupplierData( filters );
    }

    this.filters = filters;
    this._matchCompaniesAndSuppliers();
    this._logger.debug( 'FiltersModel#updateFilters', filters );
  }

  updateSelectionFiltersById(selectionId, values) {
    let selection = this._getFiltersSelectionById( selectionId );

    // take values, and update each model with isSelected
    // this data will persist between filters & selections views
    // and will be persisted throughout the session
    _.each(selection.value, (model) => {
      model.isSelected = _.contains( values, model.value );
    });
  }

  setFilterValues(filters={}) {
    this.setFilterSelectionsValues( filters );
    this.setFilterFieldValues( filters );
  }

  setFilterSelectionsValues(filters={}) {
    // set selections
    let selectionsMap = this.filters.selectionsMap;
    _.each(selectionsMap, (id, key) => {
      let values = filters[ key ];
      this.updateSelectionFiltersById( id, values );
    });
  }

  setFilterFieldValues(filters={}) {
    // set purity
    if ( filters.purityLow ) {
      this.filters.purity.purityLow = filters.purityLow;
    }
    if ( filters.purityHigh ) {
      this.filters.purity.purityHigh = filters.purityHigh;
    }

    // set molecular
    if ( filters.molecularWeightLow ) {
      this.filters.molecular.molecularWeightLow = filters.molecularWeightLow;
    }
    if ( filters.molecularWeightHigh ) {
      this.filters.molecular.molecularWeightHigh = filters.molecularWeightHigh;
    }

    // set packagingUnits
    if ( filters.unitStock ) {
      this.filters.packagingUnits.unitStock = filters.unitStock;
    }
    if ( filters.selectedUnit ) {
      this.filters.packagingUnits.selectedUnit = filters.selectedUnit;
    }
  }

  getFilterValues() {
    let selections = this._getAllFiltersSelectionValues();

    let purity = _.pick( this.filters.purity, 'purityLow', 'purityHigh' );
    let purityDefaults = { purityLow: null, purityHigh: null };
    purity = _.pick( purity, _.identity );
    purity = _.extend( purityDefaults, purity ); // extend data, default to null for localStorage

    let molecular = _.pick( this.filters.molecular, 'molecularWeightLow', 'molecularWeightHigh' );
    let molecularDefauls = { molecularWeightLow: null, molecularWeightHigh: null };
    molecular = _.pick( molecular, _.identity );
    molecular = _.extend( molecularDefauls, molecular ); // extend data, default to null for localStorage

    let packagingUnits = _.pick( this.filters.packagingUnits, 'unitStock', 'selectedUnit' );
    let packagingUnitsDefaults = { unitStock: null, selectedUnit: null };
    packagingUnits = _.pick( packagingUnits, _.identity );

    // both `unitStock` and `selectedUnit` need to have a value
    if ( !packagingUnits.unitStock || !packagingUnits.selectedUnit ) {
      packagingUnits.unitStock    = null;
      packagingUnits.selectedUnit = null;
    }

    packagingUnits = _.extend( packagingUnitsDefaults, packagingUnits ); // extend data, default to null for localStorage

    return _.extend( {}, selections, purity, molecular, packagingUnits );
  }

  getFiltersSelectionById(selectionId) {
    let selection = this._getFiltersSelectionById( selectionId );
    return angular.copy( selection );
  }

  _mergeFormerSupplierData(filters={}) {
    let selectionId      = this.filters.selectionsMap.suppliers;
    let suppliersFormer  = this._getFiltersSelectionById( selectionId ).value;
    let suppliersCurrent = this._getFiltersSelectionById( selectionId, filters ).value;

    _.extend( suppliersCurrent, suppliersFormer );
  }

  _getFiltersSelectionById(selectionId, filters) {
    filters = filters || this.filters;
    let selections = filters.selections;
    let selection  = _.findWhere( selections, {id: selectionId} );
    return selection;
  }

  _getAllFiltersSelectionValues() {
    let selectionValues = {};
    let selectionsMap = this.filters.selectionsMap;

    _.each(selectionsMap, (selectionId, key) => {
      let selection = this.getFiltersSelectionById( selectionId );
      let selected  = _.where( selection.value, { isSelected: true } );
      selectionValues[key] = _.pluck( selected, 'value' );
    });

    return selectionValues;
  }

  _matchCompaniesAndSuppliers() {
    if ( !this.filters.selectionsMap ) return;

    // this is gross, but we need to pair up the companies and suppliers
    // try to find a cleaner way to do this
    let suppliersMap = this.filters.selectionsMap;
    let selectionId  = suppliersMap.suppliers;
    let companies    = this.companies;
    let suppliers    = this._getFiltersSelectionById( selectionId ).value;

    _.each(suppliers, (supplier) => {
      let supplierName = supplier.value;
      let company = _.findWhere( companies, { name: supplierName });

      supplier.name = company ? company.name : '';
    });
  }

}


export default function() {

  this.instance = new FiltersModel();

  this.$get = ['$log', '$q', 'ResultsTransformerProducts', 'CompaniesService', ($log, $q, ResultsTransformerProducts, CompaniesService) => {
    this.instance._logger  = $log;
    this.instance._$q      = $q;
    this.instance._service = new CompaniesService();

    // products contain our filter fields based on products returned
    ResultsTransformerProducts.then((response) => {
      let data = response.data;
      if ( data ) {
        let filters = data.filterFields;
        this.instance.updateFilters( filters );
      }
    });

    return this.instance;
  }];

}
