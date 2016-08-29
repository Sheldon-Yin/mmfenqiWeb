//console.log('route中');
define(function (require, exports, module) {
    "use strict";
    module.exports = function (app) {
        app.config(['$routeProvider',
            function ($routeProvider) {

                $routeProvider.
                //Demo
                when('/phones/list', {
                    templateUrl: 'modules/demo/phone-list.html',
                    controller: 'PhoneListCtrl',
                    controllerUrl: './modules/demo/phone-controller.js'
                }).

                //首页
                when('/index', {
                    templateUrl: 'modules/index/index.html',
                    controller: 'IndexCtrl',
                    controllerUrl: './modules/index/controller/indexCtrl.js'
                }).

                //分类页面
                when('/categories', {
                    templateUrl: 'modules/categories/categories.html',
                    controller: 'CategoriesCtrl',
                    controllerUrl: './modules/categories/controller/categoriesCtrl.js'
                }).

                //分类页面
                when('/phones', {
                    templateUrl: 'modules/demo/phone-list.html',
                    controller: 'PhoneListCtrl',
                    controllerUrl: './modules/demo/phone-controller.js'
                }).

                //订单列表
                when('/order/list', {
                    templateUrl: 'modules/orderList/orderList.html',
                    controller: 'OrderListCtrl',
                    controllerUrl: './modules/orderList/controller/orderListCtrl.js'
                }).

                //订单详情
                when('/order/detail', {
                    templateUrl: 'modules/orderList/orderDetail.html',
                    controller: 'OrderDetailCtrl',
                    controllerUrl: './modules/orderList/controller/orderDetailCtrl.js'
                }).

                //账单模块
                when('/bill/list', {
                    templateUrl: 'modules/bill/billList.html',
                    controller: 'BillListCtrl',
                    controllerUrl: './modules/bill/controller/billListCtrl.js'
                }).when('/bill/detail', {
                    templateUrl: 'modules/bill/billDetail.html',
                    controller: 'BillDetailCtrl',
                    controllerUrl: './modules/bill/controller/billDetailCtrl.js'
                }).when('/bill/pay', {
                    templateUrl: 'modules/bill/billPay.html',
                    controller: 'BillPayCtrl',
                    controllerUrl: './modules/bill/controller/billPayCtrl.js'
                }).when('/bill/record', {
                    templateUrl: 'modules/bill/billRecord.html',
                    controller: 'BillRecordCtrl',
                    controllerUrl: './modules/bill/controller/billRecordCtrl.js'
                }).when('/bill/paySuccess', {
                    templateUrl: 'modules/bill/billPaySuccess.html',
                    controller: 'BillPaySuccessCtrl',
                    controllerUrl: './modules/bill/controller/billPaySuccessCtrl.js'
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

                //医院自定义商品
                when('/diy/goods',{
                    templateUrl: './modules/diyGoods/diyGoods.html',
                    controller: 'DiyGoodsCtrl',
                    controllerUrl: './modules/diyGoods/controller/diyGoodsCtrl.js'
                }).

                //下订单
                when('/order', {
                    templateUrl: './modules/order/order.html',
                    controller: 'OrderCtrl',
                    controllerUrl: './modules/order/controller/orderCtrl.js'
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
        app.directive('onFinishRenderFilters', function ($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function() {
                            scope.$emit('ngRepeatFinished');
                        });
                    }
                }
            };
        });
        app.directive('onFinishRenderFiltersCopy', function ($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function() {
                            scope.$emit('ngRepeatFinishedCopy');
                        });
                    }
                }
            };
        });
        app.filter('checkmark', function() {
            return function (input) {
                return input ? '\u2713' : '\u2718';
            }
        });
        app.filter('percent',function() {
            return function (input) {
                return input*10 + '%';
            }
        });
        app.filter('orderStatus', function () {
            return function (input) {
                var res;
                switch (input){
                    case "1":
                        res = '待支付';
                        break;
                    case "2":
                        res = '待完成';
                        break;
                    case "3":
                        res = '已完成';
                        break;
                    case "4":
                        res = '已取消';
                        break;
                    case "5":
                        res = '退款审核中';
                        break;
                    case "6":
                        res = '退款成功 ';
                        break;
                }
                console.log(res);
                return res;
            }
        })
    }
});
