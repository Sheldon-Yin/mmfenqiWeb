/**
 * Created by sheldon on 2016/5/9.
 */
app.controller('SettingUserAddCtrl', ['$scope', 'AddTenant', 'toaster', 'MD5','$state', function ($scope, AddTenant, toaster, MD5,$state) {
    $scope.addUser = function () {
        $scope.addUserReq = AddTenant.save({
            channel: 1,
            userName: $scope.userName,
            telephone: $scope.telephone,
            userType: $scope.userType,
            password: MD5($scope.password)
        });
        $scope.addUserReq.$promise.then(function (res) {
            if (res.result == 0) {
                toaster.pop('success', '添加成功');
                $state.go('app.setting.userList');
            } else {
                toaster.pop('error', res.msg, '');
            }

        }).catch(function (error) {
            toaster.pop('error', error, '')
        })
    }
}]);