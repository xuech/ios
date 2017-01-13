'use strict';

function CurrencyFilter(MessagesService) {
  return function(amount, currencyCode) {

    amount = ( amount || 0 ).toFixed( 2 ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let currencyCodes = MessagesService.currency;
    let format = currencyCodes[ currencyCode ] || currencyCodes[ 'currency' ];

    return `${format}${amount}`;

  }
}


module.exports = ['MessagesService', CurrencyFilter];
