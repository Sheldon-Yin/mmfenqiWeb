/**
 * Created by sheldon on 2016/4/13.
 */


define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('IndexCtrl', ['$scope',
            function ($scope) {

                $scope.cityName = '全国';

                //初始化banner图的swiper和下拉刷新的swiper
                var swiper = new Swiper('.swiper-container', {
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
                    watchActiveIndex: true,
//        shortSwipes: false,
                    onTouchMove: function (pullToRefreshSwiper) {
                        if (pullToRefreshSwiper.translate >= 40 && !document.getElementById('swiper-pull-header')) {
                            pullToRefreshSwiper.prependSlide(
                                '<div class="swiper-slide container text-center" id="swiper-pull-header" style="padding:1rem 0;font-size: 1.6rem">' +
                                '<i class="fa fa-angle-double-down fa-lg" style="margin-right: 1rem"></i><span>下拉以刷新</span>' +
                                '</div>'
                            ); //加到Swiper的第一个
                        }
                    },
                    onTouchEnd: function (pullToRefreshSwiper) {
                        if (pullToRefreshSwiper.translate >= 0 && !!document.getElementById('swiper-pull-header')) {
                            document.getElementById('swiper-pull-header').innerHTML = '<i class="fa fa-refresh fa-spin fa-lg" style="margin-right: 1rem"></i><span">刷新中</span>';
                            pullToRefreshSwiper.slideTo(0);
                            pullToRefreshSwiper.detachEvents();
                            setTimeout(function () {
                                pullToRefreshSwiper.slideTo(1, 1000,
                                    function () {
                                        window.location.reload();
                                        document.getElementById('swiper-pull-header').innerHTML = '<i class="fa fa-check-circle-o fa-lg" style="margin-right: 1rem"></i><span>刷新成功</span>';
                                        //$route.reload();
                                        setTimeout(function () {
                                            pullToRefreshSwiper.attachEvents();
                                            pullToRefreshSwiper.removeSlide(0);
                                        }, 1000)
                                    }())
                            }, 200)
                        } else if (!!document.getElementById('swiper-pull-header')) {
                            pullToRefreshSwiper.removeSlide(0);
                        }
                    }
                });
                //初始化banner图的swiper和下拉刷新的swiper  End

                //APP事件处理
                $scope.changeCity = function () {
                    if (myBridge) {
                        myBridge.callHandler('sendMessage', {type: 7, data: {}}, function (response) {
                            $scope.$apply(function () {
                                $scope.cityName = response;
                            });
                        })
                    }
                };

                if (myBridge) {
                    myBridge.callHandler('sendMessage', {type: 6, data: {}}, function (response) {
                        $scope.$apply(function () {
                            if (response==""){
                                $scope.cityName = "圈外";
                            }else {
                                $scope.cityName = response;
                            }
                        });
                    });
                }

                $scope.qrcode = function () {
                    if (myBridge) {
                        myBridge.callHandler('sendMessage', {type: 5, data: {}}, function (response) {
                            alert(response);
                        })
                    }
                };
                $scope.search = function(e) {
                    var keycode = window.event?e.keyCode:e.which;
                    if(keycode==13){
                        if (!!$scope.searchContent) {
                            document.getElementById('search').blur();
                        }
                    }
                }
            }]);
    }
});