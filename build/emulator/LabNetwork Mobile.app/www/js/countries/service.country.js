'use strict';
import _ from 'lodash';

var CountryService = function($log, $rootScope, localStorageService, i18nService, SessionService, ObservableService, CountryResources) {

  // Private Properties
  var ipCountry      = null,
      countriesCache = null,
      observable     = new ObservableService();


  // Public Properties
  var service = {
    country:   'US',
    countries: [],

    initialize:          initialize,
    getCountryByISOCode: getCountryByISOCode,
    getCountryByIP:      getCountryByIP,
    setCountryISOCode:   setCountryISOCode,
    onChange:            observable.promise
  };


  /**
   * Private Methods
  **/
  function handleUpdatingCountries(countries=[]) {
    service.countries = countries;
    observable.resolve();
  }

  function handleUserCountry(evt, data) {
    var country;
    let canOverride   = canUserOverride();
    let isLoggedIn    = SessionService.isLoggedIn;
    let storedCountry = localStorageService.get( 'country' );

    if ( isLoggedIn && !canOverride ) {
      country = data.user.countryIsoCode2;
    }
    else if ( storedCountry && !isLoggedIn ) {
      country = storedCountry;
    }
    else {
      country = ipCountry;
    }
    //由于手机上面运行可能会网络访问较慢无法获取到country的值,制定一个默认值
    if (!country){
      country="CN";
    }

    service.setCountryISOCode( country );
    observable.resolve();
  }

  function canUserOverride() {
    let isLoggedIn  = SessionService.isLoggedIn;
    let isSiteAdmin = SessionService.isSiteAdmin;
    let isCSR       = SessionService.isCSR;

    return isLoggedIn && ( isCSR || isSiteAdmin );
  }


  /**
   * Public Methods
  **/
  function initialize() {
    return getCountryByIP().then( data => ipCountry = data.isoCode2 );
  }

  function getCountries() {
    return CountryResources.findAll().$promise;
  }

  function getCountryByIP() {
    return CountryResources.findByIP().$promise;
  }

  function getCountryByISOCode(isoCode2) {
    return _.findWhere( service.countries, { isoCode2 } );
  }

  function setCountryISOCode(isoCode2) {
    let isLoggedIn  = SessionService.isLoggedIn;
    let canOverride = canUserOverride();

    if ( !isLoggedIn || canOverride ) {
      localStorageService.set( 'country', isoCode2 );
    }

    service.country = isoCode2;
    observable.resolve();
  }


  /**
   * Constructor Code
  **/
  $rootScope.$on( 'user:metadata:change', handleUserCountry );
  getCountries().then( handleUpdatingCountries );


  // return service
  return service;

}

module.exports = [
  '$log',
  '$rootScope',
  'localStorageService',
  'i18nService',
  'SessionService',
  'ObservableService',
  'CountryResources',
  CountryService
];
