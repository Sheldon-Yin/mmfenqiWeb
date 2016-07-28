/**
 * Created by sheldon on 2016/7/13.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        require('services/groupBuyService.js')(app);
        app.register.controller('GroupBuyJoinCtrl', ['$scope', 'Bridge', '$location', 'GroupBuy',
            function ($scope, Bridge, $location, GroupBuy) {

                //为了让微信能够正常获得配置，重新跳转一次
                var firstTempUrl = $location.absUrl().split('?')[0];
                var firstUrl = firstTempUrl.split('#');
                var sencondUrl = $location.absUrl().split('#?');
                var reloadUrl = firstUrl[0] + '#?' + sencondUrl[sencondUrl.length - 1];
                if (reloadUrl != window.location.href) {
                    window.location.href = reloadUrl;
                    return
                }

                $scope.initDetail = function () {
                    $scope.appToken = window.localStorage.appToken;
                    $scope.goodsId = $location.search().goodsId;
                    $scope.teamId = $location.search().teamId;
                    GroupBuy.detail().query({
                        appToken: $scope.appToken,
                        goodsId: $scope.goodsId,
                        teamId: $scope.teamId
                    }).$promise.then(function (res) {
                        $scope.goodDetail = res.data.goodsDetails;
                        $scope.ShowCountDown($scope.goodDetail.end_time);
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
                                goodsId: $scope.goodsId,
                                teamId: $scope.teamId
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
                        }
                    );
                };

                var cc = window.document.getElementById('leftTime');

                $scope.ShowCountDown = function (end_time) {

                    var now_time = new Date();
                    var leftsecond = parseInt(end_time / 1000) - Date.parse(now_time) / 1000;

                    if (leftsecond < 0) {
                        document.getElementById(divname).innerHTML = "活动已结束";
                        return;
                    }

                    var leftTimeCount = function (leftRealSecond) {
                        var hour = Math.floor((leftRealSecond) / 3600);
                        var minute = Math.floor((leftRealSecond - hour * 3600) / 60);
                        var second = Math.floor(leftRealSecond - hour * 3600 - minute * 60);
                        cc.innerHTML = "剩余时间：" + hour + ":" + minute + ":" + second;
                    };
                    leftTimeCount(leftsecond);
                    leftsecond--;

                    var timer = window.setInterval(function () {
                        leftTimeCount(leftsecond);
                        leftsecond--;
                        if (leftsecond < 0) {
                            window.clearInterval(timer);
                            document.getElementById(divname).innerHTML = "活动已结束";
                        }
                    }, 1000);
                };

                $scope.backHome = function () {
                    window.localStorage.appStatus = 4;
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/'), '拼团列表');
                }

            }
        ])
        ;
    }
})
;