/**
 * Created by sheldon on 2016/6/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        require('services/mineService.js')(app);
        app.register.controller('MineCtrl', ['$scope', 'Bridge', '$location', 'Mine',
            function ($scope, Bridge, $location, Mine) {


                $scope.status = window.localStorage.appStatus;
                $scope.nickName = '读取中';

                console.log($scope.status);
                if ($scope.status == 3) {
                    Bridge.appToken(function (response) {
                        $scope.appToken = response;
                        Mine.queryUserCenter().query({
                            appToken: $scope.appToken
                        }).$promise.then(function (res) {
                            $scope.userInfo = res.data.userCentreResponse;
                            $scope.nickName = $scope.userInfo.nickname !== "" ? $scope.userInfo.nickname : $scope.userInfo.telphone;
                            console.log(res);
                        }).catch(function (error) {
                            console.log(error);
                            Toast('服务器返回错误')
                        });
                    });
                }

                $scope.goToBillList = function () {
                    Bridge.appToken(function (res) {
                        Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/bill/list'), '账单列表')
                    });
                };

                $scope.goToOrderList = function (x) {
                    Bridge.appToken(function (res) {
                        Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/order/list?orderStatus='+x), '订单')
                    });
                };

                $scope.goToVerify = function () {
                    Bridge.appToken(function (res) {
                        Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/verify/index'), '认证提额')
                    });
                };
                
                $scope.goToRecommend = function () {
                    Bridge.appToken(function (res) {
                        Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/treasure/invite'), '邀请好友');
                    })
                };

                $scope.goToSetting = function () {
                    Bridge.appToken(function (res) {
                        Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/mine/setting'), '账户信息')
                    });
                };

                $scope.goToTreasure = function () {
                        Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/treasure'), '一元夺宝')
                };

                $scope.goToGroup = function () {
                        Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/groupbuy/mine'), '我的拼团')
                };

                $scope.goToCollection = function () {
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/collection'), '我的收藏')
                };

                $scope.callMmfq = function () {
                    window.location.href = 'tel://' + '400-711-8898';
                }

            }])
    }
});