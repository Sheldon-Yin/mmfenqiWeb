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
                    $rootScope.checkLogin();
                });
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider
                    .otherwise('/app/customer/list');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'tpl/app.html'
                    })
                    .state('app.dashboard-v1', {
                        url: '/dashboard-v1',
                        templateUrl: 'tpl/app_dashboard_v1.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/chart.js']);
                                }]
                        }
                    })
                    .state('app.dashboard-v2', {
                        url: '/dashboard-v2',
                        templateUrl: 'tpl/app_dashboard_v2.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/chart.js']);
                                }]
                        }
                    })
                    .state('app.ui', {
                        url: '/ui',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.ui.buttons', {
                        url: '/buttons',
                        templateUrl: 'tpl/ui_buttons.html'
                    })
                    .state('app.ui.icons', {
                        url: '/icons',
                        templateUrl: 'tpl/ui_icons.html'
                    })
                    .state('app.ui.grid', {
                        url: '/grid',
                        templateUrl: 'tpl/ui_grid.html'
                    })
                    .state('app.ui.widgets', {
                        url: '/widgets',
                        templateUrl: 'tpl/ui_widgets.html'
                    })
                    .state('app.ui.bootstrap', {
                        url: '/bootstrap',
                        templateUrl: 'tpl/ui_bootstrap.html'
                    })
                    .state('app.ui.sortable', {
                        url: '/sortable',
                        templateUrl: 'tpl/ui_sortable.html'
                    })
                    .state('app.ui.portlet', {
                        url: '/portlet',
                        templateUrl: 'tpl/ui_portlet.html'
                    })
                    .state('app.ui.timeline', {
                        url: '/timeline',
                        templateUrl: 'tpl/ui_timeline.html'
                    })
                    .state('app.ui.tree', {
                        url: '/tree',
                        templateUrl: 'tpl/ui_tree.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/tree.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.ui.toaster', {
                        url: '/toaster',
                        templateUrl: 'tpl/ui_toaster.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/toaster.js');
                                        }
                                    );
                                }]
                        }
                    })
                    .state('app.ui.jvectormap', {
                        url: '/jvectormap',
                        templateUrl: 'tpl/ui_jvectormap.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('js/controllers/vectormap.js');
                                }]
                        }
                    })
                    .state('app.ui.googlemap', {
                        url: '/googlemap',
                        templateUrl: 'tpl/ui_googlemap.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load([
                                        'js/app/map/load-google-maps.js',
                                        'js/app/map/ui-map.js',
                                        'js/app/map/map.js']).then(
                                        function () {
                                            return loadGoogleMaps();
                                        }
                                    );
                                }]
                        }
                    })
                    .state('app.chart', {
                        url: '/chart',
                        templateUrl: 'tpl/ui_chart.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('js/controllers/chart.js');
                                }]
                        }
                    })
                    //customer
                    .state('app.customer', {
                        url: '/customer',
                        template: '<div ui-view></div>'
                    })
                    .state('app.customer.list', {
                        url: '/list',
                        templateUrl: 'tpl/customer/customerList.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load('ui.select').then(
                                                function () {
                                                    return $ocLazyLoad.load('js/controllers/customerListCtrl.js')
                                                })
                                        }
                                    );
                                }]
                        }
                    })
                    .state('app.customer.not-return', {
                        url: '/not-return',
                        templateUrl: 'tpl/customer/customerNotReturnList.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('js/controllers/customerNotReturnListCtrl.js')
                                }]
                        }
                    })
                    .state('app.customer.add', {
                        url: '/add',
                        templateUrl: 'tpl/customer/customerAdd.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/customerAddCtrl.js')
                                        });
                                }]
                        }
                    })
                    .state('app.customer.detail', {
                        url: '/detail',
                        templateUrl: 'tpl/customer/customerDetail.html',
                        params: {'id': null},
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/customerDetailCtrl.js')
                                        });
                                }]
                        }
                    })

                    //employee
                    .state('app.employee', {
                        url: '/employee',
                        template: '<div ui-view></div>'
                    })
                    .state('app.employee.list', {
                        url: '/list',
                        templateUrl: 'tpl/employee/employeeList.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/employeeListCtrl.js');
                                        })
                                }]
                        }
                    })
                    .state('app.employee.add', {
                        url: '/add',
                        templateUrl: 'tpl/employee/employeeAdd.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/employeeAddCtrl.js')
                                        })
                                }]
                        }
                    })
                    //user
                    .state('app.user', {
                        url: '/user',
                        templateUrl: 'tpl/user/userDetail.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/userDetailCtrl.js')
                                        })
                                }]
                        }
                    })

                    //statistic
                    .state('app.statistic', {
                        url: '/statistic',
                        template: '<div ui-view></div>'
                    })
                    .state('app.statistic.order', {
                        url: '/order',
                        templateUrl: 'tpl/statistic/statisticOrder.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('js/controllers/statisticOrderCtrl.js');
                                }]
                        }
                    })
                    .state('app.statistic.hospitalKinds', {
                        url: '/hospital/kind',
                        templateUrl: 'tpl/statistic/statisticHospitalKinds.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('js/controllers/statisticHospitalKindsCtrl.js');
                                }]
                        }
                    })
                    .state('app.statistic.schoolKinds', {
                        url: '/school/kind',
                        templateUrl: 'tpl/statistic/statisticSchoolKinds.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('js/controllers/statisticSchoolKindsCtrl.js');
                                }]
                        }
                    })
                    .state('app.statistic.projectKinds', {
                        url: '/project/kind',
                        templateUrl: 'tpl/statistic/statisticProjectKinds.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('js/controllers/statisticProjectKindsCtrl.js');
                                }]
                        }
                    })
                    .state('app.statistic.intentionKinds', {
                        url: '/intention/kind',
                        templateUrl: 'tpl/statistic/statisticIntentionKinds.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('js/controllers/statisticIntentionKindsCtrl.js');
                                }]
                        }
                    })

                    // others
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
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