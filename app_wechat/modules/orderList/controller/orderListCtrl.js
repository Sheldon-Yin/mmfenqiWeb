/**
 * Created by sheldon on 2016/4/19.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/orderService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('OrderListCtrl', ['$scope', 'QueryMyOrder', '$location', 'Bridge',
            function ($scope, QueryMyOrder, $location, Bridge) {

                console.log(1);
                Bridge.appToken(function (response) {

                    $scope.appToken = response;
                    if (!!$location.search().orderStatus) {
                        $scope.data = QueryMyOrder.query({
                            appToken: $scope.appToken,
                            orderStatus: $location.search().orderStatus
                        });
                    } else {
                        $scope.data = QueryMyOrder.query({
                            appToken: $scope.appToken,
                            orderStatus: -1
                        });
                    }

                    $scope.data.$promise.then(function (res) {
                        if (res.result != 0) {
                            Toast(res.msg, 3000);
                            $scope.loadError = true;
                        } else {
                            Toast('获取订单成功', 2020);
                        }
                    }).catch(function (error) {
                        Toast('服务器错误' + error, 2000);
                        $scope.loadError = true;
                    });

                    console.log($scope.data);

                    if ($location.search().orderStatus == 1) {
                        $scope.nowType = '待支付'
                    } else if ($location.search().orderStatus == 2) {
                        $scope.nowType = '待完成'
                    } else if ($location.search().orderStatus == 3) {
                        $scope.nowType = '已完成'
                    } else if ($location.search().orderStatus == 4) {
                        $scope.nowType = '已取消'
                    } else if ($location.search().orderStatus == 5) {
                        $scope.nowType = '退款审核中'
                    } else if ($location.search().orderStatus == 6) {
                        $scope.nowType = '退款成功'
                    } else {
                        $scope.nowType = '全部订单';
                    }

                    $scope.goToOrderDetail = function (x) {
                        Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/order/detail?orderId=' + x.orderId), '订单详情');
                    };

                    $scope.setItems = function (x) {
                        $scope.nowType = x.project;
                        $scope.orderStatus = x.orderStatus;
                        $scope.data = QueryMyOrder.query({
                            appToken: $scope.appToken,
                            orderStatus: $scope.orderStatus
                        });
                        $scope.selectState = 0;
                    }


                });

                $scope.projects = [
                    {
                        project: '全部订单',
                        orderStatus: -1
                    },
                    {
                        project: '待支付',
                        orderStatus: 1
                    },
                    {
                        project: '待完成',
                        orderStatus: 2
                    },
                    {
                        project: '已完成',
                        orderStatus: 3
                    },
                    {
                        project: '已取消',
                        orderStatus: 4
                    },
                    {
                        project: '退款审核中',
                        orderStatus: 5
                    },
                    {
                        project: '退款成功',
                        orderStatus: 6
                    }
                ];

            }])
    }
});