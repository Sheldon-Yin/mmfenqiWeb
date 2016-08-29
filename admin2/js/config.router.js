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
        ['$stateProvider', '$urlRouterProvider', '$httpProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider) {


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
                        params: {'projectReviewStatus': ''},
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load('ui.select').then(
                                                function () {
                                                    return $ocLazyLoad.load(['js/controllers/customerListCtrl.js', 'js/services/customerListService.js'])
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
                                            return $ocLazyLoad.load(['js/controllers/customerDetailCtrl.js', 'js/services/customerListService.js'])
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

                    //verifier


                    .state('app.verifier', {
                        url: '/verifier',
                        template: '<div ui-view></div>'
                    })
                    .state('app.verifier.userAttestation', {
                        url: '/user/attestation',
                        templateUrl: 'tpl/verifier/verifierUserAttestation.html',
                        resolve: {
                            deps: ['uiLoad', function (uiLoad) {
                                return uiLoad.load(['js/controllers/verifierUserAttestation.js', 'js/services/verificationService.js'])

                            }]
                        }
                    })
                    .state('app.verifier.studentCredit', {
                        url: '/student/credit',
                        templateUrl: 'tpl/verifier/verifierStudentCredit.html',
                        resolve: {
                            deps: ['uiLoad', function (uiLoad) {
                                return uiLoad.load(['js/controllers/verifierStudentCredit.js', 'js/services/verificationService.js'])

                            }]
                        }
                    })
                    .state('app.verifier.colBlanc', {
                        url: '/col/blanc',
                        templateUrl: 'tpl/verifier/verifierColBlanc.html',
                        resolve: {
                            deps: ['uiLoad', function (uiLoad) {
                                return uiLoad.load(['js/controllers/verifierColBlanc.js', 'js/services/verificationService.js'])

                            }]
                        }
                    })
                    .state('app.verifier.paymenting', {
                        url: '/paymenting',
                        templateUrl: 'tpl/risk/paymenting.html',
                        resolve: {
                            deps: ['uiLoad', function (uiLoad) {
                                return uiLoad.load(['js/controllers/risk/paymenting.js', 'js/services/risk.js'])

                            }]
                        }
                    })
                    .state('app.verifier.detail', {
                        url: '/detail',
                        templateUrl: 'tpl/risk/paymentingDetail.html',
                        params: {'userBillId': null},
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load(['js/controllers/risk/paymentingDetail.js', 'js/services/risk.js'])
                                        });
                                }]
                        }
                    })


                    .state('app.risk.overdue', {
                        url: '/overdue',
                        templateUrl: 'tpl/risk/overdue.html',
                        resolve: {
                            deps: ['uiLoad', function (uiLoad) {
                                return uiLoad.load('js/controllers/risk/overdue.js')

                            }]
                        }
                    })
                    .state('app.risk.allpaymented', {
                        url: '/allpaymented',
                        templateUrl: 'tpl/risk/allpaymented.html',
                        resolve: {
                            deps: ['uiLoad', function (uiLoad) {
                                return uiLoad.load('js/controllers/risk/allpaymented.js')

                            }]
                        }
                    })


                    //财务

                    .state('app.finance', {
                        url: '/finance',
                        template: '<div ui-view></div>'
                    })
                    .state('app.finance.merchant',{
                        url:'/merchant',
                        templateUrl: 'tpl/finance/merchantPayment.html',
                        params: {'id': null},
                        resolve: {
                            deps: ['uiLoad', function (uiLoad) {
                                return uiLoad.load(['js/controllers/finance/merchantCtrl.js','js/controllers/finance/commonCtrl.js','js/services/finaceService.js'])

                            }]
                        }

                    })

                    .state('app.finance.merchantDetail', {
                        url: '/merchantDetail',
                        templateUrl: 'tpl/finance/mechant-details.html',
                        params: {'id': null},
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/finance/mechantDetailsCtrl.js', 'js/services/finaceService.js'])

                                }]
                        }
                    })
                    .state('app.finance.reimbursement',{
                        url:'/reimbursement',
                        templateUrl: 'tpl/finance/reimbursement.html',
                        resolve: {
                            deps: ['uiLoad', function (uiLoad) {
                                return uiLoad.load(['js/controllers/finance/reimbursementCtrl.js','js/services/finaceService.js'])

                            }]
                        }
                    })
                    .state('app.finance.insuranceBil',{
                        url:'/insuranceBil',
                        templateUrl: 'tpl/finance/insuranceBil.html',
                        params: {'id': null},
                        resolve: {
                            deps: ['uiLoad', function (uiLoad) {
                                return uiLoad.load(['js/controllers/finance/insuranceBilCtrl.js','js/services/finaceService.js'])

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
                    });

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


            }
        ]
    );
