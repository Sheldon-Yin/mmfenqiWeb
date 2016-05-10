'use strict';

/* Controllers */

app
// Flot Chart controller
    .controller('StatisticOrderCtrl', ['$scope', function ($scope) {
        $scope.updateData = function (x) {
            $.get('/mmfq/api/statistics/get_statistics', {
                user_id: $scope.user_id,
                start_time: Date.parse($scope.start_time) / 1000 ? Date.parse($scope.start_time) / 1000 : Date.parse($scope.last_month) / 1000,//30天前
                end_time: Date.parse($scope.end_time) / 1000 ? Date.parse($scope.end_time) / 1000 : Date.parse($scope.today) / 1000
            }).then(function (res) {
                if (res.code == 0) {
                    $scope.$apply(function () {
                        x.data = res.data;
                        x.data.ticks = new Array();
                        x.data.value = new Array();
                        var counter = 1;
                        angular.forEach(x.data, function (each) {
                            x.data.ticks.push([counter, each.label]);
                            x.data.value.push([counter, each.data]);
                            counter++;
                        });
                        console.log(res.data);
                    })
                } else {
                    console.log(res)
                }
            }, function (error) {
                console.log(error)
            });
        };

        $scope.initData = function () {
            $scope.today = new Date();
            $scope.last_month = new Date();
            $scope.today.setHours(23);
            $scope.today.setMinutes(59);
            $scope.today.setSeconds(59);
            $scope.last_month.setMonth($scope.last_month.getMonth() - 1);
            $scope.last_month.setHours(0);
            $scope.last_month.setMinutes(0);
            $scope.last_month.setSeconds(1);
            console.log($scope.last_month);
            $scope.start_time = Date.parse($scope.last_month);
            $scope.end_time = Date.parse($scope.today);
            $scope.user_id = -1;
            $scope.complete = {};
            $.get('/mmfq/api/users/get_users').then(function (res) {
                $scope.$apply(function () {
                    console.log(res);
                    $scope.options = res.data;
                })
            }, function (error) {
                console.log(error)
            });
        };
        $scope.initData();
    }]);