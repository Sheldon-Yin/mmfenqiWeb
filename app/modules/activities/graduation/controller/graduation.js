/**
 * Created by sheldon on 2016/4/6.
 */
'use strict';

/* Controllers */

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('GraduationCtrl', ['$scope','$http',
            function ($scope,$http) {
                
                $scope.goBack = function () {
                    window.history.go(-1);
                };

                $http({
                    url:'',
                    method:'GET'
                }).success(function(data,header,config,status){
                    $scope.maomao = data.maomao;
                    $scope.dansheng = data.dansheng;
                    $scope.taocan = data.taocan;
                    $scope.feirou = data.feirou;
                }).error(function(data,header,config,status){
                    console.log('error');
                });

            }]);
    }
});
