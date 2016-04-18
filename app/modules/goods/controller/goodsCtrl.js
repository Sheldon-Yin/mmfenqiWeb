/**
 * Created by sheldon on 2016/4/18.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('GoodsCtrl', ['$scope',
            function ($scope) {
                $scope.goBack = function () {
                    window.history.back(-1);
                };

                //初始化banner图的swiper和下拉刷新的swiper
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    loop: true
                });

                var pullToRefreshSwiper = new Swiper('.pullToRefreshArea',{
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    freeMode: true,
                    freeModeMomentum: true,
                    shortSwipes: false,
                    watchActiveIndex: true
                });

            }])
    }
});