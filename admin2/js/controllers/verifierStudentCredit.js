/**
 * Created by ChinaHp on 2016/6/27.
 */



app.controller('StuCreditCtrl', ['$scope', 'verificationService', 'commonService', '$state', 'httpService', '$location', '$stateParams',
    function ($scope, verificationService, commonService, $state, httpService, $location, $stateParams) {


        $scope.init = function () {
            $scope.currentPage = 1;
            $scope.time_start = commonService.init().time_start;
            $scope.time_end = commonService.init().time_end;
            $scope.leftContnet = false;//没选择用户之前是false

            $scope.contact_btn = false;//联系编辑按钮

            $scope.xueji_btn = false; //学籍信息按钮


            $scope.idNameCard = false; //身份证按钮


            $scope._checkStatus = [
                {message: '全部', checkStatus: ''},
                {message: '待审核', checkStatus: '3'}
            ];

            $scope.isValid = [
                {msg: '是', isValidateRealName: true},
                {msg: '否', isValidateRealName: false}
            ];


            $scope._realNameStatus = [
                {msg: '审核中', realNameStatus: ''},
                {msg: '审核通过', realNameStatus: '1'},
                {msg: '审核不通过', realNameStatus: '2'}

            ];



        };

        $scope.init();

        var cityid = '';
        var provid = '';

        /**
         * 修改身份证
         */

        $scope.idNameCard_bianji = function () {
            $scope.idNameCard = false;

            $("#idNameCard").removeAttr('readonly');

            $('#idNameCard').css({
                'color': '#333',
                'border': '1px solid #82c9ff'
            });
        };

        // $scope.idNameCard_sure=function () {
        //     $("#idNameCard").attr('readonly','readonly')
        // };


        $scope._submit = function (id) {
            var msg = '确定提交';

            commonService._layer(msg, function () {
                var request = verificationService.change_user_identityCode().save({
                    userId: id,
                    realName: $scope.data.name,
                    identityCode: $scope.data.identityCode,
                    realNameStatus: $scope.data.realNameStatus,
                    isIdentitycodeAuth: $scope.data.isValidateRealName

                });
                httpService(request, function (res) {
                    console.log(res);
                    $('#idNameCard').css({
                        'color': '#666',
                        'border': '1px solid #FFFFFF'
                    });
                })
            });


        };

        /**
         * 查询学生信用审核列表
         * @param time_start
         * @param time_end
         */
        var queryStu = function (time_start, time_end, page) {
            var request = verificationService.query_student_credit_info().query({
                realName: $scope.realName ? $scope.realName : '',
                telphone: $scope.telphone ? $scope.telphone : '',
                startTime: time_start,
                endTime: time_end,
                creditStatus: $scope.check ? $scope.check : '',
                currentPage: page

            });
            httpService(request, function (res) {
                console.log(res.data);
                console.log('+++');
                $scope.studentCreditListdate = res.data.studentCreditList;

                $scope.page = res.data.page;

            })


        };
        /**
         * 页面初始化
         */

        $scope.$watch('currentPage', function (newVal, oldVal) {
            if ($scope.time_start.Format && $scope.time_end.Format) {
                queryStu($scope.time_start.Format("yyyy-MM-dd"), $scope.time_end.Format("yyyy-MM-dd"), newVal);
            } else {
                queryStu($scope.time_start, $scope.time_end, $scope.currentPage);
            }
        });


        /**
         * 查询
         */
        $scope.search = function () {

            queryStu($scope.time_start ? $scope.time_start.Format("yyyy-MM-dd") : '', $scope.time_end ? $scope.time_end.Format("yyyy-MM-dd") : '',$scope.currentPage);
        };
        /**
         * 学生学籍信息编辑
         * @param id
         */
        $scope.credit = function (id) {
            $scope.xueji_btn = true;

            $('.xueji').find("input[type='text']").removeAttr('readonly');
            $('.xueji').find("input[type='text']").css({
                'color': '#333',
                'border': '1px solid #82c9ff'
            });


        };
        
        $scope.changeProv=function (id) {
                var requestCitys = verificationService.selectUserCitys().query({
                    provId: id
                });
                httpService(requestCitys, function (res) {
                    $scope.cityList = res.data.cityList;

                });
        };

        $scope.changeCity=function (id) {
            var requestSh = verificationService.select_user_school().query({
                cityId: id
            });
            httpService(requestSh, function (res) {
                console.log(res.data);
                $scope.collageList = res.data.collageList;
                console.log(444444444444444444);
                return success();
            });
        };


        

        $scope.sure = function (id,y) {

            $scope.xueji_btn = false;



            var msg='确定更改学籍信息';
            commonService._layer(msg,function () {
                var request=verificationService.edit_student_info().save({
                    userId:id,
                    provinceId:y.credit.provid,
                    cityId:y.credit.cityid,
                    schoolId:y.credit.schoolid,
                    rxYear:y.credit.rxYear,
                    byYear:y.credit.byYear,
                    education:y.credit.educationaa,
                    dormitory:y.credit.dormitory

                });

                httpService(request,function (res) {
                    $('.xueji').find("input[type='text']").attr('readonly', 'readonly');

                    $('.xueji').find("input[type='text']").css({
                        'color': '#666',
                        'border': '1px solid #FFFFFF'
                    });

                });
            })






        };

        /**
         * 学生联系方式编辑
         * @param id
         */
        $scope.contactCredit = function (id) {

            $scope.contact_btn = true;

            $('.contact').find("input[type='text']").removeAttr('readonly');

            $('.contact').find("input[type='text']").css({
                'color': '#333',
                'border': '1px solid #82c9ff'
            });


        };

        $scope.contactSure = function (id, firstName, firstTelphone, secondName, secondTelphone, address) {

            var request = verificationService.edit_student_contact_info().save({
                userId: id,
                firstName: firstName,
                firstTelphone: firstTelphone,
                secondName: secondName,
                secondTelphone: secondTelphone,
                address: address
            });

            var msg = '确定要更改联系信息？';

            commonService._layer(msg, function () {
                httpService(request, function (res) {
                    console.log(res.data);
                    $scope.contact_btn = false;
                    $('.contact').find("input[type='text']").css({
                        'color': '#666',
                        'border': '1px solid #FFFFFF'
                    });
                })
            })


        };


        /**
         * 用户详情信息
         * @param id
         * @param basicCreditStatus
         * @param bankInfoCreditStatus
         * @param businessCreditStatus
         * @param sesameCreditStatus
         * @constructor
         */
        $scope.UserInfo = function (id, basicCreditStatus, bankInfoCreditStatus, businessCreditStatus, sesameCreditStatus) {


            $('.info').removeClass('_hover');
            $("#" + id).addClass('_hover');
            $scope.leftContnet = true;

            $scope._change=function () {
                setTimeout(function () {
                    $scope.$apply(function () {


                        // if(bankInfoCreditStatus=='1'){
                        //     $scope.$root.status={
                        //         isFirstOpen_bankInfoCreditStatus:false
                        //     }
                        // }else{
                        //     $scope.$root.status={
                        //         isFirstOpen_bankInfoCreditStatus:true
                        //     }
                        // }
                        //
                        //
                        // if(businessCreditStatus=='1'){
                        //     $scope.$root.status={
                        //         isFirstOpen_businessCreditStatus:false
                        //     }
                        // }else{
                        //     $scope.$root.status={
                        //         isFirstOpen_businessCreditStatus:true
                        //     }
                        // }
                        //
                        // if(sesameCreditStatus == '1'){
                        //     $scope.$root.status={
                        //         isFirstOpen_sesameCreditStatus:false
                        //     }
                        // }else{
                        //     $scope.$root.status={
                        //         isFirstOpen_sesameCreditStatus:true
                        //     }
                        // }
                        $scope.$root.isFirstOpen_bankInfoCreditStatus = bankInfoCreditStatus == '1' ? false : true;
                        $scope.$root.isFirstOpen_businessCreditStatus = businessCreditStatus == '1' ? false : true;
                        $scope.$root.isFirstOpen_sesameCreditStatus = sesameCreditStatus == '1' ? false : true;
                        if (basicCreditStatus == '1') {
                            $scope.status = {
                                isFirstOpen: false
                            }
                        } else {
                            $scope.status = {
                                isFirstOpen: true
                            }
                        }
                    });
                },0);

            };

            $scope._change();



            /**
             * 用户基本信息
             */
            var requestB = verificationService.queryBasicInfo().query({
                userId: id
            });


            httpService(requestB, function (res) {
                console.log(res.data);
                $scope.data = res.data;
            });

            /**
             *学生学籍信息
             */

            $scope.getStudentInfo = function (success) {
                var request = verificationService.query_student_school_info().query({
                    userId: id
                });

                httpService(request, function (res) {
                    console.log(res.data);

                    $scope.schoolInfoResponsedate = res.data.schoolInfoResponse;

                    list = res.data.schoolInfoResponse;

                    console.log(list);

                    list[0].credit.educationaa = list[0].credit.education;

                    provid = list[0].credit.provid;
                    cityid = list[0].credit.cityid;

                    console.log(res.data.baseUserAddinfo);

                    $scope.BaseUserAddinfodate = res.data.baseUserAddinfo;

                    $scope.identityPic = res.data.identityPic;

                    console.log(res.data.identityPic);
                    //认证额度
                    $scope.basicCreditQuota = res.data.basicCreditQuota;

                    console.log($scope.schoolInfoResponsedate[0].credit);

                    console.log(1111111111111111);
                    return success();
                });
            };


            /**
             * 省
             */
            $scope.getProvince = function (success) {
                var requestProvs = verificationService.select_user_provs().query({});
                httpService(requestProvs, function (res) {

                    $scope.provList = res.data.provList;
                    console.log(2222222222222222222222);
                    return success();
                });
            };


            /**
             *cityid
             */
            $scope.getCity = function (success) {
                var requestCitys = verificationService.selectUserCitys().query({
                    provId: provid
                });
                httpService(requestCitys, function (res) {
                    $scope.cityList = res.data.cityList;
                    console.log(33333333333333333333333);
                    return success();
                });
            };


            // 学校
            $scope.getSchool = function (success) {
                var requestSh = verificationService.select_user_school().query({
                    cityId: cityid
                });
                httpService(requestSh, function (res) {
                    console.log(res.data);
                    $scope.collageList = res.data.collageList;
                    console.log(444444444444444444);
                    return success();
                });
            };

            $scope.getStudentInfo(function () {
                    $scope.getProvince(function () {
                        $scope.getCity(function () {
                            $scope.getSchool(function () {
                                }
                            )
                        })
                    })
                }
            );


            /**
             * 下拉查询学历类型
             */
            var requesteDucation = verificationService.select_education_type().query({
                userId: id
            });

            httpService(requesteDucation, function (res) {
                console.log(res.data);

                $scope.educationEnumList = res.data.educationEnumList;


            });
            /**
             * 查询芝麻信用认证信息
             */
            var requestQueryUserSesameCredit = verificationService.query_user_sesame_credit().query({
                userId: id
            });

            httpService(requestQueryUserSesameCredit, function (res) {

                $scope.sesameCreditData = res.data;

            });


            /**
             * 查询电商认证信息
             */

            var requset_query_business_credit_info = verificationService.query_business_credit_info().query({
                userId: id
            });

            httpService(requset_query_business_credit_info, function (res) {
                console.log(res.data);
                //电商认证详情信息
                $scope.businessInfo = res.data.businessInfo[0];

                //京东认证详情信息

                $scope.jingdongAccountInfo = res.data.jingdongAccountInfo;

                //电商认证额度
                $scope.businessCreditQuota = res.data.businessCreditQuota;

            });

            /**
             *查询银行流水信息
             */

            var rq_query_bank_credit_info = verificationService.query_bank_credit_info().query({
                userId: id
            });

            httpService(rq_query_bank_credit_info, function (res) {

                console.log(res.data);
                $scope.bankData = res.data;
                $scope.info = res.data.bankInfo;

            });


        };


        /**
         *学生极速认证审核
         */


        $scope._studentNo = function (btn,id, authStudentInfo, authUserContact, authIdendityPic, fastCreditRealLoanMoney) {

            var yes='选项中有通过的';
            var no='选项中有未通过的';
            if(!authStudentInfo){
                var msg='学籍认证资料未选择';
                commonService._layer(msg,function () {

                });
                return ;
            }else if(!authUserContact){
                var msg='联系方式审核未选择';
                commonService._layer(msg,function () {
                    
                });
                return;
            }else if(!authIdendityPic){
                var msg='身份认证未选择';
                commonService._layer(msg,function () {

                });
                return;
            }else if(btn=='no'&&authStudentInfo=='true'){
                commonService._layer(yes,function () {

                });
                return;
            }else if(btn=='no'&&authUserContact=='true'){
                commonService._layer(yes,function () {

                });
                return;
            }else if(btn=='no'&&authIdendityPic=='true'){
                commonService._layer(yes,function () {

                });
                return;
            }
            else if(btn=='yes'&&authIdendityPic=='false'){
                commonService._layer(no,function () {

                });
                return;
            }
            else if(btn=='yes'&&authUserContact=='false'){
                commonService._layer(no,function () {

                });
                return;
            }
            else if(btn=='yes'&&authStudentInfo=='false'){
                commonService._layer(no,function () {

                });
                return;
            }else if(btn=='yes'&&fastCreditRealLoanMoney==undefined){
                var msg='请输入金额';
                commonService._layer(msg,function () {

                })
            }


            else if (btn=='no'||authStudentInfo == 'false' || authUserContact == 'false' || authIdendityPic == 'false') {
                var authFastCredit = false;

                commonService._layer2(function () {
                    var obj = document.getElementsByName('checkbox');
                    var s = '';
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].checked) s += obj[i].value + ',';  //如果选中，将value添加到变量s中
                    }
                    //那么现在来检测s的值就知道选中的复选框的值了

                    var str = $("#textarea").val();
                    str += s;

                    var ruquest_student_fast_auth = verificationService.student_fast_auth().save({
                        userId: id,
                        authStudentInfo: JSON.parse(authStudentInfo),
                        authUserContact: JSON.parse(authUserContact),
                        authIdendityPic: JSON.parse(authIdendityPic),
                        authFastCredit: authFastCredit,
                        fastCreditRealLoanMoney: fastCreditRealLoanMoney,
                        reason: str

                    });

                    httpService(ruquest_student_fast_auth, function (res) {
                        console.log(res.data);
                        if(res.result=='0'){
                            commonService._layer('操作成功',function () {

                            })
                        }else{
                            commonService._layer('操作失败',function () {

                            })
                        }

                    })
                });

            } else {
                var _authFastCredit = true;

                var msg = '确定快速认证';
                commonService._layer(msg, function () {
                    var ruquest_student_fast_auth = verificationService.student_fast_auth().save({
                        userId: id,
                        authStudentInfo: JSON.parse(authStudentInfo),
                        authUserContact: JSON.parse(authUserContact),
                        authIdendityPic: JSON.parse(authIdendityPic),
                        authFastCredit: _authFastCredit,
                        fastCreditRealLoanMoney: fastCreditRealLoanMoney,
                        reason: ''

                    });

                    httpService(ruquest_student_fast_auth, function (res) {
                        console.log(res.data);
                        if(res.result=='0'){
                            commonService._layer('操作成功',function () {

                            })
                        }else{
                            commonService._layer('操作失败',function () {

                            })
                        }

                    })
                })
            }

        };

        /**
         * 学生银行卡流水认证审核
         */
        
        $scope.student_bank_credit_auth=function (btn,id,bankCreditRealLoanMoney,authBankCredit) {
            if(!authBankCredit){
                var msg='银行流水未通过';
                commonService._layer(msg,function () {

                });
                return ;
            }else if(btn=='no'&&authBankCredit=='true'){
                commonService._layer('选项中有通过的',function () {

                });
                return;
            }else if(btn=='yes'&&authBankCredit=='false'){
                commonService._layer('选项中有未通过的',function () {

                });
                return;
            }
            else if(btn=='yes'&&authBankCredit==undefined){
                var msg='请输入金额';
                commonService._layer(msg,function () {

                })
            }


            else if(btn=='no'||authBankCredit=='false'){
                commonService._layer2(function () {
                    var obj = document.getElementsByName('checkbox');
                    var s = '';
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].checked) s += obj[i].value + ',';  //如果选中，将value添加到变量s中
                    }
                    //那么现在来检测s的值就知道选中的复选框的值了

                    var str = $("#textarea").val();
                    str += s;

                    var requeststudent_bank_credit_auth = verificationService.studentBankCreditAuth().save({
                        userId: id,
                        bankCreditRealLoanMoney: bankCreditRealLoanMoney,
                        authBankCredit: JSON.parse(authBankCredit),
                        reason: str
                    });

                    httpService(requeststudent_bank_credit_auth, function (res) {
                        console.log(res.data)
                        if(res.result=='0'){
                            commonService._layer('操作成功',function () {

                            })
                        }else{
                            commonService._layer('操作失败',function () {

                            })
                        }

                    })
                });
            }else if(authBankCredit=='true'){
                var msg = '确定通过';
                commonService._layer(msg,function () {
                    var requeststudent_bank_credit_auth = verificationService.studentBankCreditAuth().save({
                        userId: id,
                        bankCreditRealLoanMoney: bankCreditRealLoanMoney,
                        authBankCredit: JSON.parse(authBankCredit),
                        reason: ''
                    });

                    httpService(requeststudent_bank_credit_auth, function (res) {
                        console.log(res.data)
                        if(res.result=='0'){
                            commonService._layer('操作成功',function () {

                            })
                        }else{
                            commonService._layer('操作失败',function () {

                            })
                        }
                    })
                })
            }
        };

        /**
         * 学生电商认证审核
         */

        $scope.student_business_credit_auth=function (btn,id,authBusinessCredit,businessCreditRealLoanMoney) {

            if(!authBusinessCredit){
                var msg='电商未认证';
                commonService._layer(msg,function () {

                });
                return;
            }else if(btn=='yes'&&authBusinessCredit=='false'){
                commonService._layer('选项中有未通过的',function () {

                });
                return;
            }else if(btn=='no'&&authBusinessCredit=='true'){
                commonService._layer('选项中有通过的',function () {

                });
                return;
            }
            else if(btn=='yes'&&businessCreditRealLoanMoney==undefined){
                var msg='请输入金额';
                commonService._layer(msg,function () {

                })
            }


            else if(btn=='no'||authBusinessCredit=='false'){
                commonService._layer2(function () {
                    var obj = document.getElementsByName('checkbox');
                    var s = '';
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].checked) s += obj[i].value + ',';  //如果选中，将value添加到变量s中
                    }
                    //那么现在来检测s的值就知道选中的复选框的值了

                    var str = $("#textarea").val();
                    str += s;

                    var student_business_credit_auth = verificationService.student_business_credit_auth().save({
                        userId: id,
                        businessCreditRealLoanMoney: businessCreditRealLoanMoney,
                        authBusinessCredit: JSON.parse(authBusinessCredit),
                        reason: str
                    });

                    httpService(student_business_credit_auth, function (res) {
                        console.log(res.data)
                        if(res.result=='0'){
                            commonService._layer('操作成功',function () {

                            })
                        }else{
                            commonService._layer('操作失败',function () {

                            })
                        }

                    })
                });
            }else if(authBusinessCredit=='true'){
                var msg='确定通过';
                commonService._layer(msg,function () {
                    var student_business_credit_auth = verificationService.student_business_credit_auth().save({
                        userId: id,
                        businessCreditRealLoanMoney: businessCreditRealLoanMoney,
                        authBusinessCredit: JSON.parse(authBusinessCredit),
                        reason: ''
                    });

                    httpService(student_business_credit_auth, function (res) {
                        console.log(res)
                        if(res.result=='0'){
                            commonService._layer('操作成功',function () {

                            })
                        }else{
                            commonService._layer('操作失败',function () {

                            })
                        }

                    })
                })
            }

            
        }


    }]);






