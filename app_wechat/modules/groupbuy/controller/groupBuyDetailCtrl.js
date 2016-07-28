/**
 * Created by sheldon on 2016/3/22.
 */
'use strict';

/* Controllers */

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        require('services/groupBuyService.js')(app);
        app.register.controller('GroupBuyDetailCtrl', ['$scope', 'Bridge', '$location', 'GroupBuy',
            function ($scope, Bridge, $location, GroupBuy) {

                $scope.initDetail = function () {
                    $scope.appToken = window.localStorage.appToken;
                    $scope.goodsId = $location.search().goodsId;
                    GroupBuy.detail().query({
                        appToken: $scope.appToken,
                        goodsId: $scope.goodsId
                    }).$promise.then(function (res) {
                        $scope.goodDetail = res.data.goodsDetails;
                        console.log(res);
                        $scope.shareFriend = function (x) {
                            $scope.showShare = true;
                            var description = '快来和我一起拼团吧！';
                            var title = '拼团大优惠';
                            var url = encodeURI(window.location.href);
                            var imageUrl = encodeURI($scope.goodDetail.coverPic);
                            Bridge.share(description, title, url, imageUrl, function () {
                            });
                        };
                        $scope.shareFriend();
                    }).catch(function (err) {
                        console.log(err)
                    })
                };

                $scope.initDetail();

                $scope.joinGroup = function () {
                    Bridge.appToken(function (response) {
                        $scope.appToken = response;
                        GroupBuy.join().save({
                            appToken: $scope.appToken,
                            goodsId: $scope.goodsId
                        }).$promise.then(function (res) {
                            if (res.result == 0) {
                                console.log(res);
                                Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/groupbuy/pay?orderName=' + res.data.orderName + '&orderSn=' + res.data.orderSn + '&payAmount=' + res.data.payAmount), '参团支付')
                            } else if (res.result == 1013) {
                                Bridge.login(function () {
                                });
                            } else {
                                console.log(res);
                                Toast(res.msg);
                            }
                        }).catch(function (err) {
                            console.log(err)
                        })
                    });
                };

                $scope.backHome = function () {
                    window.localStorage.appStatus = 4;
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/'), '拼团列表');
                }

            }]);
    }
});