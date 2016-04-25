/**
 * Created by sheldon on 2016/4/25.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/queryMyBillService.js')(app);
        app.register.controller('BillListCtrl', ['$scope','QueryMyBill',
            function ($scope,QueryMyBill) {

                $scope.appToken = 'MMFQ:hfB4RC9zM80v4ZI5ANbXiVVKyivU3TTJIZnhZfqx5btQzwgzDUxlgdnqjQDPw85z';


                $scope.bill =QueryMyBill.query({
                    appToken: $scope.appToken
                });
                console.log($scope.bill);

                $scope.goBack = function () {
                    window.history.back(-1);
                };
            }])
    }
});