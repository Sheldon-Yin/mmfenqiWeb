/**
 * Created by sheldon on 2016/4/18.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/messageService.js')(app);
        require('services/orderService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('AllCreditCtrl', ['$scope', '$interval', '$location', 'MessageService', 'EnsureOrderForMessage', 'Bridge',
            function ($scope, $interval, $location, MessageService, EnsureOrderForMessage, Bridge) {

                $scope.verifyCodeState = false;
                $scope.telephone = $location.search().telephone;
                $scope.orderId = $location.search().orderId;

                Bridge.appToken(function (response) {

                    $scope.appToken = response;

                    $scope.ensurePay = function () {
                        if ($scope.inputCode == null || $scope.inputCode == '') {
                            Toast('请输入验证码')
                        } else {
                            $scope.pay = EnsureOrderForMessage.query({
                                appToken: $scope.appToken,
                                orderId: $scope.orderId,
                                smsCode: $scope.inputCode
                            });
                            $scope.pay.$promise.then(function (res) {
                                console.log(res);
                                if (res.result == 0){
                                    Toast('支付成功');
                                    window.localStorage.appStatus = 3;
                                    Bridge.jumpTo($location.absUrl().split('#')[0])
                                }else {
                                    Toast(res.msg)
                                }
                            }).catch(function () {
                                Toast('服务器返回错误')
                            })
                        }
                    }
                });

                $scope.getVerifyCode = function () {
                    if ($scope.verifyCodeState == true) {
                        return
                    }
                    $scope.verifyCodeState = true;
                    $scope.message = MessageService.save({
                        telephone: $scope.telephone,
                        smsFmtId: 'payCredit'
                    });
                    $scope.message.$promise.then(function (res) {
                        if (res.result == 0) {
                            var timeCounter = 60;
                            var timeContainer = document.getElementById('getVerifyCodeBtn');
                            timeContainer.innerHTML = timeCounter + 's后可再获取';
                            var timer = $interval(function () {
                                timeCounter--;
                                if (timeCounter < 0) {
                                    $interval.cancel(timer);
                                    timeContainer.innerHTML = '点击再次获取';
                                    $scope.verifyCodeState = false;
                                } else {
                                    timeContainer.innerHTML = timeCounter + 's后可再获取';
                                }
                            }, 1000);
                        } else {
                            $scope.verifyCodeState = false;
                            console.log(res);
                            Toast(res.msg, 3000);
                        }
                    }).catch(function (error) {
                        Toast('服务器暂时没有响应', 3000);
                    })

                };

                $scope.goToServiceContact = function () {
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/contact/service'),'服务合同');
                };

                $scope.goToLoanContact = function () {
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/contact/loan'),'借款合同');
                };


            }])
    }
});