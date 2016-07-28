/**
 * Created by sheldon on 2016/5/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/bridgeService')(app);
        app.register.controller('VerifyBankCtrl', ['$scope', 'Verify','$location','Bridge','$http',
            function ($scope, Verify,$location,Bridge,$http) {

                $scope.imgList = [];

                Bridge.appToken(function (response) {
                    $scope.appToken = response;
                });

                $scope.uploadImg = function () {
                    Bridge.uploadImgFromCameraOrAlbum(function (res) {
                        $scope.$apply(function () {
                            $scope.imgList.push(res);
                        })
                    },720)
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
                    }
                };

                $scope.toVerifyBank = function() {

                    if($scope.imgList.length == 0){
                        Toast('请添加图片');
                    }else {
                        $scope.$root.loading = true;
                        var fd = new FormData();
                        $scope.imgList.forEach(function (item) {
                            fd.append('bankBillsFiles', item);
                        });
                        fd.append('appToken', $scope.appToken);

                        $http.post('/appinterface/bank_statement_credit', fd, {
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            })
                            .success(function (res) {
                                $scope.$root.loading = false;
                                if (res.result == 0) {
                                    Toast('上传成功');
                                    setTimeout(function () {
                                        Bridge.goBack();
                                    }, 1000)
                                } else {
                                    Toast(res.msg + ',上传失败')
                                }
                            })

                            .error(function (error) {
                                $scope.$root.loading = false;
                                Toast(JSON.stringify(error));
                            })
                            .catch(function (error) {
                                $scope.$root.loading = false;
                                Toast(JSON.stringify(error))
                            });
                    }
                };

            }])
    }
});