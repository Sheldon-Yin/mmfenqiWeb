'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', 'Login','LogOut','MD5','toaster','$stateParams' ,function ($scope, $http, $state, Login,LogOut,MD5,toaster,$stateParams) {
    $scope.user = {};
    $scope.authError = null;

    if ($stateParams.name != null){
        $scope.app.hospitalName = $stateParams.name;
    }

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
                $state.go('app.bill.list')
            }else if (res.result == 0 && res.data.tenantInfo.adminType == 1){
                $state.go('app.bill.list')
            }else if (res.result == 0 && res.data.tenantInfo.adminType == 2){
                $state.go('app.bill.list')
            }else if (res.result == 0 && res.data.tenantInfo.adminType == 3){
                $state.go('app.report.list')
            }else if (res.result != 0){
                toaster.pop('error','登录失败',res.msg);
                console.log('登录失败');
            }
            console.log(res)
        }).catch(function (error) {
            toaster.pop('error','登录失败')
        })
    };
}])
;