/**
 * Created by sheldon on 2016/5/20.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/loginService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('LoginTelephoneCtrl', ['$scope', 'Login', '$location','WeChatTitle',
            function ($scope, Login, $location,WeChatTitle) {

                WeChatTitle('手机号');

                $scope.$root.loading = false;

                $scope.telephone = Number($location.search().telephone);

                $scope.goToPasswordOrRegister = function () {

                    if ($scope.telephone == undefined) {
                        Toast('请输入正确的手机号');
                        return
                    }

                    $scope.userIsExist = Login.isExist().save({
                        telephone: $scope.telephone
                    });
                    $scope.$root.loading = true;

                    $scope.userIsExist.$promise.then(function (res) {
                        $scope.$root.loading = false;
                        console.log(res);
                        if (res.result == 0) {

                            $scope.getSessionId = function(){
                                var c_name = 'JSESSIONID';
                                if(document.cookie.length>0){
                                    var c_start=document.cookie.indexOf(c_name + "=");
                                    if(c_start!=-1){
                                        c_start=c_start + c_name.length+1;
                                        var c_end=document.cookie.indexOf(";",c_start);
                                        if(c_end==-1) c_end=document.cookie.length;
                                        return unescape(document.cookie.substring(c_start,c_end));
                                    }
                                }
                            };

                            (function() {
                                var _fmOpt = {
                                    partner: 'mmfenqi',
                                    appName: 'mmfenqi_web',
                                    token:  $scope.getSessionId()       };
                                var cimg = new Image(1,1);
                                cimg.onload = function() {
                                    _fmOpt.imgLoaded = true;
                                };
                                cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=mmfenqi&appName=mmfenqi_web&tokenId=" + _fmOpt.token;
                                var fm = document.createElement('script'); fm.type = 'text/javascript'; fm.async = true;
                                fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime()/3600000).toFixed(0);
                                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fm, s);
                            })();



                            switch (res.data.telephone_exist) {
                                case true:
                                    $location.url('/login/password?telephone=' + $scope.telephone);
                                    break;
                                case false:
                                    $location.url('/login/signUp?telephone=' + $scope.telephone);
                                    break;
                                default:
                                    Toast('服务器开小差了~')
                            }
                        } else {
                            Toast(res.message);
                        }
                    }).catch(function (error) {
                        console.log(error);
                        Toast('服务器开小差了~');
                        $scope.$root.loading = false;
                    });
                };

                $scope.goToFastLogin = function () {
                    $location.url('/login/fast?telephone=' + $scope.telephone)
                }

            }])
    }
});