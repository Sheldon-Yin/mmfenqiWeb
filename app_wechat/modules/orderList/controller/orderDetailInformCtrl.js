/**
 * Created by sheldon on 2016/5/10.
 */
/**
 * Created by sheldon on 2016/4/19.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/orderService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('OrderDetailInformCtrl', ['$scope', '$http', '$location', 'Informs', 'UploadInform', 'DeleteInform', 'SubmitInforms', 'Bridge',
            function ($scope, $http, $location, Informs, UploadInform, DeleteInform, SubmitInforms, Bridge) {

                $scope.orderId = $location.search().orderId;
                $scope.uploading = false;
                $scope.loadError = false;

                $scope.getPicNumber = function (informedConsentResponse) {
                    $scope.picNumber = 1;
                    if (informedConsentResponse.informedConsentPic1 != null && informedConsentResponse.informedConsentPic1 != '') {
                        $scope.picNumber++;
                    }
                    if (informedConsentResponse.informedConsentPic2 != null && informedConsentResponse.informedConsentPic2 != '') {
                        $scope.picNumber++;
                    }
                    if (informedConsentResponse.informedConsentPic3 != null && informedConsentResponse.informedConsentPic3 != '') {
                        $scope.picNumber++;
                    }
                    if (informedConsentResponse.informedConsentPic4 != null && informedConsentResponse.informedConsentPic4 != '') {
                        $scope.picNumber++;
                    }
                    if (informedConsentResponse.informedConsentPic5 != null && informedConsentResponse.informedConsentPic5 != '') {
                        $scope.picNumber++;
                    }
                    if (informedConsentResponse.informedConsentPic6 != null && informedConsentResponse.informedConsentPic6 != '') {
                        $scope.picNumber++;
                    }
                    if (informedConsentResponse.informedConsentPic7 != null && informedConsentResponse.informedConsentPic7 != '') {
                        $scope.picNumber++;
                    }
                    if (informedConsentResponse.informedConsentPic8 != null && informedConsentResponse.informedConsentPic8 != '') {
                        $scope.picNumber++;
                    }
                    if (informedConsentResponse.informedConsentPic9 != null && informedConsentResponse.informedConsentPic9 != '') {
                        $scope.picNumber++;
                    }
                    if (informedConsentResponse.informedConsentPic10 != null && informedConsentResponse.informedConsentPic10 != '') {
                        $scope.picNumber++;
                    }
                };


                Bridge.appToken(function (response) {

                    $scope.appToken = response;

                    $scope.initInform = function () {
                        $scope.informs = Informs.query({
                            appToken: $scope.appToken,
                            orderId: $scope.orderId
                        });

                        $scope.informs.$promise.then(function (res) {

                            if (res.result == 0) {
                                $scope.informs = res.data.informedConsent;
                                $scope.projectReviewStatus = res.data.projectReviewStatus;
                                $scope.getPicNumber($scope.informs);
                            } else {
                                Toast(res.msg + '获取失败')
                            }
                        }).catch(function (error) {
                            Toast('服务器返回数据出错' + error);
                            $scope.loadError = true;
                        })
                    };

                    $scope.initInform();


                    $scope.showInformImg = function (imgUrl, index) {
                        document.getElementById('informDialog').style.display = 'block';
                        $scope.informImgForShow = imgUrl;
                        $scope.informImgForShowIndex = index;
                    };

                    $scope.hideInformImg = function () {
                        document.getElementById('informDialog').style.display = 'none';
                    };

                    $scope.showAddChooseDialog = function () {
                        document.getElementById('chooseCameraWayDialog').style.display = 'block';
                    };

                    $scope.hideAddChooseDialog = function () {
                        document.getElementById('chooseCameraWayDialog').style.display = 'none';
                    };

                    $scope.addInformForCamera = function () {
                        Bridge.uploadImgFromCamera(function (pre,media) {
                            //$scope.base64ToFile($scope.base64test);
                            $scope.uploading = true;
                            //Toast($scope.appToken);
                            var fd = new FormData();
                            fd.append('informedConsentPic', media);
                            fd.append('appToken', $scope.appToken);
                            fd.append('index', $scope.picNumber);
                            fd.append('orderId', $scope.orderId);
                            $http.post('/appinterface/upload_informed_consent_h5', fd, {
                                    headers: {'Content-Type': undefined},
                                    transformRequest: angular.identity
                                })
                                .success(function (res) {
                                    if (res.result == 0) {
                                        $scope.uploading = false;
                                        $scope.initInform()
                                    } else {
                                        Toast(res.msg + '上传失败')
                                    }
                                })
                                .error(function (error) {
                                    console.log(error)
                                });
                        })
                    };

                    $scope.addInformForAlbum = function () {
                        Bridge.uploadImgFromAlbum(function (pre,media) {
                            //$scope.base64ToFile($scope.base64test);
                            $scope.uploading = true;
                            //Toast($scope.appToken);
                            var fd = new FormData();
                            fd.append('informedConsentPic', media);
                            fd.append('appToken', $scope.appToken);
                            fd.append('index', $scope.picNumber);
                            fd.append('orderId', $scope.orderId);
                            $http.post('/appinterface/upload_informed_consent_h5', fd, {
                                    headers: {'Content-Type': undefined},
                                    transformRequest: angular.identity
                                })
                                .success(function (res) {
                                    if (res.result == 0) {
                                        $scope.uploading = false;
                                        $scope.initInform()
                                    } else {
                                        Toast(res.msg + '上传失败')
                                    }
                                })
                                .error(function (error) {
                                    console.log(error)
                                });
                        })
                    };

                    $scope.deleteInform = function () {
                        $scope.deleteInformRequest = DeleteInform.query({
                            orderId: $scope.orderId,
                            appToken: $scope.appToken,
                            index: $scope.informImgForShowIndex
                        });
                        $scope.deleteInformRequest.$promise.then(function (res) {
                            if (res.result == 0) {
                                $scope.initInform();
                            } else (
                                Toast(res.msg + '删除错误')
                            )
                        }).catch(function (error) {
                            Toast(error + '服务器错误')
                        })
                    };

                    $scope.submitInforms = function () {
                        $scope.submitInformsRequest = SubmitInforms.query({
                            appToken: $scope.appToken,
                            orderId: $scope.orderId
                        });
                        $scope.submitInformsRequest.$promise.then(function (res) {
                            if (res.result == 0) {
                                $scope.initInform();
                                Bridge.goBack();
                            } else {
                                Toast(res.msg);
                            }
                        }).catch(function (error) {
                            Toast('服务器返回出错' + error);
                        })
                    }

                });


            }])
    }
});