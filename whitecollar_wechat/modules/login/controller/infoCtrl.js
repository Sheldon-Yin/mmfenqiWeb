/**
 * Created by ChinaHp on 2016/8/4.
 */
'use strict';
define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/loginService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('InfoCtrl', ['$scope', 'Login', '$location', 'WeChatTitle', 'Bridge',
            function ($scope, Login, $location, WeChatTitle, Bridge) {


                $scope.startHref = window.location.href;

                Bridge.appToken(function (res) {
                    $scope.appToken = res;
                });

                $scope.hideSelect = function () {
                    $scope.selecting = false
                };
                
                $scope.inSure=function () {

                    Bridge.jumpTo('#?/login/insure','保险说明')
                    
                };

                $scope.strAmount = 0;
                $scope.isInsuranceBuy = true;//是否购买保险
                $scope.goodsId = $location.search().goodsId || 509;
                $scope.hosId = $location.search().hosId || 1;

                $scope.update = function (cb) {
                    $scope.update_store_intention_orders = Login.update_store_intention_orders().save({
                        id: $scope._id,
                        appToken: $scope.appToken,
                        goodsId: $scope.goodsId,
                        hosId: $scope.hosId,
                        goodsName: $scope.goodsName,
                        orderPrice: $scope.price,
                        staging: $scope.id,
                        isInsuranceBuy: $scope.isInsuranceBuy,
                        insuranceAmount: $scope.name,
                        monthPay: $scope.strMonthPay,
                        monthService: $scope.strMonthServicePay,
                        rate: $scope.rate,
                        totalAmount: $scope.strTotalAmount,
                        totalService: $scope.strTotalServicePay
                    });
                    $scope.update_store_intention_orders.$promise.then(function (res) {
                        if(res.result == 1013){
                            Bridge.login($scope.startHref);
                            return
                        }
                        console.log(res);
                        //     window.location.href = '/custom/tocreateExt?storeIntentionOrdersId=' + $scope._id;
                        if(res.result=='0'){
                            if(typeof cb === 'function'){
                                cb(res)
                            }
                        }else{
                            Toast(res.msg)
                        }


                    });
                };

                $scope.inset = function (cb) {
                    $scope.add_store_intention_orders = Login.add_store_intention_orders().save({
                        appToken: $scope.appToken,
                        goodsId: $scope.goodsId,
                        hosId: $scope.hosId,
                        goodsName: $scope.goodsName,
                        orderPrice: $scope.price,
                        staging: $scope.id,
                        isInsuranceBuy: $scope.isInsuranceBuy,
                        insuranceAmount: $scope.name,
                        monthPay: $scope.strMonthPay,
                        monthService: $scope.strMonthServicePay,
                        rate: $scope.rate,
                        totalAmount: $scope.strTotalAmount,
                        totalService: $scope.strTotalServicePay
                    });

                    $scope.add_store_intention_orders.$promise.then(function (res) {
                        if(res.result == 1013){
                            Bridge.login($scope.startHref);
                            return
                        }
                        console.log(res);
                        if (res.result == '0') {
                            $scope._id = res.data.id;
                            if(typeof cb === 'function'){
                                cb(res);
                            }
                        } else {
                            Toast(res.msg)
                        }


                    });
                };

                $scope.query = function (cb) {
                    $scope.query_store_intention_orders = Login.query_store_intention_orders().query({
                        appToken: $scope.appToken,
                        hosId: $scope.hosId
                    });
                    $scope.query_store_intention_orders.$promise.then(function (res) {
                        console.log(res);
                        if(res.result == 1013){
                            Bridge.login($scope.startHref);
                            return
                        }

                        if(res.result == 0){
                            cb(res);
                        }
                    })
                };

                $scope.goToPay = function () {
                    var cb_query = function (res) {
                        if ( !!res.data.storeIntentionOrdersList&&res.data.storeIntentionOrdersList.length>0) {
                            $scope._id = res.data.storeIntentionOrdersList[0].id;
                            var cb_update = function (res) {

                                window.location.href='/custom/tocreateExt?storeIntentionOrdersId='+$scope._id;
                            };
                            $scope.update(cb_update)
                        } else  {
                            var cb_inset=function (res) {
                                window.location.href='/custom/tocreateExt?storeIntentionOrdersId='+$scope._id;
                            };
                            $scope.inset(cb_inset);

                        }
                    };
                    $scope.query(cb_query);
                };

                $scope.goToVerify = function () {
                    if(!$scope.price){
                        Toast('请输入项目金额');
                        return;
                    }
                    // var cb=function (res) {
                    //         $scope._id = res.data.id;
                    //         Bridge.jumpTo('#?/verify', '极速认证');
                    //         var update_cb=function (res) {
                    //                 Bridge.jumpTo('#?/verify', '极速认证')
                    //         };
                    //         $scope.update(update_cb)
                    // };


                    var cb_query = function (res) {
                        if ( !!res.data.storeIntentionOrdersList&&res.data.storeIntentionOrdersList.length>0) {
                            $scope._id = res.data.storeIntentionOrdersList[0].id;

                            var cb_update = function (res) {

                              //  window.location.href='/custom/tocreateExt?storeIntentionOrdersId='+$scope._id;

                                Bridge.jumpTo('#?/verify', '极速认证')
                            };
                            $scope.update(cb_update)
                        } else  {
                            var cb_inset=function (res) {
                                Bridge.jumpTo('#?/verify', '极速认证')
                              //  window.location.href='/custom/tocreateExt?storeIntentionOrdersId='+$scope._id;
                            };
                            $scope.inset(cb_inset);

                        }
                    };


                    $scope.query(cb_query);




                };

                $scope.queryStagingInfo=function (cb) {
                    $scope.queryStaging_info = Login.query_staging_info().query({
                        goodsId: $scope.goodsId,
                        price: $scope.price ? $scope.price : '',
                        staging: $scope.id

                    });
                    $scope.queryStaging_info.$promise.then(function (res) {

                        console.log(res);


                        if (res.result == '0') {


                            cb(res)



                        } else {

                            Toast(res.msg);

                            $scope.strAmount = 0;
                        }


                    })
                };

                $scope.toPay = false;

                $scope.nottoPay = true;

                $scope.compare=function (cb) {
                    if ($scope.price && ($scope.price < $scope.remainMoney||$scope.price == $scope.remainMoney)) {
                        $scope.toPay = true;
                        $scope.nottoPay = false;
                    } else if (!$scope.price) {
                        $scope.toPay = false;
                        $scope.nottoPay = true;
                    } else if ($scope.price && $scope.price > $scope.remainMoney) {
                        $scope.toPay = false;
                        $scope.nottoPay = true;
                    }

                    $scope.queryStaging_info = Login.query_staging_info().query({
                        goodsId: $scope.goodsId,
                        price: $scope.price ? $scope.price : '',
                        staging: $scope.id

                    });
                    $scope.queryStaging_info.$promise.then(function (res) {

                        console.log(res);


                        if (res.result == '0') {


                            cb(res)



                        } else {

                            Toast(res.msg);

                            $scope.strAmount = 0;
                        }


                    })





                };

                $scope.handleChange=function () {
                    var cb_compare=function (res) {
                        $scope.strAmount = res.data.fenqi.strMonthPay;
                        $scope.strTotalAmount = res.data.fenqi.strTotalAmount;

                        $scope.strTotalServicePay = res.data.fenqi.strTotalServicePay;


                        $scope.rate = res.data.fenqi.rate;


                        $scope.strMonthServicePay = res.data.fenqi.strMonthServicePay;


                        $scope.strMonthPay = res.data.fenqi.strMonthPay;


                        $scope.insuranceAmountList = res.data.insuranceAmountList;

                        $scope.name = $scope.insuranceAmountList[0].price;
                    };
                    $scope.compare(cb_compare)
                };

                $scope.selectCode = function () {

                    if (!$scope.price) {
                        Toast('请先填写价格');
                        return;

                    }
                    $scope.selecting = true;


                    $scope.json = [
                        {name: '购买', type: '0'},
                        {name: '不购买', type: '6'}
                    ];

                    if (!typeof($scope.name) === 'number') {
                        $scope.initShowSelect($scope.insuranceAmountList, '请选择', 'price', 'price', function (price) {
                            $scope.name = price;
                            $scope.selecting = false;
                            $scope.isInsuranceBuy = true;

                        })
                    } else {
                        $scope.initShowSelect($scope.json, '请选择', 'name', 'type', function (name, type) {
                            $scope.name = name;
                            $scope.type = type;
                            if ($scope.name == '不购买') {
                                $scope.selecting = false;
                                $scope.isInsuranceBuy = false;

                                $scope.name = 0;

                                return;
                            }
                            $scope.initShowSelect($scope.insuranceAmountList, '请选择', 'price', 'price', function (price) {
                                $scope.name = price;
                                $scope.selecting = false;
                                $scope.isInsuranceBuy = true;
                            })
                        })
                    }


                };


                $scope.staging = function () {
                    $scope.selecting = true;
                    $scope.queryStaging = Login.query_staging().query({
                        goodsId: $scope.goodsId,
                        appToken: $scope.appToken
                    });

                    $scope.queryStaging.$promise.then(function (res) {

                        if(res.result == 1013){
                            Bridge.login($scope.startHref);
                            return
                        }

                        console.log(res.data.fenqi);
                        var _arry = [];
                        var json = {};
                        var arry = res.data.fenqi;
                        var length = res.data.fenqi.length;

                        arry.forEach(function (item) {
                            console.log(item);
                            _arry.push({id: item});
                        });

                        console.log(_arry);
                        $scope.initShowSelect(_arry, '请选择', 'id', 'id', function (stag, id) {
                            $scope.id = id;
                            $scope.selecting = false;
                           // $scope.handleChange()

                            $scope.queryStagingInfo(function (res) {
                                $scope.strAmount = res.data.fenqi.strMonthPay;
                                $scope.strTotalAmount = res.data.fenqi.strTotalAmount;

                                $scope.strTotalServicePay = res.data.fenqi.strTotalServicePay;


                                $scope.rate = res.data.fenqi.rate;


                                $scope.strMonthServicePay = res.data.fenqi.strMonthServicePay;


                                $scope.strMonthPay = res.data.fenqi.strMonthPay;


                                $scope.insuranceAmountList = res.data.insuranceAmountList;
                            })


                        })
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


                $scope.text = '获取验证码';
                $scope.verifyStatus = true;
                $scope.getCode = function () {

                    Toast('发送成功');
                    $scope.counter = 60;
                    $scope.verifyStatus = false;
                    var interval = $interval(function () {
                        $scope.text = $scope.counter + 's后重发';
                        if ($scope.counter < 1) {
                            $interval.cancel(interval);
                            $scope.verifyStatus = true;
                            $scope.text = '获取验证码'
                        }
                        $scope.counter--;
                    }, 1000)
                };

                $scope.queryStaging=function (success) {
                    $scope.selecting = false;
                    $scope.queryStaging = Login.query_staging().query({
                        goodsId: $scope.goodsId,
                        appToken: $scope.appToken
                    });
                    $scope.queryStaging.$promise.then(function (res) {

                        if(res.result == 1013){
                            Bridge.login($scope.startHref);
                            return
                        }

                        console.log(res);
                        var _arry = [];
                        var json = {};
                        var arry = res.data.fenqi;
                        var length = res.data.fenqi.length;
                        arry.forEach(function (item) {
                            console.log(item);
                            _arry.push({id: item});
                        });
                        $scope.id = _arry[0].id;//3
                        $scope.remainMoney = res.data.remainMoney;

                        return success()


                    });
                };


                $scope.queryInfo=function () {
                    var cb_query = function (res) {
                        if (!!res.data.storeIntentionOrdersList && res.data.storeIntentionOrdersList.length > 0) {
                            // $scope.handleChange();

                            $scope.id = res.data.storeIntentionOrdersList[0].staging;//6
                            $scope.goodsName = res.data.storeIntentionOrdersList[0].goodsName;
                            $scope.price = res.data.storeIntentionOrdersList[0].orderPrice;

                            $scope.name = res.data.storeIntentionOrdersList[0].insuranceAmount;

                            $scope.strAmount = res.data.storeIntentionOrdersList[0].monthPay;


                            $scope.compare(function (res) {
                                $scope.strAmount = res.data.fenqi.strMonthPay;
                                $scope.strTotalAmount = res.data.fenqi.strTotalAmount;

                                $scope.strTotalServicePay = res.data.fenqi.strTotalServicePay;


                                $scope.rate = res.data.fenqi.rate;


                                $scope.strMonthServicePay = res.data.fenqi.strMonthServicePay;


                                $scope.strMonthPay = res.data.fenqi.strMonthPay;


                                $scope.insuranceAmountList = res.data.insuranceAmountList;

                            })

                        }else{

                        }
                    };
                    $scope.query(cb_query);
                };


                $scope.init = function () {

                    $scope.queryStaging(function () {
                        $scope.queryInfo()
                    })
                };

                $scope.init();


            }])
    }
});




