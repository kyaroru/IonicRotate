(function () {
  'use strict';

  angular
    .module('base.ctrl',[])
    .controller('BaseCtrl', ['$rootScope','$scope','$ionicPlatform','$ionicModal','$timeout',function ($rootScope,$scope,$ionicPlatform,$ionicModal,$timeout) {
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
      self.openModal = openModal;
      self.closeModal = closeModal;
      self.doRefresh = doRefresh;
      self.rotate = rotate;
      self.onRotate = onRotate;

      //initialization
      self.onRotate();

      $ionicModal.fromTemplateUrl('js/modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        self.modal = modal;
      });

      function openModal() {
        self.modal.show();
      };

      function closeModal() {
        self.modal.hide();
      };

      function doRefresh(){
        $scope.$broadcast('scroll.refreshComplete');
      }

      function getOrientation() {
        var orientation = '';
        if(window.cordova && screen.orientation) {
          orientation = window.orientation==90 || window.orientation==-90? 'landscape':(window.orientation==0 || window.orientation==180?'portrait':'');
        }
        return orientation;
      }

      function rotate(){
        if(window.cordova && screen.orientation) {
          if(getOrientation()=='landscape') {
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
          var windowOrientation = window.orientation==0? 0 : window.orientation;
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
