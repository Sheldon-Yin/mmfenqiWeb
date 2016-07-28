/**
 * Created by sheldon on 2016/5/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/bridgeService')(app);
        app.register.controller('VerifyFastCtrl', ['$scope', 'Verify', '$location', 'Bridge', '$http',
            function ($scope, Verify, $location, Bridge, $http) {

                $scope.baseUrl = $location.absUrl().split('#')[0];

                $scope.status = 2;

                Bridge.appToken(function (response) {

                    $scope.appToken = response;

                    Bridge.getContacts(function (res) {
                        Verify.uploadContacts().save({
                            appToken: $scope.appToken,
                            contactsBook: JSON.stringify(res)
                        })
                    });

                    $scope.initFastStatus = function () {
                        $scope.getFastStatus = Verify.resultForVerifyBaseInfo().query({
                            appToken: $scope.appToken
                        });
                        $scope.$root.loading = true;
                        $scope.getFastStatus.$promise.then(function (res) {
                            $scope.$root.loading = false;
                            if (res.result == 0) {
                                $scope.status = Number(res.data.firstStepFlag);

                                if (res.data.checkStatus == "3" || res.data.checkStatus == "1") {
                                    Bridge.goBack();
                                    return
                                }

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
                                }

                            } else if (res.result == 1013) {
                                Toast(res.msg)
                            } else {
                                Toast(res.msg)
                            }

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
                        appToken: $scope.appToken
                    });
                    $scope.$root.loading = true;

                    $scope.firstInfoReq.$promise.then(function (res) {
                        $scope.$root.loading = false;
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

                $scope.currentSelectorIndex = 0;
                $scope.codeTips = '重新发送';
                $scope.showVerify = false;
                $scope.verifyCode = "";

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
                    Bridge.uploadImgFromCameraOrAlbum(function (response) {
                        $scope.$apply(function () {
                            document.getElementById('frontIdentityPic').src = 'data:image/png;base64,' + response;
                            $scope.frontIdentityMediaId = response;
                        });

                    })
                };

                $scope.deleteImgFront = function () {
                    document.getElementById('frontIdentityPic').src = 'modules/verify/img/fast-second-add.png';
                    delete $scope.frontIdentityMediaId;
                };

                $scope.uploadBackIdentityPic = function () {
                    Bridge.uploadImgFromCameraOrAlbum(function (response) {
                        $scope.$apply(function () {
                            document.getElementById('backIdentityPic').src = 'data:image/png;base64,' + response;
                            $scope.backIdentityMediaId = response;
                        });

                    })
                };

                $scope.deleteImgBack = function () {
                    document.getElementById('backIdentityPic').src = 'modules/verify/img/fast-second-add.png';
                    delete $scope.backIdentityMediaId;
                };

                $scope.uploadWorkProvePic = function () {
                    Bridge.uploadImgFromCameraOrAlbum(function (response) {
                        $scope.$apply(function () {
                            document.getElementById('workProvePic').src = 'data:image/png;base64,' + response;
                            $scope.workProveMediaId = response;
                        });
                    })
                };

                $scope.deleteImgWork = function () {
                    document.getElementById('workProvePic').src = 'modules/verify/img/fast-second-add.png';
                    delete $scope.workProveMediaId;
                };

                $scope.submitSecondInfoWithCode = function () {

                    if (!$scope.frontIdentityMediaId || !$scope.backIdentityMediaId) {
                        Toast('请上传完整的照片信息');
                        return
                    }

                    if (!$scope.myTelephone || !$scope.serviceCode) {
                        Toast('请输入手机及服务码');
                        return
                    }

                    $scope.$root.loading = true;
                    var fd = new FormData();
                    fd.append('frontIdentityPic', $scope.frontIdentityMediaId);
                    fd.append('backIdentityPic', $scope.backIdentityMediaId);
                    fd.append('telphone', $scope.myTelephone);
                    fd.append('serviceCode', $scope.serviceCode);
                    fd.append('captcha', $scope.verifyCode);
                    fd.append('appToken', $scope.appToken);

                    $http.post('/appinterface/white_collar_auth_five', fd, {
                            headers: {'Content-Type': undefined},
                            transformRequest: angular.identity
                        })
                        .success(function (res) {
                            $scope.$root.loading = false;
                            if (res.result == 0) {
                                Toast('上传成功');

                                $scope.hideVerifyCode();
                                $scope.initFastStatus();

                            } else if (res.result == 2) {
                                Toast('需要验证码，验证码发送中');
                                $scope.popVerifyCode();
                                $scope.countTips();
                            }
                            else {
                                Toast(res.msg + '上传失败')
                            }
                        })

                        .error(function (error) {
                            $scope.$root.loading = false;
                            Toast(error);
                        })
                        .catch(function (error) {
                            $scope.$root.loading = false;
                            Toast(JSON.stringify(error))
                        });

                };

                $scope.submitSecondInfo = function () {

                    if ($scope.currentSelectorIndex == 0) {


                        console.log(2);
                        if (!$scope.frontIdentityMediaId || !$scope.backIdentityMediaId || !$scope.workProveMediaId) {
                            Toast('请上传完整的照片信息');
                            return
                        }

                        $scope.$root.loading = true;
                        var fd = new FormData();
                        fd.append('frontIdentityPic', $scope.frontIdentityMediaId);
                        fd.append('backIdentityPic', $scope.backIdentityMediaId);
                        fd.append('workProve', $scope.workProveMediaId);
                        fd.append('appToken', $scope.appToken);

                        $http.post('/appinterface/white_collar_auth_five', fd, {
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            })
                            .success(function (res) {
                                $scope.$root.loading = false;
                                if (res.result == 0) {
                                    Toast('上传成功');
                                    setTimeout(function () {
                                        $scope.$apply(function () {
                                            $scope.initFastStatus();
                                        });
                                    }, 1000)
                                } else {
                                    Toast(res.msg + '上传失败')
                                }
                            })

                            .error(function (error) {
                                $scope.$root.loading = false;
                                Toast(error);
                            })
                            .catch(function (error) {
                                $scope.$root.loading = false;
                                Toast(JSON.stringify(error))
                            });
                    } else {
                        $scope.submitSecondInfoWithCode();
                    }
                };

                //third

                $scope.submitThirdInfo = function () {

                    $scope.thirdInfoReq = Verify.verifyBaseInfoThird().save({
                        is_credit_card: $scope.isCreditCard,
                        is_loan: $scope.isLoan,
                        monthly_income: $scope.monthlyIncome,
                        is_investment: $scope.isInvestment,
                        is_driving: $scope.isDriving,
                        is_house: $scope.isHouse,
                        appToken: $scope.appToken
                    });

                    $scope.$root.loading = true;

                    $scope.thirdInfoReq.$promise.then(function (res) {
                        console.log(res);
                        $scope.$root.loading = false;
                        if (res.result == 0) {
                            $scope.initFastStatus();
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