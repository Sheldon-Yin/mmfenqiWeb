/**
 * Created by sheldon on 2016/5/4.
 */
app.controller('CustomerAddCtrl', ['$scope', '$state', 'toaster', function ($scope, $state, toaster) {

    $scope.customer = {};

    $scope.addCustomer = function () {
        if (!!$scope.customer.sign_date) {
            var signDate = Date.parse($scope.customer.sign_date);
            console.log(signDate / 1000);
        }

        $.post('/html/mmfq/api/customers/add_customer', {
            name: $scope.customer.name,
            telephone: $scope.customer.telephone,
            school: $scope.customer.school,
            age: $scope.customer.age,
            push: $scope.customer.push,
            sign_date: signDate / 1000
        }).then(function (res) {
            if (res.code == 0) {
                console.log(res);
                if ($scope.submitState == 1) {
                    $state.go('app.customer.list')
                } else if ($scope.submitState == 0) {
                    $scope.$apply(function () {
                        toaster.pop('success', '添加成功');
                    });
                }
            } else {
                console.log(res);
            }

        }, function (error) {
            console.log(error)
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