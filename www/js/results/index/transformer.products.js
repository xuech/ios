import _ from "lodash";

export default function(response, ProductsService, PricingService) {

  let productIds = [];
  let groupStore = {};
  let data = response.data;

  // build out productIds & groupStore
  _.each(data.groups, group => {
    var ids    = _.pluck( group.products, 'id' );
    let groups = Array.apply( null, Array(5) ).map( () => group );
    let productGroup = _.object( ids, groups );

    _.extend( groupStore, productGroup );
    productIds.push( ids );
  });

  // flatten productIds into an array
  productIds = _.flatten( productIds );

  function getProductById(productId) {
    let group   = groupStore[ productId ];
    let product = _.findWhere( group.products, { id: productId } );
    return product;
  }

  // find inventory by all given productIds
  ProductsService.getInventoryByProductIds( productIds ).then(data => {
    let productInventory = data.listProductInventory || [];
    _.each(productInventory, inventory => {
      let productId = inventory.productId;
      let product = getProductById( productId );

      // add inventory to product
      product.inventory = inventory;
    });
  });

  // find starting at prices
  PricingService.findAll( productIds ).then(response => {
    let prices = response.data.prices || [];
    _.each(prices, price => {
      let productId = price.productId;
      let product = getProductById( productId );

      // add inventory to product
      _.extend( product, price );
    })
  });

}
