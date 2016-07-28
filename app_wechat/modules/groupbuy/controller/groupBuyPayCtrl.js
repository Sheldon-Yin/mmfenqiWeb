/**
 * Created by sheldon on 2016/7/14.
 */
'use strict';
define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        require('services/wxpayService.js')(app);
        require('services/groupBuyService.js')(app);
        require('services/isRealNameService.js')(app);
        app.register.controller('GroupBuyPayCtrl', ['$scope', 'Wxpay', 'WeChat', '$location', 'Bridge', 'GroupBuy', 'IsRealName',
            function ($scope, Wxpay, WeChat, $location, Bridge, GroupBuy, IsRealName) {

                $scope.channel = 0;//代表微信
                $scope.type = 2;//代表一元夺宝
                $scope.payAmount = $location.search().payAmount;

                $scope.goToPay = function () {
                    $scope.$root.loading = true;
                    Bridge.appToken(function (response) {
                        $scope.appToken = response;
                        IsRealName.get().$promise.then(function (res) {
                            console.log(res);
                            if (res.result != 0) {
                                Toast(res.msg);
                                $scope.$root.loading = false;
                                return
                            }
                            if (res.data.isIdentityAuth == 1) {
                                var wxpay = Wxpay.query({
                                    orderName: $location.search().orderName,
                                    orderSn: $location.search().orderSn,
                                    downpayAmount: $location.search().payAmount,
                                    type: 5,
                                    payType: 0,
                                    appToken: $scope.appToken
                                });
                                wxpay.$promise.then(function (res) {
                                    if (res.result == 0) {
                                        Bridge.weChatPay(res, function (response) {
                                            $scope.$root.loading = false;
                                            if (response.err_msg == "get_brand_wcpay_request:ok") {
                                                Toast('支付成功');
                                                $scope.$root.loading = false;
                                                Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/groupbuy/mine'), '我的拼团')
                                            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                                Toast('支付取消')
                                            } else {
                                                Toast('支付失败')
                                            }
                                        })
                                    } else {
                                        $scope.$root.loading = false;
                                        Toast(res.msg);
                                        console.log(res)
                                    }
                                }).catch(function (error) {
                                    $scope.$root.loading = false;
                                    Toast('服务器返回失败');
                                    console.log(error);
                                })
                            } else if (res.data.isIdentityAuth == 3) {
                                $scope.$root.loading = false;
                                Toast('您的账号正在实名认证中，请耐心等候', 3000);
                            } else {
                                $scope.$root.loading = false;
                                Bridge.realName();
                            }
                        }).catch(function (error) {
                            $scope.$root.loading = false;
                            Toast(error, 2000);
                        });
                    })
                }

            }])
    }
});
