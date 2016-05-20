/**
 * Created by sheldon on 2016/5/4.
 */

app.controller('CustomerListCtrl', ['$scope', '$state', 'toaster', function ($scope, $state, toaster) {

    $scope.getDefaultTime = function () {
        $scope.today = new Date();
        $scope.last_month = new Date();
        $scope.today.setHours(23);
        $scope.today.setMinutes(59);
        $scope.today.setSeconds(59);
        $scope.last_month.setMonth($scope.last_month.getMonth() - 1);
        $scope.last_month.setHours(0);
        $scope.last_month.setMinutes(0);
        $scope.last_month.setSeconds(1);
    };

    $scope.myFilter = 150;

    $scope.getDefaultTime();

    $scope.initData = function () {
        $.get('/html/mmfq/api/customers/get_customers').then(function (res) {
            $scope.$apply(function () {
                console.log(res);
                $scope.customerListData = res.data;
            });
        });
    };

    $scope.updateData = function () {
        if (!!$scope.end_time) {
            $scope.end_time.setHours(23);
            $scope.end_time.setMinutes(59);
            $scope.end_time.setSeconds(59);
        }

        if (!!$scope.start_time) {
            $scope.start_time.setHours(0);
            $scope.start_time.setMinutes(0);
            $scope.start_time.setSeconds(1);
        }

        $.get('/html/mmfq/api/customers/get_customers', {
            start_time: Date.parse($scope.start_time) / 1000 ? Date.parse($scope.start_time) / 1000 : Date.parse($scope.last_month) / 1000,
            end_time: Date.parse($scope.end_time) / 1000 ? Date.parse($scope.end_time) / 1000 : Date.parse($scope.today) / 1000
        }).then(function (res) {
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
                $scope.$apply(function () {
                    toaster.pop('info', res.message, '');
                    x.waitingForStar = false;
                })
            }
        }, function (error) {
            $scope.$apply(function () {
                toaster.pop('error', error, '');
                x.waitingForStar = false;
            })
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
                $scope.$apply(function () {
                    toaster.pop('info', res.message, '');
                })
            }
        }, function (error) {
            $scope.$apply(function () {
                toaster.pop('info', error, '');
            })
        })
    };

    $.get('/html/mmfq/api/intention_kinds/get_intention_kinds').then(function (res) {
        if (res.code == 0) {
            $scope.$apply(function () {
                $scope.intentionKinds = res.data;
            })
        } else {
            $scope.$apply(function () {
                toaster.pop('error', '获取意向分类失败', res.message);
            })
        }
    }, function (error) {
        $scope.$apply(function () {
            toaster.pop('error', '获取意向分类失败', error);
        })
    });

}]);