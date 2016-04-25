/**
 * Created by sheldon on 2016/4/19.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/queryOrderService.js')(app);
        app.register.controller('OrderListCtrl', ['$scope', 'queryOrder',
            function ($scope, queryOrder) {

                //TODO
                $scope.appToken = 'MMFQ:hfB4RC9zM80v4ZI5ANbXiVVKyivU3TTJIZnhZfqx5btQzwgzDUxlgdnqjQDPw85z';

                $scope.goBack = function () {
                    if (myBridge) {
                        myBridge.callHandler('sendMessage', {type: 1, data: {}}, function (response) {
                            alert(response);
                        })
                    }
                };

                $scope.data = queryOrder.query({appToken: $scope.appToken});

                console.log($scope.data);

                $scope.nowType = '全部订单';

                $scope.goToOrderDetail = function () {
                    window.location.href = '#/order/detail';
                };

            }])
    }
});