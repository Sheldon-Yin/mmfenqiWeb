/**
 * Created by sheldon on 2016/4/18.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/messageService.js')(app);
        require('services/orderService.js')(app);
        app.register.controller('AllCreditCtrl', ['$scope', '$interval', '$location', 'MessageService', 'EnsureOrderForMessage',
            function ($scope, $interval, $location, MessageService, EnsureOrderForMessage) {
                //$scope.goBack = function () {
                //    window.history.back(-1);
                //};

                $scope.verifyCodeState = false;
                $scope.telephone = $location.search().telephone;
                $scope.orderId = $location.search().orderId;

                //$scope.appToken = 'MMFQ:hfB4RC9zM80v4ZI5ANbXiVVKyivU3TTJIZnhZfqx5btQzwgzDUxlgdnqjQDPw85z';
                //$scope.ensurePay = function () {
                //    if ($scope.inputCode==null || $scope.inputCode==''){
                //        Toast('请输入验证码')
                //    }else {
                //        $scope.ensureOrderForMessage = EnsureOrderForMessage.query({
                //            appToken: $scope.appToken,
                //            orderId: $scope.orderId,
                //            smsCode: $scope.inputCode
                //        });
                //        $scope.ensureOrderForMessage.$promise.then(function (res) {
                //            if(res.result==0){
                //                Toast('信用额度支付成功',2000);
                //            }else {
                //                Toast(res.msg,2000)
                //            }
                //        }).catch(function (error) {
                //            Toast('服务器返回错误',2000);
                //        })
                //    }
                //};

                if (myBridge) {
                    myBridge.callHandler('sendMessageToApp', {type: 8, data: {}}, function (response) {
                        $scope.$apply(function () {
                            $scope.appToken = response;
                        });
                        $scope.ensurePay = function () {
                            if ($scope.inputCode == null || $scope.inputCode == '') {
                                Toast('请输入验证码')
                            } else {
                                //$scope.ensureOrderForMessage = EnsureOrderForMessage.query({
                                //    appToken: $scope.appToken,
                                //    orderId: $scope.orderId,
                                //    smsCode: $scope.inputCode
                                //});
                                //$scope.ensureOrderForMessage.$promise.then(function (res) {
                                //    if(res.result==0){
                                //        Toast('信用额度支付成功',2000);
                                //    }else {
                                //        Toast(res.msg,2000)
                                //    }
                                //}).catch(function (error) {
                                //    Toast('服务器返回错误',2000);
                                //})
                                if (myBridge) {
                                    myBridge.callHandler('sendMessageToApp', {
                                        type: 11, data: {
                                            orderId: $scope.orderId,
                                            smsCode: $scope.inputCode
                                        }
                                    }, function (response) {
                                    })
                                }
                            }
                        }
                    })
                }

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
                            Toast(res.msg, 3000);
                            $scope.verifyCodeState = false;
                        }
                    }).catch(function (error) {
                        Toast('服务器暂时没有响应', 3000);
                        $scope.verifyCodeState = false;
                    })

                };

                $scope.getVerifyCode();

                $scope.goToServiceContact = function () {
                    if (myBridge) {
                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/contact/service');
                        myBridge.callHandler('sendMessageToApp', {
                            type: 2, data: {
                                url: jumpUrl,
                                leftNavItems: [1],
                                title: '服务合同'
                            }
                        }, function (response) {
                            //todo custom
                        });
                    }
                };

                $scope.goToLoanContact = function () {
                    if (myBridge) {
                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/contact/loan');
                        myBridge.callHandler('sendMessageToApp', {
                            type: 2, data: {
                                url: jumpUrl,
                                leftNavItems: [1],
                                title: '借款合同'
                            }
                        }, function (response) {
                            //todo custom
                        });
                    }
                };


            }])
    }
});