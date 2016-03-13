var app = angular.module('studio', ['ngMaterial'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('grey', { 'default': '100' })
          .accentPalette('grey', { 'default': '300' });
    })
    .run(function ($log) {
        $log.debug("app started + ngMaterial");

    });



app.controller('MainCtrl', function ($scope, $timeout, $mdSidenav, $log, $mdMedia) {
    $scope.toggleLeft = buildToggler('left');
    $scope.isOpenRight = function () {
        return $mdSidenav('right').isOpen();
    };


    function debounce(func, wait, context) {
        var timer;
        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    function buildToggler(navID) {
        return debounce(function () {
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                  $log.debug("toggle " + navID + " is done");
              });
        }, 200);
    }

});
