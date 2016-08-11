/**
 * Created by sheldon on 2016/5/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('VerifyFastCtrl', ['$scope', 'Verify', '$location', 'WeChat', 'WeChatTitle', '$resource', 'Bridge',
            function ($scope, Verify, $location, WeChat, WeChatTitle, $resource, Bridge) {

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
                                $scope.status = Number(res.data.firstStepFlag);

                                if (res.data.checkStatus == "3" || res.data.checkStatus == "1") {
                                    Bridge.jumpTo($location.absUrl().split('#')[0] + '#?/verify/index', '认证提额');
                                    return
                                }

                                $scope.isCreditCard = false;
                                $scope.isLoan = false;
                                $scope.isInvestment = false;
                                $scope.isDriving = false;
                                $scope.isHouse = false;
                                $scope.isMarry = false;

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
                        appToken: $scope.appToken,
                        education: $scope.selectEducationValue
                    });
                    $scope.$root.loading = true;

                    $scope.firstInfoReq.$promise.then(function (res) {
                        $scope.$root.loading = false;
                        console.log(res);
                        $scope.loading = false;
                        if (res.result == 0) {
                            $scope.initFastStatus();
                            Toast('提交成功');
                        } else {
                            Toast(res.msg)
                        }

                    }).catch(function (error) {
                        Toast(error);
                        $scope.$root.loading = false;
                    })
                };

                //second

                $scope.targetUrl = $location.absUrl();
                $scope.codeTips = '重新发送';
                $scope.showVerify = false;
                $scope.verifyCode = "";
                $scope.currentSelectorIndex = 0;

                $scope.popVerifyCode = function () {
                    $scope.showVerify = true
                };

                $scope.hideVerifyCode = function () {
                    $scope.showVerify = false;
                    $scope.verifyCode = '';
                    console.log($scope.showVerify)
                };

                $scope.countTips = function () {

                    if ($scope.codeUnabled == true) {
                        return
                    }
                    $scope.codeUnabled = true;
                    $scope.codeTips = 60;
                    var si = setInterval(function () {
                        $scope.$apply(function () {
                            $scope.codeTips--;
                        });
                        if ($scope.codeTips < 1) {
                            clearTimeout(si);
                            $scope.$apply(function () {
                                $scope.codeTips = '重新发送';
                                $scope.codeUnabled = false;
                            });
                        }
                    }, 1000);
                };

                $scope.reSendVerifyCode = function () {

                    if ($scope.codeUnabled == true) {
                        return
                    }

                    if (!$scope.myTelephone || !$scope.serviceCode) {
                        Toast('请输入手机号及服务码');
                        return
                    }

                    Toast('重新获取');

                    $scope.captchaReq = Verify.verifyReForCaptcha().save({
                        telphone: $scope.myTelephone,
                        serviceCode: $scope.serviceCode,
                        appToken: $scope.appToken
                    });
                    $scope.captchaReq.$promise.then(function (res) {
                        if (res.result == 0) {
                            $scope.countTips();
                        } else {
                            $scope.codeUnabled = false;
                            Toast(res.msg)
                        }
                    }).catch(function (error) {
                        $scope.codeUnabled = false;
                        Toast(error)
                    })
                };

                $scope.onSelectorToggle = function (x) {
                    $scope.currentSelectorIndex = x;
                };

                $scope.uploadFrontIdentityPic = function () {

                    Bridge.uploadImgFromCameraOrAlbum(function (res, media) {
                        $scope.$apply(function () {
                            $scope.frontIdentityPic = res; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            document.getElementById('frontIdentityPic').src = res;
                            $scope.frontIdentityMediaId = media;
                        });
                    });

                };

                $scope.deleteImgFront = function () {
                    document.getElementById('frontIdentityPic').src = 'modules/verify/img/fast-second-add.png';
                    delete $scope.frontIdentityMediaId;
                };

                $scope.uploadBackIdentityPic = function () {

                    Bridge.uploadImgFromCameraOrAlbum(function (res, media) {
                        $scope.$apply(function () {
                            $scope.backIdentityPic = res; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            document.getElementById('backIdentityPic').src = res;
                            $scope.backIdentityMediaId = media;
                        });
                    });

                };

                $scope.deleteImgBack = function () {
                    document.getElementById('backIdentityPic').src = 'modules/verify/img/fast-second-add.png';
                    delete $scope.backIdentityMediaId;
                };

                $scope.uploadWorkProvePic = function () {

                    Bridge.uploadImgFromCameraOrAlbum(function (res, media) {
                        $scope.$apply(function () {
                            $scope.workProvePic = res; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            document.getElementById('workProvePic').src = res;
                            $scope.workProveMediaId = media;
                        });
                    });

                };

                $scope.deleteImgWork = function () {
                    document.getElementById('workProvePic').src = 'modules/verify/img/fast-second-add.png';
                    delete $scope.workProveMediaId;
                };

                $scope.submitSecondInfoWithCode = function () {

                    if (!$scope.frontIdentityPic || !$scope.backIdentityPic) {
                        Toast('请上传完整的照片信息');
                        return
                    }

                    if (!$scope.myTelephone || !$scope.serviceCode) {
                        Toast('请输入手机及服务码');
                        return
                    }

                    $scope.getIp = Verify.getIp().query({
                        appToken: $scope.appToken
                    });

                    $scope.getIp.$promise.then(function (res) {
                        if (res.result == 0) {

                            $scope.serverIP = res.data.ip;

                            $scope.secondInfoReq = $resource(
                                'http://' + $scope.serverIP + '/appinterface/white_collar_auth_five_h5'
                                , {}, {
                                    save: {
                                        method: 'POST', params: {}
                                    },
                                    jsonpquery: {method: 'JSONP', params: {callback: 'JSON_CALLBACK'}}
                                });

                            $scope.secondeInfo = $scope.secondInfoReq.jsonpquery({
                                workProve: $scope.workProveMediaId,
                                frontIdentityPic: $scope.frontIdentityMediaId,
                                backIdentityPic: $scope.backIdentityMediaId,
                                telphone: $scope.myTelephone,
                                serviceCode: $scope.serviceCode,
                                captcha: $scope.verifyCode,
                                appToken: $scope.appToken
                            });

                            $scope.$root.loading = true;

                            $scope.secondeInfo.$promise.then(function (res) {
                                console.log(res);
                                $scope.$root.loading = false;

                                if (res.result == 0) {
                                    $scope.initFastStatus();
                                    $scope.hideVerifyCode();
                                    Toast('提交成功');
                                } else if (res.result == 2) {
                                    Toast(res.msg);
                                    $scope.countTips();
                                    $scope.popVerifyCode();
                                } else {
                                    Toast(res.msg)
                                }

                            }).catch(function (error) {
                                $scope.$root.loading = false;
                                Toast(JSON.stringify(error) + '服务器开小差~')
                            })

                        } else {
                            Toast(res.msg)
                        }
                    }).catch(function (error) {
                        Toast(JSON.stringify(error))
                    });

                };

                $scope.submitSecondInfo = function () {

                        $scope.getIp = Verify.getIp().query();

                        $scope.getIp.$promise.then(function (res) {
                            if (res.result == 0) {
                                $scope.serverIP = res.data.ip;
                                $scope.secondInfoReq = $resource(
                                    'http://' + $scope.serverIP + '/appinterface/white_collar_auth_five_h5'
                                    , {}, {
                                        save: {
                                            method: 'POST', params: {}
                                        },
                                        jsonpquery: {method: 'JSONP', params: {callback: 'JSON_CALLBACK'}}
                                    });

                                $scope.secondInfo = $scope.secondInfoReq.jsonpquery({
                                    workProve: $scope.workProveMediaId,
                                    appToken: $scope.appToken,
                                    frontIdentityPic: $scope.frontIdentityMediaId,
                                    backIdentityPic: $scope.backIdentityMediaId,
                                    telphone: $scope.myTelephone,
                                    serviceCode: $scope.serviceCode,
                                    captcha: $scope.verifyCode
                                });
                                $scope.$root.loading = true;

                                $scope.secondInfo.$promise.then(function (res) {
                                    console.log(res);
                                    $scope.$root.loading = false;

                                    if (res.result == 0) {
                                        $scope.initFastStatus();
                                        $scope.hideVerifyCode();
                                        Toast('提交成功');
                                    } else if (res.result == 2) {
                                        Toast(res.msg);
                                        $scope.countTips();
                                        $scope.popVerifyCode();
                                    } else {
                                        Toast(res.msg)
                                    }

                                }).catch(function (error) {
                                    $scope.$root.loading = false;
                                    Toast(JSON.stringify(error) + '服务器开小差~')
                                })

                            } else {
                                Toast(res.msg)
                            }
                        });
                };


                //third

                $scope.submitThirdInfo = function () {

                    console.log(3);

                    $scope.thirdInfoReq = Verify.verifyBaseInfoThird().save({
                        is_credit_card: $scope.isCreditCard,
                        is_loan: $scope.isLoan,
                        monthly_income: $scope.monthlyIncome,
                        is_investment: $scope.isInvestment,
                        is_driving: $scope.isDriving,
                        is_house: $scope.isHouse,
                        appToken: $scope.appToken,
                        isMarry: $scope.isMarry
                    });

                     $scope.$root.loading = true;

                    $scope.thirdInfoReq.$promise.then(function (res) {
                        console.log(res);
                        $scope.$root.loading = false;
                        if (res.result == 0) {
                            $location.path('/verify/index');
                            Bridge.jumpTo($location.absUrl().split('#')[0] + '#?/verify/index', '认证提额')
                        } else {
                            Toast(res.msg)
                        }

                    }).catch(function (error) {
                        $scope.$root.loading = false;
                        Toast(error)
                    })

                }
            }])
    }
});