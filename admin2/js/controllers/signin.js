'use strict';
/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function ($scope, $http, $state) {

    $.post('/system/loginOut').then(function (res) {
        console.log(res);
    }, function (error) {
        console.log(error)
    });

    $scope.user = {};
    $scope.authError = null;
    $scope.login = function () {
        $scope.authError = null;
        // Try to login
        $.post('/admin/login',
            {username: $scope.user.name, password: $scope.user.password}
            )
            .then(function (response) {
                console.log(response);
                if (response.result != 0) {
                    $scope.$apply(function () {
                        $scope.authError = response.message;
                    });
                } else {
                    $state.go('app.customer.list');
                }
            }, function (x) {
                $scope.authError = 'Server Error';
            });
    };
}])
;