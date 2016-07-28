/**
 * Created by sheldon on 2016/3/21.
 */

//console.log('route中');
define(function (require, exports, module) {
    "use strict";
    module.exports = function (app) {
        app.config(['$routeProvider', '$httpProvider', '$locationProvider',
            function ($routeProvider, $httpProvider, $locationProvider) {

                $locationProvider.hashPrefix('?');

                $routeProvider.
                //Demo
                when('/phones/list', {
                    templateUrl: 'modules/demo/phone-list.html',
                    controller: 'PhoneListCtrl',
                    controllerUrl: './modules/demo/phone-controller.js'
                }).

                //login
                when('/login/fast', {
                    templateUrl: 'modules/login/loginFast.html',
                    controller: 'LoginFastCtrl',
                    controllerUrl: './modules/login/controller/loginFastCtrl.js'
                }).when('/login/password', {
                    templateUrl: 'modules/login/loginPassword.html',
                    controller: 'LoginPasswordCtrl',
                    controllerUrl: './modules/login/controller/loginPasswordCtrl.js'
                }).when('/login/telephone', {
                    templateUrl: 'modules/login/loginTelephone.html',
                    controller: 'LoginTelephoneCtrl',
                    controllerUrl: './modules/login/controller/loginTelephoneCtrl.js'
                }).when('/login/reset', {
                    templateUrl: 'modules/login/resetPassword.html',
                    controller: 'ResetPasswordCtrl',
                    controllerUrl: './modules/login/controller/resetPasswordCtrl.js'
                }).when('/login/signUp', {
                    templateUrl: 'modules/login/signUp.html',
                    controller: 'SignUpCtrl',
                    controllerUrl: './modules/login/controller/signUpCtrl.js'
                }).

                //实名认证提额
                when('/verify/index', {
                    templateUrl: 'modules/verify/index.html',
                    controller: 'VerifyIndexCtrl',
                    controllerUrl: './modules/verify/controller/verifyIndexCtrl.js'
                }).when('/verify/bank', {
                    templateUrl: 'modules/verify/bank-verify.html',
                    controller: 'VerifyBankCtrl',
                    controllerUrl: './modules/verify/controller/verifyBankCtrl.js'
                }).when('/verify/real-name', {
                    templateUrl: 'modules/verify/real-name.html',
                    controller: 'VerifyRealNameCtrl',
                    controllerUrl: './modules/verify/controller/verifyRealNameCtrl.js'
                }).when('/verify/taobao', {
                    templateUrl: 'modules/verify/taobao-verify.html',
                    controller: 'VerifyTaobaoCtrl',
                    controllerUrl: './modules/verify/controller/verifyTaobaoCtrl.js'
                }).when('/verify/fast', {
                    templateUrl: 'modules/verify/fast-verify.html',
                    controller: 'VerifyFastCtrl',
                    controllerUrl: './modules/verify/controller/verifyFastCtrl.js'
                }).when('/verify/fast-student', {
                    templateUrl: 'modules/verify/fast-verify-student.html',
                    controller: 'VerifyFastStudentCtrl',
                    controllerUrl: './modules/verify/controller/verifyFastStudentCtrl.js'
                }).when('/verify/how-to-register', {
                    templateUrl: 'modules/verify/how-to-register.html'
                }).

                //首页
                when('/index', {
                    templateUrl: 'modules/index/index.html',
                    controller: 'IndexCtrl',
                    controllerUrl: './modules/index/controller/indexCtrl.js'
                }).when('/mine/setting', {
                    templateUrl: 'modules/mine/setting.html',
                    controller: 'SettingCtrl',
                    controllerUrl: './modules/mine/controller/settingCtrl.js'
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

                //知情同意书
                when('/order/inform', {
                    templateUrl: 'modules/orderList/orderDetailInform.html',
                    controller: 'OrderDetailInformCtrl',
                    controllerUrl: './modules/orderList/controller/orderDetailInformCtrl.js'
                }).

                //保险详情
                when('/insurance/details', {
                    templateUrl: 'modules/insurance/insurance.html',
                    controller: 'InsuranceCtrl',
                    controllerUrl: './modules/insurance/controller/insuranceCtrl.js'
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

                //产品详情
                when('/goods', {
                    templateUrl: './modules/goods/goods.html',
                    controller: 'GoodsCtrl',
                    controllerUrl: './modules/goods/controller/goodsCtrl.js'
                }).

                //医院自定义商品
                when('/diy/goods', {
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
                    controller: 'FirstPayCtrl',
                    controllerUrl: './modules/pay/controller/firstPayCtrl.js'
                }).


                //保险说明静态页
                when('/insurance/introduce', {
                    templateUrl: 'modules/static/insuranceIntroduce.html'
                }).
                //服务合同静态页
                when('/contact/service', {
                    templateUrl: 'modules/static/serviceContact.html'
                }).
                //借款合同静态页
                when('/contact/loan', {
                    templateUrl: 'modules/static/loanContact.html'
                }).
                //芝麻信用回调
                when('/zmxy/callback', {
                    templateUrl: 'modules/static/zmVerifyCallback.html',
                    controller: 'ZmVerifyCallbackCtrl',
                    controllerUrl: './modules/static/controller/zmVerifyCallbackCtrl.js'
                }).
                //优惠券
                when('/coupon', {
                    templateUrl: 'modules/coupon/coupon.html',
                    controller: 'CouponCtrl',
                    controllerUrl: './modules/coupon/controller/couponCtrl.js'
                }).


                //一元夺宝
                when('/treasure', {
                    templateUrl: 'modules/treasure/index.html',
                    controller: 'TreasureCtrl',
                    controllerUrl: './modules/treasure/controller/treasureCtrl.js'
                }).when('/treasure/detail', {
                    templateUrl: 'modules/treasure/detail.html',
                    controller: 'TreasureDetailCtrl',
                    controllerUrl: './modules/treasure/controller/treasureDetailCtrl.js'
                }).when('/treasure/record/detail', {
                    templateUrl: 'modules/treasure/recordDetail.html',
                    controller: 'TreasureRecordDetailCtrl',
                    controllerUrl: './modules/treasure/controller/treasureRecordDetailCtrl.js'
                }).when('/treasure/recharge', {
                    templateUrl: 'modules/treasure/recharge.html',
                    controller: 'TreasureRechargeCtrl',
                    controllerUrl: './modules/treasure/controller/treasureRechargeCtrl.js'
                }).when('/treasure/my-share', {
                    templateUrl: 'modules/treasure/myShare.html',
                    controller: 'TreasureMyShareCtrl',
                    controllerUrl: './modules/treasure/controller/treasureMyShareCtrl.js'
                }).when('/treasure/share', {
                    templateUrl: 'modules/treasure/share.html',
                    controller: 'TreasureShareCtrl',
                    controllerUrl: './modules/treasure/controller/treasureShareCtrl.js'
                }).when('/treasure/share/list', {
                    templateUrl: 'modules/treasure/shareList.html',
                    controller: 'TreasureShareListCtrl',
                    controllerUrl: './modules/treasure/controller/treasureShareListCtrl.js'
                }).when('/treasure/address', {
                    templateUrl: 'modules/treasure/address.html',
                    controller: 'TreasureAddressCtrl',
                    controllerUrl: './modules/treasure/controller/treasureAddressCtrl.js'
                }).when('/treasure/prize-record', {
                    templateUrl: 'modules/treasure/prizeRecord.html',
                    controller: 'TreasurePrizeRecordCtrl',
                    controllerUrl: './modules/treasure/controller/treasurePrizeRecordCtrl.js'
                }).when('/treasure/treasure-record', {
                    templateUrl: 'modules/treasure/treasureRecord.html',
                    controller: 'TreasureTreasureRecordCtrl',
                    controllerUrl: './modules/treasure/controller/treasureTreasureRecordCtrl.js'
                }).when('/treasure/invite', {
                    templateUrl: 'modules/treasure/invite.html',
                    controller: 'TreasureInviteCtrl',
                    controllerUrl: './modules/treasure/controller/treasureInviteCtrl.js'
                }).when('/treasure/pay-way', {
                    templateUrl: 'modules/treasure/payWay.html',
                    controller: 'TreasurePayWayCtrl',
                    controllerUrl: './modules/treasure/controller/treasurePayWayCtrl.js'
                }).


                //拼团
                when('/groupbuy/detail', {
                    templateUrl: 'modules/groupbuy/detail.html',
                    controller: 'GroupBuyDetailCtrl',
                    controllerUrl: './modules/groupbuy/controller/groupBuyDetailCtrl.js'
                }).when('/groupbuy/list', {
                    templateUrl: 'modules/groupbuy/list.html',
                    controller: 'GroupBuyListCtrl',
                    controllerUrl: './modules/groupbuy/controller/groupBuyListCtrl.js'
                }).when('/groupbuy/mine', {
                    templateUrl: 'modules/groupbuy/mine.html',
                    controller: 'GroupBuyMineCtrl',
                    controllerUrl: './modules/groupbuy/controller/groupBuyMineCtrl.js'
                }).when('/groupbuy/join', {
                    templateUrl: 'modules/groupbuy/join.html',
                    controller: 'GroupBuyJoinCtrl',
                    controllerUrl: './modules/groupbuy/controller/groupBuyJoinCtrl.js'
                }).when('/groupbuy/pay', {
                    templateUrl: 'modules/groupbuy/pay.html',
                    controller: 'GroupBuyPayCtrl',
                    controllerUrl: './modules/groupbuy/controller/groupBuyPayCtrl.js'
                }).


                //首页
                when('/', {
                    templateUrl: 'modules/app/app.html',
                    controller: 'AppCtrl',
                    controllerUrl: './modules/app/controller/appCtrl.js'
                }).

                //默认首页
                otherwise({
                    redirectTo: '/'
                });
                //$locationProvider.html5Mode(true);


                // Use x-www-form-urlencoded Content-Type
                $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

                /**
                 * The workhorse; converts an object to x-www-form-urlencoded serialization.
                 * @param {Object} obj
                 * @return {String}
                 */
                var param = function (obj) {
                    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

                    for (name in obj) {
                        value = obj[name];

                        if (value instanceof Array) {
                            for (i = 0; i < value.length; ++i) {
                                subValue = value[i];
                                fullSubName = name + '[' + i + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        }
                        else if (value instanceof Object) {
                            for (subName in value) {
                                subValue = value[subName];
                                fullSubName = name + '[' + subName + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        }
                        else if (value !== undefined && value !== null)
                            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    }

                    return query.length ? query.substr(0, query.length - 1) : query;
                };

// Override $http service's default transformRequest
                $httpProvider.defaults.transformRequest = [function (data) {
                    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
                }];

            }]);
    }


});