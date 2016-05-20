/**
 * Created by sheldon on 2016/5/3.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('CouponCtrl', ['$scope','$interval',
            function ($scope,$interval) {


                window.scope = $scope;

                $scope.coupons = [{price:1},{price:2}];

                //$scope.ok = function () {
                //    console.log($scope.couponInput);
                //}
                //$scope.couponInput = 1;



            }])
    }
});