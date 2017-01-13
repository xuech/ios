import _ from "lodash";

export default function(response, MessagesService) {

  if ( !response.data.filterFields ) {
    return response.data;
  }

  let filters = { purity_ds:{}, molecularWeight_f:{}, stockUnitStandard_ss:{} };
  _.each(response.data.filterFields, function(obj) {
    filters[ obj.field ] = _.pick( obj, 'value', 'lowValue', 'highValue' );
  });

  let selectionsMap = {
    suppliers:     'supplier_exact',
    productGroups: 'productGroup_s'
  };

  let selections = [
    {
      id   : selectionsMap.suppliers,
      label: 'Suppliers',
      value: filters[selectionsMap.suppliers]['value'] || []
    },
    {
      id   : selectionsMap.productGroups,
      label: 'Product Category',
      value: filters[selectionsMap.productGroups]['value'] || []
    }
  ];

  let purity = {
    label: 'Purity Filter',
    defaultLowValue : filters.purity_ds.lowValue,
    defaultHighValue: filters.purity_ds.highValue,
    purityLow : null,
    purityHigh: null
  };

  let molecularWeight = filters.molecularWeight_f;

  let molecular = {
    label: 'Molecular Weight',
    defaultLowValue : molecularWeight ? molecularWeight.lowValue  : null,
    defaultHighValue: molecularWeight ? molecularWeight.highValue : null,
    molecularWeightLow : null,
    molecularWeightHigh: null
  };

  // Hard coded now to avoid issues with EA units and their odd units showing up in the select list.
  let packagingUnits = {
    values: [ 'mg', 'g', 'kg', 'mL', 'L', 'μL', 'μmol' ]
  };

  angular.extend(response.data, {
    filterFields: {
      selectionsMap:  selectionsMap,
      selections:     selections,
      purity:         purity,
      molecular:      molecular,
      packagingUnits: packagingUnits
    }
  });


  // products need the MessagesService for their product name
  let messagesProducts = MessagesService.products.productGroups;
  let filtersProducts  = filters[selectionsMap.productGroups]['value'];
  _.each(filtersProducts, (product) => {
    let productId   = product.value;
    let productName = messagesProducts[ productId ];

    product.name = productName;
  });

  return response;

}
