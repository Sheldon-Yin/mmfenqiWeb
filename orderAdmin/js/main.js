'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', '$http', '$state','$rootScope',
        function ($scope, $translate, $localStorage, $window, $http, $state,$rootScope) {
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

            // config
            $scope.app = {
                name: '美眉分期',
                version: '1.3.3',
                // for chart colors
                color: {
                    primary: '#7266ba',
                    info: '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger: '#f05050',
                    light: '#e8eff0',
                    dark: '#3a3f51',
                    black: '#1c2b36'
                },
                settings: {
                    themeID: 1,
                    navbarHeaderColor: 'bg-black',
                    navbarCollapseColor: 'bg-white-only',
                    asideColor: 'bg-black',
                    headerFixed: true,
                    asideFixed: false,
                    asideFolded: false,
                    asideDock: false,
                    container: false
                },
                user:{
                    name: '未登录',
                    role: '请登录'
                }
            };

            $rootScope.checkLogin = function () {
                $.get('/mmfq/api/customers/get_customers_of_no_return_visit',{
                    until_date: (Date.parse(new Date())/1000 + 43200)
                }).then(function (res) {
                    if (res.code == 0){
                        console.log(res);
                        $scope.noVisitTips = res.data;
                    } else {
                        console.log(res)
                    }
                }, function (error) {
                    console.log(error)
                });
                $scope.userInfo = $http.get('/mmfq/api/users/get_user_info');
                $scope.userInfo.then(function (res) {
                    console.log(res);
                    if (res.data.code == 0) {
                        $scope.app.user.name = res.data.data.real_name;
                        $scope.app.user.role = res.data.data.role;
                    } else {
                        $state.go('access.signin')
                    }
                }).catch(function (error) {
                    console.log('服务器无响应');
                    $state.go('access.signin')
                });
            };

            $rootScope.checkLogin();

            setInterval(function () {
                $rootScope.checkLogin()
            },1800000);


            // save settings to local storage
            if (angular.isDefined($localStorage.settings)) {
                $scope.app.settings = $localStorage.settings;
            } else {
                $localStorage.settings = $scope.app.settings;
            }
            $scope.$watch('app.settings', function () {
                if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                    // aside dock and fixed must set the header fixed.
                    $scope.app.settings.headerFixed = true;
                }
                // save to local storage
                $localStorage.settings = $scope.app.settings;
            }, true);

            // angular translate
            $scope.lang = {isopen: false};
            $scope.langs = {en: 'English', de_DE: 'German', it_IT: 'Italian'};
            $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
            $scope.setLang = function (langKey, $event) {
                // set the current lang
                $scope.selectLang = $scope.langs[langKey];
                // You can change the language during runtime
                $translate.use(langKey);
                $scope.lang.isopen = !$scope.lang.isopen;
            };

            function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }

        }]);