/**
 * Created by sheldon on 2016/5/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('VerifyBankCtrl', ['$scope', 'Verify', 'WeChat', '$location', 'WeChatTitle', 'Bridge',
            function ($scope, Verify, WeChat, $location, WeChatTitle, Bridge) {

                WeChatTitle('银行流水认证');

                $scope.imgList = [];
                $scope.mediaList = [];

                $scope.uploadImg = function () {

                    Bridge.uploadImgFromCameraOrAlbum(function (pre, media) {
                        $scope.$apply(function () {
                            $scope.imgList.push(pre);
                            setTimeout(function () {
                                $scope.$apply(function () {
                                    document.getElementById(pre).src = pre;
                                });
                            }, 1);
                            $scope.mediaList.push(media);
                        })
                    });
                };

                Bridge.appToken(function (response) {
                    $scope.appToken = response;

                    $scope.toVerifyBank = function () {
                        if ($scope.imgList.length == 0) {
                            Toast('请添加图片');
                        } else {
                            $scope.toVerifyBankReq = Verify.verifyBankPayment().save({
                                bankBillsFiles: $scope.mediaList.toString(),
                                appToken: $scope.appToken
                            });
                            $scope.$root.loading = true;

                            $scope.toVerifyBankReq.$promise.then(function (res) {
                                $scope.$root.loading = false;
                                if (res.result == 0) {
                                    Bridge.jumpTo($location.absUrl().split('#')[0] + '#?/verify/index', '认证提额');
                                } else if (res.result == 1013) {
                                    Toast('请登录');
                                    Bridge.login();
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
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] == val) {
                                token = i;
                            }
                        }
                        return token;
                    };


                    $scope.deleteImg = function (x) {
                        var index = $scope.findByValueFromArray($scope.imgList, x);
                        if (index != 'notFind') {
                            $scope.imgList.splice(index, 1);
                            $scope.mediaList.splice(index, 1)
                        }
                    };

                })

            }])
    }
});