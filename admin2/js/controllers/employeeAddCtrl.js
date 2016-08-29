/**
 * Created by sheldon on 2016/5/4.
 */
app.controller('EmployeeAddCtrl', ['$scope', '$state','toaster',function ($scope,$state,toaster) {

    $scope.customer = {};

    $scope.addCustomer = function () {
        if (!!$scope.customer.sign_date) {
            var signDate = Date.parse($scope.customer.sign_date);
            console.log(signDate / 1000);
        }

        $.post('/html/mmfq/api/users/add_user', {
            username: $scope.employee.name,
            password: $scope.employee.password,
            real_name:$scope.employee.real_name,
            role: $scope.employee.role
        }).then(function (res) {
            if (res.code == 0) {
                console.log(res);
                if ($scope.submitState == 1) {
                    $state.go('app.employee.list')
                } else if ($scope.submitState == 0) {
                    alert('创建成功');
                    $state.reload()
                }
            } else {
                $scope.$apply(function () {
                    toaster.pop('error',res.message,'');
                });
            }

        }, function (error) {
            $scope.$apply(function () {
                toaster.pop('error',error,'');
            });
        })

    };

    $scope.backList = function () {
        $scope.submitState = 1;
        console.log($scope.submitState);
    };

    $scope.createNext = function () {
        $scope.submitState = 0;
        console.log($scope.submitState);
    }

}]);