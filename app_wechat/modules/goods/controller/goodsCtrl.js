/**
 * Created by sheldon on 2016/4/18.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/goodsDetail.js')(app);
        require('services/isRealNameService.js')(app);
        require('services/weChatService.js')(app);
        require('services/collectionService.js')(app);
        app.register.controller('GoodsCtrl', ['$scope', 'GoodsDetail', '$location', 'IsRealName', 'Bridge', 'Collection',
            function ($scope, GoodsDetail, $location, IsRealName, Bridge, Collection) {

                var swiper;
                $scope.initBannerSwiper = function () {
                    //下面是在table render完成后执行的js
                    swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        autoplay: 5000,
                        loop: true
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
                        Bridge.appToken(function (response) {

                            $scope.appToken = response;

                            $scope.isRealName = IsRealName.get({
                                appToken: $scope.appToken
                            });

                            $scope.isRealName.$promise.then(function (res) {
                                console.log(res);
                                if (res.result != 0) {
                                    Toast(res.msg);
                                    return
                                }
                                if (res.data.isIdentityAuth == 1) {
                                    var jumpUrl;
                                    if (!!$scope.skuData && !!$scope.storeId) {
                                        Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/order?orderAmount=' + $scope.price + '&goodsId=' + goodsId.goodsId + '&storeGoodsCombinationId=' + $scope.storeId),
                                            '提交订单');
                                    } else if ($scope.type.length == 0) {
                                        Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/order?orderAmount=' + $scope.defaultPrice + '&goodsId=' + goodsId.goodsId),
                                            '提交订单');
                                    } else {
                                        Toast('请选择完整的商品信息', 2000);
                                    }
                                } else if (res.data.isIdentityAuth == 3) {
                                    Toast('您的账号正在实名认证中，请耐心等候', 3000);
                                } else {
                                    Bridge.realName();
                                }
                            }).catch(function (error) {
                                Toast(error, 20000);
                                Toast('服务器返回出错', 2000);
                            });
                        });
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
                    window.location.href = 'tel://' + '400-711-8898';
                };


                $scope.collected = false;

                if (!!$location.search().collectionId){
                    $scope.collected = true;
                    $scope.collectionId = $location.search().collectionId;
                }

                $scope.addCollect = function () {
                    Bridge.appToken(function (res) {
                        $scope.appToken = res;
                        Collection.add().save({
                            appToken: $scope.appToken,
                            collectionId: $location.search().goodsId,
                            collectionType:1
                        }).$promise.then(function (res) {
                            Toast(res.msg);
                            $scope.collected = true;
                            $scope.collectionId = res.data.goodsCollection.id;
                        }).catch(function (err) {
                            Toast('服务器返回错误'+ err)
                        })
                    });

                };

                $scope.cancelCollect = function () {
                    if (!!$scope.collectionId){
                        Collection.cancel().save({
                            appToken: $scope.appToken,
                            id: $scope.collectionId
                        }).$promise.then(function (res) {
                            Toast(res.msg);
                            $scope.collected = false;
                        }).catch(function (err) {
                            Toast('服务器返回错误'+ err)
                        })
                    } else {

                    }
                }

            }])
    }
})
;