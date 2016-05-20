/**
 * Created by sheldon on 2016/5/3.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/orderService.js')(app);
        app.register.controller('InsuranceCtrl', ['$scope', 'InsuranceDetail','$location',
            function ($scope, InsuranceDetail,$location) {
                if (myBridge) {
                    myBridge.callHandler('sendMessageToApp', {type: 8, data: {}}, function (response) {
                        $scope.$apply(function () {
                            $scope.appToken = encodeURI(response);
                            $scope.orderId = $location.search().orderId;
                            $scope.insuranceDetail = InsuranceDetail.query({
                                orderId: $scope.orderId,
                                appToken: $scope.appToken
                            });
                            $scope.insuranceDetail.$promise.then(function (res) {
                                if (res.result != 0){
                                    Toast(res.msg)
                                }else {
                                    Toast('获取成功');
                                }
                            }).catch(function (error) {
                                Toast(error)
                            })
                        })
                    })
                }
            }])
    }
});