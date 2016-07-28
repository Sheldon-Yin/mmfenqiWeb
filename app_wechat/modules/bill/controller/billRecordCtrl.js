/**
 * Created by sheldon on 2016/4/25.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/billService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('BillRecordCtrl', ['$scope', 'MyBillRecord', 'Bridge',
            function ($scope, MyBillRecord, Bridge) {
                //$scope.goBack = function () {
                //    if (myBridge) {
                //        myBridge.callHandler('sendMessage', {type: 1, data: {}}, function (response) {
                //            alert(response);
                //        })
                //    }
                //};

                Bridge.appToken(function (response) {

                    $scope.appToken = response;
                    $scope.billRecord = MyBillRecord.query({
                        appToken: $scope.appToken
                    });
                    console.log($scope.billRecord);
                    $scope.billRecord.$promise.then(function (res) {
                        if (res.result != 0) {
                            Toast(res.msg, 3000);
                            $scope.loadError = true;
                        }
                    }).catch(function (error) {
                        Toast('服务器返回失败', 3000);
                        $scope.loadError = true;
                    })

                });

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