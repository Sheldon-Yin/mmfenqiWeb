/**
 * Created by sheldon on 2016/4/19.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/orderService.js')(app);
        app.register.controller('OrderListCtrl', ['$scope', 'QueryMyOrder','$location',
            function ($scope, QueryMyOrder,$location) {

                if (myBridge) {
                    myBridge.callHandler('sendMessageToApp', {type: 8, data: {}}, function (response) {
                        $scope.$apply(function () {
                            $scope.appToken = response;
                        });
                    })
                }
                //TODO

                //$scope.appToken = 'MMFQ:hfB4RC9zM80v4ZI5ANbXiVVKyivU3TTJIZnhZfqx5btQzwgzDUxlgdnqjQDPw85z';

                $scope.data = QueryMyOrder.query({appToken: $scope.appToken});
                $scope.data.$promise.then(function (res) {
                    if (res.result != 0){
                        Toast(res.msg,3000);
                        $scope.loadError = true;
                    }else {
                        Toast('服务器返回错误',2020);
                    }
                }).catch(function (error) {
                    Toast(error,2000);
                    $scope.loadError = true;
                });

                $scope.goBack = function () {
                    if (myBridge) {
                        myBridge.callHandler('sendMessageToApp', {type: 1, data: {}}, function (response) {
                            alert(response);
                        })
                    }
                };

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

                console.log($scope.data);

                $scope.nowType = '全部订单';

                $scope.goToOrderDetail = function (x) {
                    if (myBridge) {
                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/order/detail?orderId=' + x.orderId);
                        myBridge.callHandler('sendMessageToApp', {
                            type: 2, data: {
                                url: jumpUrl,
                                leftNavItems: [1],
                                title: '订单详情'
                            }
                        }, function (response) {
                            //todo custom
                        });
                    }
                };

                $scope.setItems = function(x) {
                    $scope.nowType = x.project;
                    $scope.orderStatus = x.orderStatus;
                    $scope.data = QueryMyOrder.query({appToken: $scope.appToken,orderStatus:$scope.orderStatus});
                    $scope.selectState = 0;
                }

            }])
    }
});