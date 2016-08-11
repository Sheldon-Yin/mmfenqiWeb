/**
 * Created by sheldon on 2016/5/20.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/loginService.js')(app);
        require('services/weChatService.js')(app);
        require('services/utilsService.js')(app);
        app.register.controller('SignUpCtrl', ['$scope', 'Login', '$location','WeChatTitle','$interval','MD5',
            function ($scope, Login, $location,WeChatTitle,$interval,MD5) {


                WeChatTitle('手机号');

                $scope.telephone = parseInt($location.search().telephone);

                $scope.$root.loading = false;


                $scope.hideSelect = function () {
                    $scope.selecting = false
                };

                $scope.selectName='白领';
                $scope.type='6';

               // $scope.telephone = Number($location.search().telephone);


                $scope.selectCode=function () {
                    $scope.selecting= true;
                    $scope.json=[
                        {name:'学生',type:'0'},
                        {name:'白领',type:'6'}
                    ];

                    $scope.initShowSelect($scope.json,'请选择','name', 'type',function (name,type) {
                        $scope.selectName = name;
                        $scope.type = type;
                        $scope.selecting = false;
                    })


                };


                $scope.initShowSelect = function (items, title, itemName, itemValue, cb) {
                    $scope.selecting = true;
                    $scope.selectItems = items;
                    $scope.selectTitle = title;
                    $scope.itemName = itemName;
                    $scope.itemValue = itemValue;
                    $scope.selectCallBack = cb;
                };


                $scope.text='获取验证码';
                $scope.verifyStatus = true;
                $scope.getCode=function () {

                    if ($scope.telephone == undefined) {
                        Toast('请输入手机号');
                        return
                    }
                    if(!$scope.verifyStatus) return;


                    $scope.getVerifyCodeReq = Login.getVerifyCode().save({
                        telephone: $scope.telephone,
                        smsFmtId: 'register'
                    });
                    $scope.getVerifyCodeReq.$promise.then(function (res) {

                        console.log(res)
                        $scope.$root.loading = false;
                        if (res.result == 0) {
                            Toast('发送成功');
                            $scope.counter = 60;
                            $scope.verifyStatus = false;
                            var interval = $interval(function () {
                                $scope.text = $scope.counter+'s后重发';
                                if($scope.counter < 1) {
                                    $interval.cancel(interval);
                                    $scope.verifyStatus = true;
                                    $scope.text = '获取验证码'
                                }
                                $scope.counter --;
                            },1000)
                        }else{
                            Toast(res.message);
                        }
                    })
                };
                $scope.business_register = function () {



                    if ($scope.telephone == undefined) {
                        Toast('请输入正确的手机号');
                        return
                    }

                    $scope.businessRegister = Login.business_register().save({
                        telephone: $scope.telephone,
                        password:MD5($scope.pwd),
                        verifyCode:$scope.code,
                        userType:$scope.type,
                        userName:$scope.name,
                        identitycode:$scope.identitycode,
                        serviceModel:1

                    });
                    $scope.$root.loading = true;

                    $scope.businessRegister.$promise.then(function (res) {
                        $scope.$root.loading = false;
                        console.log(res);
                        if (res.result == 0) {
                            var goodsId=$location.search().goodsId;

                            var hosId=$location.search().hosId;

                            //window.location.href = window.localStorage.referer;

                            $location.url('/login/telephone');

                            // $location.url('')
                            // switch (res.data.telephone_exist) {
                            //     case true:
                            //         $location.url('/login/password?telephone=' + $scope.telephone + '&referer=' + $location.search().referer);
                            //         break;
                            //     case false:
                            //         $location.url('/login/signUp?telephone=' + $scope.telephone + '&referer=' + $location.search().referer);
                            //         break;
                            //     default:
                            //         Toast('从服务器返回了奇怪的数据')
                            // }

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
                    $location.url('/login/fast?telephone=' + $scope.telephone + '&referer=' + $location.search().referer)
                }

            }])
    }
});
