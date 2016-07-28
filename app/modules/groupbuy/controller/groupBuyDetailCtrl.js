/**
 * Created by sheldon on 2016/3/22.
 */
'use strict';

/* Controllers */

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/bridgeService.js')(app);
        require('services/groupBuyService.js')(app);
        app.register.controller('GroupBuyDetailCtrl', ['$scope', 'Bridge', '$location', 'GroupBuy',
            function ($scope, Bridge, $location, GroupBuy) {

                $scope.initDetail = function () {
                    $scope.goodsId = $location.search().goodsId;
                    GroupBuy.detail().query({
                        goodsId: $scope.goodsId
                    }).$promise.then(function (res) {
                        $scope.goodDetail = res.data.goodsDetails;
                        console.log(res);
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
                                Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#/groupbuy/pay?orderName=' + res.data.orderName + '&orderSn=' + res.data.orderSn + '&payAmount=' + res.data.payAmount), '参团支付')
                            }  else {
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
                    Bridge.goBack();
                }

            }]);
    }
});