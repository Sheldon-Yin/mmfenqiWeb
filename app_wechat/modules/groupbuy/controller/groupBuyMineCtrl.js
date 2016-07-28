/**
 * Created by sheldon on 2016/7/12.
 */
'use strict';

/* Controllers */

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        require('services/groupBuyService.js')(app);
        app.register.controller('GroupBuyMineCtrl', ['$scope', 'Bridge', '$location', 'GroupBuy',
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

                console.log(1);
                $scope.data = {};
                $scope.nowType = '全部';
                $scope.showShare = $location.search().showShare;
                $scope.orderStatus = 0;

                $scope.initGroupList = function () {
                    Bridge.appToken(function (response) {
                        $scope.appToken = response;
                        GroupBuy.mine().query({
                            appToken: $scope.appToken,
                            orderStatus: $scope.orderStatus
                        }).$promise.then(function (res) {
                            if (res.result == 0) {
                                console.log(res);
                                $scope.data = res.data.myTeamBuyOrderList;
                            } else {
                                Toast(res.msg)
                            }
                        }).catch(function (err) {
                            console.log(err)
                        })
                    });
                };

                $scope.initGroupList();

                $scope.projects = [
                    {
                        project: '全部',
                        orderStatus: 0
                    },
                    {
                        project: '拼团中',
                        orderStatus: 1
                    },
                    {
                        project: '拼团成功',
                        orderStatus: 2
                    },
                    {
                        project: '退款中',
                        orderStatus: 3
                    },
                    {
                        project: '已退款',
                        orderStatus: 4
                    }
                ];

                $scope.setItems = function (x) {
                    $scope.orderStatus = x.orderStatus;
                    $scope.initGroupList();
                    $scope.selectState = 0;
                    switch (x.orderStatus) {
                        case 0:
                            $scope.nowType = '全部';
                            break;
                        case 1:
                            $scope.nowType = '拼团中';
                            break;
                        case 2:
                            $scope.nowType = '拼团成功';
                            break;
                        case 3:
                            $scope.nowType = '退款中';
                            break;
                        case 4:
                            $scope.nowType = '已退款';
                            break;
                        default:
                            $scope.nowType = '全部'
                    }
                };

                $scope.goToOrderDetail = function (x) {
                    if (x.orderStatus == 2) {
                        Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/order/list'), '订单列表');
                        return
                    }
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/groupbuy/join?goodsId=' + x.goodsId + '&teamId=' + x.teamId), '拼团详情')
                };


                $scope.chooseCategories = function (x) {
                    $scope.initGroupList(x)
                };

                $scope.shareFriend = function (x) {
                    $scope.showShare = true;
                    var description = '快来和我一起拼团吧！';
                    var title = '拼团大优惠';
                    var url = encodeURI($location.absUrl().split('#')[0] + '#?/groupbuy/join?goodsId=' + x.goodsId + '&teamId=' + x.teamId);
                    var imageUrl = encodeURI(x.goodsPic);
                    Bridge.share(description, title, url, imageUrl, function () {
                    });
                }

            }]);
    }
});