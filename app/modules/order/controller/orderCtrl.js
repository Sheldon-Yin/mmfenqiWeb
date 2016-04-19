/**
 * Created by sheldon on 2016/4/18.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('OrderCtrl', ['$scope',
            function ($scope) {

                $scope.goBack = function () {
                    window.history.go(-1);
                };

                $scope.showConfirm = function () {
                    if (myBridge) {
                        myBridge.callHandler('sendMessage', {type: 8, data: {}}, function (response) {
                            if(response.length>0){
                                document.getElementById('confirmDialogContainer').style.display = 'block';
                            } else {
                                //TODO
                            }
                        })
                    }
                };

                $scope.goToPay = function () {
                    if ($scope.selectedFirstRatio.ratio == 0) {
                        window.location.href = '#/pay/allCredit'
                    } else if ($scope.selectedFirstRatio.ratio != 0) {
                        window.location.href = '#/pay/firstPay'
                    }
                };

                $scope.total = 4000;

                $scope.firstRatio = [
                    {
                        ratio: 0
                    },
                    {
                        ratio: 0.3
                    },
                    {
                        ratio: 0.5
                    },
                    {
                        ratio: 0.8
                    },
                    {
                        ratio: 1
                    }
                ];

                $scope.selectedFirstRatio = $scope.firstRatio[2];

                $scope.stages = [
                    {stage: 3},
                    {stage: 6},
                    {stage: 9},
                    {stage: 12}
                ];

                $scope.stages[0].isSelectedStage = true;
                $scope.selectedStage = $scope.stages[0].stage;

                $scope.updateStage = function (x) {
                    angular.forEach($scope.stages, function (each) {
                        if (x.stage == each.stage) {
                            each.isSelectedStage = true;
                            $scope.selectedStage = each.stage;
                        } else {
                            each.isSelectedStage = false;
                        }
                    });
                }

            }])
    }
});