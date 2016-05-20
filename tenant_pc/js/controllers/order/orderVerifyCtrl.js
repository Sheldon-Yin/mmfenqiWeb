/**
 * Created by sheldon on 2016/5/9.
 */
app.controller('OrderVerifyCtrl', ['$scope', 'QueryOrderDetail', 'VerifyOrder', 'toaster', '$state',
    function ($scope, QueryOrderDetail, VerifyOrder, toaster, $state) {


        $scope.data = {};

        $scope.verifyOrder = function () {
            $scope.verifyOrderReq = VerifyOrder.query({
                channel: 1,
                orderSn: $scope.data.orderSn
            });
            $scope.verifyOrderReq.$promise.then(function (res) {
                if (res.result == 0) {
                    console.log(res);
                    toaster.pop('success', '验证成功', res.msg);
                } else {
                    console.log(res);
                    toaster.pop('error', '验证失败', res.msg);
                }
            }).catch(function (error) {
                console.log(error);
                toaster.pop('error', '验证失败', error);
            })
        };

        $scope.getOrderDetail = function () {
            $scope.queryOrderDetial = QueryOrderDetail.query({
                channel: 1,
                orderSn: $scope.orderSn
            });
            $scope.queryOrderDetial.$promise.then(function (res) {
                if (res.result == 0) {
                    console.log(res);
                    $scope.data = res.data.orderResponse;
                } else {
                    console.log(res);
                    $scope.data = {};
                }
            }).catch(function (error) {
                console.log(error);
                $scope.data = {};
            })
        };

        $scope.initQrCodeForWeChat = function () {
            var targetUrl = window.location.href;
            var map = [];
            var url = "/weixin/getJsSDKConfig?targetUrl=" + targetUrl.split('#')[0];
            $.ajax({
                type: "POST",
                url: url,
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.result == 0) {
                        wx.config({
                            debug: false,
                            appId: response.data.jsSDKConfig.appId,
                            timestamp: response.data.jsSDKConfig.timestamp,
                            nonceStr: response.data.jsSDKConfig.nonceStr,
                            signature: response.data.jsSDKConfig.signature,
                            jsApiList: [
                                'checkJsApi',
                                'hideMenuItems',
                                'scanQRCode'
                            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        wx.ready(function () {
                            // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
                        });
                        wx.error(function (res) {
                            alert(res.errMsg);
                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('获取config失败')
                }
            });
        };
        $scope.initQrCodeForWeChat();


        $scope.queryQrCodeForWeChat = function () {
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    result = result + '&channel=1';
                    $.ajax({
                        type: "POST",
                        url: result,
                        success: function (response) {
                            if (response.result == 0) {
                                $scope.data = response.data.orderResponse;
                                $scope.orderSn = response.data.orderResponse.orderSn;
                                $scope.$apply(function () {
                                    toaster.pop('success', '获取成功')
                                })
                            }

                            if (response.result != 0) {
                                alert('获取失败');
                                $scope.$apply(function () {
                                    toaster.pop('error', '获取失败')
                                })
                            }

                        },
                        error: function (error) {
                            $scope.apply(function () {
                                toaster.pop('error', '获取失败')
                            })
                        }
                    })
                }
            });
        }

    }]);