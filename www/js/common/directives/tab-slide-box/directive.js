'use strict';

import TabSlideBoxController from './controller';


function TabSlideBox($timeout, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

  let ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
  let ionicScrollDelegate   = $ionicScrollDelegate;

  let config = {
    restrict: 'E',
    controller: TabSlideBoxController,

    link(scope, element, attrs) {
        var ta  = element[0], 
            $ta = element;

        $ta.addClass( 'tabbed-slidebox' );

        if ( attrs.tabsPosition === 'bottom' ) {
          $ta.addClass( 'btm' );
        }
        
        //Handle multiple slide/scroll boxes
        var handle = ta.querySelector('.slider').getAttribute( 'delegate-handle' );
        
        if ( handle ) {
          ionicSlideBoxDelegate = ionicSlideBoxDelegate.$getByHandle( handle );
        }
        
        if ( handle ) {
          ionicScrollDelegate = ionicScrollDelegate.$getByHandle( handle );
        }
        
        function renderScrollableTabs() {
          var iconsDiv = angular.element(ta.querySelector(".tsb-icons")), icons = iconsDiv.find("a"), wrap = iconsDiv[0].querySelector(".tsb-ic-wrp"), totalTabs = icons.length;
          var scrollDiv = wrap.querySelector(".scroll");
          
          angular.forEach(icons, function(value, key){
               var a = angular.element(value);
               a.on('click', function(){
                 ionicSlideBoxDelegate.slide(key);
               });

            if(a.attr('icon-off')) {
              a.attr("class", a.attr('icon-off'));
            }
          });
          
          var initialIndex = attrs.tab;
          //Initializing the middle tab
          if(typeof attrs.tab === 'undefined' || (totalTabs <= initialIndex) || initialIndex < 0){
            initialIndex = Math.floor(icons.length/2);
          }
          
          //If initial element is 0, set position of the tab to 0th tab 
          if(initialIndex == 0){
            setPosition(0);
          }
          
          $timeout(function() {
            ionicSlideBoxDelegate.slide(initialIndex);
          }, 0);
        }

        function setPosition(index){
          var iconsDiv = angular.element(ta.querySelector(".tsb-icons")), icons = iconsDiv.find("a"), wrap = iconsDiv[0].querySelector(".tsb-ic-wrp"), totalTabs = icons.length;
          var scrollDiv = wrap.querySelector(".scroll");

          var middle = iconsDiv[0].offsetWidth/2;
          var curEl = angular.element(icons[index]);
          var prvEl = angular.element(iconsDiv[0].querySelector(".active"));
          if(curEl && curEl.length){
          var curElWidth = curEl[0].offsetWidth, curElLeft = curEl[0].offsetLeft;

          if(prvEl.attr('icon-off')) {
            prvEl.attr("class", prvEl.attr('icon-off'));
          }
          else{
            prvEl.removeClass("active");
          }
          if(curEl.attr('icon-on')) {
            curEl.attr("class", curEl.attr('icon-on'));
          }
          curEl.addClass("active");
          
          var leftStr = (middle  - (curElLeft) -  curElWidth/2 + 5);
          //If tabs are not scrollable
          if(!scrollDiv){
            var leftStr = (middle  - (curElLeft) -  curElWidth/2 + 5) + "px";
            wrap.style.webkitTransform =  "translate3d("+leftStr+",0,0)" ;
          }
          else {
            //If scrollable tabs
            var wrapWidth = wrap.offsetWidth;
            var currentX = Math.abs(getX(scrollDiv.style.webkitTransform));
            var leftOffset = 100;
            var elementOffset = 40;
            //If tabs are reaching right end or left end
            if(((currentX + wrapWidth) < (curElLeft + curElWidth + elementOffset)) || (currentX > (curElLeft - leftOffset))){
              if(leftStr > 0){
                leftStr = 0;
              }
              //Use this scrollTo, so when scrolling tab manually will not flicker
              // ionicScrollDelegate.scrollTo(Math.abs(leftStr), 0, true);
            }
          }
          }
        }

        function getX(matrix) {
          matrix = matrix.replace("translate3d(","");
          matrix = matrix.replace("translate(","");
          return (parseInt(matrix));
        }
        var events = scope.events;
        events.on('slideChange', function(data){
          setPosition(data.index);
        });
        events.on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
          renderScrollableTabs();
        });
        
        renderScrollableTabs();
      }
  };


  return config;

}


module.exports = [
  '$timeout', 
  '$ionicSlideBoxDelegate', 
  '$ionicScrollDelegate',
  TabSlideBox
];