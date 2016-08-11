'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

                $rootScope.$on('$stateChangeStart', function (event, current, previous) {
                    console.log($stateParams.hospitalName);
                    $rootScope.hospitalName = $stateParams.hospitalName;
                    $rootScope.checkLogin();
                });

                $rootScope.$on('$routeUpdate', function (event, current, previous) {
                    console.log($stateParams.hospitalName);
                    $rootScope.hospitalName = $stateParams.hospitalName;
                    $rootScope.checkLogin();
                });
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/app/order/list');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'tpl/app.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster')
                                }
                            ]
                        }
                    })
                    //账单
                    .state('app.bill', {
                        url: '/bill',
                        template: '<div ui-view></div>'
                    })
                    .state('app.bill.list', {
                        url: '/list',
                        templateUrl: 'tpl/bill/billList.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load(['js/controllers/bill/billListCtrl.js']);
                                        })
                                }]
                        }
                    })
                    .state('app.bill.detail', {
                        url: '/detail',
                        templateUrl: 'tpl/bill/billDetail.html',
                        params: {'id': null, 'orderSn': null},
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load(['js/controllers/bill/billDetailCtrl.js']);
                                        })
                                }]
                        }
                    })
                    .state('app.bill.getCash', {
                        url: '/getCash',
                        templateUrl: 'tpl/bill/billGetCash.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/bill/billGetCashCtrl.js']);
                                }]
                        }
                    })

                    //报备
                    .state('app.report', {
                        url: '/report',
                        template: '<div ui-view></div>'
                    })
                    .state('app.report.list', {
                        url: '/list',
                        templateUrl: 'tpl/report/reportList.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load(['js/controllers/report/reportListCtrl.js']);
                                        })
                                }]
                        }
                    })
                    .state('app.report.repeat', {
                        url: '/repeat',
                        templateUrl: 'tpl/report/reportRepeat.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load(['js/controllers/report/reportRepeatCtrl.js']);
                                        })
                                }]
                        }
                    })

                    //订单
                    .state('app.order', {
                        url: '/order',
                        template: '<div ui-view></div>'
                    })
                    .state('app.order.list', {
                        url: '/list',
                        templateUrl: 'tpl/order/orderList.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/order/orderListCtrl.js']);
                                }]
                        }
                    })
                    .state('app.order.diy', {
                        url: '/diy',
                        templateUrl: 'tpl/order/orderDiy.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load(['js/controllers/order/orderDiyCtrl.js']);
                                        })
                                }]
                        }
                    })
                    .state('app.order.detail', {
                        url: '/detail',
                        templateUrl: 'tpl/order/orderDetail.html',
                        params: {'id': null},
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/order/orderDetailCtrl.js']);
                                }]
                        }
                    })
                    .state('app.order.verify', {
                        url: '/verify',
                        templateUrl: 'tpl/order/orderVerify.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/order/orderVerifyCtrl.js']);
                                }]
                        }
                    })
                    //设置
                    .state('app.setting', {
                        url: '/setting',
                        template: '<div ui-view></div>'
                    })
                    .state('app.setting.userList', {
                        url: '/userList',
                        templateUrl: 'tpl/setting/settingUserList.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/setting/settingUserListCtrl.js']);
                                }]
                        }
                    })
                    .state('app.setting.selfInfo', {
                        url: '/selfInfo',
                        templateUrl: 'tpl/setting/settingSelfInfo.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/setting/settingSelfInfoCtrl.js']);
                                }]
                        }
                    })
                    .state('app.setting.userAdd', {
                        url: '/userAdd',
                        templateUrl: 'tpl/setting/settingUserAdd.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load(['js/controllers/setting/settingUserAddCtrl.js']);
                                        })
                                }]
                        }
                    })
                    //登录
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth" style="margin-top: 10%"></div>',
                        params: {'name': null},
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster')
                                }
                            ]
                        }
                    })
                    .state('access.signin', {
                        url: '/signin',
                        templateUrl: 'tpl/page_signin.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/signin.js']);
                                }]
                        }
                    })
            }
        ]
    );