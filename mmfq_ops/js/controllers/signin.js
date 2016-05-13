'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', 'Login','LogOut','MD5', function ($scope, $http, $state, Login,LogOut,MD5) {
    $scope.user = {};
    $scope.authError = null;

    $scope.logOutReq = LogOut.query({

    });
    $scope.logOutReq.$promise.then(function (res) {
        console.log(res)
    }).catch(function (error) {
        console.log(error)
    });

    $scope.login = function () {
        $scope.authError = null;
        // Try to login
        $scope.loginReq = Login.save({
            userName: $scope.user.username,
            password:MD5($scope.user.password),
            channel: 1
        });
        $scope.loginReq.$promise.then(function (res) {
            if (res.result == 0 && res.data.tenantInfo.adminType == 0){
                $state.go('app.setting.userList')
            }else if (res.result == 0 && res.data.tenantInfo.adminType == 1){
                $state.go('app.order.list')
            }else if (res.result == 0 && res.data.tenantInfo.adminType == 2){
                $state.go('app.bill.list')
            }else if (res.result != 0){
                console.log('登录失败');
            }
            console.log(res)
        }).catch(function (error) {
           /* $scope.apply(function () {
                toaster.pop('error',error);
            });*/
        })
    };
}])
;