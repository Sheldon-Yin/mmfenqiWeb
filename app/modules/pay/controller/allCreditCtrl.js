/**
 * Created by sheldon on 2016/4/18.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/messageService.js')(app);
        app.register.controller('AllCreditCtrl', ['$scope', '$interval','$location','MessageService',
            function ($scope, $interval,$location,MessageService) {
                $scope.goBack = function () {
                    window.history.back(-1);
                };

                $scope.verifyCodeState = false;
                $scope.orderInfo = $location.search();
                $scope.telephone = $location.search().telephone;

                if (myBridge) {
                    myBridge.callHandler('sendMessage', {type: 8, data: {}}, function (response) {
                        $scope.$apply(function () {
                            $scope.appToken = response;
                        });
                    })
                }

                $scope.getVerifyCode = function () {
                    $scope.message = MessageService.get({
                        telephone: $scope.telephone
                    });
                    $scope.message.$promise.then(function (res) {
                        if (res.result == 0){
                            var timeCounter = 60;
                            var timeContainer = document.getElementById('getVerifyCodeBtn');
                            timeContainer.innerHTML = timeCounter + 's后可再获取';
                            $scope.verifyCodeState = true;
                            var timer = $interval(function () {
                                timeCounter--;
                                if (timeCounter < 0) {
                                    $interval.cancel(timer);
                                    timeContainer.innerHTML = '点击再次获取';
                                    $scope.verifyCodeState = false;
                                } else {
                                    timeContainer.innerHTML = timeCounter + 's后可再获取';
                                }
                            }, 1000)
                        } else {
                            Toast(res.msg,3000);
                        }
                    }).catch(function (error) {
                        Toast('服务器暂时没有响应',3000);
                    })

                }

            }])
    }
});