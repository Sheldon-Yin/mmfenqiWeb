/**
 * Created by sheldon on 2016/8/3.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('VerifyCollarFirstCtrl', ['$scope', 'Verify', 'WeChat','$location','WeChatTitle','Bridge',
            function ($scope, Verify, WeChat,$location,WeChatTitle,Bridge) {


                WeChatTitle('基础认证申请额度');

                //选择学历逻辑

                $scope.selectEducationName = '选择';

                $scope.initShowSelect = function (items, title, itemName, itemValue, cb) {
                    $scope.selecting = true;
                    $scope.selectItems = items;
                    $scope.selectTitle = title;
                    $scope.itemName = itemName;
                    $scope.itemValue = itemValue;
                    $scope.selectCallBack = cb;
                };

                $scope.selectEducation = function () {
                    $scope.educations = [
                        {educationName: '普通本科', educationValue: 3},
                        {educationName: '普通专科', educationValue: 4},
                        {educationName: '普通硕士研究生', educationValue: 5},
                        {educationName: '普通博士研究生', educationValue: 6},
                        {educationName: '普通专升本', educationValue: 7},
                        {educationName: '自考本科', educationValue: 8},
                        {educationName: '自考专科', educationValue: 9},
                        {educationName: '成人本科', educationValue: 10},
                        {educationName: '成人专科', educationValue: 11},
                        {educationName: '其它', educationValue: 12}
                    ];
                    $scope.initShowSelect($scope.educations, '学历类型', 'educationName', 'educationValue', function (educationValue, educationName) {
                        $scope.selectEducationName = educationName;
                        $scope.selectEducationValue = educationValue;
                        $scope.selecting = false;
                    })
                };

                //选择学历逻辑

                Bridge.appToken(function (response) {
                    $scope.appToken = response;
                    $scope.initFastStatus = function () {

                        $scope.getFastStatus = Verify.resultForVerifyBaseInfo().query({
                                appToken: $scope.appToken
                            }
                        );

                        $scope.$root.loading = true;
                        $scope.getFastStatus.$promise.then(function (res) {
                            $scope.$root.loading = false;
                            if (res.result == 0) {

                                $scope.isCreditCard = false;
                                $scope.isLoan = false;
                                $scope.isInvestment = false;
                                $scope.isDriving = false;
                                $scope.isHouse = false;

                                if (!!res.data.whiteCollarCreditInfo) {
                                    $scope.company_name = res.data.whiteCollarCreditInfo.companyName;
                                    $scope.company_telphone = res.data.whiteCollarCreditInfo.companyTelphone;
                                    $scope.company_position = res.data.whiteCollarCreditInfo.companyPosition;
                                    $scope.company_addr = res.data.whiteCollarCreditInfo.companyAddr;
                                    $scope.address = res.data.whiteCollarCreditInfo.address;
                                    $scope.bankcardcode = res.data.bankcardCode;
                                    $scope.name = res.data.contactInfo.contactName;
                                    $scope.relation = res.data.contactInfo.relation;
                                    $scope.telphone = res.data.contactInfo.telphone;
                                    $scope.second_name = res.data.contactInfo.contactSencondName;
                                    $scope.second_relation = res.data.contactInfo.contactSencondRelation;
                                    $scope.second_telphone = res.data.contactInfo.contactSencondTelphone;

                                    //$scope.isCreditCard = res.data.whiteCollarCreditInfo.isCreditCard;
                                    //$scope.isLoan = res.data.whiteCollarCreditInfo.isLoan;
                                    //$scope.monthlyIncome = res.data.whiteCollarCreditInfo.monthlyIncome;
                                    //$scope.isInvestment = res.data.whiteCollarCreditInfo.isInvestment;
                                    //$scope.isDriving = res.data.whiteCollarCreditInfo.isDriving;
                                    //$scope.isHouse = res.data.whiteCollarCreditInfo.isHouse;
                                }

                            } else if (res.result == 1013) {
                                window.location.href = './#/login/telephone';
                            } else {
                                Toast(res.msg)
                            }
                            console.log(res)
                        }).catch(function (error) {
                            $scope.$root.loading = false;
                            Toast(error)
                        })
                    };
                    $scope.initFastStatus();
                });

                //first
                $scope.submitFirstInfo = function () {

                    if ($scope.telphone == undefined) {
                        Toast('请输入正确的手机号');
                        return
                    }

                    if ($scope.company_telphone == undefined) {
                        Toast('请输入正确的公司电话');
                        return
                    }

                    console.log(1);
                    $scope.firstInfoReq = Verify.verifyBaseInfoFirst().save({
                        company_name: $scope.company_name,
                        company_telphone: $scope.company_telphone,
                        company_position: $scope.company_position,
                        company_addr: $scope.company_addr,
                        address: $scope.address,
                        bankcardcode: $scope.bankcardcode,
                        name: $scope.name,
                        relation: $scope.relation,
                        telphone: $scope.telphone,
                        second_name: $scope.second_name,
                        second_relation: $scope.second_relation,
                        second_telphone: $scope.second_telphone,
                        appToken: $scope.appToken,
                        education: $scope.selectEducationValue
                    });
                    $scope.$root.loading = true;

                    $scope.firstInfoReq.$promise.then(function (res) {
                        $scope.$root.loading = false;
                        console.log(res);
                        $scope.loading = false;
                        if (res.result == 0) {
                            $scope.jumpToNext();
                            Toast('提交成功');
                        } else {
                            Toast(res.msg)
                        }

                    }).catch(function (error) {
                        Toast(error);
                        $scope.$root.loading = false;
                    })
                };

                $scope.jumpToNext = function () {
                    $scope.$parent.jumpToNext();
                }

            }])
    }
});