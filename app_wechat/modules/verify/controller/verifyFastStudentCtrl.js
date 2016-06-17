/**
 * Created by sheldon on 2016/6/15.
 */


define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('VerifyFastStudentCtrl', ['$scope', 'Verify', '$location', 'WeChatTitle', 'WeChat',
            function ($scope, Verify, $location, WeChatTitle, WeChat) {
                WeChatTitle('基础认证申请额度');

                $scope.currentSelectorIndex = 0;

                $scope.selectSchoolName = '选择';
                $scope.selectJoinYearValue = '选择';
                $scope.selectLeaveYearValue = '选择';
                $scope.selectEducationName = '选择';

                $scope.selectCityName = '选择';
                $scope.selectProvName = '选择';

                $scope.initWeChat = function () {
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
                };
                $scope.initWeChat();

                $scope.uploadImgForWx = function (imgPreId, imgMediaId) {
                    wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            $scope[imgPreId] = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            $scope.$apply(function () {
                                document.getElementById(imgPreId).src = res.localIds[0]
                            });
                            wx.uploadImage({
                                localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    $scope[imgMediaId] = res.serverId;
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

                $scope.initFastStatus = function () {
                    $scope.getFastStatus = Verify.resultForVerifyBaseInfoForStudent().query();
                    $scope.$root.loading = true;
                    $scope.getFastStatus.$promise.then(function (res) {
                        $scope.$root.loading = false;
                        console.log(res);

                        if (res.result == 0) {

                            //$scope.status = 1;
                            $scope.status = Number(res.data.firstStepFlag);

                            if (res.data.firstCreditStatus == "3" || res.data.firstCreditStatus == "1") {
                                $location.path('/verify/index');
                                return
                            }

                            //first
                            $scope.dormitory = res.data.dormitory;
                            $scope.xuexinwangAccount = res.data.xuexinwangAccount;
                            $scope.xuexinwangPassword = res.data.xuexinwangPassword;
                            $scope.selectSchoolName = res.data.schoolName;
                            $scope.selectSchoolId = res.data.schoolId;
                            $scope.selectJoinYearValue = res.data.rxYear ? res.data.rxYear : $scope.selectJoinYearValue;
                            $scope.selectLeaveYearValue = res.data.byYear ? res.data.byYear : $scope.selectLeaveYearValue;
                            $scope.currentSelectorIndex = !!res.data.xuexinwangAccount ? 0 : 1;

                            //second
                            $scope.parentName = res.data.parentName;
                            $scope.parentPhone = res.data.parentPhone;
                            $scope.selectCityId = res.data.cityid ? res.data.cityid : $scope.selectCityId;
                            $scope.selectProvId = res.data.provid ? res.data.provid : $scope.selectProvId;
                            $scope.selectProvName = res.data.provName ? res.data.provName : $scope.selectProvName;
                            $scope.selectCityName = res.data.cityName ? res.data.cityName : $scope.selectCityName;
                            $scope.address = res.data.address;
                            $scope.schoolmateName = res.data.schoolmateName;
                            $scope.schoolmatePhone = res.data.schoolmatePhone;

                            //third

                        } else if (res.result == 1013) {
                            window.location.href = '#/login/telephone'
                        } else {
                            Toast(res.msg);
                        }
                    }).catch(function (error) {
                        $scope.$root.loading = false;
                        console.log(error)
                    })
                };
                $scope.initFastStatus();


                $scope.initShowSelect = function (items, title, itemName, itemValue, cb) {
                    $scope.selecting = true;
                    $scope.selectItems = items;
                    $scope.selectTitle = title;
                    $scope.itemName = itemName;
                    $scope.itemValue = itemValue;
                    $scope.selectCallBack = cb;
                };

                //first step


                $scope.commitFirstStep = function () {
                    if ($scope.currentSelectorIndex == 0) {

                        if (!$scope.dormitory) {
                            Toast('请填写宿舍信息');
                            return
                        }

                        if (!$scope.xuexinwangAccount) {
                            Toast('请填写学信网账号');
                            return
                        }


                        if (!$scope.xuexinwangPassword) {
                            Toast('请填写完整的学信网信息');
                            return
                        }

                        $scope.commitFirstReq = Verify.verifyStudentFirst().save({
                            dormitory: $scope.dormitory,
                            xuexinwangAccount: $scope.xuexinwangAccount,
                            xuexinwangPassword: $scope.xuexinwangPassword,
                            captcha: $scope.imgVerifyCode
                        });
                        $scope.commitFirstReq.$promise.then(function (res) {
                            console.log(res);
                            if (res.result == 0) {
                                Toast('上传成功');
                                $scope.initFastStatus()
                            } else if (res.result == 2) {
                                Toast(res.msg);
                                $scope.imgCode = res.data.captcha;
                            } else {
                                Toast(res.msg)
                            }
                        }).catch(function (error) {
                            console.log(error);
                            Toast('服务器返回错误')
                        })
                    } else if ($scope.currentSelectorIndex == 1) {

                        if (!$scope.imgOne || !$scope.imgTwo || !$scope.imgThree) {
                            Toast('请上传完整的照片信息');
                            return
                        }

                        if (!$scope.selectSchoolId) {
                            Toast('请填写学校信息');
                            return
                        }

                        if (!$scope.selectJoinYearValue) {
                            Toast('请填写入学年份');
                            return
                        }

                        if (!$scope.selectLeaveYearValue) {
                            Toast('请填写毕业时间');
                            return
                        }

                        if (!$scope.selectEducationValue) {
                            Toast('请填写教育经历');
                            return
                        }

                        if (!$scope.dormitory) {
                            Toast('请填写宿舍信息');
                            return
                        }

                        $scope.commitFirstReq = Verify.verifyStudentFirst().save({
                            studentFile: $scope.imgOneMediaId,
                            studentRegisterFile: $scope.imgTwoMediaId,
                            studentCoverFile: $scope.imgThreeMediaId,
                            schoolid: $scope.selectSchoolId,
                            rxYear: $scope.selectJoinYearValue,
                            byYear: $scope.selectLeaveYearValue,
                            education: $scope.selectEducationValue,
                            dormitory: $scope.dormitory
                        });
                        $scope.commitFirstReq.$promise.then(function (res) {
                            console.log(res);
                            if (res.result == 0) {
                                Toast('上传成功');
                                $scope.initFastStatus()
                            } else {
                                Toast(res.msg)
                            }
                        }).catch(function (error) {
                            console.log(error);
                            Toast('服务器返回错误')
                        })
                    }
                };

                $scope.uploadImgOne = function () {
                    $scope.uploadImgForWx('imgOne', 'imgOneMediaId')
                };

                $scope.uploadImgTwo = function () {
                    $scope.uploadImgForWx('imgTwo', 'imgTwoMediaId')
                };

                $scope.uploadImgThree = function () {
                    $scope.uploadImgForWx('imgThree', 'imgThreeMediaId')
                };

                $scope.onSelectorToggle = function () {
                    $scope.currentSelectorIndex = ($scope.currentSelectorIndex + 1) % 2;
                };

                $scope.hideSelect = function () {
                    $scope.selecting = false
                };

                $scope.selectSchool = function () {
                    console.log(1);
                    $scope.getProvince = Verify.getProvince().query();
                    $scope.getProvince.$promise.then(function (res) {
                        console.log(res);
                        if (res.result == 0) {
                            $scope.initShowSelect(res.data.provList, '选择学校所在省份', 'proname', 'proid',
                                function (provinceId) {
                                    $scope.getCity = Verify.getCity().query({
                                        provId: provinceId
                                    });
                                    $scope.selecting = false;
                                    $scope.getCity.$promise.then(function (res) {
                                        console.log(res);
                                        if (res.result == 0) {
                                            $scope.initShowSelect(res.data.cityList, '选择学校所在城市', 'cityname', 'cityid',
                                                function (cityId) {
                                                    $scope.getSchool = Verify.getSchool().query({
                                                        cityId: cityId
                                                    });
                                                    $scope.selecting = false;
                                                    $scope.getSchool.$promise.then(function (res) {
                                                        console.log(res);
                                                        if (res.result == 0) {
                                                            $scope.initShowSelect(res.data.schoolList, '选择学校', 'schoolname', 'schoolid', function (schoolId, schoolName) {
                                                                $scope.selecting = false;
                                                                $scope.selectSchoolId = schoolId;
                                                                $scope.selectSchoolName = schoolName;
                                                                console.log($scope.selectSchoolId);
                                                                console.log($scope.selectSchoolName)
                                                            })
                                                        } else {
                                                            Toast(res.msg)
                                                        }
                                                    }).catch(function (error) {
                                                        console.log(error)
                                                    })
                                                })
                                        } else {
                                            Toast(res.msg)
                                        }
                                    }).catch(function (error) {
                                        console.log(error)
                                    })
                                }
                            );
                        }
                    }).catch(function (error) {
                        console.log(error)
                    });
                };

                $scope.selectJoinYear = function () {
                    $scope.joinYears = [
                        {year: 2016}, {year: 2015}, {year: 2014}, {year: 2013}, {year: 2012}, {year: 2011}, {year: 2010}, {year: 2009}, {year: 2008}, {year: 2007}
                    ];
                    $scope.initShowSelect($scope.joinYears, '入学年份', 'year', 'year', function (year) {
                        $scope.selectJoinYearValue = year;
                        $scope.selecting = false;
                    })
                };

                $scope.selectLeaveYear = function () {
                    $scope.leaveYears = [
                        {year: 2015}, {year: 2016}, {year: 2017}, {year: 2018}, {year: 2019}, {year: 2020}, {year: 2021}, {year: 2022}, {year: 2023}
                    ];
                    $scope.initShowSelect($scope.leaveYears, '毕业年份', 'year', 'year', function (year) {
                        $scope.selectLeaveYearValue = year;
                        $scope.selecting = false;
                    })
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

                //second step

                $scope.commitSecondStep = function () {
                    console.log(1);
                    $scope.verifySecond = Verify.verifyStudentSecond().save({
                        parentName: $scope.parentName,
                        parentPhone: $scope.parentPhone,
                        schoolmateName: $scope.schoolmateName,
                        schoolmatePhone: $scope.schoolmatePhone,
                        provid: $scope.selectProvId,
                        cityid: $scope.selectCityId,
                        provName: $scope.selectProvName,
                        cityName: $scope.selectCityName,
                        address: $scope.address
                    });
                    $scope.verifySecond.$promise.then(function (res) {
                        console.log(res);
                        if (res.result == 0) {
                            $scope.initFastStatus();
                        } else {
                            Toast(res.msg)
                        }
                    }).catch(function (error) {
                        Toast('服务器返回错误')
                    })
                };

                $scope.secondChooseProvince = function () {
                    $scope.getProvince = Verify.getProvince().query();
                    $scope.getProvince.$promise.then(function (res) {
                            console.log(res);
                            if (res.result == 0) {
                                $scope.initShowSelect(res.data.provList, '选择居住省份', 'proname', 'proid',
                                    function (provinceId, provinceName) {
                                        $scope.selectProvId = provinceId;
                                        $scope.selectProvName = provinceName;
                                        $scope.secondChooseCity();
                                    })
                            }
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                };

                $scope.secondChooseCity = function () {
                    $scope.getCity = Verify.getCity().query({
                        provId: $scope.selectProvId
                    });
                    $scope.selecting = false;
                    $scope.getCity.$promise.then(function (res) {
                            console.log(res);
                            if (res.result == 0) {
                                $scope.initShowSelect(res.data.cityList, '选择居住城市', 'cityname', 'cityid',
                                    function (cityId, cityName) {
                                        $scope.selectCityId = cityId;
                                        $scope.selectCityName = cityName;
                                        $scope.selecting = false;
                                    })
                            }
                        }
                    ).catch(function (error) {
                        console.log(error)
                    })

                }
                ;

                //third step

                $scope.onUploadFront = function () {
                    $scope.uploadImgForWx('frontIdentityPic', 'frontIdentityMediaId');
                };

                $scope.onUploadBackend = function () {
                    $scope.uploadImgForWx('backIdentityPic', 'backIdentityMediaId');
                };

                $scope.submitThirdInfo = function () {
                    console.log(2);
                    if (!$scope.frontIdentityPic || !$scope.backIdentityPic) {
                        Toast('请上传完整的照片信息');
                        return
                    }

                    $scope.thirdInfoReq = Verify.verifyStudentThird().save({
                        frontIdentityPic: $scope.frontIdentityMediaId,
                        backIdentityPic: $scope.backIdentityMediaId
                    });
                    $scope.$root.loading = true;

                    $scope.thirdInfoReq.$promise.then(function (res) {
                        console.log(res);
                        $scope.$root.loading = false;

                        if (res.result == 0) {
                            $scope.initFastStatus();
                            Toast('提交成功');
                        } else {
                            Toast(res.msg)
                        }

                    }).catch(function (error) {
                        $scope.$root.loading = false;
                        Toast(error + '服务器开小差~')
                    })
                };

            }
        ])
    }
});