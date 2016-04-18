/**
 * Created by sheldon on 2016/3/21.
 */

//console.log('route中');
define(function (require, exports, module) {
    "use strict";
    module.exports = function (app) {
        app.config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $routeProvider.
                //案例-手机
                when('/demo/phones', {
                    templateUrl: './modules/demo/phone-list.html',
                    controller: 'PhoneListCtrl',
                    controllerUrl: '../app/modules/demo/phone-controller.js'
                }).when('/demo/phones/:phoneId', {    //案例-手机列表
                    templateUrl: './modules/demo/phone-detail.html',
                    controller: 'PhoneDetailCtrl',
                    controllerUrl: './modules/demo/phone-controller.js'
                }).when('/swiper', {
                    templateUrl: './modules/demomodules/swiper/swiper.html',
                }).when('/pulltorefresh', {
                    templateUrl: './modules/demomodules/swiper/pulltoRefresh.html'
                }).

                //毕业季活动页面
                when('/activities/graduation', {
                    templateUrl: 'modules/activities/graduation/graduation.html',
                    controller: 'GraduationCtrl',
                    controllerUrl: './modules/activities/graduation/controller/graduation.js'
                }).

                //商品列表
                when('/list', {
                    templateUrl: './modules/list/list.html',
                    controller: 'ListCtrl',
                    controllerUrl: './modules/list/controller/listCtrl.js'
                }).

                //商品详情
                when('/goods', {
                    templateUrl: './modules/goods/goods.html',
                    controller: 'GoodsCtrl',
                    controllerUrl: './modules/goods/controller/goodsCtrl.js'
                }).

                //下订单
                when('/order', {
                    templateUrl: './modules/order/order.html',
                    controller: 'OrderCtrl',
                    controllerUrl: './modules/order/controller/orderCtrl.js'
                }).

                //首页
                when('/index', {
                    templateUrl: 'modules/index/index.html',
                    controller: 'IndexCtrl',
                    controllerUrl: './modules/index/controller/indexCtrl.js'
                }).

                //精品推荐
                when('/recommend', {
                    templateUrl: 'modules/recommend/recommend.html',
                    controller: 'RecommendCtrl',
                    controllerUrl: './modules/recommend/controller/recommendCtrl.js'
                }).


                //0首付验证码
                when('/pay/allCredit', {
                    templateUrl: 'modules/pay/allCredit.html',
                    controller: 'AllCreditCtrl',
                    controllerUrl: './modules/pay/controller/allCreditCtrl.js'
                }).

                //支付首付
                when('/pay/firstPay', {
                    templateUrl: 'modules/pay/firstPay.html',
                    controller: 'FirstPay',
                    controllerUrl: './modules/pay/controller/firstPayCtrl.js'
                }).

                //默认首页
                otherwise({
                    redirectTo: '/index'
                });
                //$locationProvider.html5Mode(true);
            }]);
    }
});