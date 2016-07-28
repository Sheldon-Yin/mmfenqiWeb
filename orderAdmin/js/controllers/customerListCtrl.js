/**
 * Created by sheldon on 2016/5/4.
 */

app.controller('CustomerListCtrl', ['$scope', '$state', 'toaster', '$resource', function ($scope, $state,toaster,  $resource) {

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

    $scope.getDefaultTime();
    $scope.currentPage = 1;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
        console.log(pageNo)
    };


    $scope.pageChanged = function () {
        console.log($scope.currentPage);
        $scope.initData($scope.currentPage)
    };

    $scope.initData = function (index) {
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

        $scope.getCustomerListReq = $resource('/html/mmfq/api/customers/get_customers', {}, {
            query: {method: 'GET'}
        });

        $scope.req = $scope.getCustomerListReq.query({
            start_time: Date.parse($scope.start_time) / 1000 ? Date.parse($scope.start_time) / 1000 : Date.parse($scope.last_month) / 1000,
            end_time: Date.parse($scope.end_time) / 1000 ? Date.parse($scope.end_time) / 1000 : Date.parse($scope.today) / 1000,
            index: (index-1),
            key_words: !!$scope.keyWords ? $scope.keyWords : ''
        });
        $scope.req.$promise.then(function (res) {
            console.log(res);
            $scope.customerListData = res.data;
            $scope.bigTotalItems = res.data.length;
        });
    };

    $scope.initData($scope.currentPage);


    $.get('/html/mmfq/api/users/get_users').then(function (res) {
        $scope.$apply(function () {
            console.log(res);
            $scope.options = res.data;
        })
    }, function (error) {
        toaster.pop('error', '获取失败', error);
    });


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