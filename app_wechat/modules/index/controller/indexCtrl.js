
/**
 * Created by sheldon on 2016/4/13.
 */


define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/indexService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('IndexCtrl', ['$scope', 'Index', '$location', 'Bridge','City',
            function ($scope, Index, $location, Bridge,City) {

                Bridge.getCity(function (response) {
                    $scope.cityName = response;
                });

                $scope.setCity = function (name) {
                    $scope.cityName = name;
                    Bridge.saveCity(name);
                    $scope.selectState = 0;
                    $scope.initList();
                };

                $scope.goToSearch = function () {
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/list?keyword=' + (!!$scope.searchContent ? $scope.searchContent : '') + '&cityName=' + $scope.cityName),'搜索列表')
                };

                $scope.cityName = !!$location.search().cityName ? $location.search().cityName : $scope.cityName;

                $scope.initList = function () {
                    $scope.index = Index.get({ index: 1, cityName: $scope.cityName});
                    $scope.index.$promise.then(function (res) {
                        if (res.result != 0) {
                            Toast(res.msg, 3000);
                            $scope.loadError = true;
                        }
                    }).catch(function (error) {
                        $scope.loadError = true;
                        Toast('服务器返回失败');
                    });
                };
                $scope.initList();

                City.query().$promise.then(function (res) {
                    if (res.result == 0) {
                        $scope.citys = res.data.citySelectResponse;
                    }
                    console.log(res);
                }).catch(function (err) {
                    console.log(err)
                });

                var swiper;
                $scope.initBannerSwiper = function () {

                    if (!!swiper) {
                        swiper = {};
                    }
                    //下面是在table render完成后执行的js
                    swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        //loop: true,
                        autoplay: 5000
                    });
                    //初始化banner图的swiper

                    if (!!swiper.update) {
                        setTimeout(function () {
                            $scope.$apply(function () {
                                swiper.update();
                            })
                        }, 0)
                    }

                };

                console.log($scope.$parent.pageStatus);

                $scope.$parent.$watch('pageStatus', function (newValue, oldValue) {

                    if (!!swiper) {
                        if (!!swiper.update) {
                            swiper.update();
                            return
                        }
                    }
                    if (newValue != 1) {
                        return
                    }
                    $scope.initBannerSwiper();
                });

                if ($scope.$parent.pageStatus == 1) {
                    $scope.initBannerSwiper();
                }

                $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                    if ($scope.$parent.pageStatus == 1) {
                        $scope.initBannerSwiper();
                    }
                });


                $scope.jumpToGoods = function (x) {
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + x), '商品详情')
                };

                $scope.jumpToRecommend = function () {
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/recommend' + '?cityName=' + $scope.cityName), '精品推荐')
                };

                $scope.jumpToList = function (x) {
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/list?parentId=' + x.categoryHerf + '&parentName=' + x.categoryName + '&cityName=' + $scope.cityName), '产品列表');
                };

                $scope.jumpToActivity = function (x) {
                    Bridge.jumpTo(encodeURI(x), '精品活动')
                };


            }]);
    }
});