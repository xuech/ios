'use strict';

import _ from 'lodash';

function PaymentTermsDirective($log, MessagesService) {

  return {
    restrict: 'AE',
    template: '<span class="component-payment-terms">{{ paymentTerms.display }}</span>',
    scope: {
      paymentTerms:    '=',
      newCompanyOrder: '='
    },

    link(scope, element, attrs) {
      const MESSAGES = MessagesService.paymentTerms;

      scope.$watch('paymentTerms', paymentTerms => {
        $log.debug( 'Trying to get paymentTerms, newCompanyOrder currently set to:', scope.newCompanyOrder );
        paymentTerms.display = MESSAGES[ paymentTerms.code ]

        if ( scope.newCompanyOrder ) {
          $log.debug('Overriding paymentTerms for pending');

          paymentTerms.title       = MESSAGES.pending;
          paymentTerms.longDisplay = MESSAGES.long.pending;
        }
        else {
          paymentTerms.title       = MESSAGES[ paymentTerms.code ];
          paymentTerms.longDisplay = MESSAGES.long[ paymentTerms.code ];
        }
      });

      scope.$watch('newCompanyOrder', newCompanyOrder => {
        $log.debug( 'newCompanyOrder of order updated to:', newCompanyOrder );

        if ( newCompanyOrder ) {
          $log.debug( 'Overriding paymentTerms for pending' );

          scope.paymentTerms.title       = MESSAGES.pending;
          scope.paymentTerms.longDisplay = MESSAGES.long.pending;
        }
      });
    }
  }

}

module.exports = ['$log', 'MessagesService', PaymentTermsDirective];
