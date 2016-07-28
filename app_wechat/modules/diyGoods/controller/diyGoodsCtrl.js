/**
 * Created by sheldon on 2016/4/29.
 */

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/goodsDetail.js')(app);
        require('services/isRealNameService.js')(app);
        app.register.controller('DiyGoodsCtrl', ['$scope', 'GoodsDetail', '$location', 'IsRealName',
            function ($scope, GoodsDetail, $location, IsRealName) {

                var swiper;
                $scope.initBannerSwiper = function () {
                    //下面是在table render完成后执行的js
                    swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        autoplay: 5000,
                        loop:true
                    });
                    //初始化banner图的swiper
                };
                $scope.initBannerSwiper();

                $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                    swiper.update();
                    swiper.reLoop()
                });

                var goodsId = $location.search();
                console.log(goodsId);

                $scope.goods = GoodsDetail.get(goodsId);


                $scope.skuData = $scope.goods;

                $scope.goods.$promise.then(function (response) {

                    if (response.result != 0) {
                        Toast(response.msg, 3000);
                        $scope.loadError = true;
                        return
                    }

                    $scope.res = response;
                    console.log(response);
                    $scope.defaultPrice = response.data.goodsDetailsResponse.goodsItem.presentPrice;
                    $scope.type = response.data.goodsDetailsResponse.combinationTypeInfoList;
                    $scope.skuData = response.data.goodsDetailsResponse.goodsCombinationExtMap;


                    $scope.goToOrder = function () {
                        if (myBridge) {
                            myBridge.callHandler('sendMessageToApp', {type: 8, data: {}}, function (response) {
                                $scope.appToken = response;

                                $scope.isRealName = IsRealName.get({
                                    appToken: $scope.appToken
                                });

                                $scope.isRealName.$promise.then(function (res) {
                                    if (res.result != 0) {
                                        Toast(res.msg);
                                        return
                                    }
                                    if (res.data.isIdentityAuth == 1) {
                                        var jumpUrl;
                                        if (!!$scope.skuData && !!$scope.storeId) {
                                            if (myBridge) {
                                                jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#?/order?orderAmount=' + $scope.price + '&goodsId=' + goodsId.goodsId + '&storeGoodsCombinationId=' + $scope.storeId+ '&customProjectId='+goodsId.customProjectId);
                                                myBridge.callHandler('sendMessageToApp', {
                                                    type: 2, data: {
                                                        url: jumpUrl,
                                                        title: '提交订单',
                                                        leftNavItems: [1]
                                                    }
                                                }, function (response) {
                                                    //todo custom
                                                });
                                            }
                                        } else if ($scope.type.length == 0) {
                                            if (myBridge) {
                                                jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#?/order?orderAmount=' + $scope.defaultPrice + '&goodsId=' + goodsId.goodsId+ '&customProjectId='+goodsId.customProjectId);
                                                myBridge.callHandler('sendMessageToApp', {
                                                    type: 2, data: {
                                                        url: jumpUrl,
                                                        title: '提交订单',
                                                        leftNavItems: [1]
                                                    }
                                                }, function (response) {
                                                    //todo custom
                                                });
                                            }
                                        } else {
                                            Toast('请选择完整的商品信息', 2000);
                                        }
                                    } else if (res.data.isIdentityAuth == 3) {
                                        Toast('您的账号正在实名认证中，请耐心等候', 3000);
                                    } else {
                                        myBridge.callHandler('sendMessageToApp', {
                                            type: 9,
                                            data: {}
                                        }, function (response) {
                                            Toast('请耐心等待实名认证结果', 2000);
                                        });
                                    }
                                }).catch(function (error) {
                                    Toast(error,20000);
                                    Toast('服务器返回出错',2000);
                                });

                            });
                        }
                    }
                }).catch(function (error) {
                    Toast('服务器返回失败', 3000);
                    $scope.loadError = true;
                });


                $scope.splitStr = '#';

                $scope.onOk = function (result) {
                    $scope.price = result.price;
                    $scope.storeId = result.storeId;
                    console.log(result);
                };

                $scope.callMmfq = function () {
                    if (myBridge) {
                        myBridge.callHandler('sendMessageToApp', {
                            type: 10, data: '400-711-8898'
                        }, function (response) {
                            //
                        })
                    }
                };


                if (myBridge) {
                    myBridge.registerHandler('sendMessageToHTML', function (message, callback) {
                        if (message == 0) {
                            myBridge.callHandler('sendMessageToApp', {
                                type: message, data: {
                                    description: '美眉分期精品推荐~',
                                    title: '美眉分期',
                                    url: $location.absUrl(),
                                    imageUrl: 'http://www.mmfenqi.com/static/masserts/pc/img/login/logo.png'
                                }
                            }, function (response) {
                                //todo custom
                            });
                        } else {
                            myBridge.callHandler('sendMessageToApp', {type: message, data: {}}, function (response) {
                                //todo custom
                            });
                        }
                    });
                }


            }])
    }
})
;