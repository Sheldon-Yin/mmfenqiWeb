'use strict';
/* Controllers */
define(function (require, exports, module) {
    console.log('controller');
    module.exports = function (app) {
        require('/app/js/services/demoService.js')(app);
        app.register.controller('PhoneListCtrl', ['$scope', 'Phone',
            function ($scope, Phone) {
                $scope.$root.title = 'haha';
                $scope.oktime = 2;
                $scope.orderProp = 'age';
                Phone.query();
                $scope.phones = Phone.query();
                console.log($scope.phones);
            }]);
        app.register.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
            function ($scope, $routeParams, Phone) {
                $scope.title = "美眉分期";
                $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function (phone) {
                    $scope.mainImageUrl = phone.images[0];
                });
                $scope.setImage = function (imageUrl) {
                    $scope.mainImageUrl = imageUrl;
                };
            }]);
    }
});