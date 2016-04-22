/**
 * Created by sheldon on 2016/4/18.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/goodsDetail.js')(app);
        app.register.controller('GoodsCtrl', ['$scope', 'GoodsDetail', 'utilService',
            function ($scope, GoodsDetail) {

                $scope.goods = GoodsDetail.get();
                console.log($scope.goods);

                $scope.goBack = function () {
                    window.history.back(-1);
                };

                //初始化banner图的swiper和下拉刷新的swiper
                var goodsSwiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    loop: true
                });

                var pullToRefreshSwiper = new Swiper('.pullToRefreshArea', {
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    freeMode: true,
                    freeModeMomentum: true,
                    shortSwipes: false,
                    watchActiveIndex: true
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


                $scope.defaultPrice = 20;

                $scope.onOk = function (result) {
                    $scope.count = result.count;
                    $scope.price = result.price;
                };


                $scope.type =
                    [
                        {
                            name: '颜色',
                            nameId: 1,
                            list: [{
                                name: '红色'
                            }, {
                                name: '橙色'
                            }, {
                                name: '黄色'
                            }, {
                                name: '绿色'
                            }, {
                                name: '蓝色'
                            }, {
                                name: '紫色'
                            }]
                        },
                        {
                            name: '性别',
                            nameId: 2,
                            list: [
                                {
                                    name: '男'
                                },
                                {
                                    name: '女'
                                }
                            ]
                        }
                    ]
                ;

                $scope.skuData = {
                    '红色#男': {
                        count: 10,
                        price: 1
                    },

                    '橙色#男': {
                        count: 1,
                        price: 3
                    },

                    '橙色#女': {
                        count: 1,
                        price: 4
                    },
                    '黄色#男': {
                        count: 1,
                        price: 5
                    },
                    '黄色#女': {
                        count: 1,
                        price: 6
                    },
                    '绿色#男': {
                        count: 1,
                        price: 7
                    },
                    '绿色#女': {
                        count: 1,
                        price: 8
                    },
                    '蓝色#男': {
                        count: 1,
                        price: 9
                    },
                    '蓝色#女': {
                        count: 1,
                        price: 10
                    },
                    '紫色#男': {
                        count: 1,
                        price: 11
                    },
                    '紫色#女': {
                        count: 1,
                        price: 120
                    }
                };
                //商品属性逻辑结束

            }])
    }
});