/**
 * Created by ChinaHp on 2016/6/27.
 */

app.controller('ColblancCtrl', ['$scope', 'verificationService', 'commonService', '$state', 'httpService', '$location', '$stateParams',
    function ($scope, verificationService, commonService, $state, httpService, $location, $stateParams) {
        $scope.studentCreditListdate = [];

        $scope.init = function () {
            $scope.currentPage = 1;
            $scope.time_start = commonService.init().time_start;
            $scope.time_end = commonService.init().time_end;
            $scope.leftContnet = false;//没选择用户之前是false

            $scope.company_bianji_btn = false;//公司信息按钮

            $scope.personal_btn = false; //个人关系按钮

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

            ]


        };

        $scope.init();


        var queryStu = function (time_start, time_end, page) {
            var request = verificationService.query_whiteCollar_credit_info().query({
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
                $scope.studentCreditListdate = res.data.whiteCollarCreditList;

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
         * 修改白领基础认证信息编辑
         */
        $scope.company_bianji = function () {
            $scope.company_bianji_btn = true;

            $('.company').find("input[type='text']").removeAttr('readonly');
            $('.company').find("input[type='text']").css({
                'color': '#333',
                'border': '1px solid #82c9ff'
            });
        };

        $scope.company_sure = function (id, basicInfoResponse) {
            $scope.company_bianji_btn = false;
            var msg = '确定修改';
            commonService._layer(msg, function () {
                var request = verificationService.edit_whitecollar_baseInfo().save({
                    userId: id,
                    companyName: basicInfoResponse.baseUserWhitecollar.companyName,
                    companyTelphone: basicInfoResponse.baseUserWhitecollar.companyTelphone,

                    companyPosition: basicInfoResponse.baseUserWhitecollar.companyPosition,
                    companyAddr: basicInfoResponse.baseUserWhitecollar.companyAddr,
                    presentAddress: basicInfoResponse.baseUserAddinfo.presentAddress,
                    firstName: basicInfoResponse.baseUserAddinfo.firstName,
                    firstTelphone: basicInfoResponse.baseUserAddinfo.firstTelphone
                });
                httpService(request, function (res) {
                    $('.company').find("input[type='text']").attr('readonly', 'readonly');

                    $('.company').find("input[type='text']").css({
                        'color': '#666',
                        'border': '1px solid #FFFFFF'
                    });
                })


            });

        };


        /**
         * 修改白领基础认证信息编辑
         */
        $scope.personal_bianji = function () {
            $scope.personal_btn = true;

            $('.personal').find("input[type='text']").removeAttr('readonly');
            $('.personal').find("input[type='text']").css({
                'color': '#333',
                'border': '1px solid #82c9ff'
            });
        };

        $scope.personal_sure = function (id, basicInfoResponse) {
            $scope.personal_btn = false;
            var msg = '确定修改';
            commonService._layer(msg, function () {
                var request = verificationService.edit_whitecollar_baseInfo().save({
                    userId: id,
                    companyName: basicInfoResponse.baseUserWhitecollar.companyName,
                    companyTelphone: basicInfoResponse.baseUserWhitecollar.companyTelphone,

                    companyPosition: basicInfoResponse.baseUserWhitecollar.companyPosition,
                    companyAddr: basicInfoResponse.baseUserWhitecollar.companyAddr,
                    presentAddress: basicInfoResponse.baseUserAddinfo.presentAddress,
                    firstName: basicInfoResponse.baseUserAddinfo.firstName,
                    firstTelphone: basicInfoResponse.baseUserAddinfo.firstTelphone
                });
                httpService(request, function (res) {
                    $('.personal').find("input[type='text']").attr('readonly', 'readonly');

                    $('.personal').find("input[type='text']").css({
                        'color': '#666',
                        'border': '1px solid #FFFFFF'
                    });
                })
            })

        };

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
         * 白领详情信息
         * @param id
         * @param basicCreditStatus
         * @param bankInfoCreditStatus
         * @param businessCreditStatus
         * @param sesameCreditStatus
         * @constructor
         */
        $scope.UserInfo = function (id, basicCreditStatus, bankInfoCreditStatus, businessCreditStatus, sesameCreditStatus) {



            // console.log(basicCreditStatus,bankInfoCreditStatus,businessCreditStatus,sesameCreditStatus);

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

            // $scope.FirstOpen_bankInfoCreditStatus = bankInfoCreditStatus == '1' ? false : true;
            //
            // $scope.isFirstOpen_businessCreditStatus = businessCreditStatus == '1' ? false : true;
            //
            // $scope.isFirstOpen_sesameCreditStatus = sesameCreditStatus == '1' ? false : true;
            //
            //
            // if (basicCreditStatus == '1') {
            //     $scope.status = {
            //         isFirstOpen: false
            //     }
            // } else {
            //     $scope.status = {
            //         isFirstOpen: true
            //     }
            // }

            /**
             * 白领基本信息
             */
            var requestB = verificationService.queryBasicInfo().query({
                userId: id
            });


            httpService(requestB, function (res) {
                $scope.data = res.data;
                console.log(res.data)
            });

            /**
             * 白领基础信息认证
             */
            var requestBasic = verificationService.query_whiteCollar_basic_info().query({
                userId: id
            });

            httpService(requestBasic, function (res) {
                console.log(res.data);

                $scope.identityPic = res.data.identityPic;

                $scope.basicInfoResponse = res.data.basicInfoResponse[0];

                $scope.basicCreditQuota=res.data.basicCreditQuota;

                $scope.telCodeReaponse = res.data.telCodeResponse;


                $scope.LocationInfoList = res.data.telCodeResponse.LocationInfoList;
                //
                $scope.intimateContactList = res.data.telCodeResponse.intimateContactList


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
         * 白领电商认证审核
         * @param id
         * @param authBaseInfo
         * @param authIdendityPic
         * @param authOtherInfo
         * @param fastCreditRealLoanMoney
         */

        $scope.whitecollar_fast_auth=function (btn,id,authBaseInfo,authIdendityPic,authOtherInfo,fastCreditRealLoanMoney) {
            if(!authBaseInfo){
                var msg='基础信息未选择';
                commonService._layer(msg,function () {

                });
                return ;
            }else if(!authIdendityPic){
                var msg='身份证，工作证明未选择';
                commonService._layer(msg,function () {

                });
                return;
            }else if(!authOtherInfo){
                var msg='其他信息未选择';
                commonService._layer(msg,function () {
                    
                });
                return;
            }else if(btn=='no'&&authBaseInfo=='true'){
                var msg='选项中有通过的';
                commonService._layer(msg,function () {

                });
                return;
            }else if(btn=='no'&&authIdendityPic=='true'){
                var msg='选项中有通过的';
                commonService._layer(msg,function () {

                });
                return;
            }else if(btn=='no'&&authOtherInfo=='true'){
                var msg='选项中有通过的';
                commonService._layer(msg,function () {
                    
                });
                return;
            }


            else if(btn=='yes'&&authBaseInfo=='false'){
                var msg='选项中有未通过的';
                commonService._layer(msg,function () {

                });
                return;
            }else if(btn=='yes'&&authIdendityPic=='false'){
                var msg='选项中有未通过的';
                commonService._layer(msg,function () {

                });
                return;
            }else if(btn=='yes'&&authOtherInfo=='false'){
                var msg='选项中未通过的';
                commonService._layer(msg,function () {

                });
                return;
            }else if(btn=='yes'&&fastCreditRealLoanMoney==undefined){
                var msg='请输入金额';
                commonService._layer(msg,function () {
                    
                })
            }
            else if(btn=='no'||authBaseInfo=='false'||authIdendityPic=='false'||authOtherInfo=='false'){
                commonService._layer3(function () {
                    var obj = document.getElementsByName('checkbox');
                    var s = '';
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].checked) s += obj[i].value + ',';  //如果选中，将value添加到变量s中
                    }
                    //那么现在来检测s的值就知道选中的复选框的值了

                    var str = $("#_textarea").val();
                    str += s;

                    var ruquest_whitecollar_fast_auth = verificationService.whitecollar_fast_auth().save({
                        userId: id,
                        authBaseInfo: JSON.parse(authBaseInfo),
                        authIdendityPic: JSON.parse(authIdendityPic),
                        authOtherInfo: JSON.parse(authOtherInfo),
                        authFastCredit: false,
                        fastCreditRealLoanMoney: fastCreditRealLoanMoney,
                        reason: str

                    });

                    httpService(ruquest_whitecollar_fast_auth, function (res) {
                        if(res.result=='0'){
                            commonService._layer('操作成功',function () {

                            })
                        }else{
                            commonService._layer('操作失败',function () {

                            })
                        }

                    })
                });
            }else{
                var ruquest_whitecollar_fast_auth = verificationService.whitecollar_fast_auth().save({
                    userId: id,
                    authBaseInfo: JSON.parse(authBaseInfo),
                    authIdendityPic: JSON.parse(authIdendityPic),
                    authOtherInfo: JSON.parse(authOtherInfo),
                    authFastCredit: true,
                    fastCreditRealLoanMoney: fastCreditRealLoanMoney,
                    reason: ''

                });

                httpService(ruquest_whitecollar_fast_auth, function (res) {
                    console.log(res.result=='0');
                    
                    if(res.result=='0'){
                        commonService._layer('操作成功',function () {
                            
                        })
                    }else{
                        commonService._layer('操作失败',function () {

                        })
                    }
                })
            }

        };

        /**
         * 白领银行卡流水认证审核
         * @param id
         * @param authBankCredit
         * @param bankCreditRealLoanMoney
         */
        
        $scope.whitecollar_bank_credit_auth=function (btn,id,authBankCredit,bankCreditRealLoanMoney) {
          if(!authBankCredit){
              var msg='银行流水认证未选择';
              commonService._layer(msg,function () {

              });
              return;
          }else if(authBankCredit=='false'&&btn=='yes'){
              var msg='选项中有未通过的';
              commonService._layer(msg,function () {

              });
              return;
          }
          else if(authBankCredit=='true'&&btn=='no'){
              var msg='选项中有通过的';
              commonService._layer(msg,function () {

              });
              return;
          }else if(btn=='yes'&&bankCreditRealLoanMoney==undefined){
              var msg='请输入金额';
              commonService._layer(msg,function () {

              })
          }

          else if(btn=='no'||authBankCredit=='false'){
              commonService._layer3(function () {
                  var obj = document.getElementsByName('checkbox');
                  var s = '';
                  for (var i = 0; i < obj.length; i++) {
                      if (obj[i].checked) s += obj[i].value + ',';  //如果选中，将value添加到变量s中
                  }
                  //那么现在来检测s的值就知道选中的复选框的值了

                  var str = $("#_textarea").val();
                  str += s;

                  var request_bank_credit_auth = verificationService.whitecollar_bank_credit_auth().save({
                      userId: id,
                      bankCreditRealLoanMoney: bankCreditRealLoanMoney,
                      authBankCredit: JSON.parse(authBankCredit),
                      reason: str
                  });

                  httpService(request_bank_credit_auth, function (res) {
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
          }else{
              var msg = '确定通过';
              commonService._layer(msg,function () {
                  var request_bank_credit_auth = verificationService.whitecollar_bank_credit_auth().save({
                      userId: id,
                      bankCreditRealLoanMoney: bankCreditRealLoanMoney,
                      authBankCredit: JSON.parse(authBankCredit),
                      reason: ''
                  });

                  httpService(request_bank_credit_auth, function (res) {
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
         * 白领电商认证审核
         */
        $scope.whitecollar=function (btn,id,authBusinessCredit,businessCreditRealLoanMoney) {

            if(!authBusinessCredit){
                var msg='电商认证未选择';
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
            }else if(btn=='yes'&&businessCreditRealLoanMoney==undefined){
                var msg='请输入金额';
                commonService._layer(msg,function () {

                })
            }

            else if(authBusinessCredit=='false'){
                commonService._layer3(function () {
                    var obj = document.getElementsByName('checkbox');
                    var s = '';
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].checked) s += obj[i].value + ',';  //如果选中，将value添加到变量s中
                    }
                    //那么现在来检测s的值就知道选中的复选框的值了

                    var str = $("#_textarea").val();
                    str += s;

                    var re_business_credit_auth = verificationService.whitecollar_business_credit_auth().save({
                        userId: id,
                        businessCreditRealLoanMoney: businessCreditRealLoanMoney,
                        authBusinessCredit: JSON.parse(authBusinessCredit),
                        reason: str
                    });

                    httpService(re_business_credit_auth, function (res) {
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
                    var re_business_credit_auth = verificationService.whitecollar_business_credit_auth().save({
                        userId: id,
                        businessCreditRealLoanMoney: businessCreditRealLoanMoney,
                        authBusinessCredit: JSON.parse(authBusinessCredit),
                        reason: ''
                    });

                    httpService(re_business_credit_auth, function (res) {
                        console.log(res);

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

    }]);
