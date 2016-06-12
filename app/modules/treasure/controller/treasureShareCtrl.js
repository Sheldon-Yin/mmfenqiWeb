/**
 * Created by sheldon on 2016/6/7.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/treasureService.js')(app);
        require('services/bridgeService.js')(app);
        app.register.controller('TreasureShareCtrl', ['$scope', 'Treasure', 'Bridge', '$location', '$http','$timeout',
            function ($scope, Treasure, Bridge, $location, $http,$timeout) {

                $scope.imgList = [];
                $scope.imgListLength = $scope.imgList.length;

                //$scope.goToShare = function () {
                //
                //
                //
                //};

                $scope.baseUrl = $location.absUrl().split('#')[0];


                setTimeout(function(){
                    $scope.goToShare = function () {

                        if (!$scope.appToken){
                            Toast('appToken获取失败');
                            return
                        }

                        if ($scope.imgList.length==0){
                            Toast('至少晒一张图来让大家看看你的好运气吧~');
                            return
                        }

                        if(!$scope.content){
                            Toast('来说说你的中奖心情吧~');
                            return
                        }

                        $scope.loading = true;
                        var fd = new FormData();
                        $scope.imgList.forEach(function (item) {
                            fd.append('tanPics', item);
                        });
                        fd.append('appToken', $scope.appToken);
                        fd.append('content', $scope.content);
                        fd.append('winningRecordId', $location.search().id);

                        $http.post('/appinterface/upload_userTan', fd, {
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            })
                            .success(function (res) {
                                if (res.result == 0) {
                                    $scope.loading = false;
                                    Toast('上传成功');
                                    setTimeout(function () {
                                        Bridge.jumpRootTo($scope.baseUrl + '#/treasure', '一元夺宝')
                                    }, 1000)
                                } else {
                                    Toast(res.msg + '上传失败')
                                }
                            })

                            .error(function (error) {
                                $scope.loading = false;
                                Toast(error);
                                //Toast(1);
                            })
                            .catch(function (error) {
                                $scope.loading = false;
                                Toast(JSON.stringify(error))
                            });

                    }
                }, 0);


                Bridge.appToken(function (response) {

                    $scope.appToken = encodeURI(response);

                    $scope.addImg = function () {
                        Bridge.uploadImgFromCamera(function (response) {
                            if (response != '') {
                                $scope.$apply(function () {
                                    $scope.imgList.push(response);
                                    $scope.imgListLength = $scope.imgList.length;
                                })
                            }
                        })
                    };

                });

            }])
    }
});