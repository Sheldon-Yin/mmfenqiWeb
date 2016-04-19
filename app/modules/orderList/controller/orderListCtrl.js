/**
 * Created by sheldon on 2016/4/19.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('OrderListCtrl', ['$scope',
            function ($scope) {
                $scope.goBack = function () {
                    if (myBridge) {
                        myBridge.callHandler('sendMessage', {type: 1, data: {}}, function (response) {
                            alert(response);
                        })
                    }
                };

                $scope.nowType = '全部订单';

                $scope.goToOrderDetail = function () {
                    window.location.href = '#/order/detail';
                }

            }])
    }
});