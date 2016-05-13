/**
 * Created by sheldon on 2016/5/7.
 */

app.controller('UserDetailCtrl', ['$scope', '$state', '$stateParams', '$modal', 'toaster', function ($scope, $state, $stateParams, $modal, toaster) {

    $.get('/html/mmfq/api/users/get_user_info', {}).then(function (res) {
        if (res.code == 0) {
            $scope.$apply(function () {
                console.log(res.data);
                $scope.user = res.data
            })
        } else {
            console.log(res.message)
        }
    }, function (error) {
        console.log(error)
    });

    $scope.updatePassword = function () {
        $.post('/html/mmfq/api/users/update_user_info', {
            password: $scope.user.newPassword
        }).then(function (res) {
            if (res.code == 0) {
                $scope.$apply(function () {
                    alert('修改成功');
                    $state.reload();
                })
            } else {
                toaster.pop('error', res.message, '');
            }
        }, function (error) {
            toaster.pop('error', error, '');
        })
    };

}]);