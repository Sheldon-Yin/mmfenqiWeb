/**
 * Created by sheldon on 2016/4/18.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/goodsDetail.js')(app);
        require('services/isRealNameService.js')(app);
        app.register.controller('GoodsCtrl', ['$scope', 'GoodsDetail', '$location', 'utilService', 'IsRealName',
            function ($scope, GoodsDetail, $location, IsRealName) {

                var swiper;
                $scope.initBannerSwiper = function () {
                    //下面是在table render完成后执行的js
                    swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        loop: true,
                        autoplay: 5000
                    });
                    //初始化banner图的swiper
                };
                $scope.initBannerSwiper();


                $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                    swiper.update();
                    swiper.reLoop();
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
                                                jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/order?orderAmount=' + $scope.price + '&goodsId=' + goodsId.goodsId + '&storeGoodsCombinationId=' + $scope.storeId);
                                                myBridge.callHandler('sendMessageToApp', {
                                                    type: 2, data: {
                                                        url: jumpUrl,
                                                        title: '确认下单',
                                                        leftNavItems: [1]
                                                    }
                                                }, function (response) {
                                                    //todo custom
                                                });
                                            }
                                        } else if ($scope.type.length == 0) {
                                            if (myBridge) {
                                                jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/order?orderAmount=' + $scope.defaultPrice + '&goodsId=' + goodsId.goodsId);
                                                myBridge.callHandler('sendMessageToApp', {
                                                    type: 2, data: {
                                                        url: jumpUrl,
                                                        title: '确认下单',
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
                                });

                            });
                        }
                    }
                }).catch(function (error) {
                    Toast('服务器返回失败', 3000);
                    $scope.loadError = true;
                });

//$scope.goBack = function () {
//    window.history.back(-1);
//};

////初始化banner图的swiper和下拉刷新的swiper
//var goodsSwiper = new Swiper('.swiper-container', {
//    pagination: '.swiper-pagination',
//    paginationClickable: true,
//    loop: true
//});

//$scope.share = function () {
//    if (myBridge) {
//        myBridge.callHandler('sendMessageToApp', {
//            type: 0, data: {
//                'url': 'http://www.baidu.com',
//                'description': 'mmfenqiTest',
//                'title': '产品详情页',
//                'imageUrl': 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
//            }
//        }, function (response) {
//            //
//        })
//    }
//};

//商品属性

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