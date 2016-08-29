'use strict';
/* Controllers */
define(function (require, exports, module) {
    console.log('controller');
    module.exports = function (app) {
        // require('/app/js/services/demoService.js')(app);
         require('directives/directives.js')(app);
        app.register.controller('PhoneListCtrl', ['$scope', function ($scope) {
            $scope.goToSearch = function () {
                alert('搜索！')
            };

            $scope.name = '林炳文';

            $scope.value=2;


            $scope.aaaa=0;

            $scope.click=function () {
                $scope.value='44'
            };


            $scope.time=false;

            $scope.action=function () {
                $scope.time=true;
            }

            $scope.config={
                title:'提示'
            }
        }])
    };
        //     function ($scope, Phone) {
        //         $scope.$root.title = 'haha';
        //         $scope.oktime = 2;
        //         $scope.orderProp = 'age';
        //         Phone.query();
        //         $scope.phones = Phone.query();
        //         console.log($scope.phones);
        //     }]);
        // app.register.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
        //     function ($scope, $routeParams, Phone) {
        //         $scope.title = "美眉分期";
        //         $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function (phone) {
        //             $scope.mainImageUrl = phone.images[0];
        //         });
        //         $scope.setImage = function (imageUrl) {
        //             $scope.mainImageUrl = imageUrl;
        //         };
        //     }]);

    
});
