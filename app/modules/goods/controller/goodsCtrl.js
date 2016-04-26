/**
 * Created by sheldon on 2016/4/18.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/goodsDetail.js')(app);
        app.register.controller('GoodsCtrl', ['$scope', 'GoodsDetail','$location', 'utilService',
            function ($scope, GoodsDetail ,$location) {

                var swiper;
                $scope.initBannerSwiper = function () {
                    //下面是在table render完成后执行的js
                    swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        loop : true,
                        autoplay : 5000
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

                $scope.goods.$promise.then(function(response){
                    $scope.res = response;
                    console.log(response);
                    $scope.defaultPrice = response.data.goodsDetailsResponse.goodsItem.presentPrice;
                    $scope.type = response.data.goodsDetailsResponse.combinationTypeInfoList;
                    $scope.skuData = response.data.goodsDetailsResponse.goodsCombinationExtMap;


                    $scope.goToOrder = function () {
                        if (!!$scope.skuData && !!$scope.storeId){
                            window.location.href = '#/order?orderAmount='+$scope.price+'&goodsId='+goodsId.goodsId+'&storeGoodsCombinationId='+$scope.storeId;
                        }else if ($scope.type.length == 0){
                            window.location.href = '#/order?orderAmount='+ $scope.defaultPrice +'&goodsId='+goodsId.goodsId;
                        }else {
                            Toast('请选择完整的商品信息',2000);
                        }
                    }

                });

                $scope.goBack = function () {
                    window.history.back(-1);
                };

                //初始化banner图的swiper和下拉刷新的swiper
                var goodsSwiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    loop: true
                });

                $scope.share = function () {
                    if (myBridge) {
                        myBridge.callHandler('sendMessage', {
                            type: 0, data: {
                                'url': 'http://www.baidu.com',
                                'description': 'mmfenqiTest',
                                'title': '产品详情页',
                                'imageUrl': 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
                            }
                        }, function (response) {
                            //
                        })
                    }
                };

                //商品属性

                $scope.splitStr = '#';

                $scope.onOk = function (result) {
                    $scope.price = result.price;
                    $scope.storeId = result.storeId;
                    console.log(result);
                };


            }])
    }
});