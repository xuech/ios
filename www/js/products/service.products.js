'use strict';

import _ from 'lodash';


class ProductsService {

  findAll(data={}) {
    if ( data.molfile ) {
      return this.findAllProductsByMolfile( data );
    }
    else {
      return this.findAllProducts( data );
    }
  }

  findAllProducts(data={}) {
    return this._resources.products( data ).$promise;
  }

  findAllProductsByMolfile(data={}) {
    if ( !data.molfile ) {
      let defer = this._$q.defer();
      defer.reject( 'molfile was not found in data' );
      return defer.promise;
    }

    let properties = [ 'country', 'pageSize', 'startRecord', 'molfile', 'similarityThreshold', 'structureEditorEnabled', 'structureSearchType' ];
    //生成一个对象,第一个参数是数据源,第二个参数是需要从数据源中拿的属性.
    let params = _.pick.apply( null, [ data, properties ] );
    //生成一个对象,第一个参数是数据源,第二个参数是数据源中不要的属性.
    data       = _.omit.apply( null, [ data, properties ] );
    return this._resources.productsFromMolfile( data, params ).$promise;
  }

  find(productId) {
    let params = {
      productId: productId,
      countryId: this._serviceCountry.country
    };

    return this._resources.product( params ).$promise;
  }

  getInventoryByProductIds(productIds) {
    let params = {
      productIds: productIds
    };

    return this._resources.productInventory( params ).$promise;
  }

  getPackageInventory(productId, packageId) {
    let params = {
      productId: productId,
      packageId: packageId
    };

    return this._resources.packageInventory( params ).$promise;
  }

  loadImageUrl(chemId, group={}) {
    const IMAGE_URL = 'img/products/no_image.png';
    let deferred = this._$q.defer();

    group.imageUrl = '';

    if ( chemId ) {
      this._resources.chemicalImages({ chemId: chemId })
        .$promise.then(function(response) {
          let data = response.data;
          group.imageUrl = data.imageUrl ? data.imageUrl : IMAGE_URL;
          deferred.resolve( group );
        });
    }
    else {
      group.imageUrl = IMAGE_URL;
      deferred.reject();
    }

    return deferred.promise;
  }

  getUnitLitersCase(unit) {
		if (unit) {
			if ( unit.match(/(( |\d|m)+l$)|(^m*l)$/) ) {
				return unit.substr(0, unit.length - 1) + 'L';
			}
		}

		return unit;
	}

  getProductPackageInfo(pkg={}) {
    let size = pkg.packagingSize;
		let unit = pkg.packagingUnit;

		//normalize micro-mol units at the catalog level
		if ( unit == "µm" || unit == "mkmol" ) {
			unit = "µmol";
		}

		if ( !size ) {
			size = pkg.unitSize;
			unit = pkg.unit;
		}

		unit = this.getUnitLitersCase( unit );

    if ( unit === 'ea' ) {
			if ( pkg.unitDescription ) {
				//This will display ea items with only the unit, which may be
				//me an issue on a small subset of unit types like 'cake'.
				//However it display things like 1x6gal cleaner.
				return pkg.unitDescription;
			}
      else {
				unit = ' ' + unit;
			}
		}

		if (size && unit) {
			return size + unit;
		}
    else {
			return false;
		}
  }
}


export default function() {

  this.instance = ProductsService;

  this.$get = ['$q', 'ProductsResources', 'CountryService', ($q, ProductsResources, CountryService) => {
    this.instance.prototype._$q = $q;
    this.instance.prototype._resources      = ProductsResources;
    this.instance.prototype._serviceCountry = CountryService;

    return this.instance;
  }];

}
