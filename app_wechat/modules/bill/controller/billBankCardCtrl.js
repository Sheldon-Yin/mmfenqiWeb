/**
 * Created by ChinaHp on 2016/8/24.
 */
'use strict';
define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/billService.js')(app);
        require('services/weChatService.js')(app);
        require('directives/directives.js')(app);
        app.register.controller('BillBankCardCtrl', ['$scope', '$location', 'userGetCode', 'Bridge','$interval','verifyBankCard',
            function ($scope, $location, userGetCode, Bridge,$interval,verifyBankCard) {

                /*弹框*/

                $scope.isopen=false;

                $scope.config={
                    title:'提示',
                    content:'身份证反面可以查看该时间',
                    btn1:'我知道了',
                    no:true,
                    style:'text-align: center',
                    styleBtn:'width:6rem'

                };
                $scope.openCt=function () {
                    $scope.isopen=true;
                };

                $scope.sure=function () {
                    $scope.isopen=false;
                };


                $scope.bankNames=[
                    {bankCardType:'中国农业银行',bankCode:'ABC'},
                    {bankCardType:'中国银行',bankCode:'BOC'},
                    {bankCardType:'交通银行',bankCode:'COMM'},
                    {bankCardType:'中国建设银行',bankCode:'CCB'},
                    {bankCardType:'中国光大银行',bankCode:'CEB'},
                    {bankCardType:'兴业银行',bankCode:'CIB'},
                    {bankCardType:'招商银行',bankCode:'CMB'},
                    {bankCardType:'民生银行',bankCode:'CMBC'},
                    {bankCardType:'中信银行',bankCode:'CITIC'},
                    {bankCardType:'重庆农村商业银行',bankCode:'CQRCB'},
                    {bankCardType:'中国工商银行',bankCode:'ICBC'},
                    {bankCardType:'中国邮政储蓄银行',bankCode:'PSBC'},
                    {bankCardType:'浦发银行',bankCode:'SPDB'},
                    {bankCardType:'中国银联',bankCode:'UNION'},
                    {bankCardType:'重庆银行',bankCode:'CQCB'},
                    {bankCardType:'广东发展银行',bankCode:'CGB'},
                    {bankCardType:'深圳发展银行',bankCode:'SDB'},
                    {bankCardType:'华夏银行',bankCode:'HXB'},
                    {bankCardType:'重庆三峡银行',bankCode:'CQTGB'},
                    {bankCardType:'平安银行',bankCode:'PINGANBK'},
                    {bankCardType:'上海银行',bankCode:'BANKSH'},

                ];

                $scope.initShowSelect = function (items, title, itemName, itemValue, cb) {
                    $scope.selecting = true;
                    $scope.selectItems = items;
                    $scope.selectTitle = title;
                    $scope.itemName = itemName;
                    $scope.itemValue = itemValue;
                    $scope.selectCallBack = cb;
                };
                
                

                $scope.click=function () {

                    $scope.B_time=true;
                };
                $scope.B_time=false;
                $scope._time=function () {
                    $scope.B_time=false;
                };

                
                $scope.hideSelect = function () {
                    $scope.selecting = false
                };

                $scope.selectBank=function () {
                    $scope.selecting = true;

                    $scope.initShowSelect($scope.bankNames, '请选择', 'bankCardType', 'bankCode', function (bankCardType,bankCode) {
                        $scope.selecting = false;
                        $scope.bankCardType=bankCardType;
                        $scope.bankCode=bankCode;

                    })
                };

                Bridge.appToken(function (res) {
                    $scope.appToken = res;
                });

                $scope.verify=function () {
                    console.log($scope.appToken);
                    $scope.verifyBankCard=verifyBankCard.save({
                        appToken: $scope.appToken,
                        realName:$scope.realName,
                        bankCardType:$scope.bankCardType,
                        bankCode:$scope.bankCode,
                        bankCardNo:$scope.bankCardNo,
                        certNo:$scope.certNo,
                        validityTime:$scope.validityTime,
                        mobileNo:$scope.mobileNo,
                        verifyCode:$scope.verifyCode,
                        bankCardFrontPic:$scope.bankCardFrontPic,
                        identityBackPic:$scope.identityBackPic
                    });

                    $scope.verifyBankCard.$promise.then(function (res) {
                        console.log(res);
                        Toast(res.result)
                    })
                };

                

                $scope.text='获取验证码';
                $scope.verifyStatus = true;
                
                $scope.getCode=function () {

                    if ($scope.mobileNo == undefined) {
                        Toast('请输入手机号');
                        return
                    }
                    if(!$scope.verifyStatus) return;


                    $scope.getVerifyCodeReq = userGetCode.save({
                        telephone: $scope.mobileNo,
                        smsFmtId: 'bankCardVerify'
                    });


                    $scope.getVerifyCodeReq.$promise.then(function (res) {

                        console.log(res);
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
                            Toast(res.msg);
                        }
                    })
                };

                $scope.imgPreId='modules/bill/img/idcard.jpg';

                $scope.bankCardId='modules/bill/img/bankcard.jpg';

                $scope.defaultDeleteIdCard=false;


                $scope.deleteIdCard=function () {
                    $scope.defaultDeleteIdCard=false;
                    document.getElementById('idCard').src = 'modules/bill/img/idcard.jpg';
                    $scope.bankCardFrontPic = '';

                };

                $scope.defaultDeleteBankCard=false;

                $scope.deleteBankCard=function () {
                    $scope.defaultDeleteBankCard=false;
                    document.getElementById('bankCard').src = 'modules/bill/img/bankcard.jpg';
                    $scope.identityBackPic = '';

                };


                $scope.uploadIdCard=function () {
                    if(!!$scope.defaultDeleteIdCard){
                        return
                    }
                    Bridge.uploadImgFromCameraOrAlbum(function (pre, media) {
                        $scope.defaultDeleteIdCard=true;
                        $scope.$apply(function () {
                            document.getElementById('idCard').src = pre;
                            $scope.bankCardFrontPic = media;

                        })
                    });
                };

                $scope.uploadBankCard=function () {


                    if(!!$scope.defaultDeleteBankCard){
                        return
                    }

                    Bridge.uploadImgFromCameraOrAlbum(function (pre, media) {
                        $scope.defaultDeleteBankCard=true;
                        $scope.$apply(function () {
                            document.getElementById('bankCard').src = pre;
                            $scope.identityBackPic = media;

                        })
                    });
                }

            }])


    }}

    );


