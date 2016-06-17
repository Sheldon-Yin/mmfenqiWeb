/**
 * Created by sheldon on 2016/5/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('VerifyFastCtrl', ['$scope', 'Verify', '$location', 'WeChat','WeChatTitle',
            function ($scope, Verify, $location, WeChat,WeChatTitle) {

                WeChatTitle('基础认证申请额度');

                $scope.initFastStatus = function () {
                    $scope.getFastStatus = Verify.resultForVerifyBaseInfo().query();
                    $scope.$root.loading = true;
                    $scope.getFastStatus.$promise.then(function (res) {
                        $scope.$root.loading = false;
                        if (res.result == 0) {
                            $scope.status = Number(res.data.firstStepFlag);


                            if (res.data.checkStatus == "3"){
                                $location.path('/verify/index');
                                return
                            }

                            if (!!res.data.whiteCollarCreditInfo){
                                $scope.company_name = res.data.whiteCollarCreditInfo.companyName;
                                $scope.company_telphone = res.data.whiteCollarCreditInfo.companyTelphone;
                                $scope.company_position = res.data.whiteCollarCreditInfo.companyPosition;
                                $scope.company_addr = res.data.whiteCollarCreditInfo.companyAddr;
                                $scope.address = res.data.whiteCollarCreditInfo.address;
                                $scope.bankcardcode = res.data.bankcardCode;
                                $scope.name = res.data.contactInfo.contactName;
                                $scope.relation = res.data.contactInfo.relation;
                                $scope.telphone = res.data.contactInfo.telphone;

                                $scope.isCreditCard = res.data.whiteCollarCreditInfo.isCreditCard;
                                $scope.isLoan = res.data.whiteCollarCreditInfo.isLoan;
                                $scope.monthlyIncome = res.data.whiteCollarCreditInfo.monthlyIncome;
                                $scope.isInvestment = res.data.whiteCollarCreditInfo.isInvestment;
                                $scope.isDriving = res.data.whiteCollarCreditInfo.isDriving;
                                $scope.isHouse = res.data.whiteCollarCreditInfo.isHouse;
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
                        telphone: $scope.telphone
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

                $scope.wxConfig = WeChat.save({
                    targetUrl: $scope.targetUrl.split('#')[0]
                });
                $scope.$root.loading = true;
                $scope.wxConfig.$promise.then(function (res) {
                    $scope.$root.loading = false;
                    if (res.result == 0) {
                        wx.config({
                            debug: false,
                            appId: res.data.jsSDKConfig.appId,
                            timestamp: res.data.jsSDKConfig.timestamp,
                            nonceStr: res.data.jsSDKConfig.nonceStr,
                            signature: res.data.jsSDKConfig.signature,
                            jsApiList: [
                                'chooseImage',
                                'uploadImage'
                            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });

                        wx.ready(function () {
                            console.log('ready')
                        });
                        wx.error(function (res) {
                            alert(res.errMsg);
                        });
                    } else {
                        alert(res);
                    }
                }).catch(function (error) {
                    $scope.$root.loading = false;
                    alert(error)
                });

                $scope.uploadFrontIdentityPic = function () {
                    wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            $scope.frontIdentityPic = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            $scope.$apply(function () {
                                document.getElementById('frontIdentityPic').src = res.localIds[0]
                            });
                            wx.uploadImage({
                                localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    $scope.frontIdentityMediaId = res.serverId;
                                },
                                fail: function (res) {
                                    alert(JSON.stringify(res));
                                }
                            });
                        },
                        fail: function (res) {
                            alert(JSON.stringify(res));
                        }
                    });
                };

                $scope.deleteImgFront = function () {
                    document.getElementById('frontIdentityPic').src = 'modules/verify/img/fast-second-add.png';
                    delete $scope.frontIdentityMediaId;
                };

                $scope.uploadBackIdentityPic = function () {
                    wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            $scope.backIdentityPic = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            $scope.$apply(function () {
                                document.getElementById('backIdentityPic').src = res.localIds[0]
                            });
                            wx.uploadImage({
                                localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    $scope.backIdentityMediaId = res.serverId;
                                },
                                fail: function (res) {
                                    alert(JSON.stringify(res));
                                }
                            });
                        },
                        fail: function (res) {
                            alert(JSON.stringify(res));
                        }
                    });
                };

                $scope.deleteImgBack = function () {
                    document.getElementById('backIdentityPic').src = 'modules/verify/img/fast-second-add.png';
                    delete $scope.backIdentityMediaId;
                };

                $scope.uploadWorkProvePic = function () {
                    wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            $scope.workProvePic = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            $scope.$apply(function () {
                                document.getElementById('workProvePic').src = res.localIds[0]
                            });
                            wx.uploadImage({
                                localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    $scope.workProveMediaId = res.serverId;
                                },
                                fail: function (res) {
                                    alert(JSON.stringify(res));
                                }
                            });
                        },
                        fail: function (res) {
                            alert(JSON.stringify(res));
                        }
                    });
                };

                $scope.deleteImgWork = function () {
                    document.getElementById('workProvePic').src = 'modules/verify/img/fast-second-add.png';
                    delete $scope.workProveMediaId;
                };

                $scope.submitSecondInfo = function () {
                    console.log(2);
                    if (!$scope.frontIdentityPic || !$scope.backIdentityPic || !$scope.workProvePic) {
                        Toast('请上传完整的照片信息');
                        return
                    }

                    $scope.secondInfoReq = Verify.verifyBaseInfoSecond().save({
                        frontIdentityPic: $scope.frontIdentityMediaId,
                        backIdentityPic: $scope.backIdentityMediaId,
                        workProve: $scope.workProveMediaId
                    });
                    $scope.$root.loading = true;

                    $scope.secondInfoReq.$promise.then(function (res) {
                        console.log(res);
                        $scope.$root.loading = false;

                        if (res.result == 0) {
                            $scope.initFastStatus();
                            Toast('提交成功');
                        } else {
                            Toast(res.msg + '提交不成功')
                        }

                    }).catch(function (error) {
                        $scope.$root.loading = false;
                        Toast(error + '服务器开小差~')
                    })
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
                        is_house: $scope.isHouse

                    });

                    $scope.$root.loading = true;

                    $scope.thirdInfoReq.$promise.then(function (res) {
                        console.log(res);
                        $scope.$root.loading = false;
                        if (res.result == 0) {
                            $location.path('/verify/index');
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