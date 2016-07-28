/**
 * Created by sheldon on 2016/5/3.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/orderService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('InsuranceCtrl', ['$scope', 'InsuranceDetail', '$location', 'Bridge',
            function ($scope, InsuranceDetail, $location, Bridge) {
                Bridge.appToken(function (response) {

                    $scope.appToken = response;
                    $scope.orderId = $location.search().orderId;
                    $scope.insuranceDetail = InsuranceDetail.query({
                        orderId: $scope.orderId,
                        appToken: $scope.appToken
                    });
                    $scope.insuranceDetail.$promise.then(function (res) {
                        if (res.result != 0) {
                            Toast(res.msg)
                        } else {
                            Toast('获取成功');
                        }
                    }).catch(function (error) {
                        Toast(error)
                    })

                })
            }
        ])
    }
});