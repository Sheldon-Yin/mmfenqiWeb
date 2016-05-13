'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function () {
        $scope.authError = null;
        // Try to login
        var formData = new FormData();
        formData.append('name', $scope.user.email);
        formData.append('password', $scope.user.password);
        $.ajax({
                url: '/api/login',
                data: formData,
                method: 'POST',
                contentType: false,//必须
                processData: false,//必须
                success: function (response) {
                    if (response.data.result == 0) {
                        alert('登陆成功')
                    } else {
                        alert('登陆失败')
                    }
                },
                error: function (error) {
                    $scope.authError = 'Server Error';
                }
            }
        )
    }
    ;
}
])
;