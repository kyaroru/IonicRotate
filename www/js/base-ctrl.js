(function () {
  'use strict';

  angular
    .module('base.ctrl',[])
    .controller('BaseCtrl', ['$rootScope','$scope','$ionicPlatform','$timeout',function ($rootScope,$scope,$ionicPlatform,$timeout) {
      //variables
      var self = this;
      var isIOS = ionic.Platform.isIOS();
      var isAndroid = ionic.Platform.isAndroid();

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
        $window.location.reload(true)
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
        var windowOrientation = window.orientation;
        var screenOrientation = window.screen.orientation;
        var screenOrientationType = window.screen.orientation.type;
        var screenOrientationAngle = window.screen.orientation.angle;

        self.data = {
          windowOrientation : windowOrientation,
          screenOrientation : screenOrientation,
          screenOrientationType : screenOrientationType,
          screenOrientationAngle : screenOrientationAngle
        }
      }

      window.addEventListener("orientationchange", function(){
        self.onRotate();
      });


  }]);

})();
