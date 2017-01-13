'use strict';

export default function() {

  return {
    restrict: 'E',
    replace: true,
    controller: 'SelectedCountryController',
    template: '<span class="component-selected-country">{{ country.name }}</span>'
  };

};
