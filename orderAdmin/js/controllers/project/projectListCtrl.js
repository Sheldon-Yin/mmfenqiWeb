/**
 * Created by sheldon on 2016/5/9.
 */

app.controller('ProjectList', ['$scope', '$state', 'toaster', function ($scope, $state, toaster) {

    $scope.initData = function () {
        $.get('/html/mmfq/api/customers/get_customers').then(function (res) {
            $scope.$apply(function () {
                console.log(res);
                $scope.customerListData = res.data;
            });
        });
    };

    $.get('/html/mmfq/api/users/get_users').then(function (res) {
        $scope.$apply(function () {
            console.log(res);
            $scope.options = res.data;
        })
    }, function (error) {
        toaster.pop('error', '获取失败', error);
    });


    $scope.initData();

    $scope.customerStar = function (x) {
        x.waitingForStar = true;
        console.log(x.id);
        $.post('/html/mmfq/api/customers/toggle_star', {
            customer_id: x.id
        }).then(function (res) {
            if (res.code == 0) {
                $scope.$apply(function () {
                    toaster.pop('success', '操作成功', '');
                    x.waitingForStar = false;
                    x.star = (x.star == '1') ? '0' : '1';
                })
            } else {
                console.log(res.message);
            }
        }, function (error) {
            console.log(error)
        })
    };

    $scope.jumpToAdd = function () {
        $state.go('app.customer.add')
    };


    $scope.jumpToDetail = function (x) {
        $state.go('app.customer.detail', {id: x.id})
    };

    $scope.changeCustomerUser = function (x) {
        $.post('/html/mmfq/api/customers/change_customer_user_id', {
            customer_id: x.id,
            user_id: x.user_real_name
        }).then(function (res) {
            if (res.code == 0) {
                $scope.$apply(function () {
                    console.log(res);
                    $scope.initData();
                    toaster.pop('success', '指派成功', '');
                })
            } else {
                console.log(res.message);
            }
        }, function (error) {
            console.log(error)
        })
    }
}]);