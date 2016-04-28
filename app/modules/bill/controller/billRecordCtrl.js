/**
 * Created by sheldon on 2016/4/25.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/billService.js')(app);
        app.register.controller('BillRecordCtrl', ['$scope','MyBillRecord',
            function ($scope,MyBillRecord) {
                //$scope.goBack = function () {
                //    if (myBridge) {
                //        myBridge.callHandler('sendMessage', {type: 1, data: {}}, function (response) {
                //            alert(response);
                //        })
                //    }
                //};

                if (myBridge) {
                    myBridge.callHandler('sendMessageToApp', {type: 8, data: {}}, function (response) {
                        $scope.$apply(function () {
                            $scope.appToken = response;
                            $scope.billRecord = MyBillRecord.query({
                                appToken: $scope.appToken
                            });
                            console.log($scope.billRecord);
                            $scope.billRecord.$promise.then(function (res) {
                                if (res.result != 0){
                                    Toast(response.msg,3000);
                                    $scope.loadError = true;
                                }
                            }).catch(function (error) {
                                Toast('服务器返回失败',3000);
                                $scope.loadError = true;
                            })
                        });
                    })
                }


                $scope.showHiddenList = [0];

                //$scope.toggleShowHide = function (id) {
                //    if (!$scope.showHiddenList[id]){
                //        $scope.showHiddenList[id] = 0;
                //    }
                //    $scope.showHiddenList[id] = !$scope.showHiddenList[id];
                //}

            }])
    }
});