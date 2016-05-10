/**
 * Created by sheldon on 2016/5/4.
 */

app.controller('EmployeeListCtrl', ['$scope','$state','toaster', function ($scope,$state,toaster) {
    $scope.initUsers = function () {
        $.get('/mmfq/api/users/get_users').then(function (res) {
            if (res.code == 0){
                $scope.$apply(function () {
                    console.log(res);
                    $scope.employeeListData = res.data;
                });
            }else {
                console.log(res.message)
            }
        }, function (error) {
            console.log(error)
        });
    };

    $scope.initUsers();

    $scope.jumpToAdd = function () {
        $state.go('app.employee.add')
    };

    $scope.deleteEmployee = function (x) {
        $.post('/mmfq/api/users/delete_user',{
            user_id: x.id
        }).then(function (res) {
            if (res.code == 0){
                console.log(res);
                $state.reload();
            }else {
                console.log(res.message)
            }
        }, function (error) {
            console.log(error)
        });
    };

    $scope.changeUserRole = function (x) {
        $.post('/mmfq/api/users/update_user_role',{
            user_id: x.id,
            role: x.role
        }).then(function (res) {
            if (res.code == 0){
                console.log(res);

                $scope.$apply(function () {
                    toaster.pop('success',res.message,'');
                    $scope.initUsers();
                })
            }else {
                $scope.$apply(function () {
                    toaster.pop('error', res.message, '');
                });
                console.log(res.message);
            }
        }, function (error) {
            $scope.$apply(function () {
                toaster.pop('error', error, '');
            });
            console.log(error)
        });
    }

}]);