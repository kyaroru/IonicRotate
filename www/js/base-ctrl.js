(function () {
  'use strict';

  angular
    .module('base.ctrl',[])
    .controller('BaseCtrl', ['$rootScope','$scope','$ionicPlatform','$timeout',function ($rootScope,$scope,$ionicPlatform,$timeout) {
      //variables
      var self = this;
      var isIOS = ionic.Platform.isIOS();
      var isAndroid = ionic.Platform.isAndroid();
      var currentPlatform = ionic.Platform.platform();

      self.toDisplay = {
        windowOrientation : "Window Orientation",
        screenOrientation: "Screen Orientation",
        screenOrientationType: "Screen Orientation Type",
        screenOrientationAngle: "Screen Orientation Angle"
      };

      //function declaration
      self.doRefresh = doRefresh;
      self.rotate = rotate;
      self.onRotate = onRotate;

      //initialization
      self.onRotate();

      function doRefresh(){
        $scope.$broadcast('scroll.refreshComplete');
      }

      function rotate(){
        if(window.cordova && screen.orientation) {
          if((isIOS && screen.orientation.indexOf('landscape') >-1 ) || (isAndroid && screen.orientation.type.indexOf('landscape') >-1 )) {
            screen.lockOrientation('portrait');
          }
          else {
            screen.lockOrientation('landscape');
          }
        }
        else {
          console.log('Cordova plugin is not available');
        }
      }

      function onRotate() {
        $timeout(function(){
          var windowOrientation = window.orientation? (window.orientation==0?0:window.orientation) : 'N/A';
          var screenOrientation = screen.orientation? screen.orientation : 'N/A';
          var screenOrientationType = screen.orientation? (isIOS? 'N/A': screen.orientation.type) :'N/A';
          var screenOrientationAngle = screen.orientation? (screen.orientation.angle==0?0:screen.orientation.angle) : 'N/A';

          self.data = {
            windowOrientation : windowOrientation,
            screenOrientation : screenOrientation,
            screenOrientationType : screenOrientationType,
            screenOrientationAngle : screenOrientationAngle
          }
        });
      }

      window.addEventListener("orientationchange", function(){
        self.onRotate();
      });


  }]);

})();
