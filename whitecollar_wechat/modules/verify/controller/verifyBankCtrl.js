/**
 * Created by sheldon on 2016/5/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('VerifyBankCtrl', ['$scope', 'Verify', 'WeChat','$location','WeChatTitle',
            function ($scope, Verify, WeChat,$location,WeChatTitle) {

                WeChatTitle('银行流水认证');

                $scope.imgList = [];
                $scope.mediaList = [];

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

                $scope.uploadImg = function () {
                    wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            $scope.$apply(function () {
                                $scope.imgList.push(res.localIds[0]); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                                setTimeout(function () {
                                    document.getElementById(res.localIds[0]).src = res.localIds[0];
                                },0)
                            });
                            wx.uploadImage({
                                localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    $scope.mediaList.push(res.serverId);
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

                $scope.toVerifyBank = function() {
                    if($scope.imgList.length == 0){
                        Toast('请添加图片');
                    }else {
                        $scope.toVerifyBankReq = Verify.verifyBankPayment().save({
                            bankBillsFiles: $scope.mediaList.toString()
                        });
                        $scope.$root.loading = true;

                        $scope.toVerifyBankReq.$promise.then(function (res) {
                            $scope.$root.loading = false;
                            if (res.result == 0){
                                $location.path('/verify/index')
                            }else if (res.result == 1013){
                                Toast('请登录');
                                window.location.href = './#/login/telephone';
                            } else {
                                Toast(res.msg)
                            }
                        }).catch(function (error) {
                            $scope.$root.loading = false;
                            Toast(error)
                        })
                    }
                };

                $scope.findByValueFromArray = function (arr, val) {
                    var token = 'notFind';
                    for(var i=0; i<arr.length; i++) {
                        if(arr[i] == val) {
                            token = i;
                        }
                    }
                    return token;
                };


                $scope.deleteImg = function (x) {
                    var index = $scope.findByValueFromArray($scope.imgList,x);
                    if (index != 'notFind'){
                        $scope.imgList.splice(index, 1);
                        $scope.mediaList.splice(index,1)
                    }
                };

            }])
    }
});