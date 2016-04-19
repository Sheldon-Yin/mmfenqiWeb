/**
 * Created by sheldon on 2016/4/18.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('AllCreditCtrl', ['$scope', '$interval',
            function ($scope, $interval) {
                $scope.goBack = function () {
                    window.history.back(-1);
                };

                $scope.verifyCodeState = false;

                $scope.getVerifyCode = function () {
                    var timeCounter = 60;
                    var timeContainer = document.getElementById('getVerifyCodeBtn');
                    timeContainer.innerHTML = timeCounter + 's后可再获取';
                    $scope.verifyCodeState = true;
                    var timer = $interval(function () {
                        timeCounter--;
                        if (timeCounter < 0) {
                            $interval.cancel(timer);
                            timeContainer.innerHTML = '点击再次获取';
                            $scope.verifyCodeState = false;
                        } else {
                            timeContainer.innerHTML = timeCounter + 's后可再获取';
                        }
                    }, 1000)
                }
            }])
    }
});