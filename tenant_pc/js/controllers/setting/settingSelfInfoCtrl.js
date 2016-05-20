/**
 * Created by sheldon on 2016/5/9.
 */
app.controller('SettingSelfInfoCtrl', ['$scope','ChangePassword','MD5',function($scope,ChangePassword,MD5) {

    $scope.setNewPassword  = function () {
        $scope.changePasswordReq = ChangePassword.save({
            oldPassword: MD5($scope.oldPassword),
            newPassword: MD5($scope.newPassword),
            confirmPassword: MD5($scope.confirmPassword),
            channel: 1
        });
        $scope.changePasswordReq.$promise.then(function (res) {
            if (res.result == 0){
                console.log(res)
            }else {
                console.log(res)
            }
        }).catch(function (error) {
            console.log(error)
        })
    }

}]);